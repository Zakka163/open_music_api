const client_error = require('../../exceptions/client_error')
const invariant_error = require('../../exceptions/invariant_error')
const not_found_error = require('../../exceptions/not_found_error')
const authorization_error = require('../../exceptions/authorization_error')
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const moment = require('moment')



class collaborations_playlist_service {
	constructor() {
		this._pool = new Pool()
	}

	async add_collaborations_playlist({playlistId, userId}) {
		const query = {
			text: 'INSERT INTO collaborations_playlist VALUES($1, $2, $3 ) RETURNING id',
			values: [ nanoid(20),playlistId, userId ],
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new invariant_error('collaborations_playlist gagal ditambahkan');
		}
		return result.rows[0].id;

	}

	async delete_collaborations_playlist({playlistId, userId}) {
		const query = {
			text: 'delete from collaborations_playlist ps  where ps."playlistId" = $1 and ps."userId" = $2',
			values: [playlistId, userId],
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new not_found_error('Gagal menghapus collaborations_playlist');
		}
	}

}

module.exports = collaborations_playlist_service