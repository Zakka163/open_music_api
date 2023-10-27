const Joi = require('joi');

const collaborations_playlist_payload_schema = Joi.object({
	playlistId: Joi.string().required(),
	userId: Joi.string().required()
});

module.exports = { collaborations_playlist_payload_schema };
