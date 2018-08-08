import DeskUtils from '../desk/desk.utils';

import { putCard } from '../player/player.actions';

import { user } from './user.consts';

export const userPutCard = card =>
  dispatch =>
    dispatch(
      putCard(user, card),
    );
