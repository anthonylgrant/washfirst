import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';


class Interface extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
      </div>
    );
  }
}
export default Interface;
