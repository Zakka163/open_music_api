
exports.up = (pgm) => {
	pgm.createTable('user_album_likes', {
		id: {
			type: 'VARCHAR',
			primaryKey: true
		},
		albumId: {
			type: 'VARCHAR',
			notNull: false,
			references: '"albums"',
			onDelete: 'cascade'
		},
		userId: {
			type: 'VARCHAR',
			notNull: false,
			references: '"users"',
			onDelete: 'cascade'
		}
	});
};

exports.down = (pgm) => {
	pgm.dropTable('user_album_likes');
};
