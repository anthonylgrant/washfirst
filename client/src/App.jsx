import React, {Component} from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Item from './components/Item.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreferenceTags: [],
      tagsFromItems: []
    }
    this.sendPostRequest = this.sendPostRequest.bind(this);
  }


  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/test',
      dataType: 'JSON',
      success: function(response) {
        this.concatItemArrays(response.inventory);
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences
        })
      }.bind(this)
    })
  }


  concatItemArrays(inventory) {
    let tempArr = [];
    inventory.tops.forEach((item) => {
      tempArr = tempArr.concat(item.tags);
    });
    inventory.bottoms.forEach((item) => {
      tempArr = tempArr.concat(item.tags);
    });
    inventory.shoes.forEach((item) => {
      tempArr = tempArr.concat(item.tags);
    });

    tempArr = new Set(tempArr);
    tempArr = Array.from(tempArr);
    this.setState( {tagsFromItems: tempArr});
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
        <Item />
        { this.state.userPreferenceTags.length > 0 &&
          <Sidebar userPreferenceTags={this.state.userPreferenceTags} tagsFromItems={this.state.tagsFromItems}/>
        }
        <form onSubmit={this.sendPostRequest}>
          <input
            id="new-message"
            type="text"
            name="theinput"
            onChange={this.changeMessage.bind(this)}
            placeholder="Type a message and hit ENTER"
          />
          <div className="item container">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
