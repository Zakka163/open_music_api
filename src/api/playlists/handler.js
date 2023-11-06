
class playlistsHandler {
	constructor(playlists_service, playlists_songs_service, songs_service, playlists_song_activities_service, rabbitmq_service, validator, exports_validator) {
		this._playlists_service = playlists_service;
		this._rabbitmq_service = rabbitmq_service;
		this._songs_service = songs_service;
		this._playlists_songs_service = playlists_songs_service;
		this._playlists_song_activities_service = playlists_song_activities_service;
		this._validator = validator;
		this._exports_validator = exports_validator;

	}

	async add_playlists(request, h) {

		const { id: owner } = request.auth.credentials;
		this._validator.validate_playlists_payload(request.payload);

		const result = await this._playlists_service.add_playlists(owner, request.payload);
		const response = h.response({
			status: 'success',
			message: 'playlists berhasil ditambahkan',
			data: {
				playlistId: result
			}
		});
		response.code(201);
		return response;
	}


	async get_playlists(request, h) {
		const { id: user_id } = request.auth.credentials;
		const result = await this._playlists_service.get_playlists(user_id);
		return {
			status: 'success',
			data: {
				playlists: result
			}
		};
	}

	async delete_playlists(request, h) {

		const { id: playlist_id } = request.params;
		const { id: owner } = request.auth.credentials;

		// await this._playlists_service.get_playlists_by_id(playlist_id)
		await this._playlists_service.verify_playlists_owner(playlist_id, owner);
		await this._playlists_service.delete_playlists(playlist_id);
		return {
			status: 'success',
			message: 'playlists berhasil dihapus'
		};
	}


	async add_playlists_songs(request, h) {

		const { id: playlist_id } = request.params;
		const { id: user_id } = request.auth.credentials;
		const { songId: song_id } = request.payload;
		const action = 'add';

		this._validator.validate_playlists_songs_payload(request.payload);

		await this._songs_service.get_songs_by_id(song_id);
		// await this._playlists_service.get_playlists_by_id(playlist_id)
		await this._playlists_songs_service.verify_playlists_collab(playlist_id, user_id);

		await this._playlists_songs_service.add_playlists_songs(playlist_id, song_id);
		await this._playlists_song_activities_service.add_playlists_song_activities(playlist_id, user_id, song_id, action);

		const response = h.response({
			status: 'success',
			message: 'playlists_songs berhasil ditambahkan'

		});
		response.code(201);
		return response;
	}



	async delete_playlists_songs(request, h) {

		const { id: playlist_id } = request.params;
		const { id: user_id } = request.auth.credentials;
		const { songId: song_id } = request.payload;
		const action = 'delete';
		this._validator.validate_playlists_songs_payload(request.payload);

		await this._songs_service.get_songs_by_id(song_id);
		// await this._playlists_service.get_playlists_by_id(playlist_id)
		await this._playlists_songs_service.verify_playlists_collab(playlist_id, user_id);

		await this._playlists_songs_service.delete_playlists_songs(playlist_id, song_id);
		await this._playlists_song_activities_service.add_playlists_song_activities(playlist_id, user_id, song_id, action);


		return {
			status: 'success',
			message: 'playlists_songs berhasil dihapus'
		};
	}


	async get_playlists_songs(request, h) {

		const { id: playlist_id } = request.params;
		const { id: user_id } = request.auth.credentials;


		await this._playlists_songs_service.verify_playlists_collab(playlist_id, user_id);
		const result = await this._playlists_service.get_playlists_by_id(playlist_id);
		const result_songs = await this._playlists_songs_service.get_playlists_songs(playlist_id);

		result.songs = result_songs;
		return {
			status: 'success',
			data: {
				playlist: result
			}
		};
	}
	async get_playlists_activities(request, h) {

		const { id: playlist_id } = request.params;
		const { id: user_id } = request.auth.credentials;


		await this._playlists_songs_service.verify_playlists_collab(playlist_id,user_id);
		const result = await this._playlists_service.get_playlists_by_id(playlist_id);
		const result_activities = await this._playlists_song_activities_service.get_playlists_song_activities(playlist_id);

		return {
			status: 'success',
			data: {
				playlistId: result.id,
				activities: result_activities
			}
		};
	}

	async export_playlists(request, h) {

		const { id: playlist_id } = request.params;
		const { id: owner } = request.auth.credentials;

		await this._exports_validator.validate(request.payload);
		const message = {
			playlist_id,
			target_email: request.payload.targetEmail
		};
		await this._playlists_service.verify_playlists_owner(playlist_id, owner);
		await this._rabbitmq_service.send_message('export:playlists', JSON.stringify(message));
		const response = h.response({
			status: 'success',
			message: 'Permintaan Anda sedang kami proses'
		});
		response.code(201);
		return response;


	}



}



module.exports = playlistsHandler;
