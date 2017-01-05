
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('min_size');
      table.dropColumn('max_size');
      table.dropColumn('type');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.integer('min_size');
      table.integer('max_size');
      table.string('type');
    })
  ]);
};
