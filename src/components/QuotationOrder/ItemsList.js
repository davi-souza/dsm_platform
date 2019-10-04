import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ItemSummary from './ItemSummary';
import QuotationContext from '../../contexts/QuotationContext';

function ItemsList() {
	const {items} = React.useContext(QuotationContext);

	return (
		<Grid container spacing={1}>
			{items.map(item => (
				<React.Fragment key={item.id}>
					<Grid item xs={12}>
						<ItemSummary
							item={item}
						/>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
				</React.Fragment>
			))}
		</Grid>
	);
}

export default ItemsList;
