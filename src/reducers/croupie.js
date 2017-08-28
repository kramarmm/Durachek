import { combineReducers } from 'redux';

import { defaultDeck } from '../default-deck';
import { shuffle } from '../actions/croupie.js';

import {
	GET_OUT,
} from '../actions/croupie.js';

function gameState(state = 'start', action) {
  switch (action.type) {
    case GET_OUT:
      return state + 1;
    default:
      return state;
  }
};

function deck(state = defaultDeck, action) {
  switch (action.type) {
    case GET_OUT:
      return shuffle(defaultDeck);
    default:
      return state;
  }
};

export default combineReducers({
	gameState,
	deck,
});
