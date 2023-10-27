const Jwt = require('@hapi/jwt');
const invariant_error = require('../exceptions/invariant_error');

const token_manager = {
  generate_acces_token: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generate_refresh_token: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verify_refresh_token: ({refreshToken}) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new invariant_error('Refresh token tidak valid');
    }
  },
};
 
module.exports = token_manager;