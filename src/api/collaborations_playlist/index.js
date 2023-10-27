const Handler = require('./handler');
const routes = require('./routes');

// module.exports = {
//   name: 'collaborations_playlist',
//   version: '1.0.0',
//   register: async (server, { service, validator }) => {
//     const handler = new Handler(service, validator);
//     server.route(routes(handler));
//   },
// };
module.exports = {
  name: 'collaborations_playlist',
  version: '1.0.0',
  register: async (server, {validator }) => {
    const handler = new Handler(validator);
    server.route(routes(handler));
  },
};