import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import QuotationContext from '../../contexts/QuotationContext';

function Materials({materialType, setMaterialType}) {
	const [
		selectedMaterialType,
		setSelectedMaterialType
	] = React.useState(null);
	const [options, setOptions] = React.useState([]);
	const {materials} = React.useContext(QuotationContext);

	React.useEffect(() => {
		const {id, name} = materialType;
		setSelectedMaterialType({
			label: name,
			value: id,
		});
	}, [materialType]);

	React.useEffect(() => {
		setOptions(
			materials.map(m => ({
				label: m.name,
				id: m.id,
			}))
		);
	}, [materials]);

	function handleMaterialTypeChange(newMaterialType) {
		setMaterialType(
			materials.find(m => m.id === newMaterialType)
		);
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h6">
					Material
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Select
					value={selectedMaterialType}
					options={options}
					onChange={handleMaterialTypeChange}
				/>
			</Grid>
		</Grid>
	);
}

Materials.propTypes = {
	materialType: PropTypes.object.isRequired,
	setMaterialType: PropTypes.func.isRequired,
};

export default Materials;
