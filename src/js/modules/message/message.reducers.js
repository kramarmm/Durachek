import { SET_MESSAGE } from './message.consts';

export function message(state = '', action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.text;

    default:
      return state;
  }
}
