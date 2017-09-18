import { combineReducers } from 'redux';
import {
  SUFFLE_DECK,
  GET_CARDS,
  GET_TRUMP_CARD,
  SET_ACTIVE_PLAYER,
  USER_PUT_CARD,
  ROBOT_PUT_CARD,
  START,
  END_OF_TURN,
  TAKE_ALL_TABLE_CARDS,
} from '../actions/croupie.js';

function gameState(state = 'start', action) {
  switch (action.type) {
    case START:
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
    case SET_ACTIVE_PLAYER:
      if (action.payload.activePlayer === 'user') {
        return {
          ...state,
          availableCards: action.payload.availableCards,
        };
      }
      return state;
    case USER_PUT_CARD:
      const index = state.cards.findIndex(card => action.payload.card === card);
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, index),
          ...state.cards.slice(index + 1, state.cards.length),
        ],
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
    case SET_ACTIVE_PLAYER:
      if (action.payload.activePlayer === 'robot') {
        return {
          ...state,
          availableCards: action.payload.availableCards,
        };
      }
      return state;
    case ROBOT_PUT_CARD:
      const index = state.cards.findIndex(card => action.payload.card === card);
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, index),
          ...state.cards.slice(index + 1),
        ],
      };
    case TAKE_ALL_TABLE_CARDS:
      if (action.payload.activePlayer === 'robot') {
        return {
          ...state,
          cards: {
            ...state.cards,
            ...action.payload.cards,
          },
        };
      }
      return state;
    default:
      return state;
  }
}

function activePlayer(state = '', action) {
  switch (action.type) {
    case SET_ACTIVE_PLAYER:
      return action.payload.activePlayer;
    default:
      return state;
  }
}

function playersAction(state = '', action) {
  switch (action.type) {
    case SET_ACTIVE_PLAYER:
      return action.payload.playersAction;
    default:
      return state;
  }
}

function attackCards(state = [], action) {
  switch (action.type) {
    case USER_PUT_CARD:
      if (action.payload.playersAction === 'attack') {
        return [...state, action.payload.card];
      }
      return [];
    case ROBOT_PUT_CARD:
      if (action.payload.playersAction === 'attack') {
        return [...state, action.payload.card];
      }
      return [];
    case END_OF_TURN:
    case TAKE_ALL_TABLE_CARDS:
      return [];
    default:
      return state;
  }
}

function tableCards(state = [], action) {
  switch (action.type) {
    case USER_PUT_CARD:
      return [...state, action.payload.card];
    case ROBOT_PUT_CARD:
      return [...state, action.payload.card];
    case END_OF_TURN:
    case TAKE_ALL_TABLE_CARDS:
      return [];
    default:
      return state;
  }
}

function messages(state = [], action) {
  switch (action.type) {
    case START:
      return [...state, 'game is begun, bitch!'];
    case SET_ACTIVE_PLAYER:
      if (action.payload.activePlayer === 'robot') {
        return [...state, 'robots move, bitch!'];
      } else {
        return [...state, 'your move, bitch!'];
      }
    case ROBOT_PUT_CARD:
      return [...state, 'robot put card, bitch!'];
    case USER_PUT_CARD:
      return [...state, 'you put card, bitch!'];
    case END_OF_TURN:
      return [...state, 'end of turn, bitch!'];
    case TAKE_ALL_TABLE_CARDS:
      if (action.payload.activePlayer === 'robot') {
        return [...state, 'robots all cards, bitch!'];
      } else {
        return [...state, 'your all cards, bitch!'];
      }
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
  playersAction,
  attackCards,
  tableCards,
  messages,
});
