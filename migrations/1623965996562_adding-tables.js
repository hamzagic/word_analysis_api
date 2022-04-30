/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('word_category', {
        id: {type: 'smallserial', primaryKey: true, notNull: true},
        category_name: { type: 'varchar(30)', notNull: true, unique: true },
        category_status: { type: 'varchar(30)' } 
    }, {
        ifNotExists: true
    });
    pgm.createTable('status', {
        id: 'id',
        status_name: { type: 'varchar(30)', notNull: true, unique: true }
    }, {
        ifNotExists: true,
        primaryKey: 'id'
    });
    pgm.createTable('word', {
        id: 'id',
        word_name: { type: 'varchar(100)', notNull: true, unique: true },
        word_category_id: { type: 'integer', notNull: true },
        word_description: { type: 'text', notNull: true },
        word_image_url: { type: 'varchar(255)' },
        word_status: { type: 'varchar(30)' }
    })
};

exports.down = pgm => {};
