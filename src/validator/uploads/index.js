const invariant_error = require('../../exceptions/invariant_error');
const { image_header_schema } = require('./schema');

const uploads_validator = {
	validate: (payload) => {
		const validation_result = image_header_schema.validate(payload);
		if (validation_result.error) {
			throw new invariant_error(validation_result.error.message);
		}
	}
};

module.exports = uploads_validator;
