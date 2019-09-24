import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QuotationContext from '../../contexts/QuotationContext';
import { renderFinishing } from '../../libs/format/finishing';

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

const possibleFinishings = [
	'STANDARD',
	'RECTIFIED',
	'POLISHED',
];

function TreatmentsFinishingTabPanel(props) {
	const [heatTreatments, setHeatTreatments] = React.useState([]);
	const [superficialTreatments, setSuperficialTreatments] = React.useState([]);

	const {
		materials,
	} = React.useContext(QuotationContext);

	const {
		materialTypeId,
		heatTreatment,
		setHeatTreatment,
		superficialTreatment,
		setSuperficialTreatment,
		finishing,
		setFinishing
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

	function handleFinishingClick(newFinishing) {
		return function (e) {
			setFinishing(newFinishing);
		}
	}

	return (
		<Grid container spacing={2}>
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
					<Grid item xs={6}>
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
						<Grid item xs={6} key={hT.id}>
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
					<Grid item xs={6}>
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
						<Grid item xs={6} key={sT.id}>
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
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h6" color="primary">
							Acabamento
						</Typography>
					</Grid>
					{possibleFinishings.map(f => (
						<Grid item xs={12} sm={4} md={3} key={'possible-finishings-' + f}>
							<Button
								className="quotation-item-edit__config-button"
								color="primary"
								fullWidth
								onClick={handleFinishingClick(f)}
								variant={
									f === finishing || (!finishing && f === 'STANDARD') ?
									"outlined"
									:
									"text"
								}
							>
								{renderFinishing(f)}
							</Button>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default TreatmentsFinishingTabPanel;
