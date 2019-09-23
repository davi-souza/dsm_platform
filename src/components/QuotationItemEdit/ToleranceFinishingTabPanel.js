import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { renderFinishing } from '../../libs/format/finishing';

const possibleFinishings = [
	'STANDARD',
	'RECTIFIED',
	'POLISHED',
];

function ToleranceFinishingTabPanel(props) {
	const {
		tolerance,
		setTolerance,
		finishing,
		setFinishing
	} = props;

	function handleToleranceChange(event) {
		let newValue = event.target.value;

		if (/^\d*$/.test(newValue)) {
			setTolerance(newValue);
		}
	}

	function handleFinishingClick(newFinishing) {
		return function (e) {
			setFinishing(newFinishing);
		}
	}

	return (
		<Grid container spacing={2}>
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
					<Grid item xs={12}>
						<TextField
							type="number"
							value={tolerance !== null ? tolerance : ''}
							InputProps={{
								startAdornment: <InputAdornment position="start">0.</InputAdornment>,
								endAdornment: <InputAdornment position="end">mm</InputAdornment>
							}}
							onChange={handleToleranceChange}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Grid
					container
					alignItems="flex-start"
				>
					<Grid item xs={12}>
						<Typography variant="h6" color="primary">
							Acabamento
						</Typography>
					</Grid>
					{possibleFinishings.map(f => (
						<Grid item xs={12} key={'possible-finishings-' + f}>
							<Button
								className="quotation-item-edit__config-button"
								color="primary"
								fullWidth
								onClick={handleFinishingClick(f)}
								variant={
									f === finishing || (!finishing && f === 'STANDARD') ?
									"outlined"
									:
									"text"
								}
							>
								{renderFinishing(f)}
							</Button>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ToleranceFinishingTabPanel;
