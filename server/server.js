require('babel-register')({
  presets: ['react']
});

var express = require('express');
var app = express();
var PORT = 8080;
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var getTags = require('./helpers/get_tags.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  // var props = { title: 'WashFirst', heading: 'Hello World!!!!' };
  // var html = ReactDOMServer.renderToString(
  //   React.createElement(Component, props)
  // );
  res.render("../client/index");
})




app.post('/test', (req, res) => {
    console.log(req.body.message);
    res.redirect('/');
})

app.get('/test', function (req, res) {

  let tagArray = []


  getTags()
  .then((rows) => {
    rows.forEach((tagObject) => {
      tagArray.push(tagObject.content);
    });
    console.log('this is the tag array', tagArray);
    res.json({hello: "hello", tags: tagArray });
  })

});




app.listen(PORT, () => {
  console.log('listening to http://localhost:' + PORT);
});
