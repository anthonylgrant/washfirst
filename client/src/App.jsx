import React, {Component} from 'react';
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      tags: []
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/test',
      dataType: 'JSON',
      success: function(response){
        console.log('componentDidMount success:', response)
        console.log('tags at 0: ', response.tags[0].content)
        this.setState({
            test: response.hello,
            tags: response.tags
        })
      }.bind(this)
    })
  }

  render() {
    console.log('the state: ', this.state);
    return (
      <div>
        <Navbar />
        { this.state.tags.length > 0 &&
          <Sidebar tags={this.state.tags}/>
        }
      </div>
    );
  }
}
export default App;
