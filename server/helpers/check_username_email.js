const checkUserNameAndEmail = (req, res, knex) => {
  knex('users').where(req.body.column, req.body.value).then((rows) => {
    let response = {};
    response[`available_${req.body.column}`] = rows[0] ? false : true;
    res.send(response);
  }).catch((err) => {
    res.send(err);
  });
}

module.exports = checkUserNameAndEmail;
