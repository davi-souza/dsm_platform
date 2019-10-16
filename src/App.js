import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import QuotationView from './views/Quotation';
import AppContext from './contexts/AppContext';
import { login, registerUser } from './libs/fetch/user';
import { setUserCredentials } from './libs/localStorage';
import { saveUserAddresses } from './libs/indexedDB/userDB';
import './App.scss';

function App() {
	const [user, setUser] = React.useState(null);
	const [userLoading, setUserLoading] = React.useState(false);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');

	React.useEffect(() => {
		setUser(JSON.parse(`{"data":{"login":{"name":"Davi Souza","email":"ddas.souza@gmail.com","jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzMGU1YjdlLTE4ZmEtNDU3Ny1iYjFjLTJmYmIyNDIxYjgxMCIsIm5hbWUiOiJEYXZpIFNvdXphIiwiZW1haWwiOiJkZGFzLnNvdXphQGdtYWlsLmNvbSIsInBob25lX251bWJlciI6IjEyOTgxNzY0NTkzIiwiY3JlYXRlZEF0IjoiMjAxOS0wOS0xN1QxNzo0Njo0OC4zNDZaIiwidXBkYXRlZEF0IjoiMjAxOS0wOS0xN1QxNzo0Njo0OC4zNDZaIiwiZGVsZXRlZEF0IjpudWxsLCJhZGRyZXNzZXMiOlt7ImlkIjoiOGRjMWY3MWQtODlhMS00ZTg0LTgwYWUtMTI2MzVjNjJmOTdkIiwic3RhdGUiOiJTUCIsIm11bmljaXBhbGl0eSI6IlPDo28gSm9zw6kgZG9zIENhbXBvcyIsImFkZHJlc3MiOiJSdWEgUmVwdWJsaWNhIGRvIElyYXF1ZSIsImFkZHJlc3NfbnVtYmVyIjo4MCwiY29tcGxlbWVudCI6IkFwdCA2NEIiLCJwb3N0Y29kZSI6IjEyMjE2LTU0MCJ9XSwiaWF0IjoxNTY5ODM2Njc3LCJleHAiOjE1NzI0Mjg2Nzd9.hqDc7kh_jF10pRceaHUt2_2a9gKI68lP1AsTMvPDN70","addresses":[{"id":"8dc1f71d-89a1-4e84-80ae-12635c62f97d","state":"SP","municipality":"São José dos Campos","address":"Rua Republica do Iraque","address_number":80,"complement":"Apt 64B","postcode":"12216-540"}]}}}`));
	}, []);

	function handleLogin(email, password) {
		setUserLoading(true);

		login(email, password)
			.then(({data, error}) => {
				if (error) {
					if (error.status !== 500) {
						handleOpenSnackbar(error.message);
					} else {
						handleOpenSnackbar('Houve um erro');
					}
				} else if (data) {
					setUser(data);
					setUserCredentials(data.name, data.email, data.jwt);
					saveUserAddresses(data.email, data.addresses);
				} else {
					handleOpenSnackbar('Houve um erro');
				}
			})
			.catch(console.error)
			.finally(() => {
				setUserLoading(false);
			});
	}

	function handleUserRegister(name, phoneNumber, email, password, addresses) {
		registerUser(name, phoneNumber, email, password, addresses)
			.then(({data, error}) => {
				if (error) {
					if (error.status !== 500) {
						handleOpenSnackbar(error.message);
					} else {
						handleOpenSnackbar('Houve um erro');
					}
				} else if (data) {
					setUser(data);
					setUserCredentials(data.name, data.email, data.jwt);
					saveUserAddresses(data.email, data.addresses);
				} else {
					handleOpenSnackbar('Houve um erro');
				}
			})
			.catch(console.error);;
	}

	function handleOpenSnackbar(message) {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	}

	function handleCloseSnackbar() {
		setSnackbarOpen(false);
	}

	return (
		<AppContext.Provider value={{
			user,
			userLoading,
			handleLogin,
			handleUserRegister,
			handleOpenSnackbar,
		}}>
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
