
exports.up = pgm => {
	pgm.createTable('collaborations_playlist', {
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
	});
};

exports.down = pgm => {};
