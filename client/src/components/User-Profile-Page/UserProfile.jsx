import React, {Component} from 'react';
import { Link } from 'react-router';

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

  updateUserPreferences() {

  }

  validateForm() {
    return (
      this.state.username &&
      this.state.password &&
      this.state.email &&
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
            <div className="side-bar">
              <p>Sidebar</p>
              <div className="user-preferences-container">

                <p className="control">
                  <label className="radio">
                    <input type="radio" name="gender" value="male" onChange={this.handleChange} checked={this.state.gender === 'male'} /> Male
                  </label>
                  <label className="radio">
                    <input type="radio" name="gender" value="female" onChange={this.handleChange} checked={this.state.gender === 'female'} /> Female
                  </label>
                </p>

                <label className="label">Top Size - Minimum and Maximum:</label>
                <p className="control">
                  <span className="select">
                    <select name="min_top_size" onChange={this.handleChange}>
                    {
                      this.state.topSizes.map((size, index) => {
                        return <option key={index}>{size}</option>
                      })
                    }
                    </select>
                  </span>
                  <span> To </span>
                  <span className="select">
                    <select name="max_top_size" onChange={this.handleChange}>
                      {
                        this.state.topSizes.map((size, index) => {
                          return <option key={index}>{size}</option>
                        })
                      }
                    </select>
                  </span>
                  <span> 1: XS 2: S 3: M 4: L 5: XL 6: XXL</span>
                </p>


                <label className="label">Bottom Size - Minimum and Maximum:</label>
                <p className="control">
                  <span className="select">
                    <select name="min_bottom_size" onChange={this.handleChange}>
                    {
                      this.state.bottomSizes.map((size, index) => {
                        return <option key={index}>{size}</option>
                      })
                    }
                    </select>
                  </span>
                  <span> To </span>
                  <span className="select">
                    <select name="max_bottom_size" onChange={this.handleChange}>
                      {
                        this.state.bottomSizes.map((size, index) => {
                          return <option key={index}>{size}</option>
                        })
                      }
                    </select>
                  </span>
                </p>


                <label className="label">Shoe Size - Minimum and Maximum:</label>
                <p className="control">
                  <span className="select">
                    <select name="min_shoe_size" onChange={this.handleChange}>
                    {
                      this.state.shoeSizes.map((size, index) => {
                        return <option key={index}>{size}</option>
                      })
                    }
                    </select>
                  </span>
                  <span> To </span>
                  <span className="select">
                    <select name="max_shoe_size" onChange={this.handleChange}>
                      {
                        this.state.shoeSizes.map((size, index) => {
                          return <option key={index}>{size}</option>
                        })
                      }
                    </select>
                  </span>
                </p>

                <p className="control">
                  <button className="button submit is-primary" disabled={!this.validateForm()} onClick={this.handleSubmit}>Submit</button>
                  <Link className="button is-link" to="/">Cancel</Link>
                </p>
              </div>
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
