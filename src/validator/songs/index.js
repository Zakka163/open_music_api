const invariant_error = require('../../exceptions/invariant_error');
const { songs_payload_schema } = require('./schema');

const songs_validator = {
	validate: (payload) => {
		const validation_result = songs_payload_schema.validate(payload);
		if (validation_result.error) {
			throw new invariant_error(validation_result.error.message);
		}
	}
};

module.exports = songs_validator;
