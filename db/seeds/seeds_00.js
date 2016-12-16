exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return function () {
      return Promise.all([
        // Inserts seed entries
        // knex.raw("DELETE FROM items WHERE 1=1;"),
        // knex.raw("DELETE FROM users WHERE 1=1;")
        // knex('items').where(1, 1).del(),
        // knex('users').where(1, 1).del()
        // knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1;"),
        // knex('users').insert({ username: "user_1", password: 'password_1', email: "email_1", phone_number: "111-111-1111" }),
        // knex('users').insert({ username: "user_2", password: 'password_2', email: "email_2", phone_number: "111-111-1112" }),
        // knex('users').insert({ username: "user_3", password: 'password_3', email: "email_3", phone_number: "111-111-1113" })
      ]);
    };
};