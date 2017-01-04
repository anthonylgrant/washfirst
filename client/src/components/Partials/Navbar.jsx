import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';

class Navbar extends Component {

  render() {

    const loggedIn = this.props.loggedIn; // T/F
    const loginPage = this.props.loginPage; // T/F
    const registerPage = this.props.registerPage; // T/F
    const mainPage = this.props.mainPage; // T/F
    const profilePage = this.props.profilePage; //T/F
    const mainClasses = mainPage ? "nav-bar-item selected" : "nav-bar-item";
    const profileClasses = profilePage ? "nav-bar-item selected" : "nav-bar-item";

    const logout = loggedIn ? <a className="nav-bar-item" href='http://localhost:8080/logout'>Logout</a> : '';
    const login = loginPage || loggedIn ? '' : <Link className="nav-bar-item" to="/login">Login</Link>;
    const signUp = loggedIn || registerPage ? '' : <Link className="nav-bar-item" to="/register">Register</Link>;
    const profile = loggedIn ? <Link className={profileClasses} to="/users/:id">Your-drobe</Link> : '';
    const main = loggedIn ? <Link className={mainClasses} to="/">Wardrobe</Link> : '';



    return (
      <nav className='top-bar'>
        <Link id='logo' to="/">Wash First</Link>
        <div className='status-container'>
          {main}
          {profile}
          {login}
          {logout}
          {signUp}
        </div>
      </nav>
    );
  }
}

export default Navbar;
