
exports.up = function(knex, Promise) {
  knex.schema.createTableIfNotExists('users')
};

exports.down = function(knex, Promise) {

};
