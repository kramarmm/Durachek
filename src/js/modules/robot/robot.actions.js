import { putCard } from '../player/player.actions';

import { robot } from './robot.consts';

import {
  moveToBreak,
  takeAllDeskUtilsCards,
} from '../desk/desk.actions';

import { attack } from '../desk/desk.consts';

import { transferControlToUser } from '../user/user.actions';

export function transferControlToRobot() {
  return (dispatch, getState) => {
    const state = getState();
    const { availableCards } = state.robot;

    if (availableCards.length) {
      dispatch(
        putCard(
          robot,
          availableCards[availableCards.length - 1],
        ),
      );

      return dispatch(
        transferControlToUser(),
      );
    }

    return dispatch(
      state.desk.playersAction === attack
        ? moveToBreak()
        : takeAllDeskUtilsCards(),
    );
  };
}
