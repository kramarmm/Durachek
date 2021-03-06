import { SET_MESSAGE } from './message.consts';

export const setMessage = text => dispatch =>
  dispatch({
    type: SET_MESSAGE,
    payload: {
      text,
      timestamp: Date.now(),
    },
  });
