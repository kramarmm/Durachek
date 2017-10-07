import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';
import Button from './button.js';
import Messages from './messages.js';

import * as croupieActions from '../actions/croupie.js';

import {
  robot,
  user,
  defend,
  attack,
} from '../assets/consts.js';

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
      userPutCard,
      setEndOfTurn,
      takeAllTableCards,
    } = this.props;

    const userMayGetCards = activePlayer === robot && playersAction === attack ||
      activePlayer === user && playersAction === defend;

    const userMayFinishTurn = activePlayer === user && playersAction === attack ||
      activePlayer === robot && playersAction === defend;

    return (
      <div>
        <div className="loo-table">
          <div className="robots-card-block">
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

          <div className="deck">
            <div className="trump-card">
              <Card card={trumpCard} />
            </div>
            {
              deck.length ? (
                <div className="deck-back">
                  <Card back />
                </div>
              ) : null
            }

            <div className="table-cards">
              {
                tableCards ? (
                  tableCards.map((card, i) => (
                    <div
                      key={`${card.value}${card.suit}`}
                      className={i % 2 === 1 && attackCards.length < 2 ? 'defend-cards' : 'attack-cards'}
                    >
                      <Card card={card} />
                    </div>
                  ))
                ) : null
              }
            </div>
          </div>

          <div className="button-block">
            {
              (userMayGetCards) ? (
                <Button
                  name="Отбой"
                  className={activePlayer === user && playersAction === attack ? 'button' : 'button disable-btn'}
                  onClick={setEndOfTurn}
                  activePlayer={activePlayer}
                />
              ) : (userMayFinishTurn) ? (
                <Button
                  name="Взять"
                  className={activePlayer === user && playersAction === defend ? 'button' : 'button disable-btn'}
                  onClick={takeAllTableCards}
                  activePlayer={activePlayer}
                />
              ) : null
            }
          </div>

          <div className="users-card-block">
            {
              usersCards.cards.map(card => (
                <Card
                  key={`${card.value}${card.suit}`}
                  card={card}
                  onClick={userPutCard}
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
