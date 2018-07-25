import {
  robot,

  ROBOT_PUT_CARD,
  ROBOT_GET_CARDS,

  ROBOT_SET_ACTIVE,
  ROBOT_SET_UNACTIVE,

  ROBOT_SET_ATACK_ACTION,
  ROBOT_SET_DEFEND_ACTION,

  ROBOT_WILL_TAKE_ALL_CARDS,
  ROBOT_TAKE_ALL_CARDS,
} from '../robot/robot.consts';

import {
  user,

  USER_PUT_CARD,
  USER_GET_CARDS,

  USER_SET_ACTIVE,
  USER_SET_UNACTIVE,

  USER_SET_ATACK_ACTION,
  USER_SET_DEFEND_ACTION,

  USER_WILL_TAKE_ALL_CARDS,
  USER_TAKE_ALL_CARDS,
} from '../user/user.consts';

import { defend, attack } from '../desk/desk.consts';

const suits = ['d', 's', 'h', 'c'];

export default class DeskUtils {
  static setAction(
    dispatch,
    activePlayer,
  ) {
    dispatch({
      type: activePlayer === user
        ? USER_SET_ATACK_ACTION
        : ROBOT_SET_ATACK_ACTION,
      payload: {},
    });

    return dispatch({
      type: activePlayer === user
        ? ROBOT_SET_DEFEND_ACTION
        : USER_SET_DEFEND_ACTION,
      payload: {},
    });
  }

  static setActivePlayer(
    dispatch,
    activePlayer,
    availableCards,
  ) {
    dispatch({
      type: activePlayer === user
        ? USER_SET_ACTIVE
        : ROBOT_SET_ACTIVE,
      payload: {
        availableCards,
      },
    });

    return dispatch({
      type: activePlayer === user
        ? ROBOT_SET_UNACTIVE
        : USER_SET_UNACTIVE,
      payload: {},
    });
  }

  static getNextActivePlayer(state) {
    return state.user.isActive
      ? robot
      : user;
  }

  static getActivePlayer(state) {
    return state.user.isActive
      ? user
      : robot;
  }

  static putCardsInRightOrder(cards, trump) {
    const trumpSuit = trump.suit;

    const index = suits.findIndex(s => s === trumpSuit);

    suits.splice(index, 1);
    suits.unshift(trumpSuit);

    return suits.reduce((acc, suit) => {
      return acc.concat(
        cards
          .filter(card => card.suit === suit)
          .sort((a, b) => b.value - a.value)
      );
    }, []);
  }

  static getAvailableCards(state, player) {
    if (state[player].willTakeAll) {
      return [];
    }

    const { desk } = state;

    const playerCards = state[player].cards;

    if (!desk.defendCards.length && state[player].action === attack) {
      return playerCards;
    }

    const trumpSuit = state.desk.trumpCard.suit;

    const selectedCards = [];

    if (desk.attackCards.length && state[player].action === defend) {
      for (let i = 0; i < desk.attackCards.length; i++) {
        for (let j = 0; j < playerCards.length; j++) {
          if (
            playerCards[j].suit === trumpSuit &&
            desk.attackCards[i].suit !== trumpSuit
          ) {
            selectedCards.push(playerCards[j]);
            continue;
          }

          if (
            playerCards[j].suit === desk.attackCards[i].suit &&
            playerCards[j].value > desk.attackCards[i].value
          ) {
            selectedCards.push(playerCards[j]);
          }
        }
      }

      return selectedCards;
    }

    if (desk.defendCards.length && state[player].action === attack) {
      for (let i = 0; i < desk.defendCards.length; i++) {
        for (let j = 0; j < playerCards.length; j++) {
          if (playerCards[j].value === desk.defendCards[i].value) {
            selectedCards.push(playerCards[j]);
          }
        }
      }

      return selectedCards;
    }

    return [];
  }

  static getFirstActivePlayer(state) {
    const trump = state.desk.trumpCard.suit;

    const maxUserCard = state.user.cards.reduce((acc, card) => {
      if (card.suit === trump && card.value > acc) {
        return card.value;
      }

      return acc;
    }, 0);

    const robotIsFirst = state.robot.cards.some(
      card => card.suit === trump && card.value > maxUserCard,
    );

    return robotIsFirst
      ? robot
      : user;
  }
}
