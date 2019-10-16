import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';

function Marking({marking, setMarking}) {
	const [
		selectedMarking,
		setSelectedMarking
	] = React.useState(options[0]);

	React.useEffect(() => {
		setSelectedMarking(
			options.find(o => o.value === marking)
		);
	}, [marking]);

	function handleMarkingChange(newMarking) {
		setMarking(newMarking.value);
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h6">
					Gravação
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Select
					value={selectedMarking}
					options={options}
					onChange={handleMarkingChange}
				/>
			</Grid>
		</Grid>
	);
}

const options = [
	{ label: 'Nenhuma', value: null, },
	{ label: 'Tipada', value: 'TYPED', },
	{ label: 'Caneca elétrica/pneumática', value: 'ELETRIC_PNEUMATIC_PEN', },
	{ label: 'Usinagem em baixo relevo', value: 'LOW_RELIEF_MACHINING', },
	{ label: 'LASER', value: 'LASER', },
	{ label: 'Eletroquímica', value: 'ELECTROCHEMISTRY', },
];

Marking.propTypes = {
	marking: PropTypes.string,
	setMarking: PropTypes.func.isRequired,
};

export default Marking;
