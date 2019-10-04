import React from 'react';
import Container from '@material-ui/core/Container';
import QuotationUpload from '../../components/QuotationUpload';
import QuotationItemList from '../../components/QuotationItemList';
import AppContext from '../../contexts/AppContext';
import QuotationContext from '../../contexts/QuotationContext';
import { getMaterials } from '../../libs/fetch/material';
import { changePartConfig } from '../../libs/fetch/part';
import './Quotation.scss';

function Quotation() {
	const [items, setItems] = React.useState(mockItems);
	const [itemsLoading, setItemsLoading] = React.useState(false);
	const [materials, setMaterials] = React.useState([]);
	const {handleOpenSnackbar} = React.useContext(AppContext);

	React.useEffect(() => {
		getMaterials().then(({data, error}) => {
			if (!error) {
				setMaterials(data);
			}
		});
	}, []);

	function savePartConfigChanges(input) {
		setItemsLoading(true);

		changePartConfig(input)
			.then(({data, error}) => {
				if (data) {
					const newItems = items.map(item => {
						if (item.id === input.part_id) {
							return data;
						}

						return item;
					});

					setItems(newItems);

					handleOpenSnackbar('Atualização com sucesso');
				} else if (error) {
					handleOpenSnackbar(error.message);
				}
			})
			.finally(() => {
				setItemsLoading(false);
			});
	}

	function addItem(item) {
		setItems([...items, item]);
	}

	function removeItem(index) {
		const newItems = items.filter((_, i) => i !== index);

		setItems(newItems);
	}

	return (
		<QuotationContext.Provider value={{
			items,
			itemsLoading,
			setItemsLoading,
			savePartConfigChanges,
			addItem,
			removeItem,
			materials,
		}}>
			<Container className="quotation-view__container" maxWidth="lg">
				<QuotationItemList />
				<QuotationUpload />
			</Container>
		</QuotationContext.Provider>
	);
}

const mockItems = Array(1).fill(JSON.parse('{"id":"e5906b4e-0db2-47f3-8f58-6195d0e0ecef","name":"test.stp","material_type":{"id":"cfc560d7-b2e1-47d8-921c-1c4a5720205d","name":"Alumínio 5083 / 5082"},"heat_treatment":null,"superficial_treatment":null,"tolerance":null,"finishing":null,"screw":null,"amount":1,"unit_price":31657}'));

export default Quotation;
