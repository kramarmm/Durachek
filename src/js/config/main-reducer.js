import { combineReducers } from 'redux';

import * as deskReducer from '../modules/desk/desk.reducers';
import * as robotReducer from '../modules/robot/robot.reducers';
import * as deckReducer from '../modules/deck/deck.reducers';
import * as userReducer from '../modules/user/user.reducers';

const desk = combineReducers({ ...deskReducer });
const robot = combineReducers({ ...robotReducer });
const user = combineReducers({ ...userReducer });

export default combineReducers({
  desk,
  robot,
  user,
  ...deckReducer,
});
