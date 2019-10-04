import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import UserForm from './UserForm';
import AddressesForm from './AddressesForm';
import AppContext from '../../contexts/AppContext';

const emailRegExp = /^.+@.+\..+(\..+)*$/;
const emptyAddress = {
	state: '',
	municipality: '',
	address: '',
	address_number: '',
	complement: '',
	postcode: '',
};

function UserRegister() {
	const [form, setForm] = React.useState({
		name: '',
		phoneNumber: '',
		email: '',
		password: '',
		addresses: [{...emptyAddress}],
	});
	const [isEmailValid, setIsEmailValid] = React.useState(true);
	const {
		userRegister,
		handleOpenSnackbar,
	} = React.useContext(AppContext);

	React.useEffect(() => {
		if (form.email !== '') {
			setIsEmailValid(emailRegExp.test(form.email));
		}
	}, [form.email]);

	function handleUserFormChange(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	function handleAddressFormChange(index) {
		return function (event) {
			setForm({
				...form,
				addresses: form.addresses.map((ad, i) => {
					if (i === index) {
						ad[event.target.name] = event.target.value;
					}

					return ad;
				}),
			});
		};
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		console.log('oi')
		if (!form.name) {
			handleOpenSnackbar('Por favor, fornecer um nome');
			return;
		}

		if (!form.phoneNumber) {
			handleOpenSnackbar('Por favor, fornecer um telefone para contato');
			return;
		}
		
		if (!isEmailValid || !form.email) {
			handleOpenSnackbar('Por favor, fornecer um e-mail válido para contato');
			return;
		}
		
		if (!form.password) {
			handleOpenSnackbar('Por favor, fornecer uma senha');
			return;
		}

		userRegister(
			form.name,
			form.phoneNumber,
			form.email,
			form.password,
			form.addresses.map(ad => ({
				...ad,
				address_number: parseInt(ad.address_number, 10),
			})),
		);
	}

	return (
		<form
			noValidate
			autoComplete="off"
			onSubmit={handleFormSubmit}
		>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<UserForm
						form={form}
						handleUserFormChange={handleUserFormChange}
						isEmailValid={isEmailValid}
					/>
				</Grid>
				<Grid item xs={12}>
					<AddressesForm
						form={form}
						handleAddressFormChange={handleAddressFormChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						color="primary"
						fullWidth
						type="submit"
						value="Cadastrar"
						variant="text"
					>
						Cadastrar
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

export default UserRegister;
