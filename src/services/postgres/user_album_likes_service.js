const invariant_error = require('../../exceptions/invariant_error');
const not_found_error = require('../../exceptions/not_found_error');
const { nanoid } = require('nanoid');
const { Pool } = require('pg');



class user_album_likes_service {
	constructor(cache_service) {
		this._pool = new Pool();
		this._cache_service = cache_service;
	}


	async add_user_album_likes(album_id, user_id) {
		await this.check_user_likes(album_id, user_id);
		const query = {
			text: 'insert into user_album_likes values($1, $2, $3) returning id',
			values: [nanoid(20), album_id, user_id]
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new invariant_error('user_album_likes gagal ditambahkan');
		}

		await this._cache_service.delete(`likes:${album_id}`);

		return result.rows[0].id;
	}
	async delete_user_album_likes(album_id, user_id) {
		const query = {
			text: 'delete from user_album_likes ual  where ual."albumId" = $1 and ual."userId" = $2',
			values: [album_id, user_id]
		};
		const result = await this._pool.query(query);
		if (!result.rowCount) {
			throw new not_found_error('Gagal menghapus user_album_likes');
		}

		await this._cache_service.delete(`likes:${album_id}`);
	}

	async get_user_album_likes(album_id) {
		try {

			const result = await this._cache_service.get(`likes:${album_id}`);
			return {
				jumlah: parseInt(result),
				is_cache: true
			};

		}
		catch (error) {
			const query = {
				text: 'select count(*)::INTEGER as jumlah from user_album_likes ual join albums a on a.id = ual."albumId" where a.id = $1',
				values: [album_id]
			};
			const result = await this._pool.query(query);
			await this._cache_service.set(`likes:${album_id}`, result.rows[0].jumlah);
			result.rows[0].is_cache = false;
			return result.rows[0];
		}


	}
	async check_user_likes(album_id, user_id) {
		const query = {
			text: 'select * from user_album_likes ual  where ual."albumId" = $1 and ual."userId" = $2',
			values: [album_id, user_id]
		};
		const result = await this._pool.query(query);
		if (result.rows.length > 0) {
			throw new invariant_error('user sudah like album');
		}
	}
}

module.exports = user_album_likes_service;
