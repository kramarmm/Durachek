import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <img
        src={`images/cards/${this.props.card}.png`}
        alt={this.props.card}
      />
    );
  }
}

export default Card;
