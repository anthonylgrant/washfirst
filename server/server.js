'use strict';

// +---------------------+
// |    DEPENDENCIES     |
// +---------------------+
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// +---------------------+
// |       HELPERS       |
// +---------------------+
const getTags = require('./helpers/get_tags.js');
const getResultsFromDb = require('../_behzad/query_simple');


const PORT = PROCESS.ENV || 8080;


// +---------------------+
// |     MIDDLEWARE      |
// +---------------------+
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


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

// +---------------------+
// |      BLACKLIST      |
// +---------------------+

const blacklist = [
        '/index',
        '/user/:id'
      ]

// ***********************
// ***********************
// +---------------------+
// |       ROUTES        |
// +---------------------+
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


// app.post('/test', (req, res) => {
//     console.log(req.body.message);
//     res.redirect('/');
// })
//
// app.get('/test', function (req, res) {
//   getResultsFromDb(res);
// });

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
// |        INDEX        |
// +---------------------+






app.listen(PORT, () => {
  console.log('listening to http://localhost:' + PORT);
});
