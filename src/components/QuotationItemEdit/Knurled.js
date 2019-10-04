import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

function Knurled({knurled, setKnurled}) {
	const [
		selectedKnurled,
		setSelectedKnurled
	] = React.useState(options[0]);

	React.useEffect(() => {
		if (knurled === true) {
			setSelectedKnurled('YES');
		} else {
			setSelectedKnurled('NO');
		}
	}, [knurled]);

	function handleKnurledChange(event) {
		setKnurled(event.target.value === 'YES');
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Typography variant="h6" color="primary">
					Possui recartilhado?
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<FormControl component="fieldset" fullWidth>
					<RadioGroup
						value={selectedKnurled}
						onChange={handleKnurledChange}
					>
						<Grid container spacing={1}>
							{options.map(o => (
								<Grid item xs={12} sm={4} key={'select-knurled-' + o}>
									<FormControlLabel
										value={o}
										control={<Radio/>}
										label={renderKnurled(o)}
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
	'NO',
	'YES',
];

function renderKnurled(raw) {
	if (raw === 'YES') {
		return 'Sim';
	}

	return 'Não';
}

Knurled.propTypes = {
	knurled: PropTypes.bool,
	setKnurled: PropTypes.func.isRequired,
};

export default Knurled;
