require('babel-register')({
  presets: ['react']
});


let getResultsFromDb = require('../_behzad/query_simple');
var express = require('express');
var app = express();
var PORT = 8080;
var React = require('react');
var ReactDOMServer = require('react-dom/server');
// var Component = require('./Component.jsx')

app.use(express.static('public'));

app.get('/', function (req, res) {
  // var props = { title: 'WashFirst', heading: 'Hello World!!!!' };
  // var html = ReactDOMServer.renderToString(
  //   React.createElement(Component, props)
  // );
  res.render("../client/index");
});

app.get('/test', function (req, res) {

  getResultsFromDb(res);
  // res.json({phrase: "hello"});

});


app.listen(PORT, () => {
  console.log('listening to http://localhost:' + PORT);
});
