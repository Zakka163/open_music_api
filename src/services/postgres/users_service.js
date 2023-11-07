const invariant_error = require('../../exceptions/invariant_error');
const not_found_error = require('../../exceptions/not_found_error');
const authentication_error = require('../../exceptions/authentication_error');
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');



class users_service {

	constructor() {
		this._pool = new Pool();
	}
	async add_users({ username, password, fullname }) {
		await this.verify_username(username);
		const hash_password = await bcrypt.hash(password, 10);
		const query = {
			text: 'insert into users values($1,$2,$3,$4) returning id',
			values: [`user-${nanoid(20)}`, username, hash_password, fullname]
		};

		const result = await this._pool.query(query);
		if (!result.rows[0].id) {
			throw new invariant_error('users gagal ditambahkan');
		}

		return result.rows[0].id;
	}




	async verify_username(username) {
		const query = {
			text: 'select * from users u where u.username = $1',
			values: [username]
		};
		const result = await this._pool.query(query);
		if (result.rows.length > 0) {
			throw new invariant_error('Gagal menambahkan user. Username sudah digunakan.');
		}
	}

	async get_users_by_id(id) {
		const query = {
			text: 'select * from users s where s.id = $1',
			values: [id]
		};
		const result = await this._pool.query(query);

		if (!result.rows.length) {
			throw new not_found_error('users tidak ditemukan');
		}

		return result.rows[0];
	}


	async verify_user_credential({ username, password }) {
		// console.log(username, password)
		const query = {
			text: 'select * from users s where s.username = $1',
			values: [username]
		};
		const result = await this._pool.query(query);
		// console.log(result.rows)

		if (!result.rows.length) {
			throw new authentication_error('username salah');
		}

		const { id, password: hashedPassword } = result.rows[0];

		const match = await bcrypt.compare(password, hashedPassword);

		if (!match) {
			throw new authentication_error('password salah');
		}

		return id;

	}

}

module.exports = users_service;
