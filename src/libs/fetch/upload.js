export async function uploadFile(file) {
	const formData = new FormData();

	formData.append('file', file);

	try {
		const response = await fetch('/api/v1/files/upload', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			console.log('Error uploading file');
			return {};
		}

		return await response.json();
	} catch (err) {
		console.log('Error uploading file:', err);
		return {};
	}
}
