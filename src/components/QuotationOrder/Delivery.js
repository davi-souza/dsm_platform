import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import QuotationOrderContext from '../../contexts/QuotationOrderContext';
import { renderDeliveryOption } from '../../libs/format/delivery';

const deliveryOptions = [
	'WORKINGDAYS_15',
	'WORKINGDAYS_10',
];

function deliveryDate(orderInfo) {
	if (!orderInfo || !orderInfo.delivery
		|| !orderInfo.delivery.at) {
		return '';
	}

	return (new Date(orderInfo.delivery.at)).toLocaleDateString('pt-BR');
}

function Delivery() {
	const {
		deliveryOption,
		setDeliveryOption,
		orderInfo,
		orderLoading,
	} = React.useContext(QuotationOrderContext);

	function handleDeliveryOptionChange(newOption) {
		return function (event) {
			setDeliveryOption(newOption);
		};
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Typography color="primary" variant="subtitle1">
					Opções de data de entrega
				</Typography>
			</Grid>
			{deliveryOptions.map(option => (
				<Grid item xs={3} key={option}>
					<Button
						color="primary"
						disabled={orderLoading}
						fullWidth
						onClick={handleDeliveryOptionChange(option)}
						variant={
							option === deliveryOption ?
							'outlined'
							:
							'text'
						}
					>
						{renderDeliveryOption(option)}
					</Button>
				</Grid>
			))}
			<Grid item xs={12}>
				<Typography color="primary" variant="subtitle1">
					{`Data prevista de entrega: ${deliveryDate(orderInfo)}`}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default Delivery;
