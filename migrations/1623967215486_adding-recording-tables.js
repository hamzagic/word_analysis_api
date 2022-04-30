/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    "recording",
    {
      id: "id",
      parent_id: { type: "uuid", notNull: true },
      child_id: { type: "uuid", notNull: true },
      recording_original_url: { type: "varchar(255)", notNull: true },
      recording_duration: { type: "integer" },
      recording_date: { type: "timestamp", notNull: true },
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
  pgm.createTable('transcript', {
      id: 'id',
      recording_id: { type: 'integer', notNull: true },
      transcript_original_url: { type: 'varchar(255)', notNull: true },
      transcriptJobName: { type: 'varchar(255)', notNull: true, unique: true }
  }, {
      ifNotExists: true,
      constraints: {
          foreignKeys: [
              {
                  columns: "recording_id",
                  references: "recording"
              }
          ]
      }
  });
  pgm.createTable('result', {
    id: 'id',
    result_name: {type: 'varchar(30)', notNull: true, unique: true },
    result_status: { type: 'varchar(30)'}
}, {
    ifNotExists: true
});
  pgm.createTable('transcript_report', {
      id: 'id',
      recording_id: { type: 'integer', notNull: true },
      transcript_id: { type: 'integer', notNull: true },
      word_id: { type: 'integer', notNull: true },
      speech_result_id: { type: 'integer', notNull: true }
  }, {
      ifNotExists: true,
      constraints: {
          foreignKeys: [
              {
                 columns: "recording_id",
                 references: "recording" 
              },
              {
                  columns: "transcript_id",
                  references: "transcript"
              },
              {
                  columns: "word_id",
                  references: "word"
              },
              {
                  columns: "speech_result_id",
                  references: "result"
              }
          ]
      }
  });
};

exports.down = (pgm) => {};
