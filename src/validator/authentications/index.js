const {
	post_authentication_payload_schema,
	put_authentication_payload_schema,
	delete_authentication_payload_schema
} = require('./schema');
const invariant_error = require('../../exceptions/invariant_error');

const authentications_validator = {
	validate_post_auth_payload: (payload) => {
		const validationResult = post_authentication_payload_schema.validate(payload);
		if (validationResult.error) {
			throw new invariant_error(validationResult.error.message);
		}
	},
	validate_put_auth_payload: (payload) => {
		const validationResult = put_authentication_payload_schema.validate(payload);
		if (validationResult.error) {
			throw new invariant_error(validationResult.error.message);
		}
	},
	validate_delete_auth_payload: (payload) => {
		const validationResult = delete_authentication_payload_schema.validate(payload);
		if (validationResult.error) {
			throw new invariant_error(validationResult.error.message);
		}
	}
};

module.exports = authentications_validator;
