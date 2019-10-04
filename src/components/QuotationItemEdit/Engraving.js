import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';

function Engraving({engraving, setEngraving}) {
	const [
		selectedEngraving,
		setSelectedEngraving
	] = React.useState(null);

	React.useEffect(() => {
		setSelectedEngraving(
			options.find(o => o.value === engraving)
		);
	}, [engraving]);

	function handleEngravingChange(newEngraving) {
		setEngraving(newEngraving.value);
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography color="primary" variant="h6">
					Gravação
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Select
					value={selectedEngraving}
					options={options}
					onChange={handleEngravingChange}
				/>
			</Grid>
		</Grid>
	);
}

const options = [
	{ label: 'Nenhuma', value: null, },
	{ label: 'Tipada', value: 'TIPED', },
	{ label: 'Caneca elétrica/pneumática', value: 'ELETRIC_PNEUMATIC_PEN', },
	{ label: 'Usinagem em baixo relevo', value: 'LOW_RELIEF_MACHINING', },
	{ label: 'LASER', value: 'LASER', },
	{ label: 'Eletroquímica', value: 'ELECTROCHEMISTRY', },
];

Engraving.propTypes = {
	engraving: PropTypes.string,
	setEngraving: PropTypes.func.isRequired,
};

export default Engraving;
