import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import QuotationContext from '../../contexts/QuotationContext';
import { renderMoney } from '../../libs/format/number';

function CartInfo({classes}) {
	const [itemsTotalPrice, setItemsTotalPrice] = React.useState(0);
	const {items} = React.useContext(QuotationContext);

	React.useEffect(() => {
		setItemsTotalPrice(items.reduce((sum, item) => (
			sum + ( item.unit_price * item.amount )
		), 0));
	}, [items]);

	return (
		<React.Fragment>
			<Grid
				alignItems="center"
				className={classes.infoContainer}
				container
			>
				<Grid
					className={classes.infoLabel}
					item
					xs={12}
				>
					Valor total do pedido
				</Grid>
				<Grid
					className={classes.infoValue}
					item
					xs={12}
				>
					{renderMoney(itemsTotalPrice)}
				</Grid>
			</Grid>
			<Grid
				alignItems="center"
				className={classes.infoContainer}
				container
			>
				<Grid
					className={classes.infoLabel}
					item
					xs={12}
				>
					Data prevista para entrega
				</Grid>
				<Grid
					className={classes.infoValue}
					item
					xs={12}
				>
					01/11/2019
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

function styles({palette}) {
	return {
		infoContainer: {
			width: '10rem',
			color: palette.primary.darkText,
		},
		infoLabel: {
			color: `${palette.primary.darkText}99`,
			fontSize: '0.65rem',
		},
		infoValue: {
			fontSize: '1rem',
			fontWeight: 'bold',
		},
	};
};

CartInfo.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(CartInfo);
