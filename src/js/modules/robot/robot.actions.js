import { putCard, takeAllCards } from '../player/player.actions';

import { robot } from './robot.consts';

import { moveToBreak } from '../desk/desk.actions';

import { attack } from '../desk/desk.consts';

import { transferControlToUser } from '../user/user.actions';

export const transferControlToRobot = () => (dispatch, getState) => {
  const state = getState();

  const { availableCards } = state.robot;

  if (availableCards.length) {
    return dispatch(
      putCard(
        robot,
        availableCards[availableCards.length - 1],
      ),
    );
  }

  return dispatch(
    state.robot.action === attack
      ? moveToBreak()
      : takeAllCards(robot),
  );
}
