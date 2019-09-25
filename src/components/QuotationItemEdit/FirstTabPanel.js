import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Materials from './Materials';
import Treatments from './Treatments';

function FirstTabPanel(props) {
	const {
		materialType,
		setMaterialType,
		heatTreatment,
		setHeatTreatment,
		superficialTreatment,
		setSuperficialTreatment,
	} = props;

	return (
		<Grid container>
			<Grid item xs={12}>
				<Materials
					materialType={materialType}
					setMaterialType={setMaterialType}
				/>
			</Grid>
			<Grid item xs={12}>
				<Treatments
					heatTreatment={heatTreatment}
					setHeatTreatment={setHeatTreatment}
					superficialTreatment={superficialTreatment}
					setSuperficialTreatment={setSuperficialTreatment}
					materialTypeId={materialType.id}
				/>
			</Grid>
		</Grid>
	);
}

FirstTabPanel.propTypes = {
	materialType: PropTypes.object.isRequired,
	setMaterialType: PropTypes.func.isRequired,
	heatTreatment: PropTypes.object,
	setHeatTreatment: PropTypes.func.isRequired,
	superficialTreatment: PropTypes.object,
	setSuperficialTreatment: PropTypes.func.isRequired,
};

export default FirstTabPanel;
