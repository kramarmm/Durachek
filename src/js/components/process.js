import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';
import Button from './button.js';
import Messages from './messages.js';

import * as croupieActions from '../actions/croupie.js';

const styles = {
  LooTable: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '800px',
    width: '100vw',
    height: '100vh',
  },

  robotsCardBlock: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
  },

  usersCardBlock: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
  },

  deck: {
    alignSelf: 'normal',
    display: 'flex',
    justifyContent: 'flex-start',
    maxHeight: '180px',
  },

  trumpCard: {
    marginLeft: '45px',
  },

  deckBack: {
    transform: 'translate(-100%, 25%) rotate(98deg)',
  },

  tableCards: {
    marginRight: '25px',
    marginLeft: 'calc(60% - 440px)',
    display: 'flex',
  },

  defendCards: {
    position: 'relative',
    left: '-85px',
    transform: 'rotate(22deg)',
  },

  buttonBlock: {
    marginBottom: '-80px',
  },

  button: {
    textDecoration: 'none',
    padding: '13px 0 12px 0',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all .2s',
    backgroundColor: 'rgba(20, 225, 255, 0.42)',
    border: 'none',
    width: '170px',
    fontSize: '1.5em',
    outline: 'none',
    letterSpacing: '0.1em',
    color: 'white',
  },
};

class LooTable extends Component {
  render() {
    const {
      deck,
      trumpCard,
      robotsCards,
      usersCards,
      tableCards,
      activePlayer,
      attackCards,
      playersAction,
      messages,
    } = this.props.croupie;

    const {
      putCard,
      setEndOfTurn,
      takeAllTableCards,
    } = this.props;

    return (
      <div>
        <div style={styles.LooTable}>
          <div style={styles.robotsCardBlock}>
            {
              robotsCards.cards.map(card => (
                <Card
                  key={`${card.value}${card.suit}`}
                  card={card}
                />
              ))
            }
          </div>

          <Messages messages={messages} />

          <div style={styles.deck}>
            <div style={styles.trumpCard}>
              <Card card={trumpCard} />
            </div>
            {
              deck.length ? (
                <div style={styles.deckBack}>
                  <Card back />
                </div>
              ) : null
            }

            <div style={styles.tableCards}>
              {
                tableCards ? (
                  tableCards.map((card, i) => (
                    <div
                      key={`${card.value}${card.suit}`}
                      style={i % 2 === 1 && attackCards.length < 2 ? styles.defendCards : { margin: '0 -50px' }}
                    >
                      <Card card={card} />
                    </div>
                  ))
                ) : null
              }
            </div>
          </div>

          <div style={styles.buttonBlock}>
            {
              (activePlayer === 'user' && playersAction === 'attack') ||
              (activePlayer === 'robot' && playersAction === 'defend') ? (
                <Button
                  name="Отбой"
                  styles={styles.button}
                  onClick={setEndOfTurn}
                  activePlayer={activePlayer}
                />
              ) : (activePlayer === 'user' && playersAction === 'defend') ||
              (activePlayer === 'robot' && playersAction === 'attack') ? (
                <Button
                  name="Взять"
                  styles={styles.button}
                  onClick={takeAllTableCards}
                  activePlayer={activePlayer}
                />
              ) : null
            }
          </div>

          <div style={styles.usersCardBlock}>
            {
              usersCards.cards.map(card => (
                <Card
                  key={`${card.value}${card.suit}`}
                  card={card}
                  onClick={putCard}
                  available={usersCards.availableCards
                    && usersCards.availableCards.indexOf(card) !== -1
                    && activePlayer === 'user'}
                />
              ))
            }
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    croupie: state.croupie,
    robot: state.robot,
  };
}

export default connect(
  mapStateToProps,
  croupieActions,
)(LooTable);
