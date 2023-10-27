const client_error = require('../../exceptions/client_error')

class Handler {

	constructor(collaborations_service,users_service,playlists_service, validator) {
		this._collaborations_service = collaborations_service
		this._users_service = users_service
		this._playlists_service = playlists_service
		this._validator = validator
	}

	async add_collaborations(request, h) {

		const { id : owner } = request.auth.credentials;
		this._validator.validate(request.payload)
		const { playlistId,userId } = request.payload

		await this._users_service.get_users_by_id(userId)
		await this._playlists_service.get_playlists_by_id(playlistId)
		await this._playlists_service.verify_playlists_owner(playlistId,owner)

		await this._collaborations_service.add_collaborations_playlist(request.payload)

		const response = h.response({
			status: 'success',
			message: 'playlists_songs berhasil ditambahkan',
		});
		response.code(201);
		return response;
	}
	async delete_collaborations(request, h) {

		const { id : owner } = request.auth.credentials;
		this._validator.validate(request.payload)
		const { playlistId,userId } = request.payload

		await this._users_service.get_users_by_id(userId)
		await this._playlists_service.get_playlists_by_id(playlistId)
		await this._playlists_service.verify_playlists_owner(playlistId,owner)

		await this._collaborations_service.delete_collaborations_playlist(request.payload)

		const response = h.response({
			status: 'success',
			message: 'playlists_songs berhasil dihapus',
		});
		response.code(200);
		return response;
	}

}



module.exports = Handler