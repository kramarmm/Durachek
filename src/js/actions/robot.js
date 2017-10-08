// import {
//   superCleverRobotFunction,
// } from '../assets/robot-functions.js';

import {
  ROBOT_PUT_CARD,
  transferControlFromRobot,
  moveToBreak,
  takeAllTableCards,
} from './croupie.js';

import { attack } from '../assets/consts.js';

export default function transferControlToRobot() {
  return (dispatch, getState) => {
    const state = getState().croupie;
    const cards = state.robotsCards.availableCards;

    if (cards.length) {
      dispatch({
        type: ROBOT_PUT_CARD,
        payload: {
          card: cards[cards.length - 1],
          playersAction: state.playersAction,
        },
      });

      dispatch(transferControlFromRobot());
    }

    if (!cards.length) {
      if (state.playersAction === attack) {
        dispatch(moveToBreak());
      } else {
        dispatch(takeAllTableCards());
      }
    }
  };
}
