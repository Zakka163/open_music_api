exports.up = pgm => {
	pgm.createTable('users', {
	    id: {
	      type: 'VARCHAR',
	      primaryKey: true,
	    },
	    username: {
	      type: 'VARCHAR',
	      notNull: true,
	      unique: true,
	    },
	    password: {
	      type: 'TEXT',
	      notNull: true,
	    },
	    fullname: {
	      type: 'TEXT',
	      notNull: true,
	    },
	});
};

exports.down = pgm => {
	pgm.dropTable('users');
};
