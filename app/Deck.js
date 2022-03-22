import { Card, Types, CardValues } from './Card.js';

export class Deck {
  // deck of cards to pick from
  cards = [];

  constructor() {
    // adds all 52 cards needed to play the game
    Types.forEach((type) =>
      CardValues.forEach((cardValue) =>
        this.cards.push(new Card(cardValue, type))
      )
    );
  }

  shuffle() {
    // randomize cards in the deck, simple shuffle algorithm.
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }

    return this.cards;
  }

  pickOne() {
    // takes one card from the top of deck
    return this.cards.pop();
  }
}
