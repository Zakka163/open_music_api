const client_error = require('../../exceptions/client_error')

class songsHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator
	}
	async get_songs_by_id(request, h) {
		const { songsId } = request.params
		const song = await this._service.get_songs_by_id(songsId)
		return {
			status: 'success',
			data: {
				song: song[0]
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
		const { songsId } = request.params

		const result = await this._service.edit_songs(songsId, request.payload)
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
		const { songsId } = request.params

		await this._service.delete_songs(songsId)
		return {
			status: 'success',
			message: 'songs berhasil dihapus',
		};
	}


}



module.exports = songsHandler