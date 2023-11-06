const usersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
	name: 'users',
	version: '1.0.0',
	register:  (server, { service, validator }) => {
		const users_handler = new usersHandler(service, validator);
		server.route(routes(users_handler));
	}
};
