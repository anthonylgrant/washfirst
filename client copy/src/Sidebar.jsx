import React, {Component} from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div id='side-bar'>
        <h2>This is the side-bar</h2>
        <div id='side-bar'>
          <h2 className='side-bar-title'>Your Filters</h2>
          <h2 className='side-bar-title'>Filters</h2>
          <input type="text" name="tag-filter" placeholder="tagname">
          <div id="side-bar-tags-container">
            <span className="tag">nike</span>
            <span className="tag">norm-core</span>
            <span className="tag">blue</span>
            <span className="tag">black</span>
            <span className="tag">solid</span>
            <span className="tag">argyle</span>
            <span className="tag">vintage</span>
            <span className="tag">goth</span>
            <span className="tag">t shirt</span>
            <span className="tag">long sleeves</span>
            <span className="tag">checkered</span>
            <span className="tag">gucci</span>
            <span className="tag">converse</span>
          </div>
        </div>
      </div>
    )
  }
};
export default Sidebar;
