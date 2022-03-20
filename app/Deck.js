import { Card, Types, cardValues } from './Card.js';

export class Deck {
  cards = [];

  constructor() {
    // get all cards in the deck
    Types.forEach((type) =>
      cardValues.forEach((cardValue) =>
        this.cards.push(new Card(cardValue, type))
      )
    );
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }

    return this.cards;
  }

  pickOne() {
    return this.cards.pop();
  }
}
