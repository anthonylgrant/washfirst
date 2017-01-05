import React, {Component} from 'react';

class Sidebar extends Component {

  render() {
    const userPreferenceTags = this.props.userPreferenceTags.map((tag, i) => {
      return (
      <li key={i}>
        <a onClick={ this.props.swapTagsFromUserPref }><span className='tag animated fadeIn'>{tag}</span></a>
      </li>
    )});

    const tagsFromItems = this.props.tagsFromItems.map((tag, i) => {
      return (
      <li key={i}>
        <a onClick={ this.props.swapTagsFromTagsFromItems }><span className='tag animated fadeIn'>{tag}</span></a>
      </li>
    )});

    return (
      <div className='side-bar'>
        <div className='type-selector'>
          <h2 className='all-tags-label'>Select Type and Enter Search Tags:</h2>
          <hr/>
          <p className="control type-selection">
            <label className="radio">
              <input type="radio" name="type" value="topsInventory" onChange={this.props.handleTypeSelection} /> Tops
            </label>
            <label className="radio">
              <input type="radio" name="type" value="bottomsInventory" onChange={this.props.handleTypeSelection} /> Bottoms
            </label>
            <label className="radio">
              <input type="radio" name="type" value="shoesInventory" onChange={this.props.handleTypeSelection} /> Shoes
            </label>
            <label className="radio">
              <input type="radio" name="type" value="all" onChange={this.props.handleTypeSelection} /> All
            </label>
          </p>
        </div>
        <hr/>
        <div className='tags-list'>
          <ul className='side-bar-tag-list'>{userPreferenceTags}</ul>
        </div>
        <button className="button is-small" onClick={this.props.handlePreferenceSubmit}>update</button>
        <hr/>
        <div className='tags-list'>
          <h2 className='all-tags-label'>Tags From Items</h2>
          <input id="search-bar" type="text" placeholder="enter tags here" onChange={this.props.autoCompleteSearchBar}/>
          <hr/>
          <ul className='side-bar-tag-list'>{tagsFromItems}</ul>
        </div>
      </div>

    )
  }
};

export default Sidebar;
