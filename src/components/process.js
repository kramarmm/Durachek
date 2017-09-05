import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';

import * as croupieActions from '../actions/croupie.js';

const styles = {
  LooTable: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'space-between',
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
};

class LooTable extends Component {
  render() {
    const {
      deck,
      trumpCard,
      robotsCards,
      usersCards,
    } = this.props.croupie;

    return (
      <div>
        <div style={styles.LooTable}>
          <div style={styles.robotsCardBlock}>
            {
              robotsCards.cards.map((card, i) => (
                <Card key={card} card={card} />
              ))
            }
          </div>

          <div style={styles.usersCardBlock}>
            {
              usersCards.cards.map((card, i) => (
                <Card key={card} card={card} />
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
              <Card card="back" />
            </div>
          ) : null
        }
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
  ...croupieActions,
)(LooTable);
