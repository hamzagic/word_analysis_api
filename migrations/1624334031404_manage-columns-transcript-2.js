/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('transcript', 'transcript_hour', 'transcript_time');
    pgm.alterColumn('transcript', 'transcript_time', {type: "varchar(4)"});
};

exports.down = pgm => {};
