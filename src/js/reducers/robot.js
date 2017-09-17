import {
  SET_ACTIVE_PLAYER,
} from '../actions/croupie.js';

export default function robot(state = {}, action) {
  switch (action.type) {
    // case SET_ACTIVE_PLAYER:
      // if (action.payload.activePlayer === 'robot') {
      //   2
      // }
    default:
      return state;
  }
}
