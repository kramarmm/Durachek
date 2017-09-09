import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';

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
    marginTop: '25px',
  },

  usersCardBlock: {
    marginBottom: '25px',
  },

  trumpCard: {
    position: 'fixed',
    top: '50%',
    transform: 'translate(0%, -50%)',
    left: '25px',
  },

  deckBack: {
    position: 'fixed',
    top: '50%',
    transform: 'translate(0%, -50%) rotate(9deg)',
    left: '200px',
  },

  attackCards: {
    position: 'fixed',
    top: '50%',
    left: '80%',
    transform: 'translate(-50%, -50%) rotate(9deg)',
  },
};

class LooTable extends Component {
  render() {
    const {
      deck,
      trumpCard,
      robotsCards,
      usersCards,
      attackCards,
      activePlayer,
    } = this.props.croupie;

    const {
      putCard,
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
                  onClick={putCard}
                  available={robotsCards.availableCards
                    && robotsCards.availableCards.indexOf(card) !== -1
                    && activePlayer === 'robot'}
                />
              ))
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

        <div>
          {
            attackCards ? (
              attackCards.map(card => (
                <div style={styles.attackCards} key={`${card.value}${card.suit}`}>
                  <Card card={card} />
                </div>
              ))
            ) : null
          }
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