import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className={this.props.place}>
        <img src={`images/cards/${this.props.card}.png`} />
      </div>
    );
  }
}

export default Card;
