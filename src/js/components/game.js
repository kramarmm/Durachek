import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';
import Button from './button.js';

import * as croupieActions from '../actions/croupie.js';

import {
  robot,
  user,
  defend,
  attack,
} from '../assets/consts.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMayGetCards: false,
      userMayFinishTurn: false,
    };
    this.checkUserMayGetCards = this.checkUserMayGetCards.bind(this);
    this.checkUserMayFinishTurn = this.checkUserMayFinishTurn.bind(this);
  }

  componentWillMount() {
    this.checkUserMayGetCards(this.props.croupie);
    this.checkUserMayFinishTurn(this.props.croupie);
  }

  componentWillReceiveProps(nextProps) {
    this.checkUserMayGetCards(nextProps.croupie);
    this.checkUserMayFinishTurn(nextProps.croupie);
  }

  checkUserMayGetCards(props) {
    if (props.tableCards.length) {
      const { activePlayer, playersAction } = props;

      const nextUserMayGetCards = (activePlayer === robot && playersAction === attack) ||
        (activePlayer === user && playersAction === defend);

      if (this.state.userMayGetCards !== nextUserMayGetCards) {
        this.setState({ userMayGetCards: nextUserMayGetCards });
      }
    } else {
      if (this.state.userMayGetCards) {
        this.setState({ userMayGetCards: false });
      }
    }
  }

  checkUserMayFinishTurn(props) {
    if (props.tableCards.length) {
      const { activePlayer, playersAction } = props;

      const nextUserMayFinishTurn = (activePlayer === user && playersAction === attack) ||
        (activePlayer === robot && playersAction === defend);

      if (this.state.userMayFinishTurn !== nextUserMayFinishTurn) {
        this.setState({ userMayFinishTurn: nextUserMayFinishTurn });
      }
    } else {
      if (this.state.userMayFinishTurn) {
        this.setState({ userMayFinishTurn: false });
      }
    }
  }

  render() {
    const {
      deck,
      trumpCard,
      robotsCards,
      usersCards,
      tableCards,
      activePlayer,
      attackCards,
    } = this.props.croupie;

    const {
      userPutCard,
      moveToBreak,
      takeAllTableCards,
    } = this.props;

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

          {
            activePlayer === user ? (
              <div className="message-block">
                Your move, bitch!
              </div>
            ) : null
          }

          <div className="deck">
            {
              deck.length ? (
                <div className="trump-card">
                  <Card card={trumpCard} />
                </div>
              ) : `trump card is ${trumpCard.value} ${trumpCard.suit} `
            }
            {
              deck.length > 1 ? (
                <div className="deck-back">
                  <Card back />
                </div>
              ) : 'deck is over'
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
              (this.state.userMayGetCards) ? (
                <Button
                  name="Взять"
                  className="button"
                  onClick={takeAllTableCards}
                  activePlayer={activePlayer}
                />
              ) : (this.state.userMayFinishTurn) ? (
                <Button
                  name="Отбой"
                  className="button"
                  onClick={moveToBreak}
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
)(Game);
