/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('albums', {
    coverUrl: {
      type: 'VARCHAR'
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('albums', 'cover');
};
