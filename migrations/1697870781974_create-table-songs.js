exports.up = pgm => {
	pgm.createTable('songs', {
	    id: {
	      type: 'VARCHAR',
	      primaryKey: true,
	    },
	    title: {
	      type: 'VARCHAR',
	      notNull: true,
	    },
	    year: {
	      type: 'INT',
	      notNull: true,
	    },
	    genre: {
	      type: 'VARCHAR',
	      notNull: true,
	    },
	    performer: {
	      type: 'VARCHAR',
	      notNull: true,
	    },
	    duration: {
	      type: 'INT',
	      notNull: false,
	    },
	    albumId: {
	      type: 'VARCHAR',
	      notNull: false,
	      references: '"albums"',
	      onDelete: 'cascade',
	    },
	    createdAt: {
	      type: 'DATE',
	      notNull: true,
	    },
	    updatedAt: {
	      type: 'DATE',
	      notNull: true,
	    },
	});
};

exports.down = pgm => {
	pgm.dropTable(`songs`)
};
