
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.string('postal_code');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('postal_code');
    })
  ]);
};
