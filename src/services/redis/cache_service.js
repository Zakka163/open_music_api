const redis = require('redis');

class CacheService {
	constructor() {
		this._client = redis.createClient({
			socket: {
				host: process.env.REDIS_SERVER
			}
		});
		this._client.on('error', (error) => {
			console.error(error);
		});
		this._client.connect();

	}


	set(key, value, expirationInSecond = 1800) {
		return new Promise((resolve, reject) => {
			this._client.set(key, value, {
				EX: expirationInSecond
			}).then((data) => {
				return resolve(data);
			}).catch((error) => {
				console.log(error);

				return reject(error);
			});
		});

	}


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
