import React, {Component} from 'react';

import Navbar from '../Partials/Navbar.jsx';
import SuggestionCard from './SuggestionCard.jsx';

class SuggestionIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myItem: [],
      otherItems: [],
      myUsername: '',
      otherUsername: ''
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
          otherItems: response.otherItems
        });
      }
    });
  }


  render() {
    return (
      <div>
        <Navbar loggedIn={true} />
        <div className="main-container">
          <h1>Trade this item:</h1>
          <div className="items-container">
            { this.state.myItem.map((item) => {
              return (
                <div key={item.id} className="main-container-item">
                  <SuggestionCard item={item} />
                </div>
              );
            })}
          </div>
          <hr />
          <h1>For these items:</h1>
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
    );
  }
}

export default SuggestionIndex;
