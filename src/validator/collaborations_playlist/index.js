const invariant_error = require('../../exceptions/invariant_error');
const { collaborations_playlist_payload_schema } = require('./schema');

const collaborations_playlist_validator = {
  validate: (payload) => {
    const validation_result = collaborations_playlist_payload_schema.validate(payload);
    if (validation_result.error) {
      throw new invariant_error(validation_result.error.message);
    }
  },
};

module.exports = collaborations_playlist_validator;



