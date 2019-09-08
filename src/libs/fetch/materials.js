const getBody = {
	query: `
		query RootQuery {
			materials {
				id,
				name,
				material_types {
					id,
					name,
				}
			}
		}
	`,
};

export async function getMaterials() {
	try {
		const res = await fetch('/api/graphql', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(getBody),
		});

		if (!res.ok) {
			throw new Error('Unable to get materials - ' + res.status);
		}

		const {data} = await res.json();

		return data.materials;
	} catch (err) {
		console.warn(err);
		return [];
	}
}
