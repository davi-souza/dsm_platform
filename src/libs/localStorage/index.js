function hasLocalStorage() {
	return 'localStorage' in window;
}

function getToken() {
	if (!hasLocalStorage()) {
		return null;
	}

	return window.localStorage.getItem('user_jwt');
}

function getUserName() {
	if (!hasLocalStorage()) {
		return null;
	}

	return window.localStorage.getItem('user_name');
}

export function getCredentials() {
	return {
		name: getUserName(),
		token: getToken(),
	};
}

export function setUserToken(token) {
	if (!hasLocalStorage()) {
		return;
	}

	window.localStorage.setItem('user_jwt', token);
}

export function setUserName(name) {
	if (!hasLocalStorage()) {
		return;
	}

	window.localStorage.setItem('user_name', name);
}
