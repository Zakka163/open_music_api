const client_error = require('../../exceptions/client_error')
const invariant_error = require('../../exceptions/invariant_error')
const not_found_error = require('../../exceptions/not_found_error')
const authorization_error = require('../../exceptions/authorization_error')
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const moment = require('moment')



class playlists_songs_service {
	constructor() {
		this._pool = new Pool()
	}

	async add_playlists_songs(playlist_id, song_id) {
		// await this.verify_songs(songId)
		const query = {
			text: 'INSERT INTO playlists_songs VALUES($1, $2 )',
			values: [playlist_id, song_id],
		};
		const result = await this._pool.query(query);
		console.log(result)
		if (!result.rowCount) {
			throw new invariant_error('playlists gagal ditambahkan');
		}

	}

	async get_playlists_songs(playlist_id) {
		const query = {
			text: `select s.id,s.title,s.performer from songs s join playlists_songs ps on ps."songId" = s.id where ps."playlistId" = $1 `,
			values: [playlist_id],
		};
		const result = await this._pool.query(query);
		if (!result.rows.length) {
			throw new not_found_error('songs tidak ditemukan')
		}
		return result.rows
	}


	async delete_playlists_songs(playlist_id, song_id) {
		// await this.verify_songs(songId)
		const query = {
			text: 'delete from playlists_songs ps  where ps."playlistId" = $1 and ps."songId" = $2',
			values: [playlist_id, song_id],
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new not_found_error('Gagal menghapus songs dari playlists');
		}
	}
	async verify_playlists_collab(playlist_id, user_id) {
		const query = {
			text: ` select p.*, array (select cp2."userId" from collaborations_playlist cp2 where cp2."playlistId" = p.id) as collab 
					from playlists p where p.id = $1 `,
			values: [playlist_id],
		};


		const result = await this._pool.query(query);
		console.log('user id :',user_id)
		console.log(result.rows)
		const playlist = result.rows[0]
		if (!result.rows.length) {
			throw new not_found_error('playlists tidak ditemukan')
		}
		let check_authorization = result.rows[0].collab.find((value) => value == user_id )
		// console.log(check_authorization)
			// false true
		if(!check_authorization && user_id !== playlist.owner){
			throw new authorization_error('Anda tidak berhak mengakses resource ini')
		}
		// console.log(check_authorization)

	}

	// async verify_songs(id){
	// 	const query = {
	// 		text: 'select * from songs s where s.id = $1',
	// 		values: [ id ],
	// 	};
	// 	const result = await this._pool.query(query);
	// 	console.log(result)
	// 	if (!result.rows.length > 0) {
	//       throw new not_found_error('songs tidak ditemukan');
	//     }
	// }
}

module.exports = playlists_songs_service