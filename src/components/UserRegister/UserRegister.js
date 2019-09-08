import React, { useState, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppContext from '../../contexts/appContext';
import './UserRegister.scss';

const styles = {
	form: {
		padding: '1rem',
		width: '100%',
	},
};

function UserRegister() {
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [address, setAddress] = useState('');
	const {userLoading, userRegister} = useContext(AppContext);

	function handleChange(event) {
		if (event.target.name === 'name') {
			setName(event.target.value);
		} else if (event.target.name === 'phoneNumber') {
			setPhoneNumber(event.target.value);
		} else if (event.target.name === 'email') {
			setEmail(event.target.value);
		} else if (event.target.name === 'password') {
			setPassword(event.target.value);
		} else if (event.target.name === 'address') {
			setAddress(event.target.value);
		}
	}

	function handleUserRegister() {
		if(name && phoneNumber && email
			&& password && address) {
			userRegister(
				name,
				phoneNumber,
				email,
				password,
				address
			);
		}
	}

	function handleFormKeyPress(event) {
		if (event.key === 'Enter') {
			handleUserRegister();
		}
	}

	return (
		<FormControl
			className="user-register-form"
			style={styles.form}
			onKeyPress={handleFormKeyPress}
		>
			<TextField
				type="text"
				fullWidth
				autoFocus
				label="Nome"
				placeholder="Nome"
				name="name"
				value={name}
				onChange={handleChange}
			/>
			<TextField
				type="text"
				fullWidth
				label="Telefone para contato"
				placeholder="(xx) xxxxxxxxx"
				name="phoneNumber"
				value={phoneNumber}
				onChange={handleChange}
			/>
			<TextField
				type="email"
				fullWidth
				label="Email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={handleChange}
			/>
			<TextField
				type="password"
				fullWidth
				label="Senha"
				placeholder="Senha"
				name="password"
				value={password}
				onChange={handleChange}
			/>
			<TextField
				type="text"
				fullWidth
				label="Endereço"
				placeholder="Endereço"
				name="address"
				value={address}
				onChange={handleChange}
			/>
			<Button
				variant="text"
				fullWidth
				disabled={!name || !phoneNumber || !email || !password || userLoading}
				onClick={handleUserRegister}
			>
				Cadastrar
			</Button>
		</FormControl>
	);
}

export default UserRegister;
