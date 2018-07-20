
import { robot } from '../robot/robot.consts';
import { user } from '../user/user.consts';
import { defend, attack } from '../desk/desk.consts';

const suits = ['d', 's', 'h', 'c'];

export default class Desk {
  static getNextPlayersActions(current) {
    return current === attack
      ? defend
      : attack;
  }

  static getNextActivePlayers(current) {
    return current === robot
      ? user
      : robot;
  }

  static putCardsInRightOrder(cards, trump) {
    const trumpSuit = trump[0] ? trump[0].suit : trump.suit;
    const index = suits.findIndex(s => s === trumpSuit);
    suits.splice(index, 1);
    suits.unshift(trumpSuit);
    return suits.reduce((acc, suit) => {
      return acc.concat(cards.filter(card => card.suit === suit).sort((a, b) => b.value - a.value));
    }, []);
  }

  static getAvailableCards(state, player) {
    const { desk } = state;

    const playerCards = state[player].cards;

    const nextPlayersAction = Desk.getNextPlayersActions(
      state.desk.playersAction
    );

    if (!desk.cards.length && nextPlayersAction === attack) {
      return playerCards;
    }

    const trumpSuit = state.desk.trumpCard.suit;

    const selectedCards = [];

    if (desk.attackCards.length && nextPlayersAction === defend) {
      for (let i = 0; i < desk.attackCards.length; i++) {
        for (let j = 0; j < playerCards.length; j++) {
          if (
            playerCards[j].suit === trumpSuit &&
            desk.attackCards[i].suit !== trumpSuit
          ) {
            selectedCards.push(playerCards[j]);
            continue;
          }

          if (
            playerCards[j].suit === desk.attackCards[i].suit &&
            playerCards[j].value > desk.attackCards[i].value
          ) {
            selectedCards.push(playerCards[j]);
          }
        }
      }

      return selectedCards;
    }

    if (desk.cards.length && nextPlayersAction === attack) {
      for (let i = 0; i < desk.cards.length; i++) {
        for (let j = 0; j < playerCards.length; j++) {
          if (playerCards[j].value === desk.cards[i].value) {
            selectedCards.push(playerCards[j]);
          }
        }
      }

      return selectedCards;
    }

    return [];
  }

  static setFirstActivePlayer(state) {
    const trump = state.user.trump;

    const maxUserCard = state.user.cards.reduce((card, acc) => {
      if (card.suit === trump && card.value > acc) {
        return card.value;
      }

      return acc;
    }, 0);

    const robotIsFirst = state.robot.cards.some(
      card => card.suit === trump && card.value > maxUserCard,
    );

    return robotIsFirst
      ? robot
      : user;
  }
}
