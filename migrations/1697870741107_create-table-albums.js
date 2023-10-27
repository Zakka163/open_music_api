exports.up = pgm => {
	pgm.createTable('albums', {
    id: {
      type: 'VARCHAR',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR',
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
