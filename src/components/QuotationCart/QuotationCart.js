import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartInfo from './CartInfo';

function QuotationCart({classes}) {
	function handleBuyClick() {
		alert('Em construção');
	}

	return (
		<AppBar elevation={0} position="sticky" className={classes.appBar}>
			<Toolbar variant="dense">
				<Typography	color="inherit" className={classes.title} variant="body1">
					Sumário
				</Typography>
				<CartInfo />
				<Button color="inherit" size="small" onClick={handleBuyClick}>
					<ShoppingCartIcon className={classes.buttonIcon} />
					Terminar
				</Button>
			</Toolbar>
		</AppBar>
	);
}

function styles({palette}) {
	return {
		appBar: {
			backgroundColor: '#ffffff',
			borderBottom: `1px solid ${palette.borders.primary}`,
			color: palette.primary.darkText,
			marginBottom: '1rem',
		},
		title: {
			flexGrow: 1,
		},
		infoContainer: {
			width: '10rem',
		},
		infoLabel: {
			color: '#777',
			fontSize: '0.65rem',
		},
		infoValue: {
			fontSize: '1rem',
			fontWeight: 'bold',
		},
		buttonIcon: {
			fontSize: '1.2rem',
			marginRight: '0.3rem',
		},
	};
};

QuotationCart.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(QuotationCart);
