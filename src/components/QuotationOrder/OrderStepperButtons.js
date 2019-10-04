import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function OrderStepperButtons(props) {
	const {
		onCancel,
		isLoggedIn,
		activeStep,
		setActiveStep,
		maxStep,
	} = props;

	function handleNextClick() {
		setActiveStep(activeStep + 1);
	}

	function handlePreviousClick() {
		setActiveStep(activeStep - 1);
	}

	function handleConfirmClick() {
		alert('pedido feito');
	}

	return (
		<Grid
			container
			justify="space-between"
			alignItems="center"
			spacing={1}
		>
			{
				isLoggedIn && (
					<Grid item>
						<Grid container spacing={1}>
							<Grid item>
								<Button
									color="primary"
									disabled={activeStep === 0}
									onClick={handlePreviousClick}
								>
									Anterior
								</Button>
							</Grid>
							<Grid item>
								{
									activeStep !== maxStep -1 ? (
										<Button
											color="primary"
											onClick={handleNextClick}
										>
											Próximo
										</Button>
									) : (
										<Button
											color="primary"
											onClick={handleConfirmClick}
										>
											Confirmar
										</Button>

									)
								}
							</Grid>
						</Grid>
					</Grid>
				)
			}
			<Grid item>
				<Button
					color="primary"
					onClick={onCancel}
					variant="contained"
				>
					Cancelar
				</Button>
			</Grid>
		</Grid>
	);
}

OrderStepperButtons.propTypes = {
	onCancel: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	activeStep: PropTypes.number.isRequired,
	setActiveStep: PropTypes.func.isRequired,
	maxStep: PropTypes.number.isRequired,
};

export default OrderStepperButtons;
