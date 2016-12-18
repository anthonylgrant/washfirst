exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("ALTER SEQUENCE tag_user_id_seq RESTART WITH 1;"),
    knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1;"),
    knex.raw("ALTER SEQUENCE items_id_seq RESTART WITH 1;"),
    knex.raw("ALTER SEQUENCE tags_id_seq RESTART WITH 1;")
  ]);
};