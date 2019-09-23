export class FetchError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

export function processFetchError(err) {
	if (err instanceof FetchError) {
		console.error(err.status, err.message);
	} else if (err instanceof Error) {
		console.error(err.message);
	} else {
		console.error(err);
	}
}
