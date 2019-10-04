import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function UserForm({form, handleUserFormChange, isEmailValid}) {
	return (
		<Grid container spacing={1}>
			{fields.map(f => (
				<Grid
					item
					key={f.name}
					xs={12}
					sm={6}
				>
					<TextField
						error={
							f.name === 'email' && form['email'] !== '' ?
							!isEmailValid
							:
							false
						}
						fullWidth
						label={f.label}
						margin="normal"
						name={f.name}
						onChange={handleUserFormChange}
						required
						type={f.type}
						value={form[f.name]}
					/>
				</Grid>
			))}
		</Grid>
	);
}

const fields = [
	{
		name: 'name',
		label: 'Nome',
		type: 'text',
	},
	{
		name: 'phoneNumber',
		label: 'Número de telefone',
		type: 'text',
	},
	{
		name: 'email',
		label: 'E-mail',
		type: 'email',
	},
	{
		name: 'password',
		label: 'Senha',
		type: 'password',
	},
];

UserForm.propTypes = {
	form: PropTypes.object.isRequired,
	handleUserFormChange: PropTypes.func.isRequired,
	isEmailValid: PropTypes.bool.isRequired,
};

export default UserForm;
