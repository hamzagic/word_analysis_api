/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns(
    "transcript",
    {
      parent_id: { type: "uuid", notNull: true },
      child_id: { type: "uuid", notNull: true },
      transcript_media_uri: { type: "varchar(255)", notNull: true },
    },
    {
      ifNotExists: true,
      constraints: {
        foreignKeys: [
          {
            columns: "parent_id",
            references: "parent",
          },
          {
            columns: "child_id",
            references: "child",
          },
        ],
      },
    }
  );
  pgm.renameColumn("transcript", "transcriptJobName", "transcript_job_name");
  pgm.renameColumn(
    "transcript",
    "transcript_original_url",
    "transcript_s3_url"
  );
  pgm.dropColumns("transcript", "recording_id");
};

exports.down = (pgm) => {};
