const client_error = require('./client_error');

class not_found_error extends client_error {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = not_found_error;
