class client_error extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'client_error';
  }
}

module.exports = client_error;
