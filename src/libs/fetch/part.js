function query({id, material_type_id, qtd}) {
	return `
	mutation RootMutation {
		changePartOptions(
			part_id: "${id}",
			material_type_id: "${material_type_id}",
			qtd: ${qtd}
		) {
			id
			name
			material_type_id
			unit_price
			qtd
		}
	}
	`.trim();
}

/**
 * Change Part options (i.e., material type or qtd)
 * @param {object}	Part object
 *            {string} id				Part id (uuid)
 *            {string} material_Type_id	Material type id (uuid)
 *            {number} qtd				Qtd
 * @return {object}	Part object too
 *             {string} id					Part id
 *             {string} name				Part Name
 *             {string} material_type_id	Material type id
 *             {number} unit_price			Part unit price
 *             {number} qtd					Qtd of the order
 */
export async function changePartOptions({id, material_type_id, qtd})  {
	let partQtd = qtd;

	if (isNaN(partQtd)) {
		partQtd = 0;
	}
	
	try {
		const res = await fetch('/api/graphql', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				query: query({id, material_type_id, qtd: partQtd}),
			}),
		});

		if (!res.ok) {
			throw new Error('Unable to change part options');
		}

		const {data} = await res.json();

		return data.changePartOptions;
	} catch (err) {
		console.warn(err);

		throw err;
	}
}
