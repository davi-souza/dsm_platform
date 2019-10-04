import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const style = {
	title: {
		paddingBottom: 0,
		paddingTop: '2rem',
	},
};
function AddressesForm({form, handleAddressFormChange}) {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} style={style.title}>
				<Typography
					color="primary"
					variant="subtitle1"
				>
					Informações sobre endereço
				</Typography>
			</Grid>
			{form.addresses.map((ad, adIndex) => (
				<Grid
					item
					xs={12}
					key={'user-register-address-' + adIndex}
				>
					<Grid container spacing={1}>
						{fields.map(f => (
							<Grid
								item
								key={f.name}
								xs={12}
								sm={6}
							>
								<TextField
									fullWidth
									label={f.label}
									margin="normal"
									name={f.name}
									onChange={handleAddressFormChange(adIndex)}
									required={f.required}
									type={f.type}
									value={ad[f.name]}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
			))}
		</Grid>
	);
}

const fields = [
	{
		name: 'state',
		label: 'Estado',
		type: 'text',
		required: true,
	},
	{
		name: 'municipality',
		label: 'Município',
		type: 'text',
		required: true,
	},
	{
		name: 'postcode',
		label: 'CEP',
		type: 'text',
		required: true,
	},
	{
		name: 'address',
		label: 'Endereço',
		type: 'text',
		required: true,
	},
	{
		name: 'address_number',
		label: 'Número',
		type: 'text',
		required: false,
	},
	{
		name: 'complement',
		label: 'Complemento',
		type: 'text',
		required: false,
	},
];

AddressesForm.propTypes = {
	form: PropTypes.object.isRequired,
	handleAddressFormChange: PropTypes.func.isRequired,
};

export default AddressesForm;

