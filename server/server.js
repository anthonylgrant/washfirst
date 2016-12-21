'use strict';
// +---------------------+
// |    DEPENDENCIES     |
// +---------------------+
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const bcrypt = require('bcrypt');
// const session = require('express-session');

// HEROKU CONFIG GOES INTO .ENV FILE
// const connection = require('./db/knexfile.js').development;
// const knex = require('knex')(connection);

// +---------------------+
// |       HELPERS       |
// +---------------------+
const getTags = require('./helpers/get_tags.js');
const getResultsFromDb = require('../_behzad/query_simple');


// +---------------------+
// |      BLACKLIST      |
// +---------------------+

const blacklist = [
  '/index',
  '/user/:id'
]


// +---------------------+
// |     MIDDLEWARE      |
// +---------------------+
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
// app.use(session({
//   // secret goes into .env file
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));


//  // AUTHENTICATION MIDDLEWARE
// app.use(blacklist, (req, res, next) => {
// ####################
// on login we create the session. It doesn't have to make use of the email.
// ####################
// if(req.session.email) {
//     next();
//   } else {
//     res.render('pages/error');
//   }
// });


// +---------------------+
// |        PORT         |
// +---------------------+

const PORT = PROCESS.ENV || 8080;



// ***********************
// ***********************
//          ToDO
// ***********************
// ***********************
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
// |        INDEX        |
// +---------------------+

// app.get('/', function (req, res) {
//   let tagArray = []
//   getTags()
//   .then((rows) => {
//     rows.forEach((tagObject) => {
//       tagArray.push(tagObject.content);
//     });
//     console.log('this is the tag array', tagArray);
//     res.json({hello: "hello", tags: tagArray });
//   })
// })
app.get('/', function (req, res) {
  var props = { title: 'WashFirst', heading: 'Hello World!!!!' };
  var html = ReactDOMServer.renderToString(
    React.createElement(Component, props)
  );
  res.render("../client/index");
});


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

})


// +---------------------+
// |      REGISTER       |
// +---------------------+


app.get('/registration', (req, res) => {

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


});


// +---------------------+
// |      REGISTER       |
// +---------------------+

app.post('/registration', (req, res) => {


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
// |       UPDATE        |
// +---------------------+

// +---------------------+
// |        ITEM         |
// +---------------------+

app.update('/users/:id/items/id', (req, res) => {

});


// ***********************
// ***********************
// +---------------------+
// |       DELETE        |
// +---------------------+

// +---------------------+
// |        ITEM         |
// +---------------------+

//CHECK EXPRESS SYNTAX
app.del('/users/:id/items/id', (req, res) => {

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





// app.post('/test', (req, res) => {
//     console.log(req.body.message);
//     res.redirect('/');
// })
//
// app.get('/test', function (req, res) {
//   getResultsFromDb(res);
// });
