const client_error = require('../../exceptions/client_error')

class songsHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator
	}
	async get_songs_by_id(request, h) {
		const { id } = request.params
		const result = await this._service.get_songs_by_id(id)
		return {
			status: 'success',
			data: {
				song: result
			},
		};
	}
	async get_songs(request, h) {
		const songs = await this._service.get_songs(request.query)
		return {
			status: 'success',
			data: {
				songs
			},
		};
	}
	async add_songs(request, h) {
		this._validator.validate(request.payload)

		const song_id = await this._service.add_songs(request.payload)
		const response = h.response({
			status: 'success',
			message: 'songs berhasil ditambahkan',
			data: {
				songId: song_id
			},
		});
		response.code(201);
		return response;
	}
	async edit_songs(request, h) {
		this._validator.validate(request.payload)
		const { id } = request.params

		const result = await this._service.edit_songs(id, request.payload)
		const response = h.response({
			status: 'success',
			message: 'songs berhasil diubah',
			data: {
				album: result
			},
		});
		response.code(200);
		return response;
	}

	async delete_songs(request, h) {
		const { id } = request.params

		await this._service.delete_songs(id)
		return {
			status: 'success',
			message: 'songs berhasil dihapus',
		};
	}


}



module.exports = songsHandler