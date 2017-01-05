/*

  ADDS USER TO DATABASE

  userObject = {
    username,
    password,
    email,
    postal_code,
    gender,
    min_top_size,
    max_top_size,
    min_bottom_size,
    max_bottom_size,
    min_shoe_size,
    max_shoe_size
  }

*/
// const config = require('./knex_config.json');
// const knex = require('knex')({ client: 'pg', connection: config });

function addUserToDb(req, res, knex, bcrypt) {

  bcrypt.hash(req.body.password, 10).then(function(hash) {
    const newUser = Object.assign({}, req.body, {
      password: hash,
      min_top_size: parseInt(req.body.min_top_size),
      max_top_size: parseInt(req.body.max_top_size),
      min_bottom_size: parseInt(req.body.min_bottom_size),
      max_bottom_size: parseInt(req.body.max_bottom_size),
      min_shoe_size: parseInt(req.body.min_shoe_size),
      max_shoe_size: parseInt(req.body.max_shoe_size)
    });

    knex('users').insert(newUser).then(() => {
      res.send("new user added");
    });
  });

}

module.exports = addUserToDb;
