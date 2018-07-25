import DeckUtils from '../deck/deck.utils.js';
import DeskUtils from '../desk/desk.utils.js';

import { defend, attack } from '../desk/desk.consts';

import * as robotConsts from '../robot/robot.consts';
import * as userConsts from '../user/user.consts';

const actionTypes = {
  ...robotConsts,
  ...userConsts,
};

export default class Player {
  constructor(type) {
    this.type = type;
    this.TYPE = type.toUpperCase();
  }

  cards(state, action) {
    switch (action.type) {
      case actionTypes[`${this.TYPE}_GET_CARDS`]:
      case actionTypes[`${this.TYPE}_TAKE_ALL_CARDS`]:
        const updatedCards = [
          ...state,
          ...action.payload.cards,
        ];

        return DeskUtils.putCardsInRightOrder( // move it to reducers
          updatedCards,
          action.payload.trumpCard,
        );

      case actionTypes[`${this.TYPE}_PUT_CARD`]:
        const index = state.findIndex(
          card => DeckUtils.isTheSameCard(card, action.payload.card),
        );

        return [
          ...state.slice(0, index),
          ...state.slice(index + 1, state.length),
        ];

      default:
        return state;
    }
  }

  availableCards(state, action) {
    switch (action.type) {
      case actionTypes[`${this.TYPE}_SET_ACTIVE`]:
        return action.payload.availableCards;
      default:
        return state;
    }
  }

  isActive(state, action) {
    switch (action.type) {
      case actionTypes[`${this.TYPE}_SET_ACTIVE`]:
        return true;

      case actionTypes[`${this.TYPE}_SET_UNACTIVE`]:
        return false;

      default:
        return state;
    }
  }

  action(state, action) {
    switch (action.type) {
      case actionTypes[`${this.TYPE}_SET_ATACK_ACTION`]:
        return attack;

      case actionTypes[`${this.TYPE}_SET_DEFEND_ACTION`]:
        return defend;

      default:
        return state;
    }
  }

  willTakeAll(state, action) {
    switch (action.type) {
      case actionTypes[`${this.TYPE}_WILL_TAKE_ALL_CARDS`]:
        return action.payload.state;

      default:
        return state;
    }
  }
}
