import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FlipCard from 'react-flipcard';

import CardFront from './CardFront.jsx';
import CardBack from './CardBack.jsx';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
    this.showBack = this.showBack.bind(this);
    this.showFront = this.showFront.bind(this);
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  render() {
    return (
      <FlipCard
        disabled={true}
        flipped={this.state.isFlipped}
        onFlip={this.handleOnFlip}
        onKeyDown={this.handleKeyDown}
      >
        <CardFront item={this.props.item} showBack={this.showBack} />
        <CardBack myItems={this.props.myItems} item={this.props.item} showFront={this.showFront} />
      </FlipCard>
    );
  }

};

export default Item;
