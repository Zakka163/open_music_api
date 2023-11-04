const albumsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
	name: 'albums',
	version: '1.0.0',
	register: async (server, { service, validator,storage_service,uploads_validator }) => {
		const albums_handler = new albumsHandler(service, validator,storage_service,uploads_validator);
		server.route(routes(albums_handler));
	}
};
