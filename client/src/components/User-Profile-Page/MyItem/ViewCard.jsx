import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ViewCard extends Component {
  render() {
    return (
      <div className="card card-front">
        <div className='card-image'>
          <figure className='image is-4by3'>
            <img src={this.props.item.img_url} alt='' />
          </figure>
        </div>
        <div className='card-content'>
          <div className='media'>
            <div className='media-content'>
              <p className='title is-5'>John Smith</p>
            </div>
          </div>
          <div className='content'>
            <p>Size: {this.props.item.size}</p>
            {
              this.props.item.tags.map((tag, i) => {
              return <span key={i} className='tag item-tag'>{tag}</span>
            })}
            <br />
            <small>!! item creation date here !!</small>
          </div>
        </div>
        <div className="card-footer button-container">
          <button className='button is-active toggle-item-view' onClick={this.props.handleToggleView}>Edit Item</button>
        </div>
      </div>
    );
  }
}

export default ViewCard;
