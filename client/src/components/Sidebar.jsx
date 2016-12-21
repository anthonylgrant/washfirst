// Needs all tags and user-pref tags sent in as props


import React, {Component} from 'react';

class Sidebar extends Component {

  render() {
    const userPreferenceTags = this.props.userPreferenceTags.map((tag, i) => {
      return (
      <li key={i}>
        <span className='side-bar-tag' >{tag}</span>
      </li>
    )});

    const tagsFromItems = this.props.tagsFromItems.map((tag, i) => {
      return (
      <li key={i}>
        <span className='side-bar-tag' >{tag}</span>
      </li>
    )});

    return (
      <div id='side-bar'>
        <h4 id='all-tags-label'>User Preferance Tags</h4>
        <hr/>
        <ul id='side-bar-tag-list'>{userPreferenceTags}</ul>
        <hr/>
        <hr/>
        <h4 id='all-tags-label'>Tags From Items</h4>
        <hr/>
        <ul id='side-bar-tag-list'>{tagsFromItems}</ul>
      </div>

    )
  }
};
export default Sidebar;
