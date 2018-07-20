import { GET_CARDS } from '../deck/deck.consts';
import { USER_PUT_CARD, user } from './user.consts';

import {
  SET_ACTIVE_PLAYER,
  TAKE_ALL_DESK_CARDS,
  UPDATE_AVAILABLE_CARDS,
} from '../desk/desk.consts';

export function cards(state = [], action) {
  switch (action.type) {
    case GET_CARDS:
      if (action.payload.player !== user) {
        return state;
      }

      return [
        ...state,
        ...action.payload.cards,
      ];
    case USER_PUT_CARD:
      const index = state.findIndex(
        card => action.payload.card === card,
      );

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length),
      ];
    case TAKE_ALL_DESK_CARDS:
      if (action.payload.activePlayer === user) {
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
    case UPDATE_AVAILABLE_CARDS: // ??? remove if not need
      if (
        action.payload.activePlayer === user ||
        action.payload.player === user
      ) {
        return action.payload.availableCards;
      }
      return state;
    default:
      return state;
  }
}
