import { GET_CARDS } from '../deck/deck.consts';
import { ROBOT_PUT_CARD, robot } from './robot.consts';

import {
  SET_ACTIVE_PLAYER,
  TAKE_ALL_DESK_CARDS,
} from '../desk/desk.consts';

export function cards(state = { cards: [], availableCards: [] }, action) {
  switch (action.type) {
    case GET_CARDS:
      if (action.payload.player !== robot) {
        return state;
      }

      return [
        ...state,
        ...action.payload.cards,
      ];
    case ROBOT_PUT_CARD:
      const index = state.findIndex(
        card => action.payload.card === card,
      );

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length),
      ];
    case TAKE_ALL_DESK_CARDS:
      if (action.payload.activePlayer === robot) {
        return [
          ...state,
          ...action.payload.cards,
        ];
      }
      return state;
    default:
      return state;
  }
}

export function availableCards(state = [], action) {
  switch (action.type) {
    case SET_ACTIVE_PLAYER:
      if (action.payload.activePlayer === robot) {
        return action.payload.availableCards;
      }
      return state;
    default:
      return state;
  }
}
