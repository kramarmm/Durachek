import { combineReducers } from 'redux';
import {
  GET_OUT,
  GET_CARDS,
  GET_TRUMP_CARD,
} from '../actions/croupie.js';

function gameState(state = 'start', action) {
  switch (action.type) {
    case GET_OUT:
      return 'process';
    default:
      return state;
  }
}

function deck(state = [], action) {
  switch (action.type) {
    case GET_OUT:
      return action.payload;
    case GET_CARDS:
      return state.slice(0, state.length - action.payload.quantity);
    case GET_TRUMP_CARD:
      return state.slice(0, state.length - 1);
    default:
      return state;
  }
}

function trumpCard(state = '', action) {
  switch (action.type) {
    case GET_TRUMP_CARD:
      return action.payload[0];
    default:
      return state;
  }
}

function usersCards(state = {}, action) {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload.usersCards || state.cards,
      };
    default:
      return state;
  }
}

function robotsCards(state = {}, action) {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload.robotsCards || state.cards,
      };
    default:
      return state;
  }
}

export default combineReducers({
  gameState,
  deck,
  trumpCard,
  usersCards,
  robotsCards,
});

function putCardInRightOrder(cards, trump) {
  //do something here
}
