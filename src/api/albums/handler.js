
class albumsHandler {
	constructor(service, validator,storage_service,uploads_validator) {
		this._service = service;
		this._storage_service = storage_service;
		this._validator = validator;
		this._uploads_validator = uploads_validator;
	}
	async get_albums_by_id(request, h) {
		const { id } = request.params;
		const album = await this._service.get_albums_by_id(id);
		return {
			status: 'success',
			data: {
				album: album[0]
			}
		};
	}
	async add_albums(request, h) {
		this._validator.validate(request.payload);
		const album_id = await this._service.add_albums(request.payload);
		const response = h.response({
			status: 'success',
			message: 'albums berhasil ditambahkan',
			data: {
				albumId: album_id
			}
		});
		response.code(201);
		return response;
	}
	async edit_albums(request, h) {
		this._validator.validate(request.payload);
		const { id } = request.params;

		const result = await this._service.edit_albums(id, request.payload);
		const response = h.response({
			status: 'success',
			message: 'albums berhasil diubah',
			data: {
				album: result
			}
		});
		response.code(200);
		return response;
	}

	async delete_albums(request, h) {
		const { id } = request.params;

		await this._service.delete_albums(id);
		return {
			status: 'success',
			message: 'albums berhasil dihapus'
		};
	}
	async add_cover_albums(request,h){
		const { id } = request.params;
		const { cover } = request.payload
		// console.log(request.payload)
		this._uploads_validator.validate(cover.hapi.headers)

		const file_name = await this._storage_service.write_file(cover, cover.hapi);

		await this._service.edit_albums(id,{coverUrl:`http://${process.env.HOST}:${process.env.PORT}/assets/file/images/${file_name}`})
		// console.log(file_location)
		

		const response = h.response({
        status: "success",
        message: "Sampul berhasil diunggah"
	    });
	      response.code(201);
	      return response;



	}


}



module.exports = albumsHandler;
