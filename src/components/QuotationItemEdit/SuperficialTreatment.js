import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import QuotationContext from '../../contexts/QuotationContext';

function SuperficialTreatment(props) {
	const [superficialTreatments, setSuperficialTreatments] = React.useState([]);
	const [
		selectedSuperficialTreatment,
		setSelectedSuperficialTreatment
	] = React.useState(null);
	const [options, setOptions] = React.useState([]);
	const {materials} = React.useContext(QuotationContext);
	const {
		materialTypeId,
		superficialTreatment,
		setSuperficialTreatment,
	} = props;

	React.useEffect(() => {
		setSuperficialTreatments(
			materials.find(m => m.id === materialTypeId).superficial_treatments
		);
	}, [materialTypeId, materials]);

	React.useEffect(() => {
		setOptions(
			[{label:'Nenhum', value: null}].concat(
				superficialTreatments.map(ht => ({
					label: ht.name,
					value: ht.id,
				}))
			)
		);
	}, [superficialTreatments]);

	React.useEffect(() => {
		if (!superficialTreatment) {
			setSelectedSuperficialTreatment({
				label: 'Nenhum',
				value: null,
			});
		} else {
			setSelectedSuperficialTreatment({
				label: superficialTreatment.name,
				value: superficialTreatment.id,
			});
		}
	}, [superficialTreatment]);
	
	function handleSuperficialTreatmentChange(newSuperficialTreatment) {
		if (newSuperficialTreatment.value === null) {
			setSuperficialTreatment(null);
		} else {
			setSuperficialTreatment(
				superficialTreatments.find(st => st.id === newSuperficialTreatment.value)
			);
		}
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h6">
					Tratamento Superficial
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Select
					value={selectedSuperficialTreatment}
					options={options}
					onChange={handleSuperficialTreatmentChange}
				/>
			</Grid>
		</Grid>
	);
}

SuperficialTreatment.propTypes = {
	materialTypeId: PropTypes.string.isRequired,
	superficialTreatment: PropTypes.object,
	setSuperficialTreatment: PropTypes.func.isRequired,
};

export default SuperficialTreatment;
