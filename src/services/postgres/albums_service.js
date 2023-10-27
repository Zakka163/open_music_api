const invariant_error = require('../../exceptions/invariant_error');
const not_found_error = require('../../exceptions/not_found_error');
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const moment = require('moment');



class albums_service {
	constructor() {
		this._pool = new Pool();
	}


	async add_albums({ name, year }) {
		const createdAt = moment();
		const query = {
			text: 'insert into albums values($1, $2, $3, $4,$5) returning id',
			values: [nanoid(14), name, year, createdAt, createdAt]
		};

		const result = await this._pool.query(query);
		if (!result.rows[0].id) {
			throw new invariant_error('Albums gagal ditambahkan');
		}

		return result.rows[0].id;
	}

	async get_albums_by_id(id) {
		const query = {
			text: 'select * from albums a where a.id = $1',
			values: [id]
		};
		const query1 = {
			text: 'select * from songs s where s."albumId" = $1',
			values: [id]
		};
		const result = await this._pool.query(query);
		const songs_result = await this._pool.query(query1);



		if (!result.rows.length) {
			throw new not_found_error('Albums tidak ditemukan');
		}

		result.rows[0].songs = songs_result.rows;

		return result.rows;
	}

	async edit_albums(id, { name, year }) {
		const updatedAt = moment();
		const query = {
			text: 'update albums set "name" = $1, "year" = $2, "updatedAt" = $3 where id = $4 returning *',
			values: [name, year, updatedAt, id]
		};

		const result = await this._pool.query(query);

		if (!result.rowCount) {
			throw new not_found_error('Gagal memperbarui albums. Id tidak ditemukan');
		}

		return result.rows;
	}
	async delete_albums(id) {
		const query = {
			text: 'delete from albums where id = $1',
			values: [id]
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new not_found_error('Gagal menghapus album. Id tidak ditemukan');
		}
	}
}

module.exports = albums_service;
