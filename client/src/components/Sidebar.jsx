// Needs all tags and user-pref tags sent in as props


import React, {Component} from 'react';

class Sidebar extends Component {







  render() {
    const tags = this.props.tags.map((tag, i) => {
      return (
      <li key={i}>
        <span className='side-bar-tag' >{tag.content}</span>
      </li>
    )});
    return (
      <div id='side-bar'>
        <h1 id='all-tags-label'>Tags</h1>
        <ul id='side-bar-tag-list'>{tags}</ul>
      </div>

    )
  }
};
export default Sidebar;
