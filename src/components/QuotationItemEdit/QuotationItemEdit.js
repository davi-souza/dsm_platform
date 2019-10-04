import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/styles';
import Material from './Material';
import HeatTreatment from './HeatTreatment';
import SuperficialTreatment from './SuperficialTreatment';
import Finishing from './Finishing';
import Tolerance from './Tolerance';
import Screw from './Screw';
import Engraving from './Engraving';
import Report from './Report';
import Knurled from './Knurled';
import QuotationContext from '../../contexts/QuotationContext';
import './QuotationItemEdit.scss';

function QuotationItemEdit({classes, item, open, onCancel}) {
	const [materialType, setMaterialType] = React.useState(item.material_type);
	const [heatTreatment, setHeatTreatment] = React.useState(item.heat_treatment);
	const [superficialTreatment, setSuperficialTreatment] = React.useState(item.superficial_treatment);
	const [tolerance, setTolerance] = React.useState(item.tolerance);
	const [finishing, setFinishing] = React.useState(item.finishing);
	const [screw, setScrew] = React.useState(item.screw);
	const [engraving, setEngraving] = React.useState(item.engraving);
	const [knurled, setKnurled] = React.useState(item.knurled);
	const [report, setReport] = React.useState(item.report);
	const {savePartConfigChanges} = React.useContext(QuotationContext);

	React.useEffect(() => {
		const {
			material_type,
			heat_treatment,
			superficial_treatment,
		} = item;

		if (materialType.id === material_type.id) {
			setHeatTreatment(heat_treatment);
			setSuperficialTreatment(superficial_treatment);
		} else {
			setHeatTreatment(null);
			setSuperficialTreatment(null);
		}
	}, [item, materialType]);

	function handleSaveConfig() {
		function processTolerance(raw) {
			if (!raw) {
				return null;
			}

			return parseFloat('0.' + raw);
		}

		savePartConfigChanges({
			part_id: item.id,
			material_type_id: materialType.id,
			heat_treatment_id: heatTreatment ? heatTreatment.id : null,
			superficial_treatment_id: superficialTreatment ? superficialTreatment.id : null,
			tolerance: processTolerance(tolerance),
			finishing,
			screw,
			engraving,
			knurled,
			report,
			amount: item.amount,
		});

		onCancel();
	}

	const fullScreen = useMediaQuery('(max-width:600px)');

	const hasChanged = item.material_type.id !== materialType.id ||
		JSON.stringify(heatTreatment) !== JSON.stringify(item.heat_treatment) ||
		JSON.stringify(superficialTreatment) !== JSON.stringify(item.superficial_treatment) ||
		tolerance !== item.tolerance ||
		finishing !== item.finishing ||
		JSON.stringify(screw) !== JSON.stringify(item.screw) ||
		engraving !== item.engraving ||
		report !== item.report ||
		knurled !== item.knurled;

	const ConfigEditComponents = [
		<Material
			materialType={materialType}
			setMaterialType={setMaterialType}
		/>,
		<HeatTreatment
			heatTreatment={heatTreatment}
			setHeatTreatment={setHeatTreatment}
			materialTypeId={materialType.id}
		/>,
		<SuperficialTreatment
			superficialTreatment={superficialTreatment}
			setSuperficialTreatment={setSuperficialTreatment}
			materialTypeId={materialType.id}
		/>,
		<Finishing
			finishing={finishing}
			setFinishing={setFinishing}
		/>,
		<Tolerance
			tolerance={tolerance}
			setTolerance={setTolerance}
		/>,
		<Screw
			screw={screw}
			setScrew={setScrew}
		/>,
		<Engraving
			engraving={engraving}
			setEngraving={setEngraving}
		/>,
		<Knurled
			knurled={knurled}
			setKnurled={setKnurled}
		/>,
		<Report
			report={report}
			setReport={setReport}
		/>,
	];

	return (
		<Dialog
			disableBackdropClick={true}
			disableEscapeKeyDown={true}
			fullWidth
			fullScreen={fullScreen}
			maxWidth="lg"
			open={open}
			scroll="body"
		>
			<DialogTitle
				color="primary"
				disableTypography={true}
			>
				<Typography variant="h6" color="primary">
					{item.name}
				</Typography>
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<div className="quotation-item-edit__panels">
					<Grid container spacing={3}>
						{ConfigEditComponents.map((c, cIndex) => (
							<React.Fragment key={'edit-component-' + cIndex}>
								<Grid item xs={12}>
									{c}
								</Grid>
								<Grid item xs={12}>
									<Divider light />
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</div>
			</DialogContent>
			<DialogActions>
				<Button
					color="primary"
					onClick={onCancel}
				>
					Cancelar
				</Button>
				<Button
					color="primary"
					disabled={!hasChanged}
					onClick={handleSaveConfig}
				>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const styles = {
	dialogContent: {
		padding: 0,
		minHeight: '32rem',
		maxHeight: '32rem',
	},
	appBar: {
		backgroundColor: '#fff',
	},
	panels: {
		paddingTop: '1rem',
		paddingLeft: '0.5rem',
		paddingRight: '0.5rem',
	},
};

QuotationItemEdit.propTypes = {
	classes: PropTypes.object,
	item: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(QuotationItemEdit);
