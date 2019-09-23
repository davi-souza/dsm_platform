import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QuotationContext from '../../contexts/QuotationContext';

function getMaterial(materials, materialType) {
	for (const material of materials) {
		for (const type of material.material_types) {
			if (type.id === materialType.id) {
				return {...material};
			}
		}
	}
}

function MaterialsTabPanel({materialType, setMaterialType}) {
	const [material, setMaterial] = React.useState({});
	const {materials} = React.useContext(QuotationContext);

	React.useEffect(() => {
		const mat = getMaterial(materials, materialType);

		if (JSON.stringify(mat) !== JSON.stringify(material)) {
			setMaterial(mat);
		}
	}, [materialType]);

	function handleMaterialClick(newMaterial) {
		return function (event) {
			setMaterial(newMaterial);
		}
	}

	function handleMaterialTypeClick(newMaterialType) {
		return function (event) {
			setMaterialType(newMaterialType);
		}
	}

	return (
		<Grid container>
			<Grid item xs={12} sm={6}>
				<Grid
					container
					alignItems="flex-start"
				>
					<Grid item xs={12}>
						<Typography variant="h6" color="primary">
							Materiais
						</Typography>
					</Grid>
					{materials.map(mat => (
						<Grid item xs={4} key={mat.id}>
							<Button
								className="quotation-item-edit__config-button"
								color="primary"
								fullWidth
								onClick={handleMaterialClick({...mat})}
								variant={
									mat.id === material.id ?
									"outlined"
									:
									"text"
								}
							>
								{mat.name}
							</Button>
						</Grid>
					))}
				</Grid>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Grid
					container
					alignItems="flex-start"
				>
					<Grid item xs={12}>
						<Typography variant="h6" color="primary">
							Tipo de materiais
						</Typography>
					</Grid>
					{material.material_types && material.material_types.map(matType => (
						<Grid item xs={6} key={matType.id}>
							<Button
								className="quotation-item-edit__config-button"
								color="primary"
								fullWidth
								onClick={handleMaterialTypeClick({...matType})}
								variant={
									matType.id === materialType.id ?
									"outlined"
									:
									"text"
								}
							>
								{matType.name}
							</Button>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default MaterialsTabPanel;
