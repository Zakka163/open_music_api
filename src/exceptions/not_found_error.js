const client_error = require('./client_error');

class not_found_error extends client_error {
	constructor(message) {
		super(message, 404);
		this.name = 'not_found_error';
	}
}

module.exports = not_found_error;
