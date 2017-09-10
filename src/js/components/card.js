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

const styles = {
  card: {
    height: '160px',
    width: '110px',
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.08) -3px 4px 4px, rgba(0, 0, 0, 0.24) 0px 1px 8px',
    margin: '0 5px',
    borderRadius: '5px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  available: {
    cursor: 'pointer',
    transform: 'translate(0%, -10%)',
    transition: 'transform .2s',
  },

  cardValue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '17px',
  },

  cardValueReverse: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '17px',
    alignSelf: 'flex-end',
    transform: 'rotate(180deg)',
  },

  suit: {
    width: '15px',
  },

  bigSuit: {
    width: '50px',
    alignSelf: 'center',
    opacity: '.5',
  },
};

export default function Card(props) {
  if (props.back) {
    return (
      <div style={styles.card}>
        <img src="images/back.png" alt="back" />
      </div>
    );
  }
  return (
    <span
      style={props.available ? styles.available : null}
      onClick={props.available && props.onClick ? () => props.onClick(props.card) : null}
      className={props.available ? 'available-card' : ''}
    >
      <div style={styles.card}>
        <div style={styles.cardValue}>
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
            style={styles.suit}
          />
        </div>

        <img
          src={`images/${props.card.suit}.svg`}
          alt={props.card.suit}
          style={styles.bigSuit}
        />

        <div style={styles.cardValueReverse}>
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
            style={styles.suit}
          />
        </div>
      </div>
    </span>
  );
}
