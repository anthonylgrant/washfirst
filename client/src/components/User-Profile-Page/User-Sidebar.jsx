// Needs the presonal preference data to pre-populate the form
import React, {Component} from 'react';

class UserSidebar extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="side-bar">
        <p>Update Gender & Size Preferences</p>
        <div className="user-preferences-container">

          <p className="control">
            <label className="label">Gender:</label>
            <label className="radio">
              <input type="radio" name="gender" value="male" onChange={this.props.handleChange} checked={this.props.gender === 'male'} /> Male
            </label>
            <label className="radio">
              <input type="radio" name="gender" value="female" onChange={this.props.handleChange} checked={this.props.gender === 'female'} /> Female
            </label>
          </p>

          <label className="label">Top Size - Minimum and Maximum:</label>
          <p className="control">
            <span className="select">
              <select name="min_top_size"
                value={this.props.min_top_size} onChange={this.props.handleChange}>
              {
                this.props.topSizes.map((size, index) => {
                  return <option key={index}>{size}</option>
                })
              }
              </select>
            </span>
            <span className='select-to'> To </span>
            <span className="select">
              <select name="max_top_size"
                value={this.props.max_top_size} onChange={this.props.handleChange}>
                {
                  this.props.topSizes.map((size, index) => {
                    return <option key={index}>{size}</option>
                  })
                }
              </select>
            </span><br/>
            <span> 1: XS 2: S 3: M 4: L 5: XL 6: XXL</span>
          </p>


          <label className="label">Bottom Size - Minimum and Maximum:</label>
          <p className="control">
            <span className="select">
              <select name="min_bottom_size"
                value={this.props.min_bottom_size} onChange={this.props.handleChange}>
              {
                this.props.bottomSizes.map((size, index) => {
                  return <option key={index}>{size}</option>
                })
              }
              </select>
            </span>
            <span className='select-to'> To </span>
            <span className="select">
              <select name="max_bottom_size"
                value={this.props.max_bottom_size} onChange={this.props.handleChange}>
                {
                  this.props.bottomSizes.map((size, index) => {
                    return <option key={index}>{size}</option>
                  })
                }
              </select>
            </span>
          </p>


          <label className="label">Shoe Size - Minimum and Maximum:</label>
          <p className="control">
            <span className="select">
              <select name="min_shoe_size"
                value={this.props.min_shoe_size} onChange={this.props.handleChange}>
              {
                this.props.shoeSizes.map((size, index) => {
                  return <option key={index}>{size}</option>
                })
              }
              </select>
            </span>
            <span className='select-to'> To </span>
            <span className="select">
              <select name="max_shoe_size"
                value={this.props.max_shoe_size} onChange={this.props.handleChange}>
                {
                  this.props.shoeSizes.map((size, index) => {
                    return <option key={index}>{size}</option>
                  })
                }
              </select>
            </span>
          </p>

          <p className="control">
            <button className="button submit is-primary" disabled={!this.props.validateForm()} onClick={this.props.updateUserSizes}>Update</button>
          </p>
        </div>
      </div>
    )
  }
};

export default UserSidebar;
