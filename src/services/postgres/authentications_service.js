const invariant_error = require('../../exceptions/invariant_error')
const { Pool } = require('pg');



class authentications_service {

	constructor() {
		this._pool = new Pool()
	}

	async add_refresh_token(token){
		const query = {
			text: 'insert into authentications values($1)',
			values: [token],
		};

		await this._pool.query(query);

	}

	async verify_refresh_token({refreshToken}) {
	    const query = {
	      text: 'SELECT * FROM authentications WHERE token = $1',
	      values: [refreshToken],
	    };
	 
	    const result = await this._pool.query(query);
		console.log(result)
	    if (!result.rows.length) {
	      throw new invariant_error('Refresh token tidak valid');
	    }
	}

	async delete_refresh_token({refreshToken}) {
	    const query = {
	      text: 'DELETE FROM authentications WHERE token = $1',
	      values: [refreshToken],
	    };
	    await this._pool.query(query);
	}

}

module.exports = authentications_service