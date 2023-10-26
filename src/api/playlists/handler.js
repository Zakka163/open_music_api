const client_error = require('../../exceptions/client_error')

class playlistsHandler {
	constructor(playlists_service,playlists_songs_service, validator) {
		this._playlists_service = playlists_service
		this._playlists_songs_service = playlists_songs_service
		this._validator = validator
	}

	async add_playlists(request, h) {
		const { id: owner } = request.auth.credentials;
		this._validator.validate_playlists_payload(request.payload)

		const result = await this._playlists_service.add_playlists(owner,request.payload)
		const response = h.response({
			status: 'success',
			message: 'playlists berhasil ditambahkan',
			data: {
				playlistId: result
			},
		});
		response.code(201);
		return response;
	}


	async get_playlists(request, h) {
		const { id: owner } = request.auth.credentials;
		const result = await this._playlists_service.get_playlists(owner)
		return {
			status: 'success',
			data: {
				playlists:result
			},
		};
	}

	async delete_playlists(request, h) {
		const { id } = request.params
		const { id: owner } = request.auth.credentials;
		await this._playlists_service.verify_playlists_owner(id,owner)
		await this._service.delete_playlists(id)
		return {
			status: 'success',
			message: 'playlists berhasil dihapus',
		};
	}


	async add_playlists_songs(request, h) {
		const { id } = request.params
		const { id: owner } = request.auth.credentials;
		await this._playlists_service.verify_playlists_owner(id,owner)
		this._validator.validate_playlists_songs_payload(request.payload)
		const result = await this._playlists_songs_service.add_playlists_songs(id,request.payload)
		const response = h.response({
			status: 'success',
			message: 'playlists_songs berhasil ditambahkan',
		});
		response.code(201);
		return response;
	}



	async delete_playlists_songs(request, h) {
		const { id } = request.params
		const { id: owner } = request.auth.credentials;
		await this._playlists_service.verify_playlists_owner(id,owner)
		this._validator.validate_playlists_songs_payload(request.payload)
		await this._playlists_songs_service.delete_playlists_songs_owner(id,owner)
		return {
			status: 'success',
			message: 'playlists_songs berhasil dihapus',
		};
	}


	async get_playlists_songs(request, h) {
		const { id } = request.params
		const { id: owner } = request.auth.credentials;
		await this._playlists_service.verify_playlists_owner(id,owner)
		const result = await this._playlists_service.get_playlists_by_id(id)
		const result_songs = await this._playlists_songs_service.get_playlists_songs(id)
		result.songs = result_songs
		return {
			status: 'success',
			data: {
				playlist:result
			},
		};
	}



}



module.exports = playlistsHandler