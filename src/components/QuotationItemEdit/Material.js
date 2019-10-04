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
			materials.map(m => m.material_types.map(mt => ({
				label: mt.name,
				value: mt.id,
			}))).flat(1)
		);
	}, [materials]);

	function handleMaterialTypeChange(newMaterialType) {
		setMaterialType(findMaterialType(materials, newMaterialType.value));
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography color="primary" variant="h6">
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

function findMaterialType(materials, materialTypeId) {
	for (const m of materials) {
		for (const mt of m.material_types) {
			if (mt.id === materialTypeId) {
				return {...mt};
			}
		}
	}
}

Materials.propTypes = {
	materialType: PropTypes.object.isRequired,
	setMaterialType: PropTypes.func.isRequired,
};

export default Materials;
