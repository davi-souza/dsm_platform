import { FetchError, processError } from '../errors';

export async function uploadFile(file) {
	const formData = new FormData();

	formData.append('file', file);

	try {
		const response = await fetch('/api/file/upload', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			const {status, errors} = await response.json();

			throw new FetchError(errors[0].message || 'Error uploading file', status || 500);
		}

		return await response.json();
	} catch (err) {
		processError(err);
		
		throw err;
	}
}
