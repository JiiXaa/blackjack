import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';

class Game {
  constructor({
    player,
    table,
    playerPoints,
    dealerPoints,
    hitButton,
    standButton,
  }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.player = player;
    this.dealer = new Player('Dealer');
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
    // this.hitSound = new Audio('../sounds/swish.m4a');
  }

  start() {
    this.hitButton.addEventListener('click', (e) => this.hitCard());
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.playerPoints.innerHTML = this.player.calculatePoints();
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
      this.table.showPlayersCard(card1);
      //   this.hitSound.play();
      this.playerPoints.innerHTML = this.player.calculatePoints();
      await this.sleep(1000);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealersCard(card2);
      //   this.hitSound.play();
      this.dealerPoints.innerHTML = this.dealer.calculatePoints();
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
  dealerPoints: document.getElementById('dealerPoints'),
  playerPoints: document.getElementById('playerPoints'),
  player,
  table,
});

game.start();
