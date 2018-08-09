import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Card from './card';
import Button from './button';
import Message from '../message/message';

import { finishTurn, onWillTakeAll } from './desk.actions';
import DeskUtils from './desk.utils';

import { userPutCard } from '../user/user.actions';
import { setWillTakeAllCards } from '../player/player.actions';

import { user as userType } from '../user/user.consts';
import { defend, attack } from './desk.consts';

class DeskScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMayTakeCards: false,
      userMayFinishTurn: false,
      visibleCardsLength: false,
    };

    this.userTakeAllCards = this.props.onWillTakeAll.bind(this, userType);

    this.showCardsLength = this.toggleCardsLength.bind(this, true);
    this.hideCardsLength = this.toggleCardsLength.bind(this, false);
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

  toggleCardsLength(state) {
    this.setState({
      visibleCardsLength: state,
    });
  }

  render() {
    const {
      robot,
      user,
      desk,
      deck,
    } = this.props;

    const usersCardsSpacing = (650 / user.cards.length) - 95;
    const robotsCardsSpacing = (650 / robot.cards.length) - 95;

    return (
      <div className="main-block">
        <div className="desk-wrapper">
          <div className="cards-block robots-cards-block">
            {
              robot.cards.map((card, i) => (
                <Card
                  key={`${card.value}${card.suit}`}
                  card={card}
                  style={{
                    position: 'relative',
                      left: `${robotsCardsSpacing * i}px`,
                  }}
                />
              ))
            }
          </div>

          <Message message={desk.message} />

          <div className="deck">
            {
              deck.length ? (
                <div className="trump-card">
                  <Card card={desk.trumpCard} />
                </div>
              ) : (
                <span className="deck-empty">
                  &#9760;
                </span>
              )
            }

            {
              deck.length > 1 ? (
                <Fragment>
                  <div
                    className="deck-back"
                    onMouseEnter={this.showCardsLength}
                    onTouchStart={this.showCardsLength}
                    onMouseLeave={this.hideCardsLength}
                    onTouchEnd={this.hideCardsLength}
                  >
                    <Card back />
                  </div>
                  {
                    this.state.visibleCardsLength ? (
                      <span className="cards-left-hint">
                        {deck.length} cards left
                      </span>
                    ) : null
                  }
                </Fragment>
              ) : null
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
                       && !DeskUtils.isPlayerAlreadyTookCards(userType, desk)
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
                  onClick={this.props.finishTurn}
                  disabled={!this.state.userMayFinishTurn}
                />
              )
            }
          </div>

          <div className="cards-block users-cards-block">
            {
              user.cards.map((card, i) => (
                <Card
                  key={`${card.value}${card.suit}`}
                  card={card}
                  onClick={this.props.userPutCard}
                  style={{
                    position: 'relative',
                      left: `${usersCardsSpacing * i}px`,
                  }}
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
    finishTurn,
    userPutCard,
    onWillTakeAll,
  },
)(DeskScreen);
