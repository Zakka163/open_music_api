const invariant_error = require('../../exceptions/invariant_error');
const { users_payload_schema } = require('./schema');

const users_validator = {
	validate: (payload) => {
		const validation_result = users_payload_schema.validate(payload);
		if (validation_result.error) {
			throw new invariant_error(validation_result.error.message);
		}
	}
};

module.exports = users_validator;
