import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles} from '@material-ui/core/styles';

function BaseConfigComponent({classes, label, value}) {
	let valueToRender = value;

	if (!value && value !== 0) {
		valueToRender = String.fromCharCode(8213);
	}

	return (
		<Grid
			className={classes.container}
			container
			direction="row"
			justify="flex-start"
			alignItems="center"
		>
			<Grid
				item
				className={classes.containerLabel}
			>
				{`${label}:`}
			</Grid>
			<Grid
				item
			>
				{valueToRender}
			</Grid>
		</Grid>
	);
}

function styles({palette}) {
	return {
		container: {
			color: palette.primary.darkText,
			fontSize: '0.85rem',
			'& > *:first-child': {
				paddingRight: '0.3rem',
			},
		},
		containerLabel: {
			fontWeight: 'bold',
		},
	};
};


BaseConfigComponent.propTypes = {
	classes: PropTypes.object,
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

export default withStyles(styles)(BaseConfigComponent);
