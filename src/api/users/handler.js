const client_error = require('../../exceptions/client_error')

class usersHandler {
	constructor(service, validator) {
		this._service = service
		this._validator = validator
	}

	async get_users_by_id(request, h) {
		const { id } = request.params
		const result = await this._service.get_users_by_id(id)
		return {
			status: 'success',
			data: {
				user: result[0]
			},
		};
	}
	async add_users(request, h) {
		this._validator.validate(request.payload)

		const result = await this._service.add_users(request.payload)
		const response = h.response({
			status: 'success',
			message: 'users berhasil ditambahkan',
			data: {
				userId: result
			},
		});
		response.code(201);
		return response;
	}


}



module.exports = usersHandler