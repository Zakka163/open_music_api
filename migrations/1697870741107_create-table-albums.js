
exports.up = pgm => {
	pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'INT',
      notNull: true,
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
  pgm.dropTable(`albums`)
};
