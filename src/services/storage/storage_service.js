const fs = require('fs');
const moment = require('moment');

class StorageService {
	constructor(folder) {
		this._folder = folder;

		if (!fs.existsSync(folder)) {
			fs.mkdirSync(folder, { recursive: true });
		}
	}

	write_file(file, meta) {
		let file_name = + new Date() + meta.filename;
		file_name = file_name.split(' ').join('');
		const path = `${this._folder}/${file_name}`;

		const file_stream = fs.createWriteStream(path);

		return new Promise((resolve, reject) => {
			file_stream.on('error', (error) => reject(error));
			file.pipe(file_stream);
			file.on('end', () => resolve(file_name));
		});
	}
}

module.exports = StorageService;
