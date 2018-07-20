import { GET_TRUMP_CARD } from '../deck/deck.consts';
import { USER_PUT_CARD, user } from '../user/user.consts';
import { ROBOT_PUT_CARD, robot } from '../robot/robot.consts';

import {
  START,
  MOVE_TO_BREAK,
  SET_ACTIVE_PLAYER,
  TAKE_ALL_DESK_CARDS,

  start,
  game,
  defend,
  attack,
} from './desk.consts';

export function gameState(state = start, action) {
  switch (action.type) {
    case START:
      return game;
    default:
      return state;
  }
}

export function trumpCard(state = '', action) {
  switch (action.type) {
    case GET_TRUMP_CARD:
      return action.payload[0];
    default:
      return state;
  }
}


export function activePlayer(state = '', action) {
  switch (action.type) {
    case SET_ACTIVE_PLAYER:
      return action.payload.activePlayer;
    default:
      return state;
  }
}

export function playersAction(state = '', action) {
  switch (action.type) {
    case SET_ACTIVE_PLAYER:
      return action.payload.playersAction;
    default:
      return state;
  }
}

// move it to user and robot
export function attackCards(state = [], action) {
  switch (action.type) {
    case USER_PUT_CARD:
    case ROBOT_PUT_CARD:
      if (action.payload.playersAction === attack) {
        return [...state, action.payload.card];
      }

      return [];
    case MOVE_TO_BREAK:
    case TAKE_ALL_DESK_CARDS:
      return [];
    default:
      return state;
  }
}

export function cards(state = [], action) {
  switch (action.type) {
    case USER_PUT_CARD:
      return [...state, action.payload.card];
    case ROBOT_PUT_CARD:
      return [...state, action.payload.card];
    case MOVE_TO_BREAK:
    case TAKE_ALL_DESK_CARDS:
      return [];
    default:
      return state;
  }
}
