import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';

class Game {
  constructor({ player, table, hitButton, standButton }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.player = player;
    this.dealer = new Player('Dealer');
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
    this.hitSound = new Audio('../sounds/swish.m4a');
  }

  start() {
    this.hitButton.addEventListener('click', (e) => this.hitCard());
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async dealCards() {
    for (let i = 0; i < 2; i++) {
      // takes 1 card from the deck
      let card1 = this.deck.pickOne();
      // adds to player's cards
      this.player.hand.addCard(card1);
      this.table.showPlayersCard(card1.render());
      //   this.hitSound.play();
      await this.sleep(1000);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealersCard(card2.render());
      //   this.hitSound.play();
      await this.sleep(1000);
    }
  }
}

const table = new Table(
  document.getElementById('dealersCards'),
  document.getElementById('playersCards')
);
const player = new Player('Tom');
const game = new Game({
  hitButton: document.getElementById('hit'),
  standButton: document.getElementById('stand'),
  player,
  table,
});

game.start();
