import { FetchError } from '../errors';

export async function handleGraphQLResponse(res, dataKey) {
	try {
		const {ok} = res;

		const {data, errors} = await res.json();

		if (!ok) {
			if (!errors || errors.length === 0) {
				throw new FetchError('Houve um erro', 500);
			}

			const {extensions} = errors[0]

			if (extensions && extensions.message && extensions.status) {
				throw new FetchError(extensions.message, extensions.status);
			} else {
				console.error('Error message:', errors[0].message);
				throw new FetchError('Houve um erro', 500);
			}
		}

		return {
			data: data[dataKey],
			error: null,
		};
	} catch (err) {
		console.error(err);

		return {
			data: null,
			error: {
				status: err.status,
				message: err.message,
			},
		};
	}
}
