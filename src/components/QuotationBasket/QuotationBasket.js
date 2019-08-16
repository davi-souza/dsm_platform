import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import './QuotationBasket.scss';

function QuotationBasket() {
	return (
		<Card className="quotation-basket">
			<CardContent></CardContent>
			<CardActions>
				<Button>ENCOMENDAR</Button>
			</CardActions>
		</Card>	
	);
}

export default QuotationBasket;
