import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class NewCard extends Component {

  render() {
    return (

      <div className='card card-front'>

        <div className='card-image'>
          <figure className='image is-4by3'>
            <img src='../../public/images/gray-plus-sign.png' alt='' />
          </figure>
        </div>

        <h1>Upload New Item Here</h1>

        <form className='control' onSubmit={this.props.emptyField}>
          <input type='text' className='input is-primary'
                 placeholder='Image URL' name='img_url'
                 onChange={this.props.handleChange} >
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter type here' name='type'
                 onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter gender here' name='gender'
                 onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter new size here' name='size'
                 onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter tags' name='tags'
                 onChange={this.props.handleChange}>
          </input>

          <input type='text' className='input is-primary'
                 placeholder='enter description' name='description'
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
