import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import QuotationOrder from '../QuotationOrder';
import QuotationContext from '../../contexts/QuotationContext';
import { renderNumber } from '../../libs/format/number';
import './QuotationBasket.scss';

function QuotationBasket({items}) {
	const [subtotal, setSubtotal] = React.useState(0);
	const [quotationOrderOpen, setQuotationOrderOpen] = React.useState(false);
	const {itemsLoading} = React.useContext(QuotationContext);

	React.useEffect(() => {
		setSubtotal(items.reduce((sum, item) => (
			sum + ( item.unit_price * item.amount )
		), 0));
	}, [items]);

	function handleOpenQuotationOrder() {
		setQuotationOrderOpen(true);
	}

	function handleCloseQuotationOrder() {
		setQuotationOrderOpen(false);
	}

	return (
		<React.Fragment>
			<Grid
				className="quotation-basket"
				container
				spacing={1}
				justify="space-between"
				alignItems="center"
			>
				<Grid
					className="quotation-basket__subtotal"
					item
				>
					<Grid
						container
						spacing={1}
						alignItems="center"
					>
						<Grid
							className="quotation-basket__subtotal-label"
							item
						>
							Sub total
						</Grid>
						<Grid
							className="quotation-basket__subtotal-value"
							item
						>
							{`R$ ${renderNumber(subtotal)}`}
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Button
						disabled={itemsLoading}
						color="primary"
						variant="contained"
						onClick={handleOpenQuotationOrder}
					>
						Fazer pedido
					</Button>
				</Grid>
			</Grid>
			<QuotationOrder
				open={quotationOrderOpen}
				onCancel={handleCloseQuotationOrder}
			/>
		</React.Fragment>
	);
}


QuotationBasket.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuotationBasket;
