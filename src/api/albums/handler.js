const client_error = require('../../exceptions/client_error')

class albumsHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator
	}
	async get_albums_by_id(request, h) {
		const { albumId } = request.params
		const album = await this._service.get_albums_by_id(albumId)
		return {
			status: 'success',
			data: {
				album: album[0]
			},
		};
	}
	async add_albums(request, h) {
		this._validator.validate(request.payload)
		const { name, year } = request.payload

		const album_id = await this._service.add_albums({ name, year })
		const response = h.response({
			status: 'success',
			message: 'albums berhasil ditambahkan',
			data: {
				albumId: album_id
			},
		});
		response.code(201);
		return response;
	}
	async edit_albums(request, h) {
		this._validator.validate(request.payload)
		const { name, year } = request.payload
		const { albumId } = request.params

		const result = await this._service.edit_albums(albumId, { name, year })
		const response = h.response({
			status: 'success',
			message: 'albums berhasil diubah',
			data: {
				album: result
			},
		});
		response.code(200);
		return response;
	}

	async delete_albums(request, h) {
		const { albumId } = request.params

		await this._service.delete_albums(albumId)
		return {
			status: 'success',
			message: 'albums berhasil dihapus',
		};
	}


}



module.exports = albumsHandler