/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('parent', {
        id: {type: 'uuid', primaryKey: true, unique: true},
        first_name: { type: 'varchar(50)', notNull: true},
        last_name: { type: 'varchar(50)', notNull: true},
        email: { type: 'varchar(100)', notNull: true, unique: true},
        password: { type: 'varchar(255)', notNull: true},
        status: { type: 'varchar(30)'},
        createdat: { type: 'integer', notNull: true },
        updatedAt: { type: 'integer' }
    }, {ifNotExists: true});
};

exports.down = pgm => {
    pgm.dropTable('parent', {ifExists: true});
};
