/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('child', {
        child_status: { type: "varchar(30)", notNull: true, default: "active" }
    }, {
        ifNotExists: true
    });
    pgm.addColumns('gender', {
        gender_status: { type: "varchar(30)", notNull: true, default: "active" }
    }, {
        ifNotExists: true
    });
    pgm.addColumns('age_range', {
        age_range_status: { type: "varchar(30)", notNull: true, default: "active" }
    }, {
        ifNotExists: true
    });
    pgm.alterColumn('parent', 'status', { default: 'active' });
    pgm.alterColumn('word', 'word_status', { default: 'active' });
    pgm.alterColumn('word_category', 'category_status', { default: 'active' });
};

exports.down = pgm => {};
