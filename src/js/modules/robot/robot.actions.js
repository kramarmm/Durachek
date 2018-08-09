import DeskUtils from '../desk/desk.utils';

import {
  putCard,
  takeAllCards,
  setWillTakeAllCards,
} from '../player/player.actions';

import { robot } from './robot.consts';

import { user } from '../user/user.consts';

import { moveToBreak } from '../desk/desk.actions';

import { attack } from '../desk/desk.consts';

import { transferControlToUser } from '../user/user.actions';

const putAllAvailableCards = () => (dispatch, getState) => {
  const availableCards = DeskUtils.getAvailableCards(
    getState(),
    robot,
  );

   if (availableCards.length) {
    dispatch(
       putCard(
         robot,
         availableCards[availableCards.length - 1],
       ),
     );

    if (availableCards.length > 1) {
      return putAllAvailableCards();
    }
  }
}

export const transferControlToRobot = () => (dispatch, getState) => {
  const state = getState();

  const { availableCards } = state.robot;

  if (availableCards.length) {
    if (
      state.robot.action === attack
      && state.user.willTakeAll
    ) {
      dispatch(
        putAllAvailableCards(),
      );
    } else {
      return dispatch(
        putCard(
          robot,
          availableCards[availableCards.length - 1],
        ),
      );
    }
  }

  if (state.robot.action === attack) {
    return dispatch(
      state.user.willTakeAll
        ? takeAllCards(user)
        : moveToBreak()
     );
  } else {
    dispatch(
      setWillTakeAllCards(robot, true),
    );

    return dispatch(
      transferControlToUser(),
    );
  }
}
