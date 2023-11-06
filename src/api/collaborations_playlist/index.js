const Handler = require('./handler');
const routes = require('./routes');

module.exports = {
	name: 'collaborations_playlist',
	version: '1.0.0',
	register:  (server, { collaborations_service, users_service, playlists_service, validator }) => {
		const handler = new Handler(collaborations_service, users_service, playlists_service, validator);
		server.route(routes(handler));
	}
};
