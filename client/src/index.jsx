import React from 'react';
import {render} from 'react-dom';

import App from './App.jsx';

require("../styles/application.scss");

render(<App />, window.document.getElementById('react-root'));
