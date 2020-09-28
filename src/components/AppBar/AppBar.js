import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

function AppBarComponent({classes}) {
	return (
		<AppBar color="primary" elevation={0} position="static" className={classes.appBar}>
			<Toolbar variant="dense">
				<Typography variant="h6" className={classes.title}>DSM</Typography>
				<Button color="inherit" size="small">Contato</Button>
				<Button color="inherit" size="small">Log In</Button>
			</Toolbar>
		</AppBar>
	);
}

function styles(theme) {
	return {
		title: {
			flexGrow: 1,
		},
	};
};

AppBarComponent.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(AppBarComponent);
