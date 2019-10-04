export async function uploadFile(file) {
	const formData = new FormData();

	formData.append('file', file);

	try {
		const response = await fetch('/api/file/upload', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			return {
				data: null,
				error: {
					status: response.status,
					message: 'Não foi possível fazer upload do arquivo',
				}
			};
		}

		const data = await response.json();

		return {
			data,
			error: null,
		};
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
