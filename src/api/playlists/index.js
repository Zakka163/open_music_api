const playlistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { playlists_service,playlists_songs_service,songs_service,playlists_song_activities_service,validator }) => {
    const playlist_handler = new playlistHandler(playlists_service,playlists_songs_service,songs_service,playlists_song_activities_service,validator);
    server.route(routes(playlist_handler));
  },
};
