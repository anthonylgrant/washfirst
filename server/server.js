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

app.get('/', function (req, res) {
  let tagArray = []
  getTags()
  .then((rows) => {
    rows.forEach((tagObject) => {
      tagArray.push(tagObject.content);
    });
    console.log('this is the tag array', tagArray);
    res.json({hello: "hello", tags: tagArray });
  })
})

// +---------------------+
// |     USER'S PAGE     |
// +---------------------+

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;


  // Passing back to view: user's items, user's sizes (editable)
  res.json({})
});

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
