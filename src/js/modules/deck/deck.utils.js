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
}

export default new DeckUtils();
