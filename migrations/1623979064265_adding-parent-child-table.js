/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('parent_child', {
        parent_id: { type: 'uuid', notNull: true },
        child_id: { type: 'uuid', notNull: true }
    }, {
        ifNotExists: true,
        constraints: {
            foreignKeys: [
                {
                    columns: "parent_id",
                    references: "parent"
                },
                {
                    columns: "child_id",
                    references: "child"
                }
            ],
            primaryKey: ["parent_id", "child_id"]
        }
    })
};

exports.down = pgm => {};
