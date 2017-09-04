import getShuffledDeck from '../assets/deck.js';

export const GET_OUT = 'GET_OUT';
export const GET_CARDS = 'GET_CARDS';

export function getOutCards() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_OUT,
      payload: getShuffledDeck(),
    });

    dispatch({
      type: GET_CARDS,
      payload: {
        quantity: 6,
        usersCards: getState().croupie.deck.slice(-6),
      },
    });

    dispatch({
      type: GET_CARDS,
      payload: {
        quantity: 6,
        robotsCards: getState().croupie.deck.slice(-6),
      },
    });
  };
}
