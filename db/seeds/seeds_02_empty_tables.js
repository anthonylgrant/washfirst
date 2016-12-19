exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("DELETE FROM items WHERE 1=1;"),
    knex.raw("DELETE FROM users WHERE 1=1;"),
    knex.raw("DELETE FROM tags WHERE 1=1;")
  ]);
};
