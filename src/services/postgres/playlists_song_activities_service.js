const invariant_error = require('../../exceptions/invariant_error');
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const moment = require('moment');



class playlists_song_activities_service {
	constructor() {
		this._pool = new Pool();
	}

	async get_playlists_song_activities(playlist_id) {
		const query = {
			text: 'select u.username,s.title,ps.action,ps.time from playlists_song_activities ps  join users u on u.id = ps."userId" join songs s on s.id = ps."songId" where ps."playlistId" = $1 order by  ps."time" asc',
			values: [playlist_id]
		};
		const result = await this._pool.query(query);
		return result.rows;

	}
	async add_playlists_song_activities(playlist_id,user_id,song_id,action) {
		const query = {
			text: 'insert into playlists_song_activities values($1, $2, $3,$4,$5,$6) returning id',
			values: [nanoid(20),playlist_id,user_id,song_id,action,moment().toString()]
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new invariant_error('playlists_song_activities gagal ditambahkan');
		}

		console.log(action);


		return result.rows[0].id;
	}

}

module.exports = playlists_song_activities_service;
