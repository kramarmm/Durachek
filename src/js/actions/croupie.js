import getShuffledDeck from '../assets/deck.js';
import {
  putCardsInRightOrder,
  setFirstActivePlayer,
  getAvailableCards,
  togglePlayersActions,
  toggleActivePlayers,
} from '../assets/croupie-functions.js';

import transferControlToRobot from './robot.js';

import {
  robot,
  user,
  defend,
  attack,
} from '../assets/consts.js';

export const START = 'START';
export const SUFFLE_DECK = 'SUFFLE_DECK';
export const GET_TRUMP_CARD = 'GET_TRUMP_CARD';
export const GET_CARDS = 'GET_CARDS';
export const SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER';
export const ROBOT_PUT_CARD = 'ROBOT_PUT_CARD';
export const USER_PUT_CARD = 'USER_PUT_CARD';
export const END_OF_TURN = 'END_OF_TURN';
export const TAKE_ALL_TABLE_CARDS = 'TAKE_ALL_TABLE_CARDS';

function getCards(quantity, forWho, deck, trumpCard) {
  return {
    type: GET_CARDS,
    payload: {
      quantity,
      [`${forWho}sCards`]: putCardsInRightOrder(deck.slice(-quantity), trumpCard),
    },
  };
}

function setActivePlayer(activePlayer, playersAction, availableCards) {
  return {
    type: SET_ACTIVE_PLAYER,
    payload: {
      activePlayer,
      playersAction,
      availableCards,
    },
  };
}

export function setEndOfTurn() {
  return { type: END_OF_TURN };
}

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

    dispatch(getCards(6, user, getState().croupie.deck, trumpCard));
    dispatch(getCards(6, robot, getState().croupie.deck, trumpCard));

    const croupieState = getState().croupie;
    const firstActivePlayer = setFirstActivePlayer(croupieState);
    const availableCards = croupieState[`${firstActivePlayer}sCards`].cards;

    dispatch(setActivePlayer(firstActivePlayer, attack, availableCards));

    if (firstActivePlayer === robot) {
      dispatch(transferControlToRobot());
    }

    setTimeout(() => dispatch({ type: START }), 400);
  };
}

export function userPutCard(card) {
  return (dispatch, getState) => {
    let croupieState = getState().croupie;
    if (croupieState.activePlayer === user) {
      dispatch({
        type: USER_PUT_CARD,
        payload: {
          card,
          playersAction: croupieState.playersAction,
        },
      });

      croupieState = getState().croupie;
      const playersAction = togglePlayersActions(croupieState.playersAction);
      const availableCards = getAvailableCards(croupieState, robot);

      dispatch(setActivePlayer(robot, playersAction, availableCards));
      dispatch(transferControlToRobot());
    }
  };
}

export function takeAllTableCards() {
  return (dispatch, getState) => {
    const croupieState = getState().croupie;
    const { activePlayer, tableCards, deck, trumpCard } = croupieState;

    dispatch({
      type: TAKE_ALL_TABLE_CARDS,
      payload: {
        activePlayer,
        cards: tableCards,
      },
    });

    dispatch(setEndOfTurn());
    // переименовать на finishTurn
    // а если отбой то наверное getOutCards и раздаем обоим
    // разобраться с кнопкой пользователя

    const nextActivePlayer = toggleActivePlayers(activePlayer);
    const needQuantityCards = 6 - croupieState[`${nextActivePlayer}sCards`].cards.length;
    dispatch(getCards(needQuantityCards, nextActivePlayer, deck, trumpCard));

    const availableCards = croupieState[`${nextActivePlayer}sCards`].cards;
    dispatch(setActivePlayer(nextActivePlayer, attack, availableCards));
  };
}

export function transferControlFromRobot() {
  return (dispatch, getState) => {
    const croupieState = getState().croupie;
    const playersAction = togglePlayersActions(croupieState.playersAction);
    const availableCards = getAvailableCards(croupieState, user);
    dispatch(setActivePlayer(user, playersAction, availableCards));
  };
}
