
function updateUserSizes(req, res, knex, userId) {
  const newSizes = Object.assign({}, req.body, {
    gender: req.body.gender,
    min_top_size: parseInt(req.body.min_top_size),
    max_top_size: parseInt(req.body.max_top_size),
    min_bottom_size: parseInt(req.body.min_bottom_size),
    max_bottom_size: parseInt(req.body.max_bottom_size),
    min_shoe_size: parseInt(req.body.min_shoe_size),
    max_shoe_size: parseInt(req.body.max_shoe_size)
  });

  knex('users').where('id', userId).update(newSizes).then(() => {
    res.send(true);
  }).catch((err) => {
    console.error(err);
    res.send(false);
  });
}

module.exports = updateUserSizes;
