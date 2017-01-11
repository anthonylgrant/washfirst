import React, {Component} from 'react';

import Navbar from '../Partials/Navbar.jsx';
import Landing from '../Partials/Landing.jsx';
import Sidebar from './Sidebar.jsx';
import ItemCard from './ItemCard/Card.jsx';
import AlertContainer from 'react-alert';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreferenceTags: [],
      currUserLat: '',
      currUserLng: '',
      tagsFromItems: [],
      shoesInventory: [],
      topsInventory: [],
      bottomsInventory: [],
      searchBarText: '',
      myItems: [],
      type: '',
      rangeKm: 10,
      username: ''
    };
    this.swapTagsFromUserPref = this.swapTagsFromUserPref.bind(this);
    this.swapTagsFromTagsFromItems = this.swapTagsFromTagsFromItems.bind(this);
    this.sortItemsByRanking = this.sortItemsByRanking.bind(this);
    this.concatTagArrays = this.concatTagArrays.bind(this);
    this.autoCompleteSearchBar = this.autoCompleteSearchBar.bind(this);
    this.handlePreferenceSubmit = this.handlePreferenceSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.removeDuplicates = this.removeDuplicates.bind(this);
    this.handleTypeSelection = this.handleTypeSelection.bind(this);
    this.isThisWithinRange = this.isThisWithinRange.bind(this);
    this.showAlert = this.showAlert.bind(this);

    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      transition: 'scale'
    };

    this.icons = {
      info: <i className="fa fa-info-circle fa-fw" aria-hidden="true"/>,
      error: <i className="fa fa-exclamation-circle fa-fw" aria-hidden="true"/>
    };
  }

  showAlert(content, type) {
    msg.show(content, {
      time: 2000,
      type: type,
      icon: this.icons[type]
    });
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
    let newArr2 = this.state.userPreferenceTags;
    newArr2.push(targetText);

    let newArr1 = this.state.searchBarText ? this.state.fixedTagsFromItems : this.state.tagsFromItems;
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

  handleTypeSelection(e) {
    let key = e.target.name === 'all' ? '' : e.target.name;
    let obj = {};
    obj[key] = e.target.value;
    this.setState(obj);
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
        let username = response.currUserInfo.username;
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          currUserLat: response.currUserInfo.address_lat,
          currUserLng: response.currUserInfo.address_lng,
          tagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          fixedTagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          topsInventory: this.sortItemsByRanking(response.inventory.tops),
          bottomsInventory: this.sortItemsByRanking(response.inventory.bottoms),
          shoesInventory: this.sortItemsByRanking(response.inventory.shoes),
          myItems: tops.concat(bottoms).concat(shoes),
          username: username
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
        this.showAlert('User preferences updated.', 'info');
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
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
          tagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          fixedTagsFromItems: this.removeDuplicates(response.allTags, response.currUserInfo.preferences),
          topsInventory: this.sortItemsByRanking(response.inventory.tops),
          bottomsInventory: this.sortItemsByRanking(response.inventory.bottoms),
          shoesInventory: this.sortItemsByRanking(response.inventory.shoes)
        });
      })
    });
  }


  isThisWithinRange(item) {
    const rad = (x) => {
      return x * Math.PI / 180;
    };

    const getDistance = (p1, p2) => {
      let R = 6378137; // Earth’s mean radius in meter
      let dLat = rad(p2.lat - p1.lat);
      let dLong = rad(p2.lng - p1.lng);
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c / 1000;
      return (d < this.state.rangeKm) ? true : false;
    };

    let p1 = { lat: this.state.currUserLat, lng: this.state.currUserLng };
    let p2 = { lat: item.owner.address_lat, lng: item.owner.address_lng };
    return getDistance(p1, p2);
  }

  render() {

    let allInvetory = this.state[this.state.type] ||
                      this.state.shoesInventory.
                      concat(this.state.topsInventory).
                      concat(this.state.bottomsInventory);

    return (
      <div>
        <Navbar loggedIn={true} mainPage={true} username={this.state.username}/>
        <div className="main-container">
          <div className="items-container">
            { allInvetory.map((item) => {
              if (this.isThisWithinRange(item)) return (
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
          rangeKm={this.state.rangeKm}
          swapTagsFromUserPref = {this.swapTagsFromUserPref}
          swapTagsFromTagsFromItems = {this.swapTagsFromTagsFromItems}
          autoCompleteSearchBar={this.autoCompleteSearchBar}
          handlePreferenceSubmit={this.handlePreferenceSubmit}
          handleTypeSelection={this.handleTypeSelection}
        />
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
      </div>
    );
  }
}

export default App;
