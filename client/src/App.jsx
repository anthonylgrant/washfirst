import React, {Component} from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Item from './components/Item.jsx';
import Landing from './components/Landing.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreferenceTags: [],
      tagsFromItems: [],
      shoesInventory: [],
      topsInventory: [],
      bottomsInventory: [],
      searchBarText: '',
      loggedIn: false
    };
    this.sendPostRequest = this.sendPostRequest.bind(this);
    this.swapTagsFromUserPref = this.swapTagsFromUserPref.bind(this);
    this.swapTagsFromTagsFromItems = this.swapTagsFromTagsFromItems.bind(this);
    this.sortItemsByRanking = this.sortItemsByRanking.bind(this);
    this.concatTagArrays = this.concatTagArrays.bind(this);
    this.autoCompleteSearchBar = this.autoCompleteSearchBar.bind(this);
    this.handlePreferenceSubmit = this.handlePreferenceSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  swapTagsFromUserPref(event) {
    event.preventDefault;
    let targetText = event.target.innerHTML;
    let newArr1 = this.state.tagsFromItems;
    let newArr2 = this.state.userPreferenceTags

    let index = newArr2.indexOf(targetText);

    newArr1.push(targetText);
    newArr2.splice(index, 1);
    this.setState({
      tagsFromItems: newArr1,
      fixedTagsFromItems: newArr1,
      userPreferenceTags: newArr2
    });
  }

  swapTagsFromTagsFromItems(event) {
    event.preventDefault;
    let targetText = event.target.innerHTML;
    let newArr2 = this.state.userPreferenceTags
    newArr2.push(targetText);

    let newArr1 = this.state.tagsFromItems
    let index = newArr1.indexOf(targetText);
    newArr1.splice(index, 1);
    this.setState({
      tagsFromItems: newArr1,
      fixedTagsFromItems: newArr1,
      userPreferenceTags: newArr2
    });
  }

  autoCompleteSearchBar(event) {
    event.preventDefault();
    console.log("I AM IN AUTOCOMPLETE", this.state.fixedTagsFromItems);
    let text = event.target.value;
    let regex = new RegExp('^' + text);

    let filtered = this.state.fixedTagsFromItems.filter((tag) => {
      return regex.test(tag);
    });
    this.setState({
      tagsFromItems: filtered,
      searchBarText: text
    });
  }

  componentWillMount() {
    $.ajax({
      method: 'GET',
      url: '/api/login/check',
      dataType: 'JSON',
      success: (response) => {
        console.log('response: ', response);
        this.setState({
          loggedIn: response.status
        })
      }
    })
  }



  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/api/',
      dataType: 'JSON',
      success: (response) => {
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          tagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          fixedTagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          topsInventory: this.sortItemsByRanking(response.inventory.tops),
          bottomsInventory: this.sortItemsByRanking(response.inventory.bottoms),
          shoesInventory: this.sortItemsByRanking(response.inventory.shoes)
        });
      }
    });

    document.querySelector('#search-bar').addEventListener('keypress', (event) => {
      let key = event.which || event.keyCode;
      if (key === 13) {
        let tempArr = this.state.userPreferenceTags;
        tempArr.push(this.state.searchBarText);

        this.setState({
          userPreferenceTags: tempArr,
          searchBarText: ''
        });
        event.target.value = '';
      }
    });
  }

  handlePreferenceSubmit() {
    let data = {
      data: JSON.stringify(this.state.userPreferenceTags)
    };

    console.log("data, ", data);
    $.ajax({
      method: 'POST',
      url: '/api',
      data: data,
      dataType: "JSON",
      success: (response) => {
        console.log("SUCCESS POSTING TO /api", response);
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          tagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          fixedTagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          topsInventory: this.sortItemsByRanking(response.inventory.tops),
          bottomsInventory: this.sortItemsByRanking(response.inventory.bottoms),
          shoesInventory: this.sortItemsByRanking(response.inventory.shoes)
        });
      }
    });
  }

  sortItemsByRanking(items) {
    let tempArr = items.filter((item) => {
      return item.currUserWantsThis > 0;
    });
    tempArr.sort((a, b) => {
      return b.currUserWantsThis - a.currUserWantsThis;
    });
    return tempArr;
  }


  concatTagArrays(inventory, preferences) {
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
    tempArr = tempArr.filter((tag) => {
      return !preferences.includes(tag);
    });
    return tempArr;
  }

  deleteItem(itemId) {

    $.ajax({
      method: 'DELETE',
      url: `/api/items/${itemId}`,
      success: ((response) => {
        console.log('response from delete request', response);
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          tagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          fixedTagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          topsInventory: this.sortItemsByRanking(response.inventory.tops),
          bottomsInventory: this.sortItemsByRanking(response.inventory.bottoms),
          shoesInventory: this.sortItemsByRanking(response.inventory.shoes)
        });
      })
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
      url: '/api',
      data: {message: this.state.message},
      success: function(response) {}
    });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn}/>
          <div className="main-container">
            <div className="items-container">
              {this.state.shoesInventory.map((shoe) => {
                return (
                  <div className="main-container-item">
                    <Item key={shoe.id} item={shoe} deleteItem={this.deleteItem}/>
                  </div>
                )
              })}
            </div>
          </div>
        {this.state.loggedIn &&
          <Sidebar
            userPreferenceTags={this.state.userPreferenceTags}
            tagsFromItems={this.state.tagsFromItems}
            swapTagsFromUserPref = {this.swapTagsFromUserPref}
            swapTagsFromTagsFromItems = {this.swapTagsFromTagsFromItems}
            autoCompleteSearchBar={this.autoCompleteSearchBar}
            handlePreferenceSubmit={this.handlePreferenceSubmit}
          />
        }
        {!this.state.loggedIn &&
          <Landing />
        }
      </div>
    );
  }
}

export default App;
