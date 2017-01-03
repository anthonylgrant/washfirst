import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';

import Navbar from '../Partials/Navbar.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginErrorMsg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.printLoginError = this.printLoginError.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let key = e.target.name;
    let obj = {};
    obj[key] = e.target.value;
    this.setState(obj);
    if (key === 'gender') { setTimeout(() => { this.forceUpdate(); }, 100); }
  }

  validateForm() {
    return (
      this.state.username &&
      this.state.password
    );
  }

  handleSubmit() {
    $.ajax({
      method: 'POST',
      url: `/api/login`,
      data: this.state,
      success: ((response) => {
        response ? browserHistory.push('/') : this.printLoginError();
      })
    });
  }

  printLoginError() {
    this.setState({
      loginErrorMsg: "Either username or password was incorrect."
    });
  }

  render() {

    return (
      <div>
        <Navbar loggedIn={false} />

        <div className="login-register-main-container">
          <p>{this.state.loginErrorMsg}</p>
          <p className="control has-icon">
            <input className="input" type="text" name="username" placeholder="Username" onChange={this.handleChange} />
            <i className="fa fa-user"></i>
          </p>
          <p className="control has-icon">
            <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
            <i className="fa fa-lock"></i>
          </p>
          <p className="control">
            <button className="button is-success" disabled={!this.validateForm()} onClick={this.handleSubmit}>
              Login
            </button>
          </p>

          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
}

export default Login;
