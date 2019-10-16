import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import BaseConfigComponent from '../BaseConfig';
import { renderFinishing } from '../../libs/format/finishing';
import { renderTolerance } from '../../libs/format/tolerance';
import { renderScrew } from '../../libs/format/screw';
import { renderMarking } from '../../libs/format/marking';
import { renderReport } from '../../libs/format/report';

function ConfigSummary({classes, item}) {
	const {
		dimensions,
		material_type,
		heat_treatment,
		superficial_treatment,
		tolerance,
		finishing,
		screw,
		marking,
		knurled,
		report,
	} = item;

	const configs = [
		{ label: 'Dimensões', value: dimensions },
		{ label: 'Material', value: material_type.name },
		{ label: 'Tratamento térmico', value: heat_treatment ? heat_treatment.name : null },
		{ label: 'Tratamento superficial', value: superficial_treatment ? superficial_treatment.name : null },
		{ label: 'Acabamento', value: renderFinishing(finishing) },
		{ label: 'Menor tolerância', value: renderTolerance(tolerance) },
		{ label: 'Rosca', value: renderScrew(screw) },
		{ label: 'Gravação', value: renderMarking(marking) },
		{ label: 'Recartilhado', value: knurled ? 'Sim' : 'Não', },
		{ label: 'Tipo de relatório', value: renderReport(report), },
	];

	return (
		<Grid
			alignItems="flex-start"
			className={classes.summaryContainer}
			container
			direction="column"
			justify="flex-start"
			wrap="wrap"
		>
			{configs.map(config => (
				<Grid
					key={'quotation-item-config-summary-' + config.label}
					item
				>
					<BaseConfigComponent
						{...config}
					/>
				</Grid>
			))}
		</Grid>
	);
}

const styles = {
	summaryContainer: {
		padding: '0.5rem',
		height: '100%',
		'& > *': {
			padding: '0.3rem',
		},
	},
};

ConfigSummary.propTypes = {
	classes: PropTypes.object,
	item: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigSummary);
