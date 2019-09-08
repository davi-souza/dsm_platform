import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import QuotationUpload from '../../components/QuotationUpload';
import QuotationItem from '../../components/QuotationItem';
import QuotationBasket from '../../components/QuotationBasket';
import QuotationItemsContext from '../../contexts/quotationItemsContext';
import { getMaterials } from '../../libs/fetch/materials';
import { changePartOptions } from '../../libs/fetch/part';
import './Quotation.scss';

function Quotation() {
	const [uploading, setUploading] = useState(false);
	const [materials, setMaterials] = useState([]);
	const [items, setItems] = useState([]);
	const [partLoading, setPartLoading] = useState(false);

	useEffect(() => {
		getMaterials().then(setMaterials);
	}, []);

	/**	This function updates the qtd of a item
	 * @param {number} itemIndex	Index of the item in the array
	 * @param {number} newQtd		New qtd value
	 */
	function setItemQtd(itemIndex, newQtd) {
		if (newQtd < 0) {
			return;
		}

		const newItems = [...items];

		newItems[itemIndex].qtd = newQtd;

		setItems(newItems);
	}

	/** Insert file to items
	 * @param {object} newItem Item object
	 */
	function addItem(item) {
		setItems([...items, item]);
	}

	/** Remove file to items
	 * @param {number} itemIndex Item index at array
	 */
	function removeItem(itemIndex) {
		let newItems = [...items];
		newItems.splice(itemIndex, 1);
		setItems(newItems);
	}

	/** Change item options
	 * @param {number}	Item index in array
	 * @param {string}	Material type id (uuid)
	 * @param {number}	Item qtd
	 */
	async function handlePartOptionsChange(index, material_type_id, qtd) {
		const {id} = items[index];

		setPartLoading(true);

		try {
			const newPart = await changePartOptions({id, material_type_id, qtd});

			const newItems = [...items];

			newItems[index] = newPart;

			setItems(newItems);
		} finally {
			setPartLoading(false);
		}
	}

	return (
		<Container maxWidth="lg">
			<QuotationItemsContext.Provider 
				value={{
					uploading,
					setUploading,
					materials,
					items,
					setItemQtd,
					addItem,
					removeItem,
					partLoading,
					handlePartOptionsChange,
				}}
			>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						{uploading && <LinearProgress />}
						<QuotationUpload />
					</Grid>
					<Grid
						item
						xs={12}
						md={9}
					>
						{items.map((item, index) => (
							<QuotationItem
								key={'quotation-item-' + index}
								{...Object.assign(
									item,
									{index},
								)}
							/>
						))}
					</Grid>
					<Grid item xs={12} md={3}>
						<QuotationBasket />
					</Grid>
				</Grid>
			</QuotationItemsContext.Provider>
		</Container>
	);
}

export default Quotation;
