export class FetchError extends Error {
	constructor(msg, status) {
		super(msg);
		this.status = status;
	}
}

export function processError(err) {
	if (err instanceof FetchError) {
		console.error(err.status, err.message);
	} else if (err instanceof Error) {
		console.error(err.message);
	} else {
		console.error(err);
	}
}
