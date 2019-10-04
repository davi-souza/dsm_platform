function hasLocalStorage() {
	return 'localStorage' in window;
}

function getUserJwt() {
	if (!hasLocalStorage()) {
		return null;
	}

	return window.localStorage.getItem('userJwt');
}

function getUserName() {
	if (!hasLocalStorage()) {
		return null;
	}

	return window.localStorage.getItem('userName');
}

function getUserEmail() {
	if (!hasLocalStorage()) {
		return null;
	}

	return window.localStorage.getItem('userEmail');
}

export function getUserCredentials() {
	return {
		name: getUserName(),
		email: getUserEmail(),
		token: getUserJwt(),
	};
}

function setUserName(name) {
	if (!hasLocalStorage()) {
		return;
	}

	window.localStorage.setItem('userName', name);
}

function setUserJwt(jwt) {
	if (!hasLocalStorage()) {
		return;
	}

	window.localStorage.setItem('userJwt', jwt);
}

function setUserEmail(email) {
	if (!hasLocalStorage()) {
		return;
	}

	window.localStorage.setItem('userEmail', email);
}

export function setUserCredentials(name, email, jwt) {
	setUserName(name);
	setUserEmail(email);
	setUserJwt(jwt);
}
