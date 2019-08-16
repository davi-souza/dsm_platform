import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Quotation from './views/Quotation';
import './App.scss';

const style = {
	appBar: {
		backgroundColor: 'transparent',
	},
};

function App() {
	return (
		<React.Fragment>
			<AppBar
				color="default"
				elevation={0}
				position="static"
				style={style.appBar}
			>
				<Toolbar>
					<Typography variant="h6" color="inherit">
						Mech4u
					</Typography>
				</Toolbar>
			</AppBar>
			<Switch>
				<Route component={Quotation} />
			</Switch>
		</React.Fragment>
	);
}

export default App;
