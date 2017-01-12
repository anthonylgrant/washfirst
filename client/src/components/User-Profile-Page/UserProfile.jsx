import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import AlertContainer from 'react-alert';

import Navbar from '../Partials/Navbar.jsx';
import MyItem from './MyItem/MyItemCard.jsx';
import NewItem from './NewItem/NewItemCard.jsx';
import UserSidebar from './User-Sidebar.jsx';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreferenceTags: [],
      myItems: [],
      username: '',
      gender: '',
      min_top_size: '',
      max_top_size: '',
      min_bottom_size: '',
      max_bottom_size: '',
      min_shoe_size: '',
      max_shoe_size: '',
      topSizes: ['-', 1, 2, 3, 4, 5, 6],
      bottomSizes: ['-', 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
      shoeSizes: ['-', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    };

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

    this.deleteItem = this.deleteItem.bind(this);
    this.loadPageData = this.loadPageData.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateUserSizes = this.updateUserSizes.bind(this);
  }

  showAlert(content, type) {
    msg.show(content, {
      time: 2000,
      type: type,
      icon: this.icons[type]
    });
  }

  componentDidMount() {
    this.loadPageData();
  }

  deleteItem(itemId) {
    $.ajax({
      method: 'DELETE',
      url: `/api/items/${itemId}`,
      success: ((response) => {
        this.showAlert('Item deleted.', 'info');
        let tops = response.currUserInfo.myItems.tops;
        let bottoms = response.currUserInfo.myItems.bottoms;
        let shoes = response.currUserInfo.myItems.shoes;
        this.setState({
          userPreferenceTags: response.currUserInfo.preferences,
          myItems: tops.concat(bottoms).concat(shoes),
          username: response.currUserInfo.username
        });
      })
    });
  }

  updateUserSizes() {
    let newUserSizes = {
      gender: this.state.gender,
      min_top_size: this.state.min_top_size,
      max_top_size: this.state.max_top_size,
      min_bottom_size: this.state.min_bottom_size,
      max_bottom_size: this.state.max_bottom_size,
      min_shoe_size: this.state.min_shoe_size,
      max_shoe_size: this.state.max_shoe_size
    };
    $.ajax({
      method: 'POST',
      url: `/api/users/:id/edit`,
      data: newUserSizes,
      success: ((response) => {
        this.showAlert('User info updated.', 'info');
        browserHistory.push('/users/:id');
      })
    });
  }

  handleChange(e) {
    let key = e.target.name;
    let obj = {};
    obj[key] = e.target.value;
    this.setState(obj);
  }

  validateForm() {
    return (
      this.state.min_top_size &&
      this.state.max_top_size &&
      this.state.min_bottom_size &&
      this.state.max_bottom_size &&
      this.state.min_shoe_size &&
      this.state.max_shoe_size
    );
  }

  loadPageData() {
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
          myItems: tops.concat(bottoms).concat(shoes),
          username: response.currUserInfo.username,
          gender: response.currUserInfo.gender,
          min_top_size: response.currUserInfo.min_top_size,
          max_top_size: response.currUserInfo.max_top_size,
          min_bottom_size: response.currUserInfo.min_bottom_size,
          max_bottom_size: response.currUserInfo.max_bottom_size,
          min_shoe_size: response.currUserInfo.min_shoe_size,
          max_shoe_size: response.currUserInfo.max_shoe_size
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={true} profilePage={true} username={this.state.username}/>
        <div className="main-container">
          <div className="items-container">
            <div className="main-container-item">
              <NewItem reload={this.loadPageData}/>
            </div>
            { this.state.myItems.map((item) => {
              return (
                <div key={item.id} className="main-container-item">
                  <MyItem item={item} deleteItem={this.deleteItem} username={this.state.username} />
                </div>
              );
            })}
          </div>
          <UserSidebar
            validateForm={this.validateForm}
            handleChange={this.handleChange}
            updateUserSizes={this.updateUserSizes}
            gender={this.state.gender}
            min_top_size={this.state.min_top_size}
            max_top_size={this.state.max_top_size}
            min_bottom_size={this.state.min_bottom_size}
            max_bottom_size={this.state.max_bottom_size}
            min_shoe_size={this.state.min_shoe_size}
            max_shoe_size={this.state.max_shoe_size}
            topSizes={this.state.topSizes}
            bottomSizes={this.state.bottomSizes}
            shoeSizes={this.state.shoeSizes}
          />
        </div>
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
      </div>
    );
  }
}

export default UserProfile;
