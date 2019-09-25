import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Finishing from './Finishing';
import Tolerance from './Tolerance';
import Screw from './Screw';

function SecondTabPanel(props) {
	const {
		finishing,
		setFinishing,
		tolerance,
		setTolerance,
		screwAmount,
		setScrewAmount,
	} = props;
	
	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Finishing
					finishing={finishing}
					setFinishing={setFinishing}
				/>
			</Grid>
			<Grid item xs={6}>
				<Tolerance
					tolerance={tolerance}
					setTolerance={setTolerance}
				/>
			</Grid>
			<Grid item xs={6}>
				<Screw
					screwAmount={screwAmount}
					setScrewAmount={setScrewAmount}
				/>
			</Grid>
		</Grid>
	);
}

SecondTabPanel.propTypes = {
	finishing: PropTypes.string,
	setFinishing: PropTypes.func.isRequired,
	tolerance: PropTypes.string,
	setTolerance: PropTypes.func.isRequired,
	screwAmount: PropTypes.number,
	setScrewAmount: PropTypes.func.isRequired,
};

export default SecondTabPanel;
