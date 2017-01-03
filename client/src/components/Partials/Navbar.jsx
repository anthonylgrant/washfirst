import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';

class Navbar extends Component {

  render() {

    const loggedIn = this.props.loggedIn;
    const loginStat = loggedIn ? <a className="nav-bar-item" href='http://localhost:8080/logout'>Logout</a> : <Link className="nav-bar-item" to="/login">Login</Link>;
    const signUp = loggedIn ? '' : <Link className="nav-bar-item" to="/register">Register</Link>;
    const userProfile = loggedIn ? <Link className="nav-bar-item" to="/users/:id">My Profile</Link> : '';

    return (
      <nav className='top-bar'>
        <Link id='logo' to="/">Wash First</Link>
        <div className='status-container'>
          {userProfile}
          {loginStat}
          {signUp}
        </div>
      </nav>
    );
  }
}

export default Navbar;
