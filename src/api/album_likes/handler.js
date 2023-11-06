
class Handler {

	constructor(service, albums_service) {
		this._service = service;
		this._albums_service = albums_service;
	}

	async likes_album(request, h) {

		const { id: user_id } = request.auth.credentials;
		const { id: album_id } = request.params;
		// console.log(user_id,album_id)

		await this._albums_service.get_albums_by_id(album_id);
		await this._service.add_user_album_likes(album_id, user_id);


		const response = h.response({
			status: 'success',
			message: 'berhasil like album'

		});
		response.code(201);
		return response;
	}

	async cancel_likes_album(request, h) {

		const { id: user_id } = request.auth.credentials;
		const { id: album_id } = request.params;

		await this._albums_service.get_albums_by_id(album_id);
		await this._service.delete_user_album_likes(album_id, user_id);

		const response = h.response({
			status: 'success',
			message: 'berhasil unlike album'
		});
		response.code(200);
		return response;
	}
	async get_likes_album(request, h) {
		const { id: album_id } = request.params;

		const result = await this._service.get_user_album_likes(album_id);


		const response = h.response({
			status: 'success',
			data: {
				likes: result.jumlah
			}
		});
		if (result.is_cache) {
			response.header('X-Data-Source', 'cache');
		}

		response.code(200);
		return response;
	}

}



module.exports = Handler;
