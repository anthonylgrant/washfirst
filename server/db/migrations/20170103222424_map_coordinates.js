
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.float('address_lat', 8, 5);
      table.float('address_lng', 8, 5);
    }),

    knex.schema.table('items', (table) => {
      table.dropColumn('tsv');
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('address_lat');
      table.dropColumn('address_lng');
    }),

    knex.schema.table('items', (table) => {
      table.string('tsv');
    })

  ]);
};