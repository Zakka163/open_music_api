exports.up = pgm => {
	pgm.createTable('playlists_songs', {
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
	    songId: {
	      type: 'VARCHAR',
	      notNull: false,
	      references: '"songs"',
	      onDelete: 'cascade',
	    },
	});
};

exports.down = pgm => {
	pgm.dropTable('playlists_songs')
};
