import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/styles';
import Material from './Material';
import HeatTreatment from './HeatTreatment';
import SuperficialTreatment from './SuperficialTreatment';
import Finishing from './Finishing';
import Tolerance from './Tolerance';
import Screw from './Screw';
import Marking from './Marking';
import Report from './Report';
import Knurled from './Knurled';
import AdditionalInfo from './AdditionalInfo';
import UploadAuxFile from './UploadAuxFile';
import QuotationContext from '../../contexts/QuotationContext';
import { isAuxFileNeeded } from '../../libs/checks/itemConfig';
import './QuotationItemEdit.scss';

function QuotationItemEdit({classes, item, itemIndex, open, onCancel}) {
	const [materialType, setMaterialType] = React.useState(item.material_type);
	const [heatTreatment, setHeatTreatment] = React.useState(item.heat_treatment);
	const [superficialTreatment, setSuperficialTreatment] = React.useState(item.superficial_treatment);
	const [tolerance, setTolerance] = React.useState(item.tolerance);
	const [finishing, setFinishing] = React.useState(item.finishing);
	const [screw, setScrew] = React.useState(item.screw);
	const [marking, setMarking] = React.useState(item.marking);
	const [knurled, setKnurled] = React.useState(item.knurled);
	const [report, setReport] = React.useState(item.report);
	const [additionalInfo, setAdditionalInfo] = React.useState(item.additional_info);
	const [needAuxFile, setNeedAuxFile] = React.useState(false);
	const [hasChanged, setHasChanged] = React.useState(false);
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

	React.useEffect(() => {
		setNeedAuxFile(isAuxFileNeeded({
			heatTreatment,
			superficialTreatment,
			finishing,
			tolerance,
			screw,
			marking,
			knurled,
			report,
			auxiliaryFiles: item.auxiliary_files,
		}));

		setHasChanged(
			item.material_type.id !== materialType.id ||
				JSON.stringify(heatTreatment) !== JSON.stringify(item.heat_treatment) ||
				JSON.stringify(superficialTreatment) !== JSON.stringify(item.superficial_treatment) ||
				tolerance !== item.tolerance ||
				finishing !== item.finishing ||
				JSON.stringify(screw) !== JSON.stringify(item.screw) ||
				marking !== item.marking ||
				report !== item.report ||
				knurled !== item.knurled ||
				additionalInfo !== item.additional_info
		);
	}, [
		heatTreatment,
		superficialTreatment,
		finishing,
		tolerance,
		screw,
		marking,
		knurled,
		report,
		item.auxiliary_files,
		additionalInfo,
		materialType,
		item,
	]);

	function handleSaveConfig() {
		savePartConfigChanges({
			part_id: item.id,
			material_type_id: materialType.id,
			heat_treatment_id: heatTreatment ? heatTreatment.id : null,
			superficial_treatment_id: superficialTreatment ? superficialTreatment.id : null,
			tolerance,
			finishing,
			screw,
			marking,
			knurled,
			report,
			additional_info: additionalInfo,
			amount: item.amount,
		});

		onCancel();
	}

	const fullScreen = useMediaQuery('(max-width:600px)');

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
		<Marking
			marking={marking}
			setMarking={setMarking}
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
			maxWidth="md"
			open={open}
			PaperProps={{ className: classes.paper }}
		>
			<DialogTitle
				disableTypography={true}
			>
				<Typography variant="h6">
					{item.name}
				</Typography>
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<Grid
					container
					className={classes.contentContainer}
				>
					<Grid
						className={classes.configItem}
						item
						xs={7}
					>
						<Grid
							className={classes.configContainer}
							container
						>
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
					</Grid>
					<Grid
						className={classes.contentContainer}
						item
						xs={5}
					>
						<Grid
							className={classes.auxContainer}
							container
							direction="column"
							justify="space-between"
							alignItems="center"
							wrap="nowrap"
						>
							<Grid
								className={classes.uploadAuxContainer}
								item
							>
								<UploadAuxFile
									needAuxFile={needAuxFile}
									auxiliaryFiles={item.auxiliary_files}
									itemIndex={itemIndex}
									partId={item.id}
								/>
							</Grid>
							<Grid
								className={classes.addInfoContainer}
								item
							>
								<AdditionalInfo
									additionalInfo={additionalInfo}
									setAdditionalInfo={setAdditionalInfo}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					color="inherit"
					onClick={onCancel}
				>
					Cancelar
				</Button>
				<Tooltip
					open={needAuxFile}
					placement="top"
					title={
						<Typography color="inherit">
							Para continuar, você deve inserir os arquivos de desenho 2D
						</Typography>
					}
				>
					<Button
						color="inherit"
						//disabled={!hasChanged || needAuxFile}
						onClick={handleSaveConfig}
					>
						Salvar
					</Button>
				</Tooltip>
			</DialogActions>
		</Dialog>
	);
}

const height = 'calc(100vh - 14rem)',
	uploadAuxHeight ='calc(100vh - 14rem - 178px)';

function styles({palette}) {
	return {
		paper: {
			color: palette.primary.darkText,
		},
		dialogContent: {
			padding: 0,
			height,
			minHeight: height,
			maxHeight: height,
			overflowY: 'hidden',
		},
		contentContainer: {
			height,
		},
		configItem: {
			height: '100%',
			overflowY: 'auto',
		},
		configContainer: {
			padding: '0 1rem',
			width: '100%',
			'& > *': {
				padding: '0.8rem 0',
			},
		},
		auxContainer: {
			height: '100%',
		},
		uploadAuxContainer: {
			flexGrow: 1,
			padding: '0.5rem',
			width: '100%',
			borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
			height: uploadAuxHeight,
			maxHeight: uploadAuxHeight,
			minHeight: uploadAuxHeight,
		},
		addInfoContainer: {
			padding: '0.5rem',
			width: '100%',
		},
	};
};

QuotationItemEdit.propTypes = {
	classes: PropTypes.object.isRequired,
	item: PropTypes.object.isRequired,
	itemIndex: PropTypes.number.isRequired,
	open: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(QuotationItemEdit);
