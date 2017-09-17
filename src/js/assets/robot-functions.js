export function putCardsInRightOrder(cards, trump) {
  const index = suits.findIndex(s => s === trump[0].suit);
  suits.splice(index, 1);
  suits.unshift(trump[0].suit);
  return suits.reduce((acc, suit) => {
    return acc.concat(cards.filter(card => card.suit === suit).sort((a, b) => b.value - a.value));
  }, []);
}