import React from 'react';

export default function Button(props) {
  return (
    <button
      style={props.styles}
      disabled={props.activePlayer !== 'user'}
      className={props.activePlayer === 'user' ? 'available-btn' : 'disable-btn'}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}
