/*

  ADDS USER TO DATABASE

  userObject = {
    username,
    password,
    email,
    phone_number,
    gender,
    min_top_size,
    max_top_size,
    min_bottom_size,
    max_bottom_size,
    min_shoe_size,
    max_shoe_size
  }

*/
const config = require('./knex_config.json');
const knex = require('knex')({ client: 'pg', connection: config });

function addUserToDb(user) {
  console.log('user', user)
  knex('users').insert(user).then(() => {
    console.log('done')
  })
}

module.exports = addUserToDb;
