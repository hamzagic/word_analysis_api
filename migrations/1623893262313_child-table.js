/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('gender', {
        id: 'id',
        name: { type: 'varchar(30)', notNull: true, unique: true }
    }, { ifNotExists: true });
    pgm.createTable('age_range', {
        id: 'id',
        name: { type: 'varchar(10)', notNull: true, unique: true }
    }, {ifNotExists: true});
    pgm.createTable('child', {
        id: {type: 'uuid', primaryKey: true, unique: true},
        name: { type: 'varchar(255)', notNull: true},
        age_range_id: { type: 'integer', notNull: true},
        gender_id: { type: 'integer'},
        parent_id: {type: 'uuid', notNull: true, },
        createdAt: { type: 'integer', notNull: true },
        updatedAt: { type: 'integer' }
    }, {
        ifNotExists: true, 
        constraints: {
           foreignKeys: [
               {
                   columns: 'gender_id',
                   references: 'gender' 
               },
               {
                   columns: 'parent_id',
                   references: 'parent'
               },
               {
                   columns: 'age_range_id',
                   references: 'age_range'
               }
           ] 
        }
    });
};

exports.down = pgm => {};
