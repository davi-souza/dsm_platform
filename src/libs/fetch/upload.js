export async function uploadFile(file) {
	const formData = new FormData();

	formData.append('file', file);

	try {
		const response = await fetch('/api/file/upload', {
			method: 'POST',
			body: formData,
		});

		return await response.json();
	} catch (err) {
		console.error(err);

		return {
			data: null,
			error: {
				status: 500,
				message: 'Não foi possível fazer upload do arquivo',
			}
		};
	}
}

export function uploadAuxiliaryFile(partId) {
	return async function (file) {
		const formData = new FormData();
		const url = `/api/file/upload/auxiliary?part_id=${partId}`;

		formData.append('file', file);

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: formData,
			});

			return await response.json();
		} catch (err) {
			console.error(err);

			return {
				data: null,
				error: {
					status: 500,
					message: 'Não foi possível fazer upload do arquivo',
				}
			};
		}
	}
}
