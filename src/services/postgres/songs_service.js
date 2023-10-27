const client_error = require('../../exceptions/client_error')
const invariant_error = require('../../exceptions/invariant_error')
const not_found_error = require('../../exceptions/not_found_error')
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const moment = require('moment')



class songs_service {
	constructor() {
		this._pool = new Pool()
	}


	async add_songs({ title, year, genre, performer, duration, albumId }) {
		const createdAt = moment()
		const updatedAt = createdAt;
		const query = {
			text: 'INSERT INTO songs VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9 ) RETURNING id',
			values: [nanoid(20), title, year, genre, performer, duration, albumId, createdAt, updatedAt],
		};

		const result = await this._pool.query(query);
		if (!result.rows[0].id) {
			throw new invariant_error('songs gagal ditambahkan');
		}

		return result.rows[0].id;

	}

	async get_songs({ title, performer }) {
		const value = []
		let text = ''
		let count = 1
		if (title) {
			text += ` and s.title ilike $${count} `
			value.push(`%${title}%`)
			count++
		}
		if (performer) {
			text += ` and s.performer ilike $${count} `
			value.push(`%${performer}%`)
		}
		const query = {
			text: `select s.id, s.title,s.performer from songs s where true ${text}`,
			values: value,
		};

		const result = await this._pool.query(query)
		return result.rows
	}

	async get_songs_by_id(song_id) {
		const query = {
			text: `select * from songs s where s.id = $1`,
			values: [song_id]
		}
		const result = await this._pool.query(query)

		if (!result.rows.length) {
			throw new not_found_error('songs tidak ditemukan')
		}
		return result.rows[0]
	}

	async edit_songs(id, { title, year, genre, performer, duration, albumId }) {
		const updatedAt = moment();
		const query = {
			text: 'update songs set "title" = $1 ,"year" = $2,"genre" = $3, "performer" = $4,"duration" = $5 , "updatedAt" =$6 where id = $7 returning *',
			values: [title, year, genre, performer, duration, updatedAt, id],
		};

		// console.log(query)
		const result = await this._pool.query(query);
		// console.log(result)
		if (!result.rowCount) {
			throw new not_found_error('Gagal memperbarui songs. Id tidak ditemukan');
		}

		return result.rows
	}
	async delete_songs(id) {
		const query = {
			text: 'delete from songs where id = $1',
			values: [id],
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new not_found_error('Gagal menghapus songs. Id tidak ditemukan');
		}
	}
}

module.exports = songs_service