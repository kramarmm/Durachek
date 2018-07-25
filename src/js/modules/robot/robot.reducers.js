import Player from '../player/player.reducers.js';

import { defend } from '../desk/desk.consts';

import { robot as type } from './robot.consts';

const robot = new Player(type);

export const cards = (state = [], action) =>
  robot.cards(state, action);

export const availableCards = (state = [], action) =>
  robot.availableCards(state, action);

export const isActive = (state = false, action) =>
  robot.isActive(state, action);

export const action = (state = defend, action) =>
  robot.action(state, action);

export const willTakeAll = (state = false, action) =>
  robot.willTakeAll(state, action);
