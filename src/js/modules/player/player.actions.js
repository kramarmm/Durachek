import DeskUtils from '../desk/desk.utils';

import {
  attack,

  ADD_ATTACK_CARD,
  ADD_DEFEND_CARD,
} from '../desk/desk.consts';

import { startTurn } from '../desk/desk.actions';

import { setMessage } from '../message/message.actions';
import { messageTypes } from '../message/message.consts';

import { transferControlToRobot } from '../robot/robot.actions';
import { transferControlToUser } from '../user/user.actions';

import {
  robot,
  ROBOT_PUT_CARD,
  ROBOT_TAKE_ALL_CARDS,
  ROBOT_WILL_TAKE_ALL_CARDS,
} from '../robot/robot.consts';

import {
  user,
  USER_PUT_CARD,
  USER_TAKE_ALL_CARDS,
  USER_WILL_TAKE_ALL_CARDS,
} from '../user/user.consts';

export function putCard(
  player,
  card,
) {
  return (dispatch, getState) => {
    let state = getState();

    dispatch({
      type: player === user
        ? USER_PUT_CARD
        : ROBOT_PUT_CARD,
      payload: { card },
    });

    if (state[player].action === attack) {
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
    const opponent = player === user
      ? robot
      : user;

    if (state[opponent].willTakeAll) {
      return;
    }

    DeskUtils.setActivePlayer(
      dispatch,
      opponent,
      DeskUtils.getAvailableCards(state, opponent),
    );

    if (opponent === robot) {
      dispatch(
        transferControlToRobot()
      );
    }
  };
}

export function takeAllCards(player) {
  return (dispatch, getState) => {
    const state = getState();

    const { desk } = state;

    const cards = [
      ...desk.defendCards,
      ...desk.attackCards,
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

    const nextActivePlayer = player === user
      ? robot
      : user;

    dispatch(
      startTurn(nextActivePlayer),
    );

    if (nextActivePlayer === robot) {
      dispatch(
        setMessage(messageTypes.userDefendsAgain),
      );

      dispatch(
        transferControlToRobot(),
      );
    } else {
      dispatch(
        setMessage(messageTypes.userAttacksAgain),
      );
    }
  };
}

export const setWillTakeAllCards = (player, state) => dispatch =>
  dispatch({
    type: player === user
      ? USER_WILL_TAKE_ALL_CARDS
      : ROBOT_WILL_TAKE_ALL_CARDS,
    payload: { state },
  });
