import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MaterialsTabPanel from './MaterialsTabPanel';
import TreatmentsTabPanel from './TreatmentsTabPanel';
import ToleranceFinishingTabPanel from './ToleranceFinishingTabPanel';
import AppContext from '../../contexts/AppContext';
import QuotationContext from '../../contexts/QuotationContext';
import './QuotationItemEdit.scss';

const style = {
	dialogContent: {
		paddingTop: 0,
		paddingLeft: 0,
		paddingRight: 0,
		minHeight: '25rem',
		maxHeight: '25rem',
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

function QuotationItemEdit({item, open, onCancel}) {
	const [tabValue, setTabValue] = React.useState(0);
	const [materialType, setMaterialType] = React.useState(item.material_type);
	const [heatTreatment, setHeatTreatment] = React.useState(item.heat_treatment);
	const [superficialTreatment, setSuperficialTreatment] = React.useState(item.superficial_treatment);
	const [tolerance, setTolerance] = React.useState(item.tolerance);
	const [finishing, setFinishing] = React.useState(item.finishing);
	const [screwAmount, setScrewAmount] = React.useState(item.screw_amount);
	const {handleOpenSnackbar} = React.useContext(AppContext);
	const {savePartConfigChanges} = React.useContext(QuotationContext);

	React.useEffect(() => {
		if (materialType.id === item.material_type.id) {
			setHeatTreatment(item.heat_treatment);
			setSuperficialTreatment(item.superficial_treatment);
		} else {
			handleOpenSnackbar('Tratamentos resetados');
			setHeatTreatment(null);
			setSuperficialTreatment(null);
		}
	}, [materialType]);

	function handleChangeTab(event, newValue) {
		setTabValue(newValue);
	}

	function handleSaveConfig() {
		savePartConfigChanges({
			part_id: item.id,
			material_type_id: materialType.id,
			heat_treatment_id: heatTreatment ? heatTreatment.id : null,
			superficial_treatment_id: superficialTreatment ? superficialTreatment.id : null,
			tolerance,
			finishing,
			screw_amount: screwAmount,
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
		screwAmount !== item.screw_amount;

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
			<DialogContent style={style.dialogContent}>
				<AppBar position="static" style={style.appBar}>
					<Tabs
						value={tabValue}
						onChange={handleChangeTab}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab label="Material" id="edit-tab-material" />
						<Tab label="Tratamentos" id="edit-tab-treatments" />
						<Tab label="Tolerância & Acabamento" id="edit-tab-tolerance&finishing" />
					</Tabs>
				</AppBar>
				<div style={style.panels}>
					{
						tabValue === 0 &&
						<MaterialsTabPanel
							materialType={materialType}
							setMaterialType={setMaterialType}
						/>
					}
					{
						tabValue === 1 &&
						<TreatmentsTabPanel
							materialTypeId={materialType.id}
							heatTreatment={heatTreatment}
							setHeatTreatment={setHeatTreatment}
							superficialTreatment={superficialTreatment}
							setSuperficialTreatment={setSuperficialTreatment}
						/>
					}
					{
						tabValue === 2 &&
						<ToleranceFinishingTabPanel
							tolerance={tolerance}
							setTolerance={setTolerance}
							finishing={finishing}
							setFinishing={setFinishing}
						/>
					}
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

QuotationItemEdit.propTypes = {
	item: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default QuotationItemEdit;
