import { FetchError} from '../errors';

function loginQuery(email, password) {
	return `
		mutation RootMutation {
			login (
				email: "${email}",
				password: "${password}"
			) {
				name
				token
			}
		}
	`.trim();
}

function registerUserQuery(name, phone_number, email, password, address) {
	return `
		mutation RootMutation {
			registerUser (
				name: "${name}",
				phone_number: "${phone_number}",
				email: "${email}",
				password: "${password}",
				addresses: ["${address}"]
			) {
				name
				token
			}
		}
	`.trim();
}

/**
 * Log in function
 * @param {string} email	User email
 * @param {string} password	User password
 * @return {object}	Log In payload
 *             {string} name			User's name
 *             {string} phone_number	User's phone number
 *             {string} email			User's email
 *             {string} token			Log in token (jwt)
 */
export async function login(email, password) {
	try {
		const res = await fetch('/api/graphql', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				query: loginQuery(email, password),
			}),
		});

		if (!res.ok) {
			throw new FetchError(res.statusText, res.status);
		}

		const {data} = await res.json();

		return data.login;
	} catch (err) {
		console.warn(err);

		throw err;
	}
}

/**
 * Register user function
 * @param {string} name			User name
 * @param {string} phone_number	User phone_numbe
 * @param {string} email		User email
 * @param {string} password		User password
 * @param {string} address		User address
 * @return {object}	Log In payload
 *             {string} name			User's name
 *             {string} phone_number	User's phone number
 *             {string} email			User's email
 *             {string} token			Log in token (jwt)
 */
export async function registerUser(name, phone_number, email, password, address) {
	try {
		const res = await fetch('/api/graphql', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				query: registerUserQuery(
					name,
					phone_number,
					email,
					password,
					address
				),
			}),
		});

		if (!res.ok) {
			throw new FetchError(res.statusText, res.status);
		}

		const {data} = await res.json();

		return data.registerUser;
	} catch (err) {
		console.warn(err);

		throw err;
	}
}
