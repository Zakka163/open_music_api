const Joi = require('joi');

const users_payload_schema = Joi.object({
	username: Joi.string().max(50).required(),
	password: Joi.string().required(),
	fullname: Joi.string().required()
});

module.exports = { users_payload_schema };
