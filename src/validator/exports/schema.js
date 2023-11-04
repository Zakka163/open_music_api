const Joi = require('joi');

const exports_payload_schema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = {exports_payload_schema};
