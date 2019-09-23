import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from './components/AppBar';
import QuotationView from './views/Quotation';
import AppContext from './contexts/AppContext';
import './App.scss';

function App() {
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');

	function handleOpenSnackbar(message) {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	}

	function handleCloseSnackbar() {
		setSnackbarOpen(false);
	}

	return (
		<AppContext.Provider value={{
			handleOpenSnackbar,
		}}>
			<AppBar />
			<Switch>
				<Route path="/quotation" component={QuotationView} />
				<Route render={() => <Redirect to="/quotation" />} />
			</Switch>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={handleCloseSnackbar}
				message={<span id="message-id">{snackbarMessage}</span>}
				action={
					<IconButton
						color="inherit"
						onClick={handleCloseSnackbar}
					>
						<CloseIcon />
					</IconButton>
				}
			/>
		</AppContext.Provider>
	);
}

export default App;
