const client_error = require('./client_error');
 
class authentication_error extends client_error {
  constructor(message) {
    super(message, 401);
    this.name = 'authentication_error';
  }
}
 
module.exports = authentication_error;