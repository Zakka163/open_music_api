const client_error = require('../../exceptions/client_error')
const invariant_error = require('../../exceptions/invariant_error')
const not_found_error = require('../../exceptions/not_found_error')
const authorization_error = require('../../exceptions/authorization_error')
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const moment = require('moment')



class playlists_service {
	constructor() {
		this._pool = new Pool()
	}

	async add_playlists(owner, { name }) {
		const query = {
			text: 'INSERT INTO playlists VALUES($1, $2, $3 ) RETURNING id',
			values: [nanoid(20), name, owner],
		};
		const result = await this._pool.query(query);
		if (!result.rows[0].id) {
			throw new invariant_error('playlists gagal ditambahkan');
		}

		return result.rows[0].id;
	}

	async get_playlists(owner) {
		const query = {
			text: `	select p.id,p.name,u.username from playlists p 
					join collaborations_playlist cp on cp."playlistId" = p.id
					join users u on u.id = p."owner" 
					where cp."userId"  = $1 or p.id = $1`,
			values: [owner],
		};
		const result = await this._pool.query(query);
		console.log(result.rows,"id : ",owner)
		// if (!result.rows.length) {
		// 	throw new not_found_error('playlists tidak ditemukan')
		// }
		return result.rows
	}

	async get_playlists_by_id(playlist_id) {
		const query = {
			text: 'select p.id,p.name,u.username from playlists p join public.users u  on u."id" = p.owner where p.id= $1',
			values: [playlist_id],
		};
		const result = await this._pool.query(query);
		if (!result.rows.length) {
			throw new not_found_error('playlists tidak ditemukan')
		}
		return result.rows[0]
	}
	async delete_playlists(playlist_id) {
		const query = {
			text: 'delete from playlists where id = $1',
			values: [playlist_id],
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new not_found_error('Gagal menghapus playlists. Id tidak ditemukan');
		}
	}
	async verify_playlists_owner(playlist_id, owner) {
		const query = {
			text: 'select * from playlists p where p.id = $1',
			values: [playlist_id],
		};
		const result = await this._pool.query(query);
		if (!result.rows.length) {
			throw new not_found_error('playlists tidak ditemukan')
		}
		const playlist = result.rows[0]
		if (owner !== playlist.owner) {
			throw new authorization_error('Anda tidak berhak mengakses resource ini')
		}

	}
}

module.exports = playlists_service