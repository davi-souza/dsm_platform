import { handleGraphQLResponse } from './handler';

const loginQuery = `
mutation RootMutation($input: LoginInputType!) {
	login (input: $input) {
		name
		email
		jwt
		addresses {
			id
			state
			municipality
			address
			address_number
			complement
			postcode
		}
	}
}
`.trim();

const registerUserQuery = `
mutation RootMutation($input: RegisterUserInputType!) {
	registerUser (input: $input) {
		name
		email
		jwt
		addresses {
			id
			state
			municipality
			address
			address_number
			complement
			postcode
		}
	}
}
`.trim();

/**
 * Log in function
 * @param {string} email	User email
 * @param {string} password	User password
 * @return {object}	Log In payload
 *             {string} name				User's name
 *             {string} phone_number		User's phone number
 *             {string} email				User's email
 *             {string} jwt					Log in token (jwt)
 *             {object[]} addresses			User's addresses
 *                 {string} id				Address' id
 *                 {string} state			Address' state
 *                 {string} municipality	Address' municipality
 *                 {string} address			Address
 *                 {string} adress_number	Address' number
 *                 {string} complement		Address' complement
 *                 {string} postcode		Address' postcode
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
				query: loginQuery,
				variables: {
					input: { email, password, },
				},
			}),
		});

		return await handleGraphQLResponse(res, 'login');
	} catch (err) {
		console.warn(err);

		throw err;
	}
}

/**
 * Register user function
 * @param {string} name						User name
 * @param {string} phone_number				User phone_numbe
 * @param {string} email					User email
 * @param {string} password					User password
 * @param {object[]} addresses				User addresses
 * @return {object}	Log In payload
 *             {string} name				User's name
 *             {string} phone_number		User's phone number
 *             {string} email				User's email
 *             {string} jwt					Log in token (jwt)
 *             {object[]} addresses			User's addresses
 *                 {string} id				Address' id
 *                 {string} state			Address' state
 *                 {string} municipality	Address' municipality
 *                 {string} address			Address
 *                 {string} adress_number	Address' number
 *                 {string} complement		Address' complement
 *                 {string} postcode		Address' postcode
 */
export async function registerUser(name, phone_number, email, password, addresses) {
	try {
		const res = await fetch('/api/graphql', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				query: registerUserQuery,
				variables: {
					input: {
						name,
						phone_number,
						email,
						password,
						addresses
					},
				},
			}),
		});

		return await handleGraphQLResponse(res, 'registerUser');
	} catch (err) {
		console.warn(err);

		throw err;
	}
}
