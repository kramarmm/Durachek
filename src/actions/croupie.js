import getShuffledDeck from '../assets/deck.js';
import {
  putCardsInRightOrder,
  setFirstActivePlayer,
} from '../reducers/croupie.js';

export const GET_OUT = 'GET_OUT';
export const GET_CARDS = 'GET_CARDS';
export const GET_TRUMP_CARD = 'GET_TRUMP_CARD';

export function getOutCards() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_OUT,
      payload: getShuffledDeck(),
    });

    const trumpCard = getState().croupie.deck.slice(-1);

    dispatch({
      type: GET_TRUMP_CARD,
      payload: trumpCard,
    });

    dispatch({
      type: GET_CARDS,
      payload: {
        quantity: 6,
        usersCards: putCardsInRightOrder(getState().croupie.deck.slice(-6), trumpCard),
      },
    });

    dispatch({
      type: GET_CARDS,
      payload: {
        quantity: 6,
        robotsCards: putCardsInRightOrder(getState().croupie.deck.slice(-6), trumpCard),
      },
    });

    dispatch({
      type: GET_CARDS,
      payload: {
        activePlayer: setFirstActivePlayer(getState().croupie),
      },
    });
  };
}
