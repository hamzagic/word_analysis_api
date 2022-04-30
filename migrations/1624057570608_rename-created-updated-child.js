/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('child', 'createdAt', 'created_at');
    pgm.renameColumn('child', 'updatedAt', 'updated_at');
};

exports.down = pgm => {
    pgm.renameColumn('child', 'created_at', 'createdat');
    pgm.renameColumn('child', 'updated_at', 'updatedAt');
};
