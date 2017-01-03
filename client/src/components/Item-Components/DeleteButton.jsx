// DELETE BUTTON, JUST INCLUDE AND SET POSITION
'use strict'

import React, {Component} from 'react';

class DeleteButton extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  handler() {
    this.props.deleteItem(this.props.item.id);
  }

  render() {
    return (
      <div className="delete-button-div">
        <h1 onClick={this.handler}>X</h1>
      </div>
    );
  }
}
export default DeleteButton;
