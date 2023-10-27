/* eslint-disable camelcase */


exports.up = pgm => {
	pgm.createTable('playlists_song_activities', {
	    id: {
	      type: 'VARCHAR',
	      primaryKey: true,
	    },
		playlistId: {
	      type: 'VARCHAR',
	      notNull: false,
	      references: '"playlists"',
	      onDelete: 'cascade',
	    },
	    userId: {
	      type: 'VARCHAR',
	      notNull: false,
	      references: '"users"',
	      onDelete: 'cascade',
	    },
	    songId: {
	      type: 'VARCHAR',
	      notNull: false,
	      references: '"songs"',
	      onDelete: 'cascade',
	    },
	    action: {
	      type: 'VARCHAR',
	      notNull: true,
	    },
	    time: {
	      type: 'VARCHAR',
	      notNull: true,
	    },
	});
};

exports.down = pgm => {};
