/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('parent', 'createdat', 'created_at');
    pgm.renameColumn('parent', 'updatedAt', 'updated_at');
};

exports.down = pgm => {
    pgm.renameColumn('parent', 'created_at', 'createdat');
    pgm.renameColumn('parent', 'updated_at', 'updatedAt');
};
