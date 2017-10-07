// import {
//   superCleverRobotFunction,
// } from '../assets/robot-functions.js';

import {
  ROBOT_PUT_CARD,
  transferControlFromRobot,
  setEndOfTurn,
  takeAllTableCards,
  robot,
  attack,
} from './croupie.js';

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
    }

    if (!cards.length) {
      if (state.playersAction === attack) {
        dispatch(setEndOfTurn());
      } else {
        dispatch(takeAllTableCards());
      }
    }

    dispatch(transferControlFromRobot());
  };
}
