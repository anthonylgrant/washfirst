
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (t) => {
      t.increments('id');
      t.string('username').notNullable().unique();
      t.string('password').notNullable();
      t.string('email').notNullable().unique();
      t.string('phone_number');
      t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    }),

    knex.schema.createTableIfNotExists('tags', (t) => {
      t.increments('id');
      t.string('category', 32);
      t.string('content', 32).notNullable().unique();
    }),

    knex.schema.createTableIfNotExists('items', (t) => {
      t.increments('id');
      t.string('type').notNullable();
      t.string('size').notNullable();
      t.string('description', 140).notNullable();
      t.string('image').notNullable();
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


// top categories
//    - style: [user entry]
//    - color: [user entry]
//    -