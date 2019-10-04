import { handleGraphQLResponse } from './handler';

const changePartOptionsQuery = `
mutation RootMutation($input: PartOptionsInputType!) {
	changePartOptions(input: $input) {
		id
		name
		material_type {
			id
			name
		}
		heat_treatment {
			id
			name
		}
		superficial_treatment {
			id
			name
		}
		tolerance
		finishing
		screw {
			type
			amount
		}
		amount
		unit_price
	}
}
`.trim();

const partBatchInfoQuery = `
mutation RootMutation($input: PartBatchInfoInputType!) {
	partBatchInfo(input: $input) {
		subtotal
		delivery {
			price
			at
		}
	}
}
`.trim();

/**
 * Change Part options
 * @param {object} input							Part options object
 *            {string} part_id						Part's id (uuid)
 *            {string} material_type_id				Part's material type
 *            {string} heat_treatment_id			Part's heat treatment. It can be null
 *            {string} superficial_treatment_id		Part's superficial treatment. It can be null
 *            {string} tolerance					Part's tolerance. It can be null.
 *            {string} finishing					Part's finishing. It can be null
 *            {number} screw_amount					Part's number of screws
 *            {number} amount						How many parts to be created
 * @return {object}
 *            {object} data							GraphQL response data. It can be null
 *                {string} id						Part's id (uuid)
 *                {string} name						Part's name
 *                {object} material_type			Part's material type
 *                    {string} name					Material type's name
 *                    {string} id					Material type's id
 *                {object} heat_treatment			Part's heat treatment. It can be null
 *                    {string} name					Heat Treatment's name
 *                    {string} id					Heat treatment's id
 *                {object} superficial_treatment	Part's superficial treatment. It can be null
 *                    {string} name					Superficial Treatment's name
 *                    {string} id					Superficial treatment's id
 *                {string} tolerance				Part's tolerance. It can be null.
 *                {string} finishing				Part's finishing. It can be null
 *                {number} screw_amount				Part's number of screws
 *                {number} unit_price				Part's unit price. It's multiplied by 100 (int)
 *            {object} error						Error object. It can be null
 *                {number} status					HTTP status code
 *                {string} message
 */
export async function changePartConfig(input)  {
	try {
		const res = await fetch('/api/graphql', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				query: changePartOptionsQuery,
				variables: { input },
			}),
		});

		return await handleGraphQLResponse(res, 'changePartOptions');
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

/**
 * Get batch info
 * @param {object[]} parts							Part options object
 *            {string} part_id						Part's id (uuid)
 *            {string} material_type_id				Part's material type
 *            {string} heat_treatment_id			Part's heat treatment. It can be null
 *            {string} superficial_treatment_id		Part's superficial treatment. It can be null
 *            {string} tolerance					Part's tolerance. It can be null.
 *            {string} finishing					Part's finishing. It can be null
 *            {object} screw						Part's screw config
 *            {number} amount						How many parts to be created
 * @param {string} delivery							Delivery option
 * @return {object}
 *             {number} subtotal					Batch subtotal
 *             {object} delivery					Delivery info
 *                 {number} price					Delivery price
 *                 {string} at						Estimated delivery date
 */
export async function partBatchInfo(parts, delivery = 'WORKINGDAYS_15')  {
	try {
		const res = await fetch('/api/graphql', {
			method: 'post',
			credentials: 'same-origin',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				query: partBatchInfoQuery,
				variables: {
					input: {
						parts,
						delivery,
					},
				},
			}),
		});

		return await handleGraphQLResponse(res, 'partBatchInfo');
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
