import React from 'react';

export default function Button(props) {
  return (
    <button
      disabled={props.activePlayer !== 'user'}
      className={props.className}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}
