/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('playlists_songs', {
		playlistId: {
	      type: 'VARCHAR(50)',
	      notNull: false,
	      references: '"playlists"',
	      onDelete: 'cascade',
	    },
	    songId: {
	      type: 'VARCHAR(50)',
	      notNull: false,
	      references: '"songs"',
	      onDelete: 'cascade',
	    },
	});
};

exports.down = pgm => {};
