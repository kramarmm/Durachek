import { SET_TRUMP_CARD } from '../deck/deck.consts';

import { USER_TAKE_ALL_CARDS } from '../user/user.consts';

import { ROBOT_TAKE_ALL_CARDS } from '../robot/robot.consts';

import {
  START_GAME,
  END_GAME,

  ADD_ATTACK_CARD,
  ADD_DEFEND_CARD,
  MOVE_TO_BREAK,

  start,
  game,
  end,
} from './desk.consts';

export function gameState(state = start, action) {
  switch (action.type) {
    case START_GAME:
      return game;

    case END_GAME:
      return end;

    default:
      return state;
  }
}

export function trumpCard(state = {}, action) {
  switch (action.type) {
    case SET_TRUMP_CARD:
      return action.payload.trumpCard;

    default:
      return state;
  }
}

export function attackCards(state = [], action) {
  switch (action.type) {
    case ADD_ATTACK_CARD:
      return [
        ...state,
        action.payload.card,
      ];

    case MOVE_TO_BREAK:
    case USER_TAKE_ALL_CARDS:
    case ROBOT_TAKE_ALL_CARDS:
      return [];

    default:
      return state;
  }
}

export function defendCards(state = [], action) {
  switch (action.type) {
    case ADD_DEFEND_CARD:
      return [
        ...state,
        action.payload.card,
      ];

    case MOVE_TO_BREAK:
    case USER_TAKE_ALL_CARDS:
    case ROBOT_TAKE_ALL_CARDS:
      return [];

    default:
      return state;
  }
}
