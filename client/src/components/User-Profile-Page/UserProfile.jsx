import React, {Component} from 'react';

import Navbar from '../Partials/Navbar.jsx';
import MyItem from './MyItem/MyItemCard.jsx';
import NewItem from './NewItem/NewItemCard.jsx';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPreferenceTags: [],
      myItems: [],
      username: ''
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.loadPageData = this.loadPageData.bind(this);
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
          username: response.currUserInfo.username
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
