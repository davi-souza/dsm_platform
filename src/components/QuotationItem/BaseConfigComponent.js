import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

function BaseConfigComponent({label, value}) {
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
			className="quotation-item-config-container"
		>
			<Grid
				item
				xs={12}
				className="quotation-item-config-container__label"
			>
				{label}
			</Grid>
			<Grid
				item
				xs={12}
				className="quotation-item-config-container__value"
			>
				{valueToRender}
			</Grid>
		</Grid>
	);
}

BaseConfigComponent.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

export default BaseConfigComponent;
