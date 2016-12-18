exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("DELETE FROM tag_user WHERE 1=1"),
    knex.raw("DELETE FROM item_tag WHERE 1=1")
  ]);
};
