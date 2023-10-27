const Joi = require('joi');

const playlists_payload_schema = Joi.object({
	name: Joi.string().required()
});
const playlists_songs_payload_schema = Joi.object({
	songId: Joi.string().required()
});
module.exports = { playlists_payload_schema ,playlists_songs_payload_schema };
