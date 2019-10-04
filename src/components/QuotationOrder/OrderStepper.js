import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const steps = [
	'Resumo do pedido',
	'Entrega',
	'Confirmar pedido',
];

function OrderStepper({activeStep}) {
	return (
		<Stepper activeStep={activeStep}>
			{steps.map(label => (
				<Step key={'order-step-labe-' + label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
}

OrderStepper.propTypes = {
	activeStep: PropTypes.number.isRequired,
};

export default OrderStepper;
