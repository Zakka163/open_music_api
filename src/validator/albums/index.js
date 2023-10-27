const invariant_error = require('../../exceptions/invariant_error');
const { albums_payload_schema } = require('./schema');

const albums_validator = {
	validate: (payload) => {
		const validation_result = albums_payload_schema.validate(payload);
		if (validation_result.error) {
			throw new invariant_error(validation_result.error.message);
		}
	}
};

module.exports = albums_validator;
