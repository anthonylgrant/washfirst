
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (t) => {
      t.increments('id');
      t.string('username').notNullable().unique();
      t.string('password').notNullable();
      t.string('email').notNullable().unique();
      t.string('phone_number');
      t.string('gender');
      t.string('type');
      t.integer('min_top_size');
      t.integer('max_top_size');
      t.integer('min_size');
      t.integer('max_size');
      t.integer('min_shoe_size');
      t.integer('max_shoe_size');
      t.integer('min_bottom_size');
      t.integer('max_bottom_size');
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
      t.string('gender').notNullable();
      t.integer('size').notNullable();
      t.string('description', 140).notNullable();
      t.string('img_url').notNullable();
      t.integer('user_id').references('users.id');
      t.string('tsv');
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
