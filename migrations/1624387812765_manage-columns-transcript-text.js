/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('transcript', {
        transcript_text: { type: "text" }
    }, {
        ifNotExists: true
    })
};

exports.down = pgm => {
    pgm.dropColumn('transcript', 'transcript_text');
};
