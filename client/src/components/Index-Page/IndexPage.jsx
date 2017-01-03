import React, {Component} from 'react';

import Navbar from '../Partials/Navbar.jsx';
import Landing from '../Partials/Landing.jsx';
import Sidebar from './Sidebar.jsx';
import ItemCard from './ItemCard/Card.jsx';

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
      myItems: []
    };
    this.swapTagsFromUserPref = this.swapTagsFromUserPref.bind(this);
    this.swapTagsFromTagsFromItems = this.swapTagsFromTagsFromItems.bind(this);
    this.sortItemsByRanking = this.sortItemsByRanking.bind(this);
    this.concatTagArrays = this.concatTagArrays.bind(this);
    this.autoCompleteSearchBar = this.autoCompleteSearchBar.bind(this);
    this.handlePreferenceSubmit = this.handlePreferenceSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
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


  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/api/',
      dataType: 'JSON',
      success: (response) => {
        let tops = response.currUserInfo.myItems.tops;
        let bottoms = response.currUserInfo.myItems.bottoms;
        let shoes = response.currUserInfo.myItems.shoes;
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          // tagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          // fixedTagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          tagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          fixedTagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          topsInventory: this.sortItemsByRanking(response.inventory.tops),
          bottomsInventory: this.sortItemsByRanking(response.inventory.bottoms),
          shoesInventory: this.sortItemsByRanking(response.inventory.shoes),
          myItems: tops.concat(bottoms).concat(shoes)
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

    $.ajax({
      method: 'POST',
      url: '/api',
      data: data,
      dataType: "JSON",
      success: (response) => {
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          // tagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          // fixedTagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          tagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          fixedTagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
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

  removeDuplicates(allTags, userPreferenceTags) {
    userPreferenceTags.forEach((tag) => {
      let index = allTags.indexOf(tag);
      if (index > -1) {
        allTags.splice(index, 1);
      }
    });
    return allTags;
  }

  deleteItem(itemId) {
    $.ajax({
      method: 'DELETE',
      url: `/api/items/${itemId}`,
      success: ((response) => {
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          // tagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          // fixedTagsFromItems: this.concatTagArrays(response.inventory, response.currUserInfo.preferences),
          tagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          fixedTagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          topsInventory: this.sortItemsByRanking(response.inventory.tops),
          bottomsInventory: this.sortItemsByRanking(response.inventory.bottoms),
          shoesInventory: this.sortItemsByRanking(response.inventory.shoes)
        });
      })
    });
  }

  render() {
    let allInvetory = this.state.shoesInventory.concat(this.state.topsInventory).concat(this.state.bottomsInventory);
    return (
      <div>
        <Navbar loggedIn={true} />

          <div className="main-container">
            <div className="items-container">
              { allInvetory.map((item) => {
                return (
                  <div key={item.id} className="main-container-item">
                    <ItemCard myItems={this.state.myItems} item={item} deleteItem={this.deleteItem} />
                  </div>
                );
              })}
            </div>
          </div>

          <Sidebar
            userPreferenceTags={this.state.userPreferenceTags}
            tagsFromItems={this.state.tagsFromItems}
            swapTagsFromUserPref = {this.swapTagsFromUserPref}
            swapTagsFromTagsFromItems = {this.swapTagsFromTagsFromItems}
            autoCompleteSearchBar={this.autoCompleteSearchBar}
            handlePreferenceSubmit={this.handlePreferenceSubmit}
          />

      </div>
    );
  }
}

export default App;
