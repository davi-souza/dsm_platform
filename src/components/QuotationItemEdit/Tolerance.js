import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

function Tolerance({tolerance, setTolerance}) {
	function handleToleranceChange(event) {
		let newValue = event.target.value;

		if (/^\d*$/.test(newValue)) {
			setTolerance(newValue);
		}
	}

	return (
		<Grid container>
			<Grid item xs={12}>
				<Grid
					container
					alignItems="flex-start"
				>
					<Grid item xs={12}>
						<Typography variant="h6" color="primary">
							Tolerância
						</Typography>
					</Grid>
					<Grid item xs={12} className="quotation-item-edit__tolerance-finishing-grid">
						<TextField
							InputProps={{
								startAdornment: <InputAdornment position="start">0.</InputAdornment>,
								endAdornment: <InputAdornment position="end">mm</InputAdornment>
							}}
							onChange={handleToleranceChange}
							type="text"
							value={tolerance !== null ? tolerance : ''}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

Tolerance.propTypes = {
	tolerance: PropTypes.string,
	setTolerance: PropTypes.func.isRequired,
};

export default Tolerance;
