import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { renderFinishing } from '../../libs/format/finishing';

function Finishing({finishing, setFinishing}) {
	const [
		selectedFinishing,
		setSelectedFinishing
	] = React.useState(options[0]);

	React.useEffect(() => {
		if (finishing === null) {
			setSelectedFinishing(options[0]);
		} else {
			setSelectedFinishing(finishing);
		}
	}, [finishing]);

	function handleFinishingChange(event) {
		setFinishing(event.target.value);
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Typography variant="h6">
					Acabamento
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<FormControl component="fieldset" fullWidth>
					<RadioGroup
						value={selectedFinishing}
						onChange={handleFinishingChange}
					>
						<Grid container spacing={1}>
							{options.map(o => (
								<Grid
									item
									xs={12}
									key={'select-finishing-' + o}
								>
									<FormControlLabel
										value={o}
										control={<Radio/>}
										label={renderFinishing(o)}
									/>
								</Grid>
							))}		
						</Grid>
					</RadioGroup>
				</FormControl>
			</Grid>
		</Grid>
	);
}

const options = [
	'STANDARD',
	'PRECISION',
	'RECTIFIED',
	'POLISHED',
];

Finishing.propTypes = {
	finishing: PropTypes.string,
	setFinishing: PropTypes.func.isRequired,
};

export default Finishing;
