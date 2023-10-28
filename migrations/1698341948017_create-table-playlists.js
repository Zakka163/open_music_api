exports.up = (pgm) => {
	pgm.createTable('playlists', {
		id: {
			type: 'VARCHAR',
			primaryKey: true
		},
		name: {
			type: 'TEXT',
			notNull: true
		},
		owner: {
			type: 'VARCHAR',
			notNull: false,
			references: '"users"',
			onDelete: 'cascade'
		}
	});
};

exports.down = (pgm) => {
	pgm.dropTable('playlists');
};
