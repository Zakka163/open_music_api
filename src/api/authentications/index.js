const auth_handler = require('./handler');
const routes = require('./routes');

module.exports = {
	name: 'authentications',
	version: '1.0.0',
	register: async (server, { auth_service, users_service, token_manager, validator }) => {
		const handler = new auth_handler(auth_service, users_service, token_manager, validator);
		server.route(routes(handler));
	}
};


