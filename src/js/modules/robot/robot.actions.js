import { ROBOT_PUT_CARD } from './robot.consts';

import {
  transferControlFromRobot,
  moveToBreak,
  takeAllDeskCards,
} from '../desk/desk.actions';

import { attack } from '../desk/desk.consts';

export default function transferControlToRobot() {
  return (dispatch, getState) => {
    const state = getState();
    const { availableCards } = state.robot;

    if (availableCards.length) {
      dispatch({
        type: ROBOT_PUT_CARD,
        payload: {
          card: availableCards[availableCards.length - 1],
          playersAction: state.deck.playersAction,
        },
      });

      dispatch(transferControlFromRobot());
    } else {
      if (state.desk.playersAction === attack) {
        dispatch(moveToBreak());
      } else {
        dispatch(takeAllDeskCards());
      }
    }
  };
}