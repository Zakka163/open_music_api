const client_error = require('../../exceptions/client_error')
const invariant_error = require('../../exceptions/invariant_error')
const not_found_error = require('../../exceptions/not_found_error')
const authorization_error = require('../../exceptions/authorization_error')
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const moment = require('moment')



class collaborations_playlist_service{
	constructor(){
		this._pool = new Pool()
	}

	async add_collaborations_playlist({playlistId,userId}){
		const query = {
	      text: 'INSERT INTO collaborations_playlist VALUES($1, $2 )',
	      values: [ playlistId,userId ],
	    };
	    const result = await this._pool.query(query);
	    console.log(result)
	    if (!result.rowCount) {
	      throw new invariant_error('collaborations_playlist gagal ditambahkan');
	    }

	}

	async get_collaborations_playlist(playlistId){
		const query = {
	      text: `select s.id,s.title,s.performer from songs s join collaborations_playlist ps on ps."songId" = s.id where ps."playlistId" = $1 `,
	      values: [ playlistId ],
	    };
	    const result = await this._pool.query(query);
	    if (!result.rows.length){
			throw new not_found_error('songs tidak ditemukan')
		}
		return result.rows
	}


	async delete_collaborations_playlist(playlistId,{songId}){
		await this.verify_songs(songId)
		const query = {
	      text: 'delete from collaborations_playlist ps  where ps."playlistId" = $1 and ps."songId" = $2',
	      values: [ playlistId,songId ],
	    };
	    const result = await this._pool.query(query);
	    if (!result.rowCount) {
	      throw new not_found_error('Gagal menghapus songs dari playlists');
	    }
	}

	async verify_songs(id){
		const query = {
			text: 'select * from songs s where s.id = $1',
			values: [ id ],
		};
		const result = await this._pool.query(query);
		console.log(result)
		if (!result.rows.length > 0) {
	      throw new not_found_error('songs tidak ditemukan');
	    }
	}
}

module.exports = collaborations_playlist_service