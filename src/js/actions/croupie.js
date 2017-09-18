import getShuffledDeck from '../assets/deck.js';
import {
  putCardsInRightOrder,
  setFirstActivePlayer,
  getAvailableCards,
} from '../assets/croupie-functions.js';

import transferControlToRobot from './robot.js';

export const START = 'START';
export const SUFFLE_DECK = 'SUFFLE_DECK';
export const GET_TRUMP_CARD = 'GET_TRUMP_CARD';
export const GET_CARDS = 'GET_CARDS';
export const SET_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER';
export const ROBOT_PUT_CARD = 'ROBOT_PUT_CARD';
export const USER_PUT_CARD = 'USER_PUT_CARD';
export const END_OF_TURN = 'END_OF_TURN';
export const TAKE_ALL_TABLE_CARDS = 'TAKE_ALL_TABLE_CARDS';

export const user = 'user';
export const robot = 'robot';
export const attack = 'attack';
export const defend = 'defend';

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
    const playersAction = attack;

    dispatch({
      type: SET_ACTIVE_PLAYER,
      payload: {
        activePlayer,
        playersAction,
        availableCards: getAvailableCards(
          currentCroupieState[`${activePlayer}sCards`].cards,
          playersAction,
          currentCroupieState.attackCards,
          currentCroupieState.tableCards,
          currentCroupieState.trumpCard.suit,
        ),
      },
    });

    if (activePlayer === robot) {
      transferControlToRobot(dispatch, getState);
    }

    setTimeout(() => dispatch({ type: START }), 400);
  };
}

export function putCard(card) {
  return (dispatch, getState) => {
    let currentCroupieState = getState().croupie;
    if (currentCroupieState.activePlayer === user) {
      dispatch({
        type: USER_PUT_CARD,
        payload: {
          card,
          playersAction: currentCroupieState.playersAction,
        },
      });

      currentCroupieState = getState().croupie;
      const { playersAction, robotsCards, attackCards, tableCards, trumpCard } = currentCroupieState;
      const newPlayersAction = playersAction === attack ? defend : attack;

      dispatch({
        type: SET_ACTIVE_PLAYER,
        payload: {
          activePlayer: robot,
          playersAction: newPlayersAction,
          availableCards: getAvailableCards(
            robotsCards.cards,
            newPlayersAction,
            attackCards,
            tableCards,
            trumpCard.suit,
          ),
        },
      });
      transferControlToRobot(dispatch, getState);
    }
  };
}

export function setEndOfTurn() {
  return (dispatch, getState) => {
    dispatch({
      type: END_OF_TURN,
    });
  };
}

export function takeAllTableCards() {
  return (dispatch, getState) => {
    const state = getState().croupie;
    if (state.activePlayer === robot) {
      const availableCards = getAvailableCards(
        state.usersCards.cards,
        attack,
        state.attackCards,
        state.tableCards,
        state.trumpCard.suit,
      );
      if (availableCards) {
        console.warn('robot get card, you may to put another');
      } else {
        dispatch({
          type: TAKE_ALL_TABLE_CARDS,
          payload: {
            activePlayer: robot,
            cards: state.tableCards,
          },
        });
        dispatch({
          type: END_OF_TURN,
          payload: {
            activePlayer: robot,
            cards: state.tableCards,
          },
        });
        console.warn('robot get card, you CANNOT PUT ANOTHER');
      }
    }
  };
}

export function transferControlFromRobot(dispatch, getState) {
  const currentCroupieState = getState().croupie;
  const { playersAction, usersCards, attackCards, tableCards, trumpCard } = currentCroupieState;
  const newPlayersAction = playersAction === attack ? defend : attack;

  dispatch({
    type: SET_ACTIVE_PLAYER,
    payload: {
      activePlayer: user,
      playersAction: newPlayersAction,
      availableCards: getAvailableCards(
        usersCards.cards,
        newPlayersAction,
        attackCards,
        tableCards,
        trumpCard.suit,
      ),
    },
  });
}
