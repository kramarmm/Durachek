const values = ['6', '7', '8', '9', '10', '11', '12', '13', '14'];
const suits = ['d', 's', 'h', 'c'];
const defaultDeck = [];

for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < suits.length; j++) {
    defaultDeck.push({
      value: values[i],
      suit: suits[j],
    });
  }
}

function shuffle(deck) {
  let totalNumbers = deck.length;
  const arrayOfNumbers = [];
  const shuffledDeckPlaces = [];
  const shuffledDeck = [];
  let tempRandomNumber = 0;

  while (totalNumbers--) {
    arrayOfNumbers.push(totalNumbers);
  }

  while (arrayOfNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayOfNumbers.length - 1));
    shuffledDeckPlaces.push(arrayOfNumbers[tempRandomNumber]);
    arrayOfNumbers.splice(tempRandomNumber, 1);
  }

  for (let i = 0; i < shuffledDeckPlaces.length; i++) {
    shuffledDeck.push(deck[shuffledDeckPlaces[i]]);
  }

  return shuffledDeck;
}

export default function getShuffledDeck() {
  return shuffle(defaultDeck);
}
