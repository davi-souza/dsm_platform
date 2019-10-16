import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { renderTolerance } from '../../libs/format/tolerance';

function Tolerance({tolerance, setTolerance}) {
	const [
		selectedTolerance,
		setSelectedTolerance
	] = React.useState(options[0]);

	React.useEffect(() => {
		if (tolerance === null) {
			setSelectedTolerance(options[0]);
		} else {
			setSelectedTolerance(tolerance);
		}
	}, [tolerance]);

	function handleToleranceChange(event) {
		setTolerance(event.target.value);
	}

	return (
		<Grid container>
			<Grid item xs={12}>
				<Grid
					container
					alignItems="flex-start"
				>
					<Grid item xs={12}>
						<Typography variant="h6">
							Menor Tolerância
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<FormControl component="fieldset" fullWidth>
							<RadioGroup
								value={selectedTolerance}
								onChange={handleToleranceChange}
							>
								<Grid container spacing={1}>
									{options.map(o => (
										<Grid item xs={12} key={'select-tolerance-' + o}>
											<FormControlLabel
												value={o}
												control={<Radio/>}
												label={renderTolerance(o)}
											/>
										</Grid>
									))}		
								</Grid>
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

const options = [
	'HIGH',
	'MEDIUM',
	'LOW',
	'VERY_LOW',
];

Tolerance.propTypes = {
	tolerance: PropTypes.string,
	setTolerance: PropTypes.func.isRequired,
};

export default Tolerance;
