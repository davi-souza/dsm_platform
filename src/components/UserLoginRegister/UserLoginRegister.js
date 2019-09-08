import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserLogin from '../UserLogin';
import UserRegister from '../UserRegister';

function UserLoginRegister() {
	const [isRegistered, setIsRegistered] = useState(0);

	function handleChange(event, newValue) {
		setIsRegistered(newValue);
	}

	return (
		<React.Fragment>
			<Tabs value={isRegistered} onChange={handleChange}>
				<Tab label="Log In" />
				<Tab label="Cadastrar" />
			</Tabs>
			<div hidden={isRegistered === 0}>
				<UserRegister hidden={isRegistered === 0} />
			</div>
			<div hidden={isRegistered === 1}>
				<UserLogin hidden={isRegistered === 0} />
			</div>
		</React.Fragment>
	);
}

export default UserLoginRegister;
