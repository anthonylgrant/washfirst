import React, {Component} from 'react';
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      tags: [],
      message: ""
    }
    this.sendPostRequest = this.sendPostRequest.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/test',
      dataType: 'JSON',
      success: function(response){
        console.log('componentDidMount success:', response)
        this.setState({
            test: response.hello,
            tags: response.tags
        })
      }.bind(this)
    })
  }

  changeMessage(e) {
    console.log(e.target);
    console.log('value:', e.target.value);
    this.setState({message: e.target.value});
  }

  sendPostRequest(e) {
    console.log('sending post:', this.state.message);
    $.post({
      method: 'POST',
      url: '/test',
      data: {message: this.state.message},
      success: function(response) {
        // console.log(e.target.value);
        // console.log('sendPostRequest:', response);
      }
    })
    e.preventDefault();
  }

  render() {
    console.log('the state: ', this.state);
    return (
      <div>
        <Navbar />
        { this.state.tags.length > 0 &&
          <Sidebar tags={this.state.tags}/>
        }
        <Sidebar />
        <form onSubmit={this.sendPostRequest}>
          <input
            id="new-message"
            type="text"
            name="theinput"
            onChange={this.changeMessage.bind(this)}
            placeholder="Type a message and hit ENTER"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
export default App;
