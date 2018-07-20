import {
  GET_TRUMP_CARD,
  SUFFLE_DECK,
  GET_CARDS,
} from './deck.consts';

export function deck(state = [], action) {
  switch (action.type) {
    case SUFFLE_DECK:
      return action.payload;
    case GET_CARDS:
      const availableQuantityToGet = action.payload.quantity > state.length
        ? state.length
        : action.payload.quantity;
      return state.slice(0, state.length - availableQuantityToGet);
    case GET_TRUMP_CARD:
      return [state[state.length - 1], ...state.slice(0, state.length - 1)];
    default:
      return state;
  }
}
