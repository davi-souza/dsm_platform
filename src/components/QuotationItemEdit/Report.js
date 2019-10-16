import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

function Report({report, setReport}) {
	const [
		selectedReport,
		setSelectedReport
	] = React.useState(options[0]);

	React.useEffect(() => {
		if (!report) {
			setSelectedReport(options[0]);
		} else {
			setSelectedReport(report);
		}
	}, [report]);

	function handleReportChange(event) {
		setReport(event.target.value);
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Typography variant="h6">
					Tipo de relatório dimensional
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<FormControl component="fieldset" fullWidth>
					<RadioGroup
						value={selectedReport}
						onChange={handleReportChange}
					>
						<Grid container spacing={1}>
							{options.map(o => (
								<Grid
									item
									xs={12}
									key={'select-report-' + o}
								>
									<FormControlLabel
										value={o}
										control={<Radio/>}
										label={renderReport(o)}
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
	'MEASUREMENT_3D',
];

function renderReport(raw) {
	if (raw === 'MEASUREMENT_3D') {
		return 'Medição Tridimensional';
	}

	return 'Padrão';
}

Report.propTypes = {
	report: PropTypes.string,
	setReport: PropTypes.func.isRequired,
};

export default Report;
