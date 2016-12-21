// var React = require('react');
// var ReactDOM = require('react-dom');
// var Component = require('./components/Component.jsx');
// var props = window.PROPS;

import React from 'react';
import User from './App.jsx';

// ReactDOM.render(
//   React.createElement(Component, props), document
// );

ReactDOM.render(<User />, document.getElementById('react-root'));
