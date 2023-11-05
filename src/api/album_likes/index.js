const albumsLikeHandler = require('./handler');
const routes = require('./routes');

module.exports = {
	name: 'album_likes',
	version: '1.0.0',
	register: async (server, { service,albums_service}) => {
		const album_likes_handler = new albumsLikeHandler(service,albums_service);
		server.route(routes(album_likes_handler));
	}
};
