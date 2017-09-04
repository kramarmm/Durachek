import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';

import * as croupieActions from '../actions/croupie.js';

const styles = {
  LooTable: {
    backgroundColor: '#011419',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  },

  robotsCardBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  usersCardBlock: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class LooTable extends Component {
  render() {
    const {
      gameState,
      robotsCards,
      usersCards,
    } = this.props.croupie;

    return (
      <div style={styles.LooTable}>
        {
          gameState === 'process' ? (
            <div style={styles.robotsCardBlock}>
              {
                robotsCards.cards.map((card, i) => (
                  <Card key={card} card={card} place={i} />
                ))
              }
            </div>
          ) : <div>Game didn't start yet</div>
        }
        {
          gameState === 'process' ? (
            <div style={styles.usersCardBlock}>
              {
                usersCards.cards.map((card, i) => (
                  <Card key={card} card={card} place={i} />
                ))
              }
            </div>
          ) : <div>Game didn't start yet</div>
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
