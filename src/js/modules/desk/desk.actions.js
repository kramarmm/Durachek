import DeckUtils from '../deck/deck.utils';

import DeskUtils from './desk.utils';

import {
  SET_TRUMP_CARD,
  SUFFLE_DECK,
} from '../deck/deck.consts';

import {
  defend,
  attack,

  START_GAME,

  ADD_ATTACK_CARD,
  ADD_DEFEND_CARD,
  MOVE_TO_BREAK,
} from './desk.consts';

import transferControlToRobot from '../robot/robot.actions';

import {
  robot,

  ROBOT_PUT_CARD,
  ROBOT_GET_CARDS,

  ROBOT_SET_ACTIVE,
  ROBOT_SET_UNACTIVE,

  ROBOT_SET_ATACK_ACTION,
  ROBOT_SET_DEFEND_ACTION,

  ROBOT_WILL_TAKE_ALL_CARDS,
  ROBOT_TAKE_ALL_CARDS,
} from '../robot/robot.consts';

import {
  user,

  USER_PUT_CARD,
  USER_GET_CARDS,

  USER_SET_ACTIVE,
  USER_SET_UNACTIVE,

  USER_SET_ATACK_ACTION,
  USER_SET_DEFEND_ACTION,

  USER_WILL_TAKE_ALL_CARDS,
  USER_TAKE_ALL_CARDS,
} from '../user/user.consts';

function startTurn(
  activePlayer,
) {
  return (dispatch, getState) => {
    const { trumpCard } = getState().desk;

    const opponent = activePlayer === user
      ? robot
      : user;

    dispatch(
      DeckUtils.getCards(
        opponent,
        getState(),
      )
    );

    dispatch(
      DeckUtils.getCards(
        activePlayer,
        getState(),
      )
    );

    DeskUtils.setActivePlayer(
      dispatch,
      activePlayer,
      getState()[activePlayer].cards,
    );

    DeskUtils.setAction(
      dispatch,
      activePlayer,
    );
  };
}

export function getOutCards() {
  return (dispatch, getState) => {
    dispatch({ type: START_GAME });

    dispatch({
      type: SUFFLE_DECK,
      payload: DeckUtils.getShuffledDeck(),
    });

    const state = getState();

    const trumpCard = state.deck.slice(-1);

    dispatch({
      type: SET_TRUMP_CARD,
      payload: { trumpCard: trumpCard[0] },
    });

    const firstActivePlayer = DeskUtils.getFirstActivePlayer(state);

    dispatch(
      startTurn(firstActivePlayer),
    );

    if (firstActivePlayer === robot) {
      dispatch(
        transferControlToRobot()
      );
    }
  };
}

export function userPutCard(card) {
  return (dispatch, getState) => {
    let state = getState();

    dispatch({
      type: USER_PUT_CARD,
      payload: { card },
    });

    if (state.user.action === attack) {
      dispatch({
        type: ADD_ATTACK_CARD,
        payload: { card },
      });
    } else {
      dispatch({
        type: ADD_DEFEND_CARD,
        payload: { card },
      });
    }

    state = getState();

    dispatch(
      DeskUtils.setActivePlayer(
        dispatch,
        robot,
        DeskUtils.getAvailableCards(state, robot),
      )
    );

    dispatch(
      transferControlToRobot()
    );
  };
}

export function takeAllCards(player) {
  return (dispatch, getState) => {
    const state = getState();

    const { deck, desk } = state;

    const cards = [
      ...desk.defendCards,
      ...desk.attackCard,
    ];

    dispatch({
      type: player === user
        ? USER_TAKE_ALL_CARDS
        : ROBOT_TAKE_ALL_CARDS,
      payload: {
        cards,
        trumpCard: desk.trumpCard,
      },
    });

    const nextActivePlayer = DeskUtils.getNextActivePlayer(state);

    dispatch(
      startTurn(nextActivePlayer),
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
    let needCards = 6 - state[desk.activePlayer].cards.length;
    needCards = needCards <= deck.length
      ? needCards
      : deck.length;

    if (needCards > 0) {
      dispatch(
        DeckUtils.getCards(
          desk.activePlayer,
          deck.slice(-needCards),
          desk.trumpCard,
        )
      );

      // update local variable
      deck = getState().deck;
    }

    // Get cards for next activePlayer
    const nextActivePlayer = DeskUtils.getNextActivePlayer(desk.activePlayer);
    let needCardsForNext = 6 - state[nextActivePlayer].cards.length;
    needCardsForNext = needCardsForNext <= deck.length
      ? needCardsForNext
      : deck.length;

    if (needCardsForNext > 0) {
      dispatch(
        DeckUtils.getCards(
          nextActivePlayer,
          deck.slice(-needCardsForNext),
          desk.trumpCard,
        )
      );
    }

    const availableCards = getState()[nextActivePlayer].cards;

    dispatch(
      DeskUtils.setActivePlayer(
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

export function transferControlToUser() {
  return (dispatch, getState) => {
    const state = getState();

    const playersAction = DeskUtils.getNextPlayersAction(
      state.desk.playersAction
    );
    const availableCards = DeskUtils.getAvailableCards(state, user);

    dispatch(
      DeskUtils.setActivePlayer(
        user,
        playersAction,
        availableCards,
      )
    );
  };
}
