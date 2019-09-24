import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { renderFinishing } from '../../libs/format/finishing';

function ToleranceScrewTabPanel(props) {
	const {
		tolerance,
		setTolerance,
		screwAmount,
		setScrewAmount,
	} = props;

	function handleToleranceChange(event) {
		let newValue = event.target.value;

		if (/^\d*$/.test(newValue)) {
			setTolerance(newValue);
		}
	}

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
		<Grid container spacing={1}>
			<Grid item xs={12} sm={6}>
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
			<Grid item xs={12} sm={6}>
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

export default ToleranceScrewTabPanel;
