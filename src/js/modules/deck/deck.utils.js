import { ROBOT_GET_CARDS } from '../robot/robot.consts';

import { user, USER_GET_CARDS } from '../user/user.consts';

class DeckUtils {
  constructor() {
    this.values = [6, 7, 8, 9, 10, 11, 12, 13, 14];
    this.suits = ['d', 's', 'h', 'c'];
    this.defaultDeck = [];


    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.suits.length; j++) {
        this.defaultDeck.push({
          value: this.values[i],
          suit: this.suits[j],
        });
      }
    }
  }

  getShuffledDeck() {
    let totalNumbers = this.defaultDeck.length;
    let tempRandomNumber = 0;

    const arrayOfNumbers = [];
    const shuffledDeckPlaces = [];
    const shuffledDeck = [];

    while (totalNumbers--) {
      arrayOfNumbers.push(totalNumbers);
    }

    while (arrayOfNumbers.length) {
      tempRandomNumber = Math.round(
        Math.random() * (arrayOfNumbers.length - 1)
      );

      shuffledDeckPlaces.push(arrayOfNumbers[tempRandomNumber]);
      arrayOfNumbers.splice(tempRandomNumber, 1);
    }

    for (let i = 0; i < shuffledDeckPlaces.length; i++) {
      shuffledDeck.push(
        this.defaultDeck[shuffledDeckPlaces[i]]
      );
    }

    return shuffledDeck;
  }

  getCards(
    player,
    state,
  ) {
    const amount = this.getAvailableAmount(
      state,
      player,
    );

    const cards = amount
      ? state.deck.slice(-amount)
      : [];

    return {
      type: player === user
        ? USER_GET_CARDS
        : ROBOT_GET_CARDS,
      payload: {
        cards,
        trumpCard: state.desk.trumpCard,
      },
    };
  }

  getAvailableAmount(state, player) {
    const needCards = 6 - state[player].cards.length;

    if (needCards <= 0) return 0;

    return needCards <= state.deck.length
      ? needCards
      : state.deck.length;
  }

  isTheSameCard(card1, card2) {
    return card1.value === card2.value &&
      card1.suit === card2.suit;
  }
}

export default new DeckUtils();
