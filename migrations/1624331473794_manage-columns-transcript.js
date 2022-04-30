/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropColumns('transcript', 'transcript_date', {ifExists: true});
    pgm.addColumns('transcript', {
        transcript_date: { type: "integer", notNull: true },
        transcript_hour: { type: "varchar(4)", notNull: true }
    }, {
        ifNotExists: false
    })
};

exports.down = pgm => {};
