const client_error = require('../../exceptions/client_error')

class auth_handler {
	constructor(auth_service, user_service, token_manager, validator) {
	    this._auth_service = auth_service;
	    this._user_service = user_service;
	    this._token_manager = token_manager;
	    this._validator = validator;
  }

	async post_auth_handler(request, h) {
		this._validator.validate_post_auth_payload(request.payload)
		const id = await this._user_service.verify_user_credential(request.payload)
		const acces_token = this._token_manager.generate_acces_token({ id });
      	const refresh_token = this._token_manager.generate_refresh_token({ id });
      	console.log(id)
      	console.log(acces_token,refresh_token)
      	await this._auth_service.add_refresh_token(refresh_token);

		const response = h.response({
			status: 'success',
			message: 'authentications berhasil ditambahkan',
			data: {
				acces_token,
				refresh_token
			},
		});
		response.code(201);
		return response;
	}

	async put_auth_handler(request, h) {
		this._validator.validate_put_auth_payload(request.payload)
		const { id } = this._token_manager.verify_refresh_token(request.payload)
		const acces_token = this._token_manager.generate_acces_token({ id });
		const response = h.response({
			status: 'success',
			message: 'Access Token berhasil diperbarui',
			data: {
				acces_token
			},
		});
		response.code(200);
		return response;
	}

	async delete_auth_handler(request, h) {
		this._validator.validate_delete_auth_payload(request.payload);
		await this._auth_service.verify_refresh_token(request.payload);
		await this._auth_service.delete_refresh_token(request.payload);

		return {
        status: 'success',
        message: 'Refresh token berhasil dihapus',
      };
	}


}



module.exports = auth_handler