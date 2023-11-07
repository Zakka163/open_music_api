exports.up = (pgm) => {
	pgm.createTable('authentications', {
		id: {
			type: 'VARCHAR',
			primaryKey: true
		},
		token: {
			type: 'TEXT',
			notNull: true
		}
	});
};

exports.down = (pgm) => {
	pgm.dropTable('authentications');
};
