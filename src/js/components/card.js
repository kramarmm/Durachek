import React from 'react';

const styles = {
  available: {
    cursor: 'pointer',
    border: '1px solid green',
  },
  disable: {
    cursor: 'wait',
    border: '1px solid red',
  },
};

export default function Card(props) {
  if (props.back) {
    return (
      <img src="images/cards/back.png" alt="back" />
    );
  }
  return (
    <span
      style={props.available ? styles.available : styles.disable}
      onClick={props.available && props.onClick ? () => props.onClick(props.card) : null}
    >
      <img
        src={`images/cards/${props.card.value}${props.card.suit}.png`}
        alt={`${props.card.value}${props.card.suit}`}
      />
    </span>
  );
}
