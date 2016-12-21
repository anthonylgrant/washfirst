import React, {Component} from 'react';
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ""
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/test',
      dataType: 'JSON',
      success: function(response){
        console.log('componentDidMount success:', response)
        this.setState({
            test: response.currUserInfo.gender
        })
      }.bind(this)
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.test}</h1>
        <Navbar />
        <Sidebar />
      </div>
    );
  }
}
export default App;
