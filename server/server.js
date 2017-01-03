'use strict';
// +---------------------+
// |    DEPENDENCIES     |
// +---------------------+
const express = require('express');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const session = require('express-session');
// const engine = require('ejs-locals');

// HEROKU CONFIG GOES INTO .ENV FILE
const connection = require('./db/knexfile.js').development;
const knex = require('knex')(connection);

// +---------------------+
// |       HELPERS       |
// +---------------------+

const updateUserPreferences = require('./helpers/update_user_preferences');
const getMainData = require('./helpers/get_main_data');
const insertUser = require('./helpers/add_user_to_db.js');
const createNewItem = require('./helpers/create_new_item');
const editItem = require('./helpers/edit_item.js');
const deleteItem = require('./helpers/delete_item.js');
const findSuggestedItems = require('./helpers/find_suggested_items.js');

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: "mailtrap.io",
  port: 2525,
  auth: {
    user: "12d82a5ce210c8",
    pass: "2b5b44e86ab965"
  }
});


// +---------------------+
// |      BLACKLIST      |
// +---------------------+

const blacklist = [
  '/index',
  '/user/:id',
  // '/api'
]


// +---------------------+
// |     MIDDLEWARE      |
// +---------------------+

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  // SECRET GOES INTO .ENV FILE
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(blacklist, (req, res, next) => {
if(req.session.username) {
    next();
  } else {
    const usernameError = false;
    const passwordError = false;
    res.render('pages/login', {
      usernameError: usernameError,
      passwordError: passwordError
    });
  }
});


// +---------------------+
// |        PORT         |
// +---------------------+

const PORT = process.env.PORT || 8080;


// ***********************
// ***********************
// +---------------------+
// |       ROUTES        |
// +---------------------+
// ***********************
// ***********************

// +---------------------+
// |     INDEX/ITEMS     |
// +---------------------+

// index route - get
app.get('/api/', (req, res) => {
  getMainData(res, knex, req.session.userId);
});

// index route - post
app.post('/api', (req, res) => {
  updateUserPreferences(req, res, knex, req.session.userId);
});

// Delete item route
app.delete('/api/items/:id', (req, res) => {
  deleteItem(req.params.id, res, knex, req.session.userId);
});

// New item route
app.post('/api/users/:id/new', (req, res) => {
  createNewItem(req, res, knex, req.session.userId);
});

// Edit item route - post
app.post('/api/users/:username/items/:id', (req, res) => {
  editItem(req, res, knex);
});



// +---------------------+
// |     USER'S PAGE     |
// +---------------------+

// app.get('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   // Passing back to view: user's items, user's sizes (editable)
//   knex('items').select().where('user_id', 11).asCallback((err, rows) => {
//     const templateVars = { currentUserItems: rows, currentUsername: req.session.username };
//     res.render('pages/user', templateVars)
//   })
// });



// +---------------------+
// |        LOGIN        |
// +---------------------+

// Login Route - Get
app.get('/api/login/check', (req, res) => {
  if(!req.session.username) {
    res.json({
      authorized: false,
    });
  } else {
    res.json({
      authorized: true,
      userId: req.session.userId,
      userName: req.session.username
    });
  }
});


// Login Route - Post
app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password) {
    const usernameError = true;
    const passwordError = false;
    res.send(false);
    return;
  }

  knex('users')
    .count('id')
    .where('username', username)
  .then((string) => {
    const int = parseInt(string[0].count);
    if (int === 0) {
      const usernameError = true;
      const passwordError = false;
      res.send(false);
    }
  })
  .then(() => {
    knex('users').select('password', 'id')
    .where('username', username)
    .then((user) => {
      if (user.length === 0) {
        return;
      }
      bcrypt.compare(password, user[0].password)
      .then((valid) => {
        if(valid) {
          req.session.username = username;
          req.session.userId = user[0].id;
          res.send(true);
        } else {
          const usernameError = false;
          const passwordError = true;
          res.send(false);
        }
      });
    })
  });
});


// +---------------------+
// |      REGISTER       |
// +---------------------+
app.post('/api/register', (req, res) => {
  insertUser(req, res, knex, bcrypt);
});

// +---------------------+
// |        LOGOUT       |
// +---------------------+

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('http://localhost:3000');
});


// ***********************
// ***********************
// +---------------------+
// |       LISTEN        |
// +---------------------+
// ***********************
// ***********************

app.listen(PORT, () => {
  console.log(`listening to http://localhost: ${PORT}`);
});


// +---------------------+
// |        OTHER        |
// +---------------------+

// link route
app.get('/api/suggestion', (req, res) => {
  findSuggestedItems(req, res, knex);
});


app.post('/api/email', (req, res) => {
  var mailOptions = {
    from: '"Fred Foo ?" <rajaghavami@gmail.com>', // sender address
    to: 'some@email.com', // list of receivers
    subject: 'Someone wants to trade with you!', // Subject line
    text: req.body.content, // plaintext body
    html: req.body.content // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
});


