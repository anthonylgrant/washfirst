import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const genders = ['-', 'Male', 'Memale'];

const categories = ['-', 'Tops', 'Bottoms', 'Shoes'];


const sizes = {
  tops: ['-', 1, 2, 3, 4, 5, 6],
  buttoms: ['-', 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
  shoes: ['-', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
};

class EditCard extends Component {

  render() {
    return (

      <div className='card card-front'>

        <div className='card-image'>
          <figure className='image is-4by3'>
            <img src={this.props.img_url} alt='' />
          </figure>
        </div>

        <div className='control new-form'>

          <label className='new-label'>Photo: </label>
          <input type='file' className='upload-input is-primary new-input'
                 placeholder='Image URL' name='img_url'
                 onChange={this.props.handleChange} defaultValue={this.props.img_url} >
          </input>


          <label className='new-label'>Category: </label>
          <div className="select new-input">
            <select name="type" onChange={this.props.handleChange} defaultText={this.props.type} >
            {
              categories.map((category, index) => {
                return <option key={index}>{category}</option>
              })
            }
            </select>
          </div>

          <br/>

          <label className='new-label'>Gender: </label>
          <div className="select new-input">
            <select name='gender' onChange={this.props.handleChange} selectedValue={this.props.gender} >
            {
              genders.map((gender, index) => {
                return <option key={index}>{gender}</option>
              })
            }
            </select>
          </div>

          <br />

          <label className='new-label'>Size: </label>
          <div className="select new-input">
            <select name='size' onChange={this.props.handleChange} defaultValue={this.props.size} >
            {
              this.props.type && sizes[this.props.type.toLowerCase()].map((size, index) => {
                return <option key={index}>{size}</option>
              })
            }
            </select>
          </div>

          <input type='text' className='input is-primary new-input'
                 placeholder='Enter Tags' name='tags'
                 defaultValue={this.props.tags} onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary new-input'
                 placeholder='Enter Description' name='description'
                 defaultValue={this.props.description} onChange={this.props.handleChange}>
          </input>
        </div>


        <div className="card-footer button-container">
          <button type='submit' className='button edit-back is-primary' disabled={!this.props.validateForm()} onClick={this.props.handleUpdate}>
            Update
          </button>

          <button className='button edit-back middle is-warning toggle-item-view' onClick={this.props.handleToggleView}>
            Cancel Edit
          </button>

          <button className='button edit-back is-danger toggle-item-view' onClick={this.props.deleteItem}>
            Delete
          </button>
        </div>
      </div>

    );
  }
}

export default EditCard;
