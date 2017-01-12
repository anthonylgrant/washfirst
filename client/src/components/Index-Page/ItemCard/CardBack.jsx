import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class CardBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesObj: {},
      search: '',
      pathNameStart: `localhost:3000/suggestion?myitemid=${this.props.item.id}`,
      msgContent: `Hi there,\n\nI am interested in doing a trade with you.\n\nPlease take a look at the link below and let me know what you think.\n\nThanks!`
    };
    this.findProductFromMyCloset = this.findProductFromMyCloset.bind(this);
    this.evaluateSmileyFace = this.evaluateSmileyFace.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.validateTxtBox = this.validateTxtBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTxtChange = this.handleTxtChange.bind(this);
    this.sortSellersInterest = this.sortSellersInterest.bind(this);
    this.sellersInterestInMyItems = this.sortSellersInterest();
  }

  sortSellersInterest() {
    let tempArr = this.props.item.owner.sellersInterestInMyProduct;
    tempArr.forEach((item) => {
      let key = Object.keys(item)[0];
      item.myItemId = key;
      item.interest = item[key];
    });
    tempArr.sort((a, b) => {
      return b.interest - a.interest;
    });
    return tempArr;
  }

  findProductFromMyCloset(productId, returnValue) {
    let thisItem = this.props.myItems.find((item) => {
      return item.id == productId;
    });
    return thisItem[returnValue];
  }

  evaluateSmileyFace(item) {
    let matchValue = Math.round(item.interest * 100);
    return (
      <div className='outer'>
        <i className="fa fa-heart-o fa-2x smiley-indicator" aria-hidden="true" />
        <div className="inner" style={{height: `${matchValue}%`}}><i className="fa fa-heart fa-2x smiley-indicator" aria-hidden="true" /></div>
      </div>
    );
  }

  componentDidMount() {
    let msgObj = {};
    this.props.myItems.forEach((myItem) => {
      msgObj[myItem.id] = '';
    });
    this.sortSellersInterest();
    this.setState({ messagesObj: msgObj });
  }

  handleSelection(e) {
    let msgObj = this.state.messagesObj;
    let thisId = e.target.name;

    msgObj[thisId] = e.target.checked ? `&otherid=${thisId}` : '';

    let str = '';
    for (let id in msgObj) {
      str += msgObj[id];
    }

    this.setState({
      messagesObj: msgObj,
      search: str
    });
  }

  handleSubmit(e) {
    let content = `${this.state.msgContent}\n\nClick <a href=${this.state.pathNameStart}${this.state.search}>here</a> to see the proposed trade.`;
    content = `<p>${content.replace(/(?:\r\n|\r|\n)/g, '<br />')}</p>`;
    let email = {
      to: this.props.item.owner.email,
      content: content
    };
    $.ajax({
      method: 'POST',
      url: '/api/email',
      data: email,
      dataType: 'JSON',
      success: (response) => {
        console.log(response);
      }
    });
  }

  handleTxtChange(e) {
    e.preventDefault();
    this.setState({ msgContent: e.target.value });
  }

  validateTxtBox() {
    return this.state.search && this.state.msgContent;
  }

  render() {
    return (
      <div className="card card-back">
        <div className="card-back-content">
          <h1>Owner's Interest In My Items:</h1>
          <div className="matched-items-from-users-closet">
            { this.sellersInterestInMyItems.map((item, index) => {
              return (
                <div key={index} className="matched-item">
                  <img className="image is-96x96" src={this.findProductFromMyCloset(item.myItemId, 'img_url')} alt="Image" />
                  {this.evaluateSmileyFace(item)}
                  <input className="my-item-checkbox" type="checkbox" name={this.findProductFromMyCloset(item.myItemId, 'id')} onChange={this.handleSelection} />
                </div>
              );
            })}
          </div>
          <hr />
          <div className="item-owner-info">
            <textarea className="textarea" placeholder="Enter message here. We will include a link to your proposed trade at the bottom of the email." defaultValue={this.state.msgContent} onChange={this.handleTxtChange}></textarea>
            <button className="button is-primary" disabled={!this.validateTxtBox()} onClick={this.handleSubmit}>send message to owner!</button>
          </div>

        </div>
        <div className="card-footer button-container">
          <button className="card-footer-item" type="button" ref="backButton" onClick={this.props.showFront}>Show front</button>
        </div>
      </div>
    );
  }
}

export default CardBack;
