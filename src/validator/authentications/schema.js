const Joi = require('joi');

const post_authentication_payload_schema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required()
});

const put_authentication_payload_schema = Joi.object({
	refreshToken: Joi.string().required()
});

const delete_authentication_payload_schema = Joi.object({
	refreshToken: Joi.string().required()
});

module.exports = {
	post_authentication_payload_schema,
	put_authentication_payload_schema,
	delete_authentication_payload_schema
};
