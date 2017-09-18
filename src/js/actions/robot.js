// import {
//   superCleverRobotFunction,
// } from '../assets/robot-functions.js';

import {
  ROBOT_PUT_CARD,
  END_OF_TURN,
  TAKE_ALL_TABLE_CARDS,
  transferControlFromRobot,
  robot,
  attack,
} from './croupie.js';

export default function transferControlToRobot(dispatch, getState) {
  const state = getState().croupie;
  if (state.robotsCards.availableCards.length) {
    dispatch({
      type: ROBOT_PUT_CARD,
      payload: {
        card: state.robotsCards.availableCards[state.robotsCards.availableCards.length - 1],
        playersAction: state.playersAction,
      },
    });
  } else {
    if (state.playersAction === attack) {
      dispatch({ type: END_OF_TURN });
    } else {
      dispatch({
        type: TAKE_ALL_TABLE_CARDS,
        payload: {
          activePlayer: robot,
          cards: state.tableCards,
        },
      });
    }
  }

  transferControlFromRobot(dispatch, getState);
}
