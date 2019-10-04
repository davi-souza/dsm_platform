import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function Screw({screw, setScrew}) {
	const [
		selectedScrew,
		setSelectedScrew,
	] = React.useState(options[0]);

	React.useEffect(() => {
		if (screw === null) {
			setSelectedScrew(options[0]);
		} else {
			setSelectedScrew(
				options.find(o => o === screw.type)
			);
		}
	}, [screw]);

	function handleScrewTypeChange(event) {
		const newScrewType = event.target.value;

		if (newScrewType === 'NONE') {
			setScrew(null);
		} else {
			setScrew({
				type: newScrewType,
				amount: (screw && newScrewType === 'INTERNAL') ? screw.amount : 0,
			});
		}
	}

	function handleScrewAmountChange(event) {
		const oldValue = screw ? screw.amount : 0;
		let newValue = event.target.value;

		if (newValue === '') {
			newValue = 0;
		} else if (isNaN(newValue)) {
			newValue = oldValue;
		} else {
			newValue = parseInt(newValue, 10);
		}

		setScrew({
			type: screw.type,
			amount: newValue,
		});
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
					<Grid item xs={12} sm={6}>
						<FormControl component="fieldset" fullWidth>
							<RadioGroup
								value={selectedScrew}
								onChange={handleScrewTypeChange}
							>
								<Grid container spacing={1}>
									{options.map(o => (
										<Grid item xs={12} sm={4} key={'select-screw-type-' + o}>
											<FormControlLabel
												value={o}
												control={<Radio/>}
												label={renderScrewType(o)}
											/>
										</Grid>
									))}		
								</Grid>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							disabled={screw === null || screw.type === 'EXTERNAL'}
							error={
								(screw && screw.type === 'INTERNAL') ?
								(screw.amount === 0)
								:
								false
							}
							helperText = {
								(screw && screw.type === 'INTERNAL' && screw.amount === 0) ?
								'Número deve ser maior ou igual a 1'
								:
								''
							}
							onChange={handleScrewAmountChange}
							type="text"
							value={
								(screw && screw.amount !== 0) ?
								screw.amount.toString()
								:
								''
							}
						/>							
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

function renderScrewType(raw) {
	if (raw === 'INTERNAL') {
		return 'Interna';
	} else if (raw === 'EXTERNAL') {
		return 'Externa';
	}

	return 'Nenhuma';
}

const options = [
	'NONE',
	'EXTERNAL',
	'INTERNAL',
];

Screw.propTypes = {
	screw: PropTypes.exact({
		type: PropTypes.oneOf(['EXTERNAL', 'INTERNAL']).isRequired,
		amount: PropTypes.number.isRequired,
	}),
	setScrew: PropTypes.func.isRequired,
};

export default Screw;
