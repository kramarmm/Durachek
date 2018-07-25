import Player from '../player/player.reducers.js';

import { defend } from '../desk/desk.consts';

import { user as type } from './user.consts';

const user = new Player(type);

export const cards = (state = [], action) =>
  user.cards(state, action);

export const availableCards = (state = [], action) =>
  user.availableCards(state, action);

export const isActive = (state = false, action) =>
  user.isActive(state, action);

export const action = (state = defend, action) =>
  user.action(state, action);

export const willTakeAll = (state = false, action) =>
  user.willTakeAll(state, action);
