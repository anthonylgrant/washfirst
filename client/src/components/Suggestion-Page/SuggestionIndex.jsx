import React, {Component} from 'react';

import Navbar from '../Partials/Navbar.jsx';
import SuggestionCard from './SuggestionCard.jsx';

class SuggestionIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myItem: [],
      otherItems: []
    };
    this.loadPageData = this.loadPageData.bind(this);
  }

  componentDidMount() {
    this.loadPageData();
  }

  loadPageData() {
    $.ajax({
      method: 'GET',
      url: `/api/${this.props.location.pathname}${this.props.location.search}`,
      dataType: 'JSON',
      success: (response) => {
        this.setState({
          myItem: response.myItem,
          otherItems: response.otherItems,
          username: response.otherItems[0].username
        });
      }
    });
  }


  render() {
    return (
      <div>
        <Navbar loggedIn={true} username={this.state.username} />
        <div  className="main-container">
          <div className="container">
            <p>Trade this item:</p>
            <div className="items-container">
              { this.state.myItem.map((item) => {
                return (
                  <div key={item.id} className="main-container-item">
                    <SuggestionCard item={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="container trade-container">
            <p>For these items:</p>
            <div className="items-container">
              { this.state.otherItems.map((item) => {
                return (
                  <div key={item.id} className="main-container-item">
                    <SuggestionCard item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestionIndex;
