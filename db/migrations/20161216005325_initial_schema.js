
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (t) => {
      t.increments('id');
      t.string('username').notNullable();
      t.string('password').notNullable();
      t.string('email').notNullable();
      t.string('phone_number');
      t.timestamps();
    }),

    knex.schema.createTableIfNotExists('tags', (t) => {
      t.increments('id');
      t.string('content', 32).notNullable();
    }),

    knex.schema.createTableIfNotExists('items', (t) => {
      t.increments('id');
      t.string('type').notNullable();
      t.string('size').notNullable();
      t.string('description', 140).notNullable();
      t.integer('user_id').references('users.id');
    }),

    knex.schema.createTableIfNotExists('tag_user', (t) => {
      t.increments('id');
      t.integer('user_id').references('users.id');
      t.integer('tag_id').references('tags.id');
    }),

    knex.schema.createTableIfNotExists('item_tag', (t) => {
      t.increments('id');
      t.integer('tag_id').references('tags.id');
      t.integer('item_id').references('items.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tag_user'),
    knex.schema.dropTable('item_tag'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('users')
  ]);
};
