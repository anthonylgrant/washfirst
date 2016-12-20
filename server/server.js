require('babel-register')({
  presets: ['react']
});

var express = require('express');
var app = express();
var PORT = 8080;
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var getTags = require('./helpers/get_tags.js');
// var Component = require('./Component.jsx')


app.use(express.static('public'));

app.get('/', function (req, res) {
  // var props = { title: 'WashFirst', heading: 'Hello World!!!!' };
  // var html = ReactDOMServer.renderToString(
  //   React.createElement(Component, props)
  // );
  res.render("../client/index");
})

app.get('/test', function (req, res) {


  getTags()
  .then((tags) => {
    res.json({hello: "hello", tags: tags });
  })
});




app.listen(PORT, () => {
  console.log('listening to http://localhost:' + PORT);
});
