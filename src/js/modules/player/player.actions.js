import DeskUtils from '../desk/desk.utils';

import {
  attack,

  ADD_ATTACK_CARD,
  ADD_DEFEND_CARD,
} from '../desk/desk.consts';

import { startTurn } from '../desk/desk.actions';

import { transferControlToRobot } from '../robot/robot.actions';
import { transferControlToUser } from '../user/user.actions';

import {
  robot,
  ROBOT_PUT_CARD,
  ROBOT_TAKE_ALL_CARDS,
} from '../robot/robot.consts';

import {
  user,
  USER_PUT_CARD,
  USER_TAKE_ALL_CARDS,
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

    DeskUtils.setActivePlayer(
      dispatch,
      opponent,
      DeskUtils.getAvailableCards(state, opponent),
    );

    dispatch(
      opponent === robot
        ? transferControlToRobot()
        : transferControlToUser()
    );
  };
}

export function takeAllCards(player) {
  return (dispatch, getState) => {
    const state = getState();

    const { desk } = state;

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
      dispatch(
        transferControlToRobot(),
      );
    }
  };
}
