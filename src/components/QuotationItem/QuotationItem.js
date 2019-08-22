import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {moneyRender} from '../../libs/money';
import './QuotationItem.scss';

const styles = {
	cardActions: {
		justifyContent: 'space-between',
	},
};

const regExp = /^\d*$/;


function QuotationItem({qtd, name, index, unitPrice, setItemQtd}) {
	function handleQtdChange(event) {
		/** This function handle the qtd input changes
		 * Params:
		 * - event object with "target" key
		 */
		const newQtd = event.target.value;
		
		if (regExp.test(newQtd)) {
			setItemQtd(index, parseInt(newQtd, 10));
		}
	}

	return (
		<Card className="quotation-item">
			<CardHeader
				title={`${index + 1} - ${name}`}
				action={
					<IconButton>
						<DeleteIcon />
					</IconButton>
				}
			/>
			<CardContent></CardContent>
			<CardActions style={styles.cardActions}>
				<div>
					<span
						className="quotation-item__qtd-input-label"
					>
						QTD:
					</span>
					<Input
						className="quotation-item__qtd-input"
						value={qtd}
						onChange={handleQtdChange}
						type="number"
					/>
				</div>
				<span>{`Preço unitário ${unitPrice.currency} ${moneyRender(unitPrice.amount)}`}</span>
			</CardActions>
		</Card>
	);
}

QuotationItem.propTypes = {
	qtd: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	unitPrice: PropTypes.exact({
		amount: PropTypes.number.isRequired,
		currency: PropTypes.oneOf(['R$']).isRequired,
	}).isRequired,
};

export default QuotationItem;
