// let seeds = [];


// exports.seed = function(knex, Promise) {

//   function populateSeeds () {
//     seeds.push(knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1;"));
//     for (let i = 0; i < 5; i++) {
//       seeds.push(knex('users').insert({
//         username: `user_${i}`,
//         password: `password_${i}`,
//         email: `email_${i}`,
//         phone_number: `number_${i}`
//       }));
//     }
//   }

//   populateSeeds();


//   knex('items').del()
//     .then(
//       knex('users').del()
//     )
//     .then(function () {
//       return Promise.all(
//         seeds
//       );
//     });
// };


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return function () {
      return Promise.all([
        // Inserts seed entries
        // knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1;"),
        knex('users').insert({ username: "user_1", password: 'password_1', email: "email_1", phone_number: "111-111-1111" }),
        knex('users').insert({ username: "user_2", password: 'password_2', email: "email_2", phone_number: "111-111-1112" }),
        knex('users').insert({ username: "user_3", password: 'password_3', email: "email_3", phone_number: "111-111-1113" })
      ]);
    };
};