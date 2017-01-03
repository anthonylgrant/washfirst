import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class EditCard extends Component {

  render() {
    return (

      <div className='card card-front'>

        <div className='card-image'>
          <figure className='image is-4by3'>
            <img src={this.props.img_url} alt='' />
          </figure>
        </div>

        <div className='control'>
          <input type='text' className='input is-primary'
                 placeholder='Image URL' name='img_url'
                 value={this.props.img_url} onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter type here' name='type'
                 value={this.props.type} onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter gender here' name='gender'
                 value={this.props.gender} onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter new size here' name='size'
                 value={this.props.size} onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter tags' name='tags'
                 value={this.props.tags} onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter description' name='description'
                 value={this.props.description} onChange={this.props.handleChange}>
          </input>
        </div>


        <div className="card-footer button-container">
          <button type='submit' className='button is-primary' disabled={!this.props.validateForm()} onClick={this.props.handleUpdate}>
            Update
          </button>

          <button className='button is-warning toggle-item-view' onClick={this.props.handleToggleView}>
            Cancel Edit
          </button>

          <button className='button is-danger toggle-item-view' onClick={this.props.deleteItem}>
            Delete
          </button>
        </div>
      </div>

    );
  }
}

export default EditCard;
