import React, {Component} from 'react';

class Item extends Component {

  render() {
    return (

        <div className="card animated fadeInDown">
          <div className="default-item-view">
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
                <p>Size: {this.props.item.size}</p>
                { this.props.item.tags.map((tag, i) => {
                  return <span key={i} className="tag item-tag">{tag}</span>
                })}
                <br />
                <small>!!{this.props.item.owner.created_at.slice(0, 10)}!!</small>
              </div>
            </div>
          </div>


            <div className="hover-item-view">
              <span className="item-owner-contact-info">email: {this.props.item.owner.email} | phone: {this.props.item.owner.phone_number} </span>

              { this.props.item.owner.sellersInterestInMyProduct.map((item, index) => {
                return (
                  <div key={index} className="matched-item-from-users-closet">
                    <figure className="image is-64x64">
                      <img src="../../public/images/curr_user_item_img.jpg" alt="Image" />
                    </figure>
                    <span>{Math.round(item[Object.keys(item)[0]] * 100)/100} </span>
                  </div>
                );
              })}

            </div>
        </div>
    );
  }




};
export default Item;
