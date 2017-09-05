const defaultDeck = [
  '6s', '7s', '8s', '9s', '10s', 'Js', 'Qs', 'Ks', 'As',
  '6h', '7h', '8h', '9h', '10h', 'Jh', 'Qh', 'Kh', 'Ah',
  '6c', '7c', '8c', '9c', '10c', 'Jc', 'Qc', 'Kc', 'Ac',
  '6d', '7d', '8d', '9d', '10d', 'Jd', 'Qd', 'Kd', 'Ad',
];

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
