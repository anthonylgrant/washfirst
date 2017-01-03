import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import IndexPage from './components/Index-Page/IndexPage.jsx';
import UserProfile from './components/User-Profile-Page/UserProfile.jsx';
import SuggestionIndex from './components/Suggestion-Page/SuggestionIndex.jsx';
import Registeration from './components/Registeration-Page/Registeration.jsx';
import Login from './components/Login-Page/Login.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currUserId: 0
    },
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace, callPage) {
    $.ajax({
      method: 'GET',
      url: `/api/login/check`,
      success: ((response) => {
        if (!response.authorized) {
          replace('/login');
          callPage();
        } else {
          switch(nextState.routes[0].path) {
            case "/":
              callPage();
              break;

            case "/users/:id":
              if (nextState.params.id != response.userId) {
                replace(`/users/${response.userId}`);
                callPage();
              } else {
                callPage();
              }
              break;

            case "/login":
              replace('/');
              callPage();
              break;

            case "/register":
              replace('/');
              callPage();
              break;

            case "/suggestion":
              callPage();
              break;

            default:
              replace("/");
              callPage();
              break;
          }
        }
      })
    });
  }

  render () {
    return(
      <Router history={browserHistory}>
        <Route path={"/"} component={IndexPage} onEnter={this.requireAuth} />
        <Route path={"/users/:id"} component={UserProfile} onEnter={this.requireAuth} />
        <Route path={"/suggestion"} component={SuggestionIndex} onEnter={this.requireAuth} />
        <Route path={"/register"} component={Registeration} />
        <Route path={"/login"} component={Login} />
        <Route path={"/*"} component={IndexPage} onEnter={this.requireAuth} />
      </Router>
    );
  }
}

export default App;
