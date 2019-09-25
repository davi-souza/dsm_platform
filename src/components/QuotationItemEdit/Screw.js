import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function Screw({screwAmount, setScrewAmount}) {
	function handleScrewAmountChange(event) {
		let newValue = event.target.value;

		if (/^\d*$/.test(newValue)) {
			if (!isNaN(newValue) && newValue !== '') {
				newValue = parseInt(newValue, 10);
			}

			setScrewAmount(newValue);
		}
	}

	return (
		<Grid container>
			<Grid item xs={12}>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h6" color="primary">
							Roscas
						</Typography>
					</Grid>
					<Grid item xs={12} className="quotation-item-edit__tolerance-finishing-grid">
						<TextField
							onChange={handleScrewAmountChange}
							type="number"
							value={screwAmount}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

Screw.propTypes = {
	screwAmount: PropTypes.number.isRequired,
	setScrewAmount: PropTypes.func.isRequired,
};

export default Screw;
