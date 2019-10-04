import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from '@material-ui/core/styles';
import UserLogin from '../UserLogin';
import OrderStepper from './OrderStepper';
import OrderStepContent from './OrderStepContent';
import OrderStepperButtons from './OrderStepperButtons';
import AppContext from '../../contexts/AppContext';
import QuotationContext from '../../contexts/QuotationContext';
import QuotationOrderContext from '../../contexts/QuotationOrderContext';
import { partBatchInfo } from '../../libs/fetch/part';
import './QuotationOrder.scss';

function processPart(part) {
	return {
		part_id: part.id,
		material_type_id: part.material_type.id,
		heat_treatment_id: part.heat_treatment ? part.heat_treatment.id : null,
		superficial_treatment_id: part.superficial_treatment ? part.superficial_treatment.id : null,
		tolerance: part.tolerance,
		finishing: part.finishing,
		screw_amount: part.screw_amount,
		amount: part.amount,
	};
}

function QuotationOrder({classes, open, onCancel}) {
	const [activeStep, setActiveStep] = React.useState(0);
	const [deliveryOption, setDeliveryOption] = React.useState('WORKINGDAYS_15');
	const [orderInfo, setOrderInfo] = React.useState(null);
	const [orderLoading, setOrderLoading] = React.useState(true);
	const {
		user,
		handleOpenSnackbar,
	} = React.useContext(AppContext);
	const {items} = React.useContext(QuotationContext);

	React.useEffect(() => {
		if (open) {
			setActiveStep(0);
		}
	}, [open]);

	React.useEffect(() => {
		if (open) {
			setOrderLoading(true);

			partBatchInfo(
				items.map(processPart),
				deliveryOption
			)
				.then(response => {
					if (response.data) {
						setOrderInfo(response.data);
					} else if (response.error) {
						if (response.error.status === 500) {
							handleOpenSnackbar('Houve um error');
						} else {
							handleOpenSnackbar(response.error.message);
						}
					}
				})
				.finally(() => {
					setOrderLoading(false);
				});
		}
	}, [open, handleOpenSnackbar, items, deliveryOption]);

	const fullScreen = useMediaQuery('(max-width:600px)');

	return (
		<Dialog
			disableBackdropClick={true}
			disableEscapeKeyDown={false}
			fullWidth
			fullScreen={fullScreen}
			maxWidth="md"
			open={open}
			scroll="body"
		>
			<DialogTitle
				color="primary"
				disableTypography={true}
			>
				<OrderStepper activeStep={activeStep} />
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				{
					user ?
					<QuotationOrderContext.Provider value={{
						activeStep,
						setActiveStep,
						deliveryOption,
						setDeliveryOption,
						orderInfo,
						orderLoading,
						setOrderLoading,
					}}>
						{OrderStepContent(activeStep)}
					</QuotationOrderContext.Provider>
					:
					<UserLogin />
				}
			</DialogContent>
			<DialogActions>
				<OrderStepperButtons
					onCancel={onCancel}
					isLoggedIn={!!user}
					activeStep={activeStep}
					setActiveStep={setActiveStep}
					maxStep={3}
				/>
			</DialogActions>
		</Dialog>
	);
}

const styles = {
	dialogContent: {
		minHeight: '50vh',
		maxHeight: '50vh',
	},
};

QuotationOrder.propTypes = {
	classes: PropTypes.object,
	open: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(QuotationOrder);
