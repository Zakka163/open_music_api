const Joi = require('joi');
const current_year = new Date().getFullYear();

const songs_payload_schema = Joi.object({
	title: Joi.string().required(),
	year: Joi.number().integer().min(1900).max(current_year).required(),
	genre: Joi.string().required(),
	performer: Joi.string().required(),
	duration: Joi.number(),
	albumId: Joi.string()
});

module.exports = { songs_payload_schema };
