
exports.up = pgm => {
	pgm.createTable('collaborations_playlist', {
		playlistId: {
	      type: 'VARCHAR(50)',
	      notNull: false,
	      references: '"playlists"',
	      onDelete: 'cascade',
	    },
	    userId: {
	      type: 'VARCHAR(50)',
	      notNull: false,
	      references: '"users"',
	      onDelete: 'cascade',
	    },
	});
};

exports.down = pgm => {};
