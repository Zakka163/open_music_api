const client_error = require('./client_error');

class authorization_error extends client_error {
	constructor(message) {
		super(message, 403);
		this.name = 'authorization_error';
	}
}

module.exports = authorization_error;
