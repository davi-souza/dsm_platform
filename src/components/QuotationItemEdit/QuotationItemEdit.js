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
import FirstTabPanel from './FirstTabPanel';
import SecondTabPanel from './SecondTabPanel';
import QuotationContext from '../../contexts/QuotationContext';
import './QuotationItemEdit.scss';

const style = {
	dialogContent: {
		paddingTop: 0,
		paddingLeft: 0,
		paddingRight: 0,
		minHeight: '30rem',
		maxHeight: '30rem',
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

	function handleChangeTab(event, newValue) {
		setTabValue(newValue);
	}

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
						variant="fullWidth"
						scrollButtons="auto"
					>
						<Tab
							label="Material e Tratamentos"
							id="edit-tab-material&treatments"
						/>
						<Tab
							label="Acabamento, Tolerância e Roscas"
							id="edit-tab-finishing&tolerance&screw"
						/>
					</Tabs>
				</AppBar>
				<div style={style.panels}>
					{
						tabValue === 0 &&
						<FirstTabPanel
							materialType={materialType}
							setMaterialType={setMaterialType}
							heatTreatment={heatTreatment}
							setHeatTreatment={setHeatTreatment}
							superficialTreatment={superficialTreatment}
							setSuperficialTreatment={setSuperficialTreatment}
						/>
					}
					{
						tabValue === 1 &&
						<SecondTabPanel
							finishing={finishing}
							setFinishing={setFinishing}
							tolerance={tolerance}
							setTolerance={setTolerance}
							screwAmount={screwAmount}
							setScrewAmount={setScrewAmount}
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
