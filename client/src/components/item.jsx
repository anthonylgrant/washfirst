import React, {Component} from 'react';

class Item extends Component {

  render() {
    return (
      <div className="card">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris. <a href="#">@bulmaio</a>.
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br />
            <small>11:09 PM - 1 Jan 2016</small>
          </div>
        </div>
      </div>
    );
  }

};
export default Item;