import getShuffledDeck from '../assets/deck.js';
import {
  putCardsInRightOrder,
  setFirstActivePlayer,
  getAvailableCards,
} from '../assets/croupie-functions.js';

export const SUFFLE_DECK = 'SUFFLE_DECK';
export const GET_TRUMP_CARD = 'GET_TRUMP_CARD';
export const GET_CARDS = 'GET_CARDS';
export const SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER';
export const ROBOT_PUT_CARD = 'ROBOT_PUT_CARD';
export const USER_PUT_CARD = 'USER_PUT_CARD';

export function getOutCards() {
  return (dispatch, getState) => {
    dispatch({
      type: SUFFLE_DECK,
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

    const currentCroupieState = getState().croupie;
    const activePlayer = setFirstActivePlayer(currentCroupieState);
    const playersAction = 'attack';

    dispatch({
      type: SET_ACTIVE_PLAYER,
      payload: {
        activePlayer,
        playersAction,
        availableCards: getAvailableCards(
          currentCroupieState[`${activePlayer}sCards`].cards,
          playersAction,
          currentCroupieState.attackCards,
          currentCroupieState.trumpCard.suit,
        ),
      },
    });
  };
}

export function putCard(card) {
  return (dispatch, getState) => {
    if (getState().croupie.activePlayer === 'user') {
      dispatch({
        type: USER_PUT_CARD,
        payload: card,
      });
    } else {
      dispatch({
        type: ROBOT_PUT_CARD,
        payload: card,
      });
    }
  };
}
