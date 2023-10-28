const Joi = require('joi');

const albums_payload_schema = Joi.object({
	name: Joi.string().required(),
	year: Joi.number().required()
});

module.exports = { albums_payload_schema };
