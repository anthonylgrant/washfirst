import React, {Component} from 'react';
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      userPreferenceTags: [],
      tagsFromItems: []
    }
  }


  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/test',
      dataType: 'JSON',
      success: function(response) {
        this.concatItemArrays(response.inventory);
        this.setState({
          test: response.currUserInfo.gender,
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
    console.log("asdasdasdasdad:", tempArr);
    this.setState( {tagsFromItems: tempArr});
  }


  render() {
    console.log('the state: ', this.state);
    return (
      <div>
        <Navbar />
        <h1>{this.state.test} This is rendering the current user's preference tags right now </h1>
        { this.state.userPreferenceTags.length > 0 &&
          <Sidebar userPreferenceTags={this.state.userPreferenceTags} tagsFromItems={this.state.tagsFromItems}/>
        }
      </div>
    );
  }
}

export default App;
