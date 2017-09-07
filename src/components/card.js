import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <img
        src={`images/cards/${this.props.card.value}${this.props.card.suit}.png`}
        alt={`${this.props.card.value}${this.props.card.suit}`}
      />
    );
  }
}

export default Card;
