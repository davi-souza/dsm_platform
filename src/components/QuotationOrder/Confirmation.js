import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import QuotationOrderContext from '../../contexts/QuotationOrderContext';
import { renderNumber } from '../../libs/format/number';

function Confirmation() {
	const {
		orderInfo,
		//orderLoading,
	} = React.useContext(QuotationOrderContext);

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Typography color="primary" variant="subtitle1">
					{
						orderInfo ?
						`Sub total das peças: R$ ${renderNumber(orderInfo.subtotal)}`
						:
						null
					}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography color="primary" variant="subtitle1">
					{
						orderInfo ?
						`Custo de entrega: R$ ${renderNumber(orderInfo.delivery.price)}`
						:
						null
					}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography color="primary" variant="h6">
					{
						orderInfo ?
						`Total: R$ ${renderNumber(orderInfo.subtotal + orderInfo.delivery.price)}`
						:
						null
					}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default Confirmation;
