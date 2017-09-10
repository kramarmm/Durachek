const suits = ['d', 's', 'h', 'c'];
export function putCardsInRightOrder(cards, trump) {
  const index = suits.findIndex(s => s === trump[0].suit);
  suits.splice(index, 1);
  suits.unshift(trump[0].suit);
  return suits.reduce((acc, suit) => {
    return acc.concat(cards.filter(card => card.suit === suit).sort((a, b) => b.value - a.value));
  }, []);
}

export function setFirstActivePlayer(croupieState) {
  const usersC = croupieState.usersCards.cards;
  const robotsC = croupieState.robotsCards.cards;
  const trump = croupieState.trumpCard.suit;
  let maxUserCard = 0;
  let firstActivePlayer = 'user';
  usersC.forEach((card) => {
    if (card.suit === trump && card.value > maxUserCard) maxUserCard = card.value;
  });
  robotsC.forEach((card) => {
    if (card.suit === trump && card.value > maxUserCard) firstActivePlayer = 'robot';
  });
  return firstActivePlayer;
}

export function getAvailableCards(cards, playersAction, attackCards, tableCards, trumpSuit) {
  const selectedCards = [];

  if (attackCards.length && playersAction === 'defend') {
    // здесь возможно для attackCards цикл не нужен, а брать только [0]
    for (let i = 0; i < attackCards.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (cards[j].suit === trumpSuit && attackCards[i].suit !== trumpSuit) {
          if (selectedCards.indexOf(cards[j] === -1)) selectedCards.push(cards[j]);
        }

        if (cards[j].suit === attackCards[i].suit) {
          if (cards[j].value > attackCards[i].value) {
            if (selectedCards.indexOf(cards[j] === -1)) selectedCards.push(cards[j]);
          }
        }
      }
    }
    return selectedCards;
  }

  if (tableCards.length && playersAction === 'attack') {
    for (let i = 0; i < tableCards.length; i++) {
      for (let j = 0; j < cards.length; j++) {
        if (cards[j].value === tableCards[i].value) selectedCards.push(cards[j]);
      }
    }
    return selectedCards;
  }

  if (!attackCards.length && playersAction === 'attack') {
    return cards;
  }

  return [];
}
