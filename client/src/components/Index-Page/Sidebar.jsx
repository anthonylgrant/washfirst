// Needs all item tags and user-pref tags sent in as props
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
        <div className='tags-list'>
          <h2 className='all-tags-label'>User Preference Tags</h2>
          <hr/>
          <ul className='side-bar-tag-list'>{userPreferenceTags}</ul>
        </div>
        <button className="button is-small" onClick={this.props.handlePreferenceSubmit}>submit</button>
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
