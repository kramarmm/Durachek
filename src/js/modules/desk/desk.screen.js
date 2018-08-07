import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './card';
import Button from './button';
import Message from '../message/message';

import { moveToBreak } from './desk.actions';
import DeskUtils from './desk.utils';

import { userPutCard } from '../user/user.actions';
import { takeAllCards } from '../player/player.actions';

import { user } from '../user/user.consts';
import { robot } from '../robot/robot.consts';
import { defend, attack } from './desk.consts';

class DeskUtilsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMayTakeCards: false,
      userMayFinishTurn: false,
    };

    this.userTakeAllCards = this.props.takeAllCards.bind(this, user);
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
    this.setState({
      userMayTakeCards: props.desk.attackCards.length
        ? props.user.isActive
          && props.user.action === defend
          && !DeskUtils.isPlayerAlreadyTookCards(props.user, props.desk)
        : false
    });
  }

  checkUserMayFinishTurn(props) {
    this.setState({
      userMayFinishTurn: props.desk.attackCards.length
        ? props.user.isActive
          && props.user.action === attack
        : false
    });
  }

  render() {
    const {
      robot,
      user,
      desk,
      deck,
    } = this.props;

    return (
      <div className="main-block">
        <div className="desk-wrapper">
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

          <Message text={desk.message} />

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

            {
              desk.attackCards.length ? (
                <div
                  className="table-cards"
                  style={{ left: `calc((100% - ${desk.attackCards.length * 128}px) / 2)` }}
                >
                  {
                    desk.attackCards.map(card => (
                      <div
                        key={`${card.value}${card.suit}`}
                        className="attack-card"
                      >
                        <Card card={card} />
                      </div>
                    ))
                  }
                </div>
              ) : null
            }

            {
              // loop through attackCards for correct output cards position
              desk.attackCards.length ? (
                <div
                  className="table-cards"
                  style={{ left: `calc(5px + ((100% - ${desk.attackCards.length * 128}px) / 2))` }}
                >
                  {
                    desk.attackCards.map((c, i) => {
                      const card = desk.defendCards[i];

                      return card ? (
                        <div
                          key={`${card.value}${card.suit}`}
                          className="defend-card"
                        >
                          <Card card={card} />
                        </div>
                      ) : (
                        <div
                          key={`placeholder-${c.value}${c.suit}`}
                          className="defend-card"
                        >
                          <Card placeholder />
                        </div>
                      );
                    })
                  }
                </div>
              ) : null
            }
          </div>

          <div className="button-block">
            {
              user.action === defend ? (
                <Button
                  name="take"
                  className="btn btn-game"
                  className={
                    `btn btn-game ${
                       !user.availableCards.length
                        ? 'glowed'
                        : ''
                     }`
                   }
                  onClick={this.userTakeAllCards}
                  disabled={!this.state.userMayTakeCards}
                />
              ) : (
                <Button
                  name="finish turn"
                  className={
                    `btn btn-game ${
                       !user.availableCards.length
                        ? 'glowed'
                        : ''
                     }`
                   }
                  onClick={this.props.moveToBreak}
                  disabled={!this.state.userMayFinishTurn}
                />
              )
            }
          </div>

          <div className="users-card-block">
            {
              user.cards.map(card => (
                <Card
                  key={`${card.value}${card.suit}`}
                  card={card}
                  onClick={this.props.userPutCard}
                  available={
                    user.isActive &&
                    user.availableCards &&
                    user.availableCards.indexOf(card) !== -1
                  }
                />
              ))
            }
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(
  mapStateToProps,
  {
    moveToBreak,
    userPutCard,
    takeAllCards,
  },
)(DeskUtilsScreen);
