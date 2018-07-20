import DeckUtils from '../deck/deck.utils';
import Desk from './desk.utils';

import transferControlToRobot from '../robot/robot.actions';

import { robot, ROBOT_PUT_CARD } from '../robot/robot.consts';
import { user, USER_PUT_CARD } from '../user/user.consts';
import { defend, attack } from '../desk/desk.consts';

import {
  GET_TRUMP_CARD,
  SUFFLE_DECK,
  GET_CARDS,
} from '../deck/deck.consts';

import {
  START,
  SET_ACTIVE_PLAYER,
  MOVE_TO_BREAK,
  TAKE_ALL_DESK_CARDS,
  UPDATE_AVAILABLE_CARDS,
} from './desk.consts';


function getCards(
  quantity,
  player,
  deck,
  trumpCard,
) {
  return {
    type: GET_CARDS,
    payload: {
      player,
      quantity,
      cards: Desk.putCardsInRightOrder( // move it to reducers
        deck.slice(-quantity),
        trumpCard,
      ),
    },
  };
}

function setActivePlayer(
  activePlayer,
  playersAction,
  availableCards,
) {
  return {
    type: SET_ACTIVE_PLAYER,
    payload: {
      activePlayer,
      playersAction,
      availableCards,
    },
  };
}

export function getOutCards() {
  return (dispatch, getState) => {
    dispatch({
      type: SUFFLE_DECK,
      payload: DeckUtils.getShuffledDeck(),
    });

    const trumpCard = getState().deck.slice(-1);

    dispatch({
      type: GET_TRUMP_CARD,
      payload: trumpCard,
    });

    dispatch(getCards(6, user, getState().deck, trumpCard));
    dispatch(getCards(6, robot, getState().deck, trumpCard));

    const state = getState();
    const firstActivePlayer = Desk.setFirstActivePlayer(state);
    const availableCards = state[firstActivePlayer].cards;

    dispatch(setActivePlayer(firstActivePlayer, attack, availableCards));

    if (firstActivePlayer === robot) {
      dispatch(transferControlToRobot());
    }

    setTimeout(() => dispatch({ type: START }), 400);
  };
}

export function userPutCard(card) {
  return (dispatch, getState) => {
    let state = getState();

    if (state.desk.activePlayer === user) {
      dispatch({
        type: USER_PUT_CARD,
        payload: {
          card,
          playersAction: state.desk.playersAction,
        },
      });

      state = getState();

      dispatch(setActivePlayer(
        robot,
        Desk.getNextPlayersActions(state.desk.playersAction),
        Desk.getAvailableCards(state, robot),
      ));
      dispatch(transferControlToRobot());
    }
  };
}

export function takeAllDeskCards() {
  return (dispatch, getState) => {
    const state = getState();

    const { deck, desk } = state;

    const mergedCards = desk.cards.concat(
      state[desk.activePlayer].cards,
    );

    dispatch({
      type: TAKE_ALL_DESK_CARDS,
      payload: {
        activePlayer: desk.activePlayer,
        cards: Desk.putCardsInRightOrder(
          mergedCards,
          desk.trumpCard,
        ),
      },
    });

    const nextActivePlayer = Desk.getNextActivePlayers(desk.activePlayer);

    const needCards = 6 - state[nextActivePlayer].cards.length;
    if (needCards > 0 && deck.length) {
      dispatch(
        getCards(
          needCards,
          nextActivePlayer,
          deck,
          desk.trumpCard,
        )
      );
    }

    const availableCards = getState().desk[nextActivePlayer].cards;
    dispatch(
      setActivePlayer(
        nextActivePlayer,
        attack,
        availableCards,
      )
    );

    if (nextActivePlayer === robot) {
      dispatch(transferControlToRobot());
    }
  };
}

export function moveToBreak() {
  return (dispatch, getState) => {
    const state = getState();

    let { deck } = state;
    const { desk } = state;

    dispatch({ type: MOVE_TO_BREAK });

    // Get cards for current activePlayer
    const needCards = 6 - state[desk.activePlayer].cards.length;
    if (needCards > 0 && deck.length) {
      dispatch(
        getCards(
          needCards,
          desk.activePlayer,
          deck,
          desk.trumpCard,
        )
      );

      // update local variable
      deck = getState().deck;
    }

    // Get cards for next activePlayer
    const nextActivePlayer = Desk.getNextActivePlayers(desk.activePlayer);
    const needCardsForNext = 6 - croupieState[nextActivePlayer].cards.length;

    if (needCardsForNext > 0 && deck.length) {
      dispatch(
        getCards(
          needCardsForNext,
          nextActivePlayer,
          deck,
          desk.trumpCard,
        )
      );
    }

    const availableCards = getState()[nextActivePlayer].cards;

    dispatch(
      setActivePlayer(
        nextActivePlayer,
        attack,
        availableCards,
      )
    );

    if (nextActivePlayer === robot) {
      dispatch(transferControlToRobot());
    }
  };
}

export function transferControlFromRobot() {
  return (dispatch, getState) => {
    const state = getState();

    const playersAction = Desk.getNextPlayersActions(
      state.desk.playersAction
    );
    const availableCards = Desk.getAvailableCards(state, user);

    dispatch(
      setActivePlayer(
        user,
        playersAction,
        availableCards,
      )
    );
  };
}
