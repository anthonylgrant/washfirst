'use strict';
// +---------------------+
// |    DEPENDENCIES     |
// +---------------------+
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// const dbConfig = require('../server/db/config_local');
// const knex = require('knex')({
//   client: 'pg',
//   connection: dbConfig,
//   pool: {
//     min: 2,
//     max: 16
//   }
// });


// const bcrypt = require('bcrypt');
// const session = require('express-session');
const bcrypt = require('bcrypt');
const session = require('express-session');

// HEROKU CONFIG GOES INTO .ENV FILE
const connection = require('./db/knexfile.js').development;
const knex = require('knex')(connection);

// +---------------------+
// |       HELPERS       |
// +---------------------+
const getTags = require('./helpers/get_tags.js');
const getResultsFromDb = require('../_behzad/query_simple');

const processUserQuery = require('../_behzad/process_user_query');

const insertUser = require('./helpers/add_user_to_db.js');



// +---------------------+
// |      BLACKLIST      |
// +---------------------+

const blacklist = [
  '/index',
  '/user/:id',
  '/api/items'
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
    res.render('pages/login');
  }
});


// +---------------------+
// |     VIEW ENGINE     |
// +---------------------+

app.set('view engine', 'ejs');


// +---------------------+
// |        PORT         |
// +---------------------+

const PORT = process.env.PORT || 8080;


//          ToDO

  // Authentication
    // -BlackList
    // -Middleware
    // -Sessions
    // -bCrypt
    // -instructions for form names
    // -env files


// ***********************
// ***********************
// +---------------------+
// |       ROUTES        |
// +---------------------+
// ***********************
// ***********************

// ***********************
// ***********************
// +---------------------+
// |         GET         |
// +---------------------+

// +---------------------+
// |     INDEX/ITEMS     |
// +---------------------+


// app.get('/api/items', function (req, res) {
//     getResultsFromDb(res);
// });




// +---------------------+
// |     USER'S PAGE     |
// +---------------------+

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Passing back to view: user's items, user's sizes (editable)
  res.json({})
})


// +---------------------+
// |        LOGIN        |
// +---------------------+

app.get('/login', (req, res) => {
  res.render('pages/login');
})


// +---------------------+
// |      REGISTER       |
// +---------------------+


app.get('/register', (req, res) => {
  res.render('pages/signup')
})


// ***********************
// ***********************
// +---------------------+
// |        POST         |
// +---------------------+

// +---------------------+
// |        LOGIN        |
// +---------------------+

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // username: nodemon, password: asdf = true
  knex('users').select('password')
  .where('username', username)
  .then((hash) => {
    bcrypt.compare(password, hash[0].password).then(function(valid) {
      console.log('valid: ', valid);
      if(valid) {
        req.session.username = username;
        res.redirect('http://localhost:3000');
      } else {
        res.render('pages/login');
      }
    });
  });
});


// +---------------------+
// |      REGISTER       |
// +---------------------+

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10).then(function(hash) {
    const userObject = {
      username: req.body.username,
      password: hash,
      email: req.body.email,
      phone_number: req.body.phone,
      gender: req.body.gender
      // min_top_size: parseInt(req.body.min_top_size),
      // max_top_size: parseInt(req.body.max_top_size),
      // min_bottom_size: parseInt(req.body.min_bottom_size),
      // max_bottom_size: parseInt(req.body.max_bottom_size),
      // min_shoe_size: parseInt(req.body.min_shoe_size),
      // max_shoe_size: parseInt(req.body.max_shoe_size)
    }
    insertUser(userObject);
    res.redirect('http://localhost:3000');
  })
});


// +---------------------+
// |      NEW ITEM       |
// +---------------------+

app.post('/users/:id/items/new', (req, res) => {
  const userId = req.body.params;
  console.log('users id from url is: ', userId);

});


// ***********************
// ***********************
// +---------------------+
// |        PUT          |
// +---------------------+

// +---------------------+
// |        LOGOUT       |
// +---------------------+

app.put('/logout', (req, res) => {

  // delete session key, redirect to '/'

});


// ***********************
// ***********************
// +---------------------+
// |       UPDATE        |
// +---------------------+

// +---------------------+
// |        ITEM         |
// +---------------------+

// app.post('/users/:id/items/id', (req, res) => {



// ***********************
// ***********************
// +---------------------+
// |       DELETE        |
// +---------------------+

// +---------------------+
// |        ITEM         |
// +---------------------+

//CHECK EXPRESS SYNTAX
app.delete('/users/:id/items/id', (req, res) => {

});

// ***********************
// ***********************
// +---------------------+
// |       LISTEN        |
// +---------------------+
// ***********************
// ***********************

app.listen(PORT, () => {
  console.log('listening to http://localhost:' + PORT);
});





app.get('/api', (req, res) => {
  getResultsFromDb(res, knex);
});

app.post('/api', (req, res) => {
  processUserQuery(req, res, knex);
});
