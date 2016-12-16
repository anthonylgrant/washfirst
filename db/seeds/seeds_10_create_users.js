let users = [];

exports.seed = function(knex, Promise) {
  for (let i = 0; i < 10; i++) {
    users.push(knex('users').insert({ username: `user_${i}`, password: `password_${i}`, email: `email_${i}`, phone_number: `111-111-1${i}` }));
  }

  users.push(knex('users').orderBy('id'));

  return Promise.all(users);

};