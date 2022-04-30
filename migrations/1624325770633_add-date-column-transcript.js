/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('transcript', {
        transcript_date: { type: "timestamp" }
    }, { ifNotExists: true })
};

exports.down = pgm => {};
