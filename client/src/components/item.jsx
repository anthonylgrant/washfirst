import React, {Component} from 'react';

class Item extends Component {

  render() {
    return (
      <div className="card animated fadeInDown">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src="../../public/images/default_img.jpg" alt="" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-5">John Smith</p>
            </div>
          </div>
          <div className="content">
            <p>Size: {this.props.size}</p>
            { this.props.tags.map((tag, i) => {
              return <span className="tag item-tag">{tag}</span>
            })}

            <br />
            <small>!!{this.props.date.slice(0, 10)}!!</small>
          </div>
        </div>
      </div>
    );
  }

};
export default Item;
