const client_error = require('./client_error');

class invariant_error extends client_error {
  constructor(message) {
    super(message);
    this.name = 'invariant_error';
  }
}

module.exports = invariant_error;
