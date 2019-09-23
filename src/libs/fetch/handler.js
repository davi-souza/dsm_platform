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
			throw new FetchError(extensions.message, extensions.status);
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
