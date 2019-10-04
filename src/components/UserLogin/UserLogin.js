import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AppContext from '../../contexts/AppContext';
import './UserLogin.scss';

function UserLogin() {
	const [form, setForm] = React.useState({
		email: '',
		password: '',
	});
	const [isEmailValid, setIsEmailValid] = React.useState(true);
	const {
		userLoading,
		userLogin,
		handleOpenSnackbar,
	} = React.useContext(AppContext);

	React.useEffect(() => {
		if (form.email !== '') {
			setIsEmailValid(/^.+@.+\..+(\..+)*$/.test(form.email));
		}
	}, [form.email]);

	function handleFormChange(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		if (!isEmailValid || !form.email) {
			handleOpenSnackbar('E-mail inválido');
		} else if (!form.password) {
			handleOpenSnackbar('Por favor inserir uma senha');
		} else {
			userLogin(form.email, form.password);
		}
	}

	return (
		<form
			noValidate
			autoComplete="off"
			onSubmit={handleFormSubmit}
		>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<TextField
						error={!isEmailValid}
						fullWidth
						label="E-mail"
						margin="normal"
						name="email"
						onChange={handleFormChange}
						required
						type="email"
						value={form.email}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Senha"
						margin="normal"
						name="password"
						onChange={handleFormChange}
						required
						type="password"
						value={form.password}
					/>
				</Grid>
				<Grid item xs={12}>
					{
						userLoading
						?
						<CircularProgress color="primary" />
						:
						<Button
							color="primary"
							fullWidth
							type="submit"
							value="Log In"
							variant="text"
						>
							Log In
						</Button>
					}
				</Grid>
			</Grid>
		</form>
	);
}

export default UserLogin;
