import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FlipCard from 'react-flipcard';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    }
    this.showBack = this.showBack.bind(this)
    this.showFront = this.showFront.bind(this)
    this.handleOnFlip = this.handleOnFlip.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  handleOnFlip = (flipped) => {
    if (flipped) {
      // debugger;
      console.log("Were trying to flip the card back and forth");
      // this.refs.backButton.findDOMNode().focus();
    }
  }

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }

  render() {
    return (
      <div className="card">
        <FlipCard
          className = "card"
          disabled={true}
          flipped={this.state.isFlipped}
          onFlip={this.handleOnFlip}
          onKeyDown={this.handleKeyDown}
        >
          <div className="item-container">
            <div className="content-container">
              <div>Front</div>
              <div className="card-front">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src="../../public/images/default_img.jpg" alt="" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-32x32">
                        <img src="../../public/images/default_img.jpg" alt="Image" />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-5">John Smith</p>
                      <p className="subtitle is-6">@johnsmith</p>
                    </div>
                  </div>
                  <div className="content">
                    {this.props.desc} <p>Gender: {this.props.gender}</p><p>Size: {this.props.size}</p> <a href="#">@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
                    <small>11:09 PM - 1 Jan 2016</small>
                  </div>
                </div>
              </div>
              <div className="card-footer button-container">
                <button className="card-footer-item" type="button" onClick={this.showBack}>Show back</button>
                <button className="card-footer-item" type="button" onClick={this.showBack}>Show back</button>
                <button className="card-footer-item" type="button" onClick={this.showBack}>Show back</button>
                {/* <div><small>(manual flip)</small></div> */}
              </div>
            </div>

          </div>

          <div className="item-container">
            <div className="content-container">
              <div>Back</div>
              <div className="card-back">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src="../../public/images/default_img.jpg" alt="" />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-32x32">
                        <img src="../../public/images/default_img.jpg" alt="Image" />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-5">John Smith</p>
                      <p className="subtitle is-6">@johnsmith</p>
                    </div>
                  </div>
                  <div className="content">
                    {this.props.desc} <p>Gender: {this.props.gender}</p><p>Size: {this.props.size}</p> <a href="#">@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
                    <small>11:09 PM - 1 Jan 2016</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer button-container">
              <button className="card-footer-item" type="button" ref="backButton" onClick={this.showFront}>Show front</button>
            </div>
          </div>
        </FlipCard>
      </div>
    );
  }

};
export default Item;
