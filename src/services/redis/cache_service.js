const redis = require('redis');

class CacheService {
	constructor() {
		this._client = redis.createClient({
			host: process.env.REDIS_SERVER
		});
		this._client.on('error', (error) => {
			console.error(error);
		});
		this._client.connect();


	}

	// set(key, value, expirationInSecond = 1800) {
	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			const result = await this._client.set(key, value, 'EX', expirationInSecond);

	// 			return resolve(result);

	// 		} catch (error) {
	// 			console.log(error);

	// 			return reject(error);
	// 		}
	// 	});

	// }
	set(key, value, expirationInSecond = 1800) {
		return new Promise((resolve, reject) => {
			this._client.set(key, value, 'EX', expirationInSecond).then((data) => {
				return resolve(data);
			}).catch((error) => {
				console.log(error);

				return reject(error);
			});
		});

	}

	// get(key) {
	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			const result = await this._client.get(key);
	// 			if (result == null) {
	// 				return reject(new Error('Cache tidak ditemukan'));
	// 			}
	// 			return resolve(result);

	// 		} catch (error) {
	// 			console.log(error);

	// 			return reject(error);

	// 		}
	// 	});
	// }
	get(key) {
		return new Promise((resolve, reject) => {
			this._client.get(key).then((data) => {
				if (data == null) {
					return reject(new Error('Cache tidak ditemukan'));
				}

				resolve(data);
			}).catch((error) => {
				console.log(error);

				return reject(error);

			});


		});
	}

	// delete(key) {
	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			const result = await this._client.del(key);
	// 			resolve(result);
	// 		} catch (error) {
	// 			console.log(error);

	// 			return reject(error);
	// 		}
	// 	});

	// }
	delete(key) {
		return new Promise((resolve, reject) => {
			this._client.del(key).then((data) => {
				return resolve(data);
			}).catch((error) => {
				console.log(error);
				return reject(error);
			});
		});

	}
}

module.exports = CacheService;
