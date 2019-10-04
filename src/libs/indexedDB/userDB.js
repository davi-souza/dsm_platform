import idb from './';

export function saveUserAddresses(userEmail, addresses) {
	return idb()
		.then(db => {
			return new Promise((resolve, reject) => {
				const store = db.transaction('userAddress', 'readwrite')
					.objectStore('userAddress');

				addresses.forEach(ad => {
					const putRequest = store.put({userEmail, ...ad});

					putRequest.onerror = function (event) {
						console.error(putRequest.error);
						reject(putRequest.error);
					};

					putRequest.onsuccess = function (event) {
						resolve();
					};
				});
			});
		})
		.catch(err => {
			return Promise.resolve();
		});
}
