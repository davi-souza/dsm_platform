import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QuotationContext from '../../contexts/QuotationContext';

function Treatments(props) {
	const [heatTreatments, setHeatTreatments] = React.useState([]);
	const [superficialTreatments, setSuperficialTreatments] = React.useState([]);
	const {materials} = React.useContext(QuotationContext);
	const {
		materialTypeId,
		heatTreatment,
		setHeatTreatment,
		superficialTreatment,
		setSuperficialTreatment,
	} = props;

	React.useEffect(() => {
		setHeatTreatments(materialHeatTreatments(materials, materialTypeId));
		setSuperficialTreatments(materialSuperficialTreatments(materials, materialTypeId));
	}, [materialTypeId, materials]);
	
	function handleHeatTreatmentClick(newHeatTreatment) {
		return function (e) {
			setHeatTreatment(newHeatTreatment);
		}
	}

	function handleSuperficialTreatmentClick(newSuperficialTreatment) {
		return function (e) {
			setSuperficialTreatment(newSuperficialTreatment);
		}
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6}>
				<Grid
					container
					alignItems="flex-start"
				>
					<Grid item xs={12}>
						<Typography variant="h6" color="primary">
							Tratamentos térmicos
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Button
							className="quotation-item-edit__config-button"
							color="primary"
							fullWidth
							onClick={handleHeatTreatmentClick(null)}
							variant={
								heatTreatment === null ?
								"outlined"
								:
								"text"
							}
						>
							Nenhum
						</Button>
					</Grid>
					{heatTreatments.map(hT => (
						<Grid item xs={4} key={hT.id}>
							<Button
								className="quotation-item-edit__config-button"
								color="primary"
								fullWidth
								onClick={handleHeatTreatmentClick({...hT})}
								variant={
									heatTreatment !== null && hT.id === heatTreatment.id ?
									"outlined"
									:
									"text"
								}
							>
								{hT.name}
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
							Tratamentos superficiais
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Button
							className="quotation-item-edit__config-button"
							color="primary"
							fullWidth
							onClick={handleSuperficialTreatmentClick(null)}
							variant={
								superficialTreatment === null ?
								"outlined"
								:
								"text"
							}
						>
							Nenhum
						</Button>
					</Grid>
					{superficialTreatments.map(sT => (
						<Grid item xs={4} key={sT.id}>
							<Button
								className="quotation-item-edit__config-button"
								color="primary"
								fullWidth
								onClick={handleSuperficialTreatmentClick({...sT})}
								variant={
									superficialTreatment !== null && sT.id === superficialTreatment.id ?
									"outlined"
									:
									"text"
								}
							>
								{sT.name}
							</Button>
						</Grid>
					))}
				</Grid>
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

function materialSuperficialTreatments(materials, materialTypeId) {
	for (const material of materials) {
		for (const type of material.material_types) {
			if (type.id === materialTypeId) {
				return [...type.superficial_treatments];
			}
		}
	}
}

Treatments.propTypes = {
	materialTypeId: PropTypes.string.isRequired,
	heatTreatment: PropTypes.object,
	setHeatTreatment: PropTypes.func.isRequired,
	superficialTreatment: PropTypes.object,
	setSuperficialTreatment: PropTypes.func.isRequired,
};

export default Treatments;
