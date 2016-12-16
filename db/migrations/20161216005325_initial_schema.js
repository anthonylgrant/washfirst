
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', (t) => {
    t.increments();
    t.string('username');
    t.string('password');
    t.string('email');
    t.string('phone_number');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
