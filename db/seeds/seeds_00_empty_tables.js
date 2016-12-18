exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw("DELETE FROM tag_user WHERE 1=1")
  ]);
};
