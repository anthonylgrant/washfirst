// Needs all item tags and user-pref tags sent in as props
import React, {Component} from 'react';

class Sidebar extends Component {

  render() {
    const userPreferenceTags = this.props.userPreferenceTags.map((tag, i) => {
      return (
      <li key={i}>
        <span className='tag' >{tag}</span>
      </li>
    )});

    const tagsFromItems = this.props.tagsFromItems.map((tag, i) => {
      return (
      <li key={i}>
        <span className='tag' >{tag}</span>
      </li>
    )});

    return (
      <div className='side-bar'>
        <h2 className='all-tags-label'>User Preferance Tags</h2>
        <hr/>
        <ul className='side-bar-tag-list'>{userPreferenceTags}</ul>
        <hr/>
        <h2 className='all-tags-label'>Tags From Items</h2>
        <hr/>

        <ul className='side-bar-tag-list'>{tagsFromItems}</ul>
      </div>

    )
  }
};
export default Sidebar;
