import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import quotationItemsContext from '../../contexts/quotationItemsContext';
import { moneyRender } from '../../libs/money';
import './QuotationBasket.scss';

function calcTotal(items) {
	return items
		.map(item => (item.unit_price * item.qtd) || 0)
		.reduce((total, price) => (total + price), 0);
}

function materialTypeName(materials, typeId) {
	for (const mat of materials) {
		for (const type of mat.material_types) {
			if (type.id === typeId) {
				return type.name;
			}
		}
	}

	return 'Material desconhecido';
}

function ItemSummary({name, qtd, unit_price, materialTypeName}) {
	const shown_qtd = qtd || 0;

	return (
		<ListItem
		>
			<ListItemText
				primary={
					<div className="quotation-basket-item-summary-list-item">
						<span className="quotation-basket-item-summary-list-item__name">{name}</span>
						<span className="quotation-basket-item-summary-list-item__qtd">{`${shown_qtd} x ${moneyRender(unit_price)}`}</span>
					</div>
				}
				secondary={
					<span>
						{materialTypeName}
					</span>
				}
			/>
		</ListItem>
	);
}

function QuotationBasket() {
	const { materials, items } = useContext(quotationItemsContext);

	return (
		<Card className="quotation-basket">
			<CardContent>
				<span
					className="quotation-basket__header"
				>
					Total R$ {moneyRender(calcTotal(items))}
				</span>
					<List>
						{items.map((item, index) => (
							<ItemSummary
								key={"quotation-basket-item-summary-" + index}
								{...item}
								materialTypeName={materialTypeName(materials, item.material_type_id)}
							/>
						))}
					</List>
			</CardContent>
			<CardActions>
				<Button>Encomendar</Button>
			</CardActions>
		</Card>	
	);
}

export default QuotationBasket;
