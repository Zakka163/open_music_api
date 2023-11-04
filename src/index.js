const path = require('path')

// albums
const albums = require('./api/albums/index');
const albums_service = require('./services/postgres/albums_service');
const albums_validator = require('./validator/albums/index');

// // songs
const songs = require('./api/songs/index');
const songs_service = require('./services/postgres/songs_service');
const songs_validator = require('./validator/songs/index');

// users
const users = require('./api/users/index');
const users_service = require('./services/postgres/users_service');
const users_validator = require('./validator/users/index');

// collaborations_playlist
const collaborations_playlist = require('./api/collaborations_playlist/index');
const collaborations_service = require('./services/postgres/collaborations_playlist_service');
const collaborations_playlist_validator = require('./validator/collaborations_playlist/index');


// playlists
const playlists = require('./api/playlists/index');
const playlists_service = require('./services/postgres/playlists_service');
const playlists_songs_service = require('./services/postgres/playlists_songs_service');
const playlists_song_activities_service = require('./services/postgres/playlists_song_activities_service');
const playlists_validator = require('./validator/playlists/index');

// authentications
const authentications = require('./api/authentications/index');
const authentications_service = require('./services/postgres/authentications_service');
const authentications_validator = require('./validator/authentications/index');
const token_manager = require('./tokenize/token_manager');

// message_broker
const rabbitmq_service = require('./services/rabbitmq/producer_service');
const exports_validator = require('./validator/exports/index');

// storage
const storage_service = require('./services/storage/storage_service');
const uploads_validator = require('./validator/uploads/index');

// initiaion

const collaborations_services = new collaborations_service();
const songs_services = new songs_service();
const albums_services = new albums_service();
const users_services = new users_service();
const playlists_services = new playlists_service();
const playlists_songs_services = new playlists_songs_service();
const playlists_song_activities_services = new playlists_song_activities_service();
const authentications_services = new authentications_service();
const storage_services = new storage_service(path.resolve(__dirname, '../assets/file/images'));

const plugins = [
	{
		plugin: songs,
		options: {
			service: songs_services,
			validator: songs_validator
		}
	},
	{
		plugin: albums,
		options: {
			service: albums_services,
			validator: albums_validator,
			storage_service:storage_services,
			uploads_validator
		}
	},
	{
		plugin: playlists,
		options: {
			playlists_service: playlists_services,
			playlists_songs_service: playlists_songs_services,
			playlists_song_activities_service: playlists_song_activities_services,
			songs_service: songs_services,
			rabbitmq_service,
			exports_validator:exports_validator,
			validator: playlists_validator

		}
	},
	{
		plugin: users,
		options: {
			service: users_services,
			validator: users_validator
		}
	},
	{
		plugin: collaborations_playlist,
		options: {
			users_service: users_services,
			playlists_service: playlists_services,
			collaborations_service: collaborations_services,
			validator: collaborations_playlist_validator
		}
	},
	{
		plugin: authentications,
		options: {
			auth_service: authentications_services,
			users_service: users_services,
			token_manager,
			validator: authentications_validator
		}
	}
];

module.exports = plugins;
