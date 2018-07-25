import {
  SET_TRUMP_CARD,
  SUFFLE_DECK,
} from './deck.consts';

import { USER_GET_CARDS } from '../user/user.consts';

import { ROBOT_GET_CARDS } from '../robot/robot.consts';

export function deck(state = [], action) {
  switch (action.type) {
    case SUFFLE_DECK:
      return action.payload;

    case SET_TRUMP_CARD:
      return [
        state[state.length - 1],
        ...state.slice(0, state.length - 1),
      ];

    case USER_GET_CARDS:
    case ROBOT_GET_CARDS:
      return state.slice(
        0,
        state.length - action.payload.cards.length,
      );

    default:
      return state;
  }
}
