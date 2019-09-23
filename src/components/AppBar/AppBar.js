import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const style = {
	appBar: {
		backgroundColor: 'transparent',
		color: 'rgba(69, 90, 100, 0.8)',
		marginBottom: '1rem',
	},
};

function AppBarComponent() {
	return (
		<AppBar elevation={0} position="static" style={style.appBar}>
			<Toolbar>
				<Typography variant="h6">Mech4u</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default AppBarComponent;
