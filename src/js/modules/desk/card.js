import React from 'react';

const cardValuesRef = {
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A',
};

export default function Card(props) {
  if (props.back) {
    return (
      <div className="card card-back" />
    );
  }

  if (props.placeholder) {
    return (
      <div className="card card-placeholder" />
    );
  }

  return (
    <span
      onClick={props.available && props.onClick ? () => props.onClick(props.card) : null}
      className={props.available ? 'available' : ''}
    >
      <div className="card">
        <div className="card-value">
          <div
            style={{
              color: props.card.suit === 'c' || props.card.suit === 's' ? '#00171B' : '#F00D44',
              fontWeight: 'bold',
            }}
          >
            {cardValuesRef[props.card.value]}
          </div>
          <img
            src={`images/${props.card.suit}.svg`}
            alt={props.card.suit}
            className="suit"
          />
        </div>

        <img
          src={`images/${props.card.suit}.svg`}
          alt={props.card.suit}
          className="big-suit"
        />

        <div className="card-value-reverse">
          <div
            style={{
              color: props.card.suit === 'c' || props.card.suit === 's' ? '#00171B' : '#F00D44',
              fontWeight: 'bold',
            }}
          >
            {cardValuesRef[props.card.value]}
          </div>
          <img
            src={`images/${props.card.suit}.svg`}
            alt={props.card.suit}
            className="suit"
          />
        </div>
      </div>
    </span>
  );
}
