import { handleGraphQLResponse } from './handler';

const materialsQuery = `
query RootQuery {
	materials {
		id
		name
		material_types {
			id
			name
			heat_treatments {
				id
				name
			}
			superficial_treatments {
				id
				name
			}
		}
	}
}
`.trim();

export async function getMaterials() {
	try {
		const res = await fetch('/api/graphql', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				query: materialsQuery,
			}),
		});

		return await handleGraphQLResponse(res, 'materials');
	} catch (err) {
		console.error(err);

		return {
			data: null,
			error: {
				status: 500,
				message: 'Houve um error',
			},
		};
	}
}
