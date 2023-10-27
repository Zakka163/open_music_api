const invariant_error = require('../../exceptions/invariant_error');
const { collavorations_playist_payload_schema } = require('./schema');

const collavorations_playist_validator = {
  validate: (payload) => {
    const validation_result = collavorations_playist_payload_schema.validate(payload);
    if (validation_result.error) {
      throw new invariant_error(validation_result.error.message);
    }
  },
};

module.exports = collavorations_playist_validator;
