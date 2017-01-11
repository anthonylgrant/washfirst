
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('items', (table) => {
      table.timestamp('item_created_at').notNullable().defaultTo(knex.raw('now()'));
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('items', (table) => {
      table.dropColumn('item_created_at');
    })
  ]);
};
