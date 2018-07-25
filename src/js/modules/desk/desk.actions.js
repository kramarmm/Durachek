import DeckUtils from '../deck/deck.utils';

import DeskUtils from './desk.utils';

import {
  SET_TRUMP_CARD,
  SUFFLE_DECK,
} from '../deck/deck.consts';

import {
  START_GAME,
  MOVE_TO_BREAK,
} from './desk.consts';

import transferControlToRobot from '../robot/robot.actions';

import { robot } from '../robot/robot.consts';

import { user } from '../user/user.consts';

const startTurn = activePlayer => (dispatch, getState) => {
  const opponent = activePlayer === user
    ? robot
    : user;

  dispatch(
    DeckUtils.getCards(
      opponent,
      getState(),
    )
  );

  dispatch(
    DeckUtils.getCards(
      activePlayer,
      getState(),
    )
  );

  DeskUtils.setActivePlayer(
    dispatch,
    activePlayer,
    getState()[activePlayer].cards,
  );

  DeskUtils.setAction(
    dispatch,
    activePlayer,
  );
}

export const getOutCards = () => (dispatch, getState) => {
  dispatch({ type: START_GAME });

  dispatch({
    type: SUFFLE_DECK,
    payload: DeckUtils.getShuffledDeck(),
  });

  const state = getState();

  const trumpCard = state.deck.slice(-1);

  dispatch({
    type: SET_TRUMP_CARD,
    payload: { trumpCard: trumpCard[0] },
  });

  const firstActivePlayer = DeskUtils.getFirstActivePlayer(state);

  dispatch(
    startTurn(firstActivePlayer),
  );

  if (firstActivePlayer === robot) {
    dispatch(
      transferControlToRobot()
    );
  }
}

export const moveToBreak = () => (dispatch, getState) => {
  const state = getState();

  let { deck } = state;
  const { desk } = state;

  dispatch({ type: MOVE_TO_BREAK });

  // Get cards for current activePlayer
  let needCards = 6 - state[desk.activePlayer].cards.length;
  needCards = needCards <= deck.length
    ? needCards
    : deck.length;

  if (needCards > 0) {
    dispatch(
      DeckUtils.getCards(
        desk.activePlayer,
        deck.slice(-needCards),
        desk.trumpCard,
      )
    );

    // update local variable
    deck = getState().deck;
  }

  // Get cards for next activePlayer
  const nextActivePlayer = DeskUtils.getNextActivePlayer(desk.activePlayer);
  let needCardsForNext = 6 - state[nextActivePlayer].cards.length;
  needCardsForNext = needCardsForNext <= deck.length
    ? needCardsForNext
    : deck.length;

  if (needCardsForNext > 0) {
    dispatch(
      DeckUtils.getCards(
        nextActivePlayer,
        deck.slice(-needCardsForNext),
        desk.trumpCard,
      )
    );
  }

  const availableCards = getState()[nextActivePlayer].cards;


  DeskUtils.setActivePlayer(
    dispatch,
    nextActivePlayer,
    availableCards,
  );

  if (nextActivePlayer === robot) {
    dispatch(transferControlToRobot());
  }
}
