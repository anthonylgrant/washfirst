import React, {Component} from 'react';

class Navbar extends Component {


  render() {

    const loggedIn = false;
    const logStat = loggedIn ? 'Logout' : <a href='http://localhost:8080/login'>Log In</a>
    const signUp = loggedIn ? '' : 'Sign Up'

    return (
      <nav className='top-bar'>
        <h1 id='logo'>Wash First</h1>
        <span className='nav-bar-item'>{logStat}</span>
        <span className='nav-bar-item'><a href='http://localhost:8080/register'>{signUp}</a></span>
      </nav>
    );
  }
}
export default Navbar;
