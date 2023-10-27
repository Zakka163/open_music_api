const Joi = require('joi');

const songs_payload_schema = Joi.object({
	title: Joi.string().required(),
	year: Joi.number().required(),
	genre: Joi.string().required(),
	performer: Joi.string().required(),
	duration: Joi.number(),
	albumId: Joi.string()
});

module.exports = { songs_payload_schema };
