export class Hand {
  constructor() {
    this.cards = [];
  }

  addCard(card) {
    this.cards.push(card);
  }

  countCardsByValue(value) {
    // check how many aces in hand
    return this.cards.filter((card) => card.cardValue == value).length;
  }

  getSumInHand() {
    if (this.countCardsByValue('A') == 2 && this.cards.length == 2) {
      return 21;
    }

    const cards = this.cards.map((card) => {
      if (['K', 'Q', 'J'].includes(card.cardValue)) {
        return 10;
      }

      if (this.cards.length == 1 && card.cardValue == 'A') {
        return 11;
      }

      if (this.cards.length == 2 && card.cardValue == 'A') {
        return 11;
      }

      if (this.cards.length > 2 && card.cardValue == 'A') {
        return 1;
      }

      return parseInt(card.cardValue);
    });

    return cards.reduce((sum, cardValue) => {
      return parseInt(sum) + parseInt(cardValue);
    }, 0);
  }
}
