import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card.js';
import Button from './button.js';

import * as deskActions from './desk.actions';

import { user } from '../user/user.consts';
import { robot } from '../robot/robot.consts';
import { defend, attack } from './desk.consts';

class DeskScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMayGetCards: false,
      userMayFinishTurn: false,
    };
  }

  componentWillMount() {
    this.checkUserMayGetCards(this.props);
    this.checkUserMayFinishTurn(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkUserMayGetCards(nextProps);
    this.checkUserMayFinishTurn(nextProps);
  }

  checkUserMayGetCards(props) {
    if (props.desk.cards.length) {
      const {
        activePlayer,
        playersAction,
      } = props.desk;

      const nextUserMayGetCards = (
        activePlayer === robot && playersAction === attack
      ) || (
        activePlayer === user && playersAction === defend
      );

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
    if (props.desk.cards.length) {
      const { activePlayer, playersAction } = props.desk;

      const nextUserMayFinishTurn = (
        activePlayer === user && playersAction === attack
      ) || (
        activePlayer === robot && playersAction === defend
      );

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
      robot,
      user,
      desk,
      deck,
    } = this.props;

    return (
      <div>
        <div className="loo-table">
          <div className="robots-card-block">
            {
              robot.cards.map(card => (
                <Card
                  key={`${card.value}${card.suit}`}
                  card={card}
                />
              ))
            }
          </div>

          {
            desk.activePlayer === user ? (
              <div className="message-block">
                Your move, bitch!
              </div>
            ) : null
          }

          <div className="deck">
            {
              deck.length ? (
                <div className="trump-card">
                  <Card card={desk.trumpCard} />
                </div>
              ) : null
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
                desk.cards ? (
                  desk.cards.map((card, i) => (
                    <div
                      key={`${card.value}${card.suit}`}
                      className={
                        i % 2 === 1 && desk.attackCards.length < 2
                          ? 'defend-cards'
                          : 'attack-cards'
                      }
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
                  onClick={this.props.takeAllDeskCards}
                  activePlayer={desk.activePlayer}
                />
              ) : (this.state.userMayFinishTurn) ? (
                <Button
                  name="Отбой"
                  className="button"
                  onClick={this.props.moveToBreak}
                  activePlayer={desk.activePlayer}
                />
              ) : null
            }
          </div>

          <div className="users-card-block">
            {
              user.cards.map(card => (
                <Card
                  key={`${card.value}${card.suit}`}
                  card={card}
                  onClick={this.props.userPutCard}
                  available={user.availableCards
                    && user.availableCards.indexOf(card) !== -1
                    && desk.activePlayer === 'user'}
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
  return { ...state }; // do it with selectors
}

export default connect(
  mapStateToProps,
  deskActions,
)(DeskScreen);
