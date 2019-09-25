import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import QuotationContext from '../../contexts/QuotationContext';
import { renderNumber } from '../../libs/format/number';

function FooterComponent({item}) {
	const {
		amount,
		unit_price,
	} = item;

	const [amountToRender, setAmountToRender] = React.useState(amount);
	const {
		itemsLoading,
		savePartConfigChanges,
	} = React.useContext(QuotationContext);

	function handleChange(event) {
		let newValue = event.target.value;

		if (/^\d*$/.test(newValue)) {
			if (!isNaN(newValue) && newValue !== '') {
				newValue = parseInt(newValue, 10);
			}

			setAmountToRender(newValue);
		}
	}

	function handleCommitAmountChange() {
		if (amountToRender !== '' && amountToRender !== amount) {
			savePartConfigChanges({
				part_id: item.id,
				material_type_id: item.material_type.id,
				heat_treatment_id: item.heat_treatment ? item.heat_treatment.id : null,
				superficial_treatment_id: item.superficial_treatment ? item.superficial_treatment.id : null,
				tolerance: item.tolerance,
				finishing: item.finishing,
				screw_amount: item.screw_amount,
				amount: amountToRender,
			});
		}
	}

	function handleOnKeyPress(event) {
		if (event.key === 'Enter') {
			handleCommitAmountChange();
		}
	}

	return (
		<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
			className="quotation-item-footer"
		>
			<Grid
				item
				className="quotation-item-footer__amount"
			>
				<span
					className="quotation-item-footer__amount-label"
				>
					Quantidade
				</span>
				<input
					className="quotation-item-footer__amount-value"
					disabled={itemsLoading}
					onBlur={handleCommitAmountChange}
					onChange={handleChange}
					onKeyPress={handleOnKeyPress}
					type="number"
					value={amountToRender}
				/>	
			</Grid>
			<Grid
				item
				className="quotation-item-footer__unit-price"
			>
				{
					itemsLoading ?
					<CircularProgress color="primary" size={20} />
					:
					`R$ ${renderNumber(unit_price)}/unidade`
				}
			</Grid>
		</Grid>
	);
}

FooterComponent.propTypes = {
	item: PropTypes.object.isRequired,
};

export default FooterComponent;
