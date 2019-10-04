import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles} from '@material-ui/core/styles';

function BaseConfigComponent({classes, label, value}) {
	let valueToRender = value;

	if (!value && value !== 0) {
		valueToRender = 'Não informado';
	}

	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			className={classes.container}
		>
			<Grid
				item
				xs={12}
				className={classes.containerLabel}
			>
				{label}
			</Grid>
			<Grid
				item
				xs={12}
			>
				{valueToRender}
			</Grid>
		</Grid>
	);
}

const styles = {
	container: {
		color: 'rgba(69, 90, 100, 0.7)',
		fontSize: '0.8rem',
	},
	containerLabel: {
		fontWeight: 'bold',
	},
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
