import React, {Component} from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Item from './components/Item.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreferenceTags: [],
      tagsFromItems: [],
      shoesInventory: []
    }
    this.sendPostRequest = this.sendPostRequest.bind(this);
    this.swapTags = this.swapTags.bind(this);
  }


  swapTags(event) {
    event.preventDefault;
    let targetText = event.target.innerHTML;
    let newArr1 = this.state.tagsFromItems
    newArr1.push(targetText);

    let newArr2 = this.state.userPreferenceTags
    let index = newArr2.indexOf(targetText);
    newArr2.splice(index, 1);
    this.setState({tagsFromItems: newArr1, userPreferenceTags: newArr2});
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/test',
      dataType: 'JSON',
      success: function(response) {
        response.inventory.shoes.map((shoe) => {
          console.log(shoe);
        })
        console.log("response: ", response.inventory.shoes);
        this.concatItemArrays(response.inventory);
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          shoesInventory: response.inventory.shoes
        })
        console.log("THESE ARE userPreferenceTags: ", this.state.userPreferenceTags)
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

    console.log('shoesInventory: ', this.state.shoesInventory)
    return (
      <div>
        <Navbar />
        <div className="main-container">
          {this.state.shoesInventory.map((shoe) => {
            return <Item key={shoe.id} gender={shoe.gender} size={shoe.size} desc={shoe.description} />
          })}
        </div>

        { this.state.userPreferenceTags.length > 0 &&
          <Sidebar
            userPreferenceTags={this.state.userPreferenceTags}
            tagsFromItems={this.state.tagsFromItems}
            swapTags = {this.swapTags}
          />
        }
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
