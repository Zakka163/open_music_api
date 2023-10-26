const client_error = require('../../exceptions/client_error')
const invariant_error = require('../../exceptions/invariant_error')
const not_found_error = require('../../exceptions/not_found_error')
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const moment = require('moment')
const bcrypt = require('bcrypt')



class users_service {

	constructor() {
		this._pool = new Pool()
	}
	async add_users({username,password,fullname}){
		await this.verify_username(username)
		const hash_password = await bcrypt.hash(password, 10);
		const query = {
			text: 'insert into users values($1,$2,$3,$4)',
			values: [nanoid(14), username, hash_password, fullname],
		};

		const result = await this._pool.query(query);
		if (!result.rows[0].id) {
			throw new invariant_error('users gagal ditambahkan');
		}

		return result.rows[0].id;
	}




	async verify_username(username){
		const query = {
			text: 'select * from users s where s.username = $1',
			values: [ username ],
		};
		const result = await this._pool.query(query);
		if (result.rows.length > 0) {
	      throw new invariant_error('Gagal menambahkan user. Username sudah digunakan.');
	    }
	}


	// async add_albums({ name, year }) {
	// 	const createdAt = moment()
	// 	const updatedAt = createdAt;
	// 	const query = {
	// 		text: 'INSERT INTO albums VALUES($1, $2, $3, $4,$5 ) RETURNING id',
	// 		values: [nanoid(14), name, year, createdAt, updatedAt],
	// 	};

	// 	const result = await this._pool.query(query);
	// 	if (!result.rows[0].id) {
	// 		throw new invariant_error('Albums gagal ditambahkan');
	// 	}

	// 	return result.rows[0].id;
	// }

	async get_users_by_id(id) {
		const query = {
			text: `select * from users a where a.id = $1`,
			values: [id]
		}

		const result = await this._pool.query(query)


		if (!result.rows.length) {
			throw new not_found_error('users tidak ditemukan')
		}
		result.rows[0].songs = songs_result.rows

		return result.rows
	}

	// async edit_albums(id, { name, year }) {
	// 	const updatedAt = moment();
	// 	const query = {
	// 		text: 'update albums set "name" = $1, "year" = $2, "updatedAt" = $3 where id = $4 returning *',
	// 		values: [name, year, updatedAt, id],
	// 	};

	// 	const result = await this._pool.query(query);

	// 	if (!result.rowCount) {
	// 		throw new not_found_error('Gagal memperbarui albums. Id tidak ditemukan');
	// 	}

	// 	return result.rows
	// }
	// async delete_albums(id) {
	// 	const query = {
	// 		text: 'delete from albums where id = $1',
	// 		values: [id],
	// 	};
	// 	const result = await this._pool.query(query);
	// 	if (!result.rowCount) {
	// 		throw new not_found_error('Gagal menghapus album. Id tidak ditemukan');
	// 	}
	// }
}

module.exports = users_service