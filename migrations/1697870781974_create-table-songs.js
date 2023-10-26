
exports.up = pgm => {
	pgm.createTable('songs', {
	    id: {
	      type: 'VARCHAR(50)',
	      primaryKey: true,
	    },
	    title: {
	      type: 'VARCHAR(50)',
	      notNull: true,
	    },
	    year: {
	      type: 'INT',
	      notNull: true,
	    },
	    genre: {
	      type: 'VARCHAR(50)',
	      notNull: true,
	    },
	    performer: {
	      type: 'VARCHAR(50)',
	      notNull: true,
	    },
	    duration: {
	      type: 'INT',
	      notNull: false,
	    },
	    albumId: {
	      type: 'VARCHAR(50)',
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
