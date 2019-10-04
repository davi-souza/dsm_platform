import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import QuotationContext from '../../contexts/QuotationContext';

function HeatTreatment(props) {
	const [heatTreatments, setHeatTreatments] = React.useState([]);
	const [
		selectedHeatTreatment,
		setSelectedHeatTreatment
	] = React.useState(null);
	const [options, setOptions] = React.useState([]);
	const {materials} = React.useContext(QuotationContext);
	const {
		materialTypeId,
		heatTreatment,
		setHeatTreatment,
	} = props;

	React.useEffect(() => {
		setHeatTreatments(materialHeatTreatments(materials, materialTypeId));
	}, [materialTypeId, materials]);

	React.useEffect(() => {
		setOptions(
			[{label:'Nenhum', value: null}].concat(
				heatTreatments.map(ht => ({
					label: ht.name,
					value: ht.id,
				}))
			)
		);
	}, [heatTreatments]);

	React.useEffect(() => {
		if (!heatTreatment) {
			setSelectedHeatTreatment({
				label: 'Nenhum',
				value: null,
			});
		} else {
			setSelectedHeatTreatment({
				label: heatTreatment.name,
				value: heatTreatment.id,
			});
		}
	}, [heatTreatment]);
	
	function handleHeatTreatmentChange(newHeatTreatment) {
		if (newHeatTreatment.value === null) {
			setHeatTreatment(null);
		} else {
			setHeatTreatment(
				heatTreatments.find(ht => ht.id === newHeatTreatment.value)
			);
		}
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography color="primary" variant="h6">
					Tratamento Térmico
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Select
					value={selectedHeatTreatment}
					options={options}
					onChange={handleHeatTreatmentChange}
				/>
			</Grid>
		</Grid>
	);
}

function materialHeatTreatments(materials, materialTypeId) {
	for (const material of materials) {
		for (const type of material.material_types) {
			if (type.id === materialTypeId) {
				return [...type.heat_treatments];
			}
		}
	}
}

HeatTreatment.propTypes = {
	materialTypeId: PropTypes.string.isRequired,
	heatTreatment: PropTypes.object,
	setHeatTreatment: PropTypes.func.isRequired,
};

export default HeatTreatment;
