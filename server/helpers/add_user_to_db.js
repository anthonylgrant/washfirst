const addUserToDb = (req, res, knex, bcrypt) => {

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = Object.assign({}, req.body, {
      password: hash,
      username: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      min_top_size: parseInt(req.body.min_top_size),
      max_top_size: parseInt(req.body.max_top_size),
      min_bottom_size: parseInt(req.body.min_bottom_size),
      max_bottom_size: parseInt(req.body.max_bottom_size),
      min_shoe_size: parseInt(req.body.min_shoe_size),
      max_shoe_size: parseInt(req.body.max_shoe_size)
    });

    knex('users').insert(newUser).then(() => {
      res.send(true);
    }).catch((err) => {
      res.send(false);
    });
  });

};

module.exports = addUserToDb;
