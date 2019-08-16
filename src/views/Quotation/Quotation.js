import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import QuotationItem from '../../components/QuotationItem';
import QuotationBasket from '../../components/QuotationBasket';
import QuotationItemsContext from '../../contexts/quotationItemsContext';
import './Quotation.scss';

const mockItems = [
	{
		name: 'Turbina do motor',
		qtd: 1,
		material: 'Iron',
		unitPrice: {
			amount: 10000,
			currency: 'R$',
		},
	},
	{
		name: 'Corpo do tubo',
		qtd: 1,
		material: "Steel",
		unitPrice: {
			amount: 20000,
			currency: 'R$',
		},
	},
];

function Quotation() {
	const [items, setItems] = useState(mockItems);

	function setItemQtd(itemIndex, newQtd) {
		/**	This function updates the qtd of a item
		 * Params:
		 * - itemIndex: index of the item in the array
		 * - newQtd: new qtd value
		 */
		if (newQtd < 0) {
			return;
		}

		const newItems = [...items];

		newItems[itemIndex].qtd = newQtd;

		setItems(newItems);
	}

	return (
		<Container maxWidth="lg">
			<QuotationItemsContext.Provider 
				value={{
					items,
					setItemQtd,
				}}
			>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Button>Adicionar peça</Button>
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
									{setItemQtd}
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
