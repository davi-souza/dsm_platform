import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import UserLoginRegister from './components/UserLoginRegister';
import AppContext from './contexts/appContext';
import Quotation from './views/Quotation';
import { login, registerUser } from './libs/fetch/user';
import {
	getCredentials,
	setUserToken,
	setUserName,
} from './libs/localStorage';
import './App.scss';

const styles = {
	appBar: {
		backgroundColor: 'transparent',
	},
	title: {
		flexGrow: 1,
	},
	avatar: {
		cursor: 'pointer',
	},
};

function App() {
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
	const [openLoginDialog, setOpenLoginDialog] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [user, setUser] = useState(null);
	const [userLoading, setUserLoading] = useState(false);

	useEffect(() => {
		const {name, token} = getCredentials();

		setUser({
			name,
			token,
		});
	}, []);

	useEffect(() => {
		if (user && user.token && user.name) {
			setUserToken(user.token);

			setUserName(user.name);
		}
	}, [user]);

	/**
	 * Wrapper to send login request and to set user state
	 * @param {strimg} email	User's email
	 * @param {string} token	JWT
	 */
	async function userLogin(email, password) {
		setUserLoading(true);

		try {
			const {name, token} = await login(email, password);

			setUser({
				name,
				token,
			});

			handleCloseLoginDialog();
		} catch (err) {
			if (err.status) {
				handleSnackbarOpen('Não foi possível fazer o log in');
			}
		} finally {
			setUserLoading(false);
		}
	}

	/**
	 * Wrapper to send user register request and to set user state
	 * @param {strimg} name			User's name
	 * @param {strimg} phone_number	User's phone number
	 * @param {strimg} email		User's email
	 * @param {strimg} address		User's address
	 * @return {object}				Log in payload
	 *             {string} name
	 *             {string} token
	 */
	async function userRegister(userName, phone_number, email, password, address) {
		setUserLoading(true);

		try {
			const {name, token} = await registerUser(userName, phone_number, email, password, address);

			setUser({
				name,
				email,
				token
			});

			handleCloseLoginDialog();
		} catch (err) {
			if (err.status) {
				handleSnackbarOpen('Não foi possível fazer o log in');
			}
		} finally {
			setUserLoading(false);
		}
	}

	function handleAvatarClick(event) {
		setMenuAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setMenuAnchorEl(null);
	}

	function handleOpenLoginDialog() {
		handleMenuClose();
		setOpenLoginDialog(true);
	}

	function handleCloseLoginDialog() {
		setOpenLoginDialog(false);
	}

	function handleSnackbarOpen(message) {
		setSnackbarMessage(message);

		setSnackbarOpen(true);
	}

	function handleSnackbarClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	}

	return (
		<AppContext.Provider value={{
			user,
			userLogin,
			userRegister,
			userLoading,
		}}>
			<AppBar
				color="default"
				elevation={0}
				position="static"
				style={styles.appBar}
			>
				<Toolbar>
					<Typography
						variant="h6"
						color="inherit"
						style={styles.title}
					>
						Mech4u
					</Typography>
					<Avatar
						style={styles.avatar}
						onClick={handleAvatarClick}
					>
						{
							user && user.name ?
							user.name.substring(0, 1).toUpperCase()
							:
							'?'
						}
					</Avatar>
					<Menu
						anchorEl={menuAnchorEl}
						keepMounted
						open={Boolean(menuAnchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem onClick={handleOpenLoginDialog}>Entrar</MenuItem>
						{/*<MenuItem>Registrar</MenuItem>*/}
					</Menu>
				</Toolbar>
			</AppBar>
			<Switch>
				<Route component={Quotation} />
			</Switch>
			<Dialog
				open={openLoginDialog}
				onClose={handleCloseLoginDialog}
			>
				<DialogContent>
					<UserLoginRegister />
				</DialogContent>
			</Dialog>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}
				message={<span>{snackbarMessage}</span>}
				actions={[
					<IconButton
						key="closeRootSnackbar"
						onClick={handleSnackbarClose}
					>
						<CloseIcon />
					</IconButton>
				]}
			/>
		</AppContext.Provider>
	);
}

export default App;
