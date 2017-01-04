import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const genders = ['-', 'male', 'female'];

const categories = ['-', 'tops', 'bottoms', 'shoes'];


const sizes = {
  tops: ['-', 1, 2, 3, 4, 5, 6],
  bottoms: ['-', 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
  shoes: ['-', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
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

        <h1>Enter information for a new item here:</h1>

        <form className='control' onSubmit={this.props.emptyField}>
          <input type='text' className='input is-primary'
                 placeholder='Image URL' name='img_url'
                 onChange={this.props.handleChange} >
          </input>

          <label>Category: </label>
          <div className="select">
            <select name="type" onChange={this.props.handleChange}>
            {
              categories.map((category, index) => {
                return <option key={index}>{category}</option>
              })
            }
            </select>
          </div>

          <br/>

          <label>Gender: </label>
          <div className="select">
            <select name='gender' onChange={this.props.handleChange}>
            {
              genders.map((gender, index) => {
                return <option key={index}>{gender}</option>
              })
            }
            </select>
          </div>

          <br />

          <label>Size: </label>
          <div className="select">
            <select name='size' onChange={this.props.handleChange}>
            {
              this.props.type && sizes[this.props.type].map((size, index) => {
                return <option key={index}>{size}</option>
              })
            }
            </select>
          </div>

          <input type='text' className='input is-primary'
                 placeholder='Enter Tags' name='tags'
                 onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='Enter Description' name='description'
                 onChange={this.props.handleChange}>
          </input>
        </form>


        <div className="card-footer button-container">
          <button type='submit' className='button is-primary' disabled={!this.props.validateForm()} onClick={this.props.handleNewRequest}>
            Upload
          </button>

        </div>
      </div>

    );
  }
}

export default NewCard;
