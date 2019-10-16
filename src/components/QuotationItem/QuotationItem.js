import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import HeaderComponent from './HeaderComponent';
import ConfigSummary from './ConfigSummary';
import FooterComponent from './FooterComponent';
import { primary, borders } from '../../themes';

function QuotationItem({classes, index, item}) {
	return (
		<Grid container className={classes.quotationItem}>
			<Grid item xs={12}>
				<HeaderComponent
					index={index}
					item={item}
				/>
			</Grid>
			<Grid item xs={12}>
				<Divider light />
			</Grid>
			<Grid item xs={12}>
				<Grid
					container
				>
					<Grid item className={classes.contentGrid}>
						<img
							alt={item.name}
							className={classes.itemImg}
							src="https://via.placeholder.com/500?text=IMAGEM+DA+PEÇA"
						/>
					</Grid>
					<Grid item className={classes.configSummary}>
						<ConfigSummary
							item={item}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider light />
			</Grid>
			<Grid item xs={12}>
				<FooterComponent
					item={item}
				/>
			</Grid>
		</Grid>
	);
}

const imageSize = '12rem',
	styles = {
		quotationItem: {
			backgroundColor: '#ffffff',
			border: `1px solid ${borders.primary}`,
			borderRadius: '0.5rem',
			color: primary.main,
		},
		contentGrid: {
			color: '#000000',
			maxHeight: imageSize,
			minHeight: imageSize,
			maxWidth: imageSize,
			minWidth: imageSize,
		},
		itemImg: {
			maxHeight: imageSize,
			minHeight: imageSize,
			maxWidth: imageSize,
			minWidth: imageSize,
		},
		configSummary: {
			flexGrow: 1,
			maxHeight: imageSize,
			minHeight: imageSize,
		},
	};

QuotationItem.propTypes = {
	classes: PropTypes.object,
	item: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuotationItem);
