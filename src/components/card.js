import React from 'react';

export default function Card(props) {
  if (props.back) {
    return (
      <img src="images/cards/back.png" alt="back" />
    );
  }
  return (
    <img
      src={`images/cards/${props.card.value}${props.card.suit}.png`}
      alt={`${props.card.value}${props.card.suit}`}
    />
  );
}
