import React, { useState, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppContext from '../../contexts/appContext';
import './UserLogin.scss';

const styles = {
	form: {
		padding: '1rem',
		width: '100%',
	},
};

function UserLogin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {userLogin, userLoading} = useContext(AppContext);

	function handleChange(event) {
		if (event.target.name === 'email') {
			setEmail(event.target.value);
		} else if (event.target.name === 'password') {
			setPassword(event.target.value);
		}
	}

	function handleLogin() {
		if (email && password) {
			userLogin(email, password);
		}
	}

	function handleFormKeyPress(event) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}

	return (
		<FormControl
			className="user-login-form"
			style={styles.form}
			onKeyPress={handleFormKeyPress}
		>
			<TextField
				type="email"
				fullWidth
				autoFocus
				label="Email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={handleChange}
				disabled={userLoading}
			/>
			<TextField
				type="password"
				fullWidth
				label="Senha"
				placeholder="Senha"
				name="password"
				value={password}
				onChange={handleChange}
				disabled={userLoading}
			/>
			<Button
				variant="text"
				fullWidth
				disabled={!email || !password || userLoading}
				onClick={handleLogin}
			>
				LOG IN
			</Button>
		</FormControl>
	);
}

export default UserLogin;
