import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuotationContext from '../../contexts/QuotationContext';
import { renderMoney } from '../../libs/format/number';

function FooterComponent({classes, item}) {
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

		if (newValue === '') {
			newValue = 0;
		} else if (isNaN(newValue)) {
			newValue = amountToRender;
		} else {
			newValue = parseInt(newValue, 10);
		}

		setAmountToRender(newValue);
	}

	function handleCommitAmountChange() {
		if (amountToRender && amountToRender !== amount) {
			savePartConfigChanges({
				part_id: item.id,
				material_type_id: item.material_type.id,
				heat_treatment_id: item.heat_treatment ? item.heat_treatment.id : null,
				superficial_treatment_id: item.superficial_treatment ? item.superficial_treatment.id : null,
				tolerance: item.tolerance,
				finishing: item.finishing,
				screw: item.screw,
				marking: item.marking,
				knurled: item.knurled,
				report: item.report,
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
			className={classes.footerContainer}
		>
			<Grid
				item
			>
				<span
					className={classes.amountLabel}
				>
					Quantidade
				</span>
				<input
					className={classes.amountInput}
					disabled={itemsLoading}
					onBlur={handleCommitAmountChange}
					onChange={handleChange}
					onKeyPress={handleOnKeyPress}
					type="text"
					value={
						amountToRender !== 0 ?
						amountToRender
						:
						''
					}
				/>	
			</Grid>
			<Grid item>
				{
					itemsLoading ?
					<CircularProgress color="primary" size={20} />
					:
					<Grid
						alignItems="flex-start"
						container
						direction="column"
						justify="flex-start"
					>
						{
							amount > 1 && (
								<Grid item>
									<Typography color="inherit" variant="body2" component="span">
										{`Unidade: ${renderMoney(unit_price)}`}
									</Typography>
								</Grid>
							)
						}
						<Grid item>
							<Typography color="inherit" variant="body2" component="span">
								{`Subtotal: ${renderMoney(unit_price * amount)}`}
							</Typography>
						</Grid>
					</Grid>
				}
			</Grid>
		</Grid>
	);
}

function styles({palette}) {
	return {
		footerContainer: {
			color: palette.primary.darkText,
			padding: '0.5rem 1rem',
		},
		amountLabel: {
			paddingRight: '0.5rem',
		},
		amountInput: {
			border: `1px solid ${palette.borders.primary}`,
			borderRadius: '0.5rem',
			padding: '0.15rem 0',
			maxWidth: '5rem',
			textAlign: 'center',
		},
	};
};

FooterComponent.propTypes = {
	classes: PropTypes.object,
	item: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterComponent);
