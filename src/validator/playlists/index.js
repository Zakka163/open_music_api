const invariant_error = require('../../exceptions/invariant_error');
const { playlists_payload_schema ,playlists_songs_payload_schema } = require('./schema');

const playlists_validator = {
	validate_playlists_payload: (payload) => {
		const validation_result = playlists_payload_schema.validate(payload);
		if (validation_result.error) {
			throw new invariant_error(validation_result.error.message);
		}
	},
	validate_playlists_songs_payload: (payload) => {
		const validation_result = playlists_songs_payload_schema.validate(payload);
		if (validation_result.error) {
			throw new invariant_error(validation_result.error.message);
		}
	}
};

module.exports = playlists_validator;
