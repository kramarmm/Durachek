import React from 'react';

export default function Button(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
}
