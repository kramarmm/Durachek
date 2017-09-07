import { combineReducers } from 'redux';
import {
  SUFFLE_DECK,
  GET_CARDS,
  GET_TRUMP_CARD,
  SET_ACTIVE_PLAYER,
} from '../actions/croupie.js';

function gameState(state = 'start', action) {
  switch (action.type) {
    case SUFFLE_DECK:
      return 'process';
    default:
      return state;
  }
}

function deck(state = [], action) {
  switch (action.type) {
    case SUFFLE_DECK:
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

function activePlayer(state = '', action) {
  switch (action.type) {
    case SET_ACTIVE_PLAYER:
      return action.payload;
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
  activePlayer,
});

// ---------- need sorting inner cards ---------- //
const suits = ['d', 's', 'h', 'c'];
export function putCardsInRightOrder(cards, trump) {
  const index = suits.findIndex(s => s === trump[0].suit);
  suits.splice(index, 1);
  suits.unshift(trump[0].suit);
  return suits.reduce((acc, suit) => {
    return acc.concat(cards.filter(card => card.suit === suit).sort((a, b) => b.value - a.value));
  }, []);
}

export function setFirstActivePlayer(croupieState) {
  const usersC = croupieState.usersCards.cards;
  const robotsC = croupieState.robotsCards.cards;
  const trump = croupieState.trumpCard.suit;
  let maxUserCard = 0;
  let firstActivePlayer = 'user';
  usersC.forEach((card) => {
    if (card.suit === trump && card.value > maxUserCard) maxUserCard = card.value;
  });
  robotsC.forEach((card) => {
    if (card.suit === trump && card.value > maxUserCard) firstActivePlayer = 'robot';
  });
  return firstActivePlayer;
}
