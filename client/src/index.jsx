// var React = require('react');
// var ReactDOM = require('react-dom');
// var Component = require('./components/Component.jsx');
// var props = window.PROPS;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// ReactDOM.render(
//   React.createElement(Component, props), document
// );

ReactDOM.render(<App />, document.getElementById('react-root'));
