const addUserToDb = (req, res, knex, bcrypt) => {

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = {
      password: hash,
      username: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      gender: req.body.gender.toLowerCase(),
      postal_code: req.body.postal_code.toUpperCase(),
      address_lat: req.body.address_lat,
      address_lng: req.body.address_lng,
      min_top_size: parseInt(req.body.min_top_size),
      max_top_size: parseInt(req.body.max_top_size),
      min_bottom_size: parseInt(req.body.min_bottom_size),
      max_bottom_size: parseInt(req.body.max_bottom_size),
      min_shoe_size: parseInt(req.body.min_shoe_size),
      max_shoe_size: parseInt(req.body.max_shoe_size)
    };

    knex('users').insert(newUser).then(() => {
      res.send(true);
    }).catch((err) => {
      console.error(err);
      res.send(false);
    });
  });

};

module.exports = addUserToDb;
