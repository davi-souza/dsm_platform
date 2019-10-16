import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import QuotationItem from '../QuotationItem';
import QuotationContext from '../../contexts/QuotationContext';
import './QuotationItemList.scss';

function QuotationItemList({classes}) {
	const {
		items,
		itemsLoading,
	} = React.useContext(QuotationContext);

	if ((!items || items.length === 0) && !itemsLoading) {
		return (
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
			>
				<Grid item xs={12}>
					<CloudUploadIcon className={classes.uploadIcon} />
				</Grid>
				<Grid item xs={12}>
					<span className={classes.emptyMessage}>Faça upload do seu arquivo!</span>
				</Grid>
			</Grid>
		);
	} else if ((!items || items.length === 0) && itemsLoading) {
		return (
			<Grid
				className={classes.loadingGrid}
				container
				justify="center"
				alignItems="center"
			>
				<Grid item>
					<CircularProgress
						color="primary"
						size={80}
					/>
				</Grid>
			</Grid>
		);
	} else {
		return (
			<Grid
				container
				spacing={1}
			>
				{items.map((item, index) => (
					<Grid
						key={'quotation-item-list__item-' + index}
						item
						xs={12}
					>
						<QuotationItem
							index={index}
							item={item}
						/>
					</Grid>
				))}
			</Grid>
		);
	}
}

const styles = {
	uploadIcon: {
		color: 'rgba(36, 47, 64, 0.1)',
		fontSize: '20rem',
	},
	emptyMessage: {
		color: 'rgba(36, 47, 64, 0.1)',
		fontSize: '2rem',
	},
	loadingGrid: {
		height: '50vh',
	},
	basketGrid: {
		position: 'sticky',
		bottom: '-0.35rem',
		marginBottom: '0.25rem',
		marginLeft: '0.25rem',
		marginRight: '0.25rem',
	},
};

QuotationItemList.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(QuotationItemList);
