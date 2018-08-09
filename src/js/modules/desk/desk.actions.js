import DeckUtils from '../deck/deck.utils';

import DeskUtils from './desk.utils';

import {
  SET_TRUMP_CARD,
  SUFFLE_DECK,
} from '../deck/deck.consts';

import {
  START_GAME,
  END_GAME,
  MOVE_TO_BREAK,
} from './desk.consts';

import { transferControlToRobot } from '../robot/robot.actions';
import { setWillTakeAllCards, takeAllCards } from '../player/player.actions';

import { setMessage } from '../message/message.actions';
import { messageTypes } from '../message/message.consts';

import { robot } from '../robot/robot.consts';

import { user } from '../user/user.consts';

export const startTurn = activePlayer => (dispatch, getState) => {
  const firstTaker = activePlayer || user;

  const secondTaker = activePlayer
    ? activePlayer === user
      ? robot
      : user
    : robot;

  // reset willTakeAllCards //
  dispatch(
    setWillTakeAllCards(
      firstTaker,
      false,
    )
  );

  dispatch(
    setWillTakeAllCards(
      secondTaker,
      false,
    )
  );
  // reset willTakeAllCards //

  dispatch(
    DeckUtils.getCards(
      firstTaker,
      getState(),
    )
  );

  dispatch(
    DeckUtils.getCards(
      secondTaker,
      getState(),
    )
  );

  const state = getState();

  if (
    !state[firstTaker].cards.length
    || !state[secondTaker].cards.length
  ) {
    return dispatch({ type: END_GAME });
  }

  if (!activePlayer) {
    activePlayer = DeskUtils.getFirstActivePlayer(
      getState(),
    );
  }

  DeskUtils.setActivePlayer(
    dispatch,
    activePlayer,
    getState()[activePlayer].cards,
  );

  DeskUtils.setActions(
    dispatch,
    activePlayer,
  );
}

export const getOutCards = () => (dispatch, getState) => {
  dispatch({ type: START_GAME });

  dispatch({
    type: SUFFLE_DECK,
    payload: DeckUtils.getShuffledDeck(),
  });

  const trumpCard = getState().deck.slice(-1);

  dispatch({
    type: SET_TRUMP_CARD,
    payload: { trumpCard: trumpCard[0] },
  });

  dispatch(
    startTurn(),
  );

  const state = getState();

  dispatch(
    setMessage(
      state.user.isActive
        ? messageTypes.userMovesFirst
        : messageTypes.robotMovesFirst
    ),
  );

  if (state.robot.isActive) {
    dispatch(
      transferControlToRobot()
    );
  }
}

export const finishTurn = () => (dispatch, getState) => {
  if (getState().robot.willTakeAll) {
    return dispatch(
      takeAllCards(robot),
    );
  }

  return dispatch(
    moveToBreak(),
  );
}

export const moveToBreak = () => (dispatch, getState) => {
  dispatch({ type: MOVE_TO_BREAK });

  const nextActivePlayer = DeskUtils.getNextActivePlayer(getState());

  dispatch(
    startTurn(nextActivePlayer),
  );

  if (nextActivePlayer === robot) {
    dispatch(
      setMessage(messageTypes.userDefends),
    );

    dispatch(
      transferControlToRobot()
    );
  } else {
    dispatch(
      setMessage(messageTypes.userAttacks),
    );
  }
}

export const onWillTakeAll = player => (dispatch, getState) => {
  dispatch(
    setWillTakeAllCards(
      player,
      true, // state of willTakeAll
    ),
  );

  const nextActivePlayer = DeskUtils.getNextActivePlayer(getState());

  if (nextActivePlayer === robot) {
    dispatch(
      transferControlToRobot()
    );
  }
}
