import React, {Component} from 'react';

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

    this.deleteItem = this.deleteItem.bind(this);
    this.loadPageData = this.loadPageData.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateUserSizes = this.updateUserSizes.bind(this);
  }

  componentDidMount() {
    this.loadPageData();
  }


  deleteItem(itemId) {
    $.ajax({
      method: 'DELETE',
      url: `/api/items/${itemId}`,
      success: ((response) => {
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
    console.log("update submitted!");
    $.ajax({
      method: 'POST',
      url: `/api/users/3/edit`,
      success: ((response) => {
        console.log("success!!");
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
    console.log("i'm here 1");
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
        <Navbar loggedIn={true} profilePage={true}/>
        <div className="main-container-profile">

          <div className="items-container">

            <div className="main-container-item">
              <NewItem reload={this.loadPageData}/>
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


            {this.state.myItems.map((item) => {
              return (
                <div key={item.id} className="main-container-item">
                  <MyItem item={item} deleteItem={this.deleteItem} username={this.state.username} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
