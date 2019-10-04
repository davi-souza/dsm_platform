export default function idb(DBName = 'mech4u', DBVersion = 1) {
	return new Promise((resolve, reject) => {
		if (!('indexedDB' in window)) {
			console.error('Browser doesn\'t support indexedDB');
			reject(new Error('Browser doesn\'t support indexedDB'));
		}

		const request = window.indexedDB.open(DBName, DBVersion);

		request.onerror = function (event) {
			console.error('Error opening indexedDB', request.error);
			reject(request.error);
		};

		request.onsuccess = function (event) {
			resolve(event.target.result);
		};

		request.onupgradeneeded = function (event) {
			const db = event.target.result;

			const userStore = db.createObjectStore('userAddress', { keyPath: 'id' });

			userStore.createIndex('userEmail', 'userEmail', { unique: false });
			userStore.createIndex('id', 'id', { unique: true });
		};
	});
}
