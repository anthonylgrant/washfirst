
function updateUserSizes(req, res, knex, userId) {
const newSizes = Object.assign({}, req.body, {
  gender: parseInt(req.body.gender),
  min_top_size: parseInt(req.body.min_top_size),
  max_top_size: parseInt(req.body.max_top_size),
  min_bottom_size: parseInt(req.body.min_bottom_size),
  max_bottom_size: parseInt(req.body.max_bottom_size),
  min_shoe_size: parseInt(req.body.min_shoe_size),
  max_shoe_size: parseInt(req.body.max_shoe_size)
});

console.log("newSizes: @@@@@@", newSizes);

  knex('users').where('id', userId).update(newSizes).then(() => {
    res.send('user sizes updated');
  });
}

module.exports = updateUserSizes;
