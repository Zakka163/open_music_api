const client_error = require('../../exceptions/client_error')

class playlistsHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator
	}
	async add_playlists(request, h) {
		this._validator.validate(request.payload)

		const result = await this._service.add_playlists(request.payload)
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
		const result = await this._service.get_playlists(owner)
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
		await this._service.verify_playlists_owner(id,owner)
		await this._service.delete_playlists(id)
		return {
			status: 'success',
			message: 'playlists berhasil dihapus',
		};
	}



	


}



module.exports = playlistsHandler