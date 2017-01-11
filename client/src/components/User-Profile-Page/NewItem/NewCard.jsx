import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const genders = ['-', 'Male', 'Female'];

const categories = ['-', 'Tops', 'Bottoms', 'Shoes'];


const sizes = {
  Tops: ['-', 1, 2, 3, 4, 5, 6],
  Bottoms: ['-', 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
  Shoes: ['-', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
};

class NewCard extends Component {

  render() {
    return (

      <div className='card card-front'>

        <div className='card-image'>
          <figure className='image is-4by3'>
            <img src='../../public/images/gray-plus-sign.png' alt='' />
          </figure>
        </div>

        <form className='control new-form' onSubmit={this.props.emptyField}>
          <label className='new-label'>Photo: </label>
          <input type='file' className='upload-input is-primary new-input'
                 placeholder='Image URL' name='img_url'
                 onChange={this.props.handleChange} >
          </input>

          <label className='new-label'>Category: </label>
          <div className="select new-input">
            <select name="type" onChange={this.props.handleChange}>
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
            <select name='gender' onChange={this.props.handleChange}>
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
            <select name='size' onChange={this.props.handleChange}>
            {
              this.props.type && sizes[this.props.type].map((size, index) => {
                return <option key={index}>{size}</option>
              })
            }
            </select>
          </div>

          <input type='text' className='input is-primary new-input'
                 placeholder='Enter Tags' name='tags'
                 onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary new-input'
                 placeholder='Enter Description' name='description'
                 onChange={this.props.handleChange}>
          </input>
        </form>


        <div className="card-footer button-container">
          <button type='submit' className='button new-button is-primary' disabled={!this.props.validateForm()} onClick={this.props.handleNewRequest}>
            Upload
          </button>

        </div>
      </div>

    );
  }
}

export default NewCard;
