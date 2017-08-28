export const GET_OUT = 'GET_OUT';

function shuffle(deck) {
  let totalNumbers = deck.length - 1 + 1;
  let arrayOfNumbers = [];
  const shuffledDeckPlaces = [];
  const shuffledDeck = [];
  let tempRandomNumber = 0;

  while(totalNumbers--) {
      arrayOfNumbers.push(totalNumbers + 1);
  }

  while(arrayOfNumbers.length) {
      tempRandomNumber = Math.round(Math.random() * (arrayOfNumbers.length - 1));
      shuffledDeckPlaces.push(arrayOfNumbers[tempRandomNumber]);
      arrayOfNumbers.splice(tempRandomNumber, 1);
  }

  for (let i = 0; i < shuffledDeckPlaces.length; i++) {
    shuffledDeck.push(deck[shuffledDeckPlaces[i]]);
  }

  return shuffledDeck;
}
