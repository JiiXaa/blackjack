import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';
import { Message } from './Message.js';

class Game {
  constructor({
    player,
    table,
    playerPoints,
    dealerPoints,
    hitButton,
    standButton,
    messageBox,
  }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.messageBox = messageBox;
    this.player = player;
    this.dealer = new Player('Dealer');
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
    // need to bind this to be able remove event listeners
    this.hitCard = this.hitCard.bind(this);
    this.dealerTurn = this.dealerTurn.bind(this);
  }

  start() {
    this.hitButton.addEventListener('click', this.hitCard);
    this.standButton.addEventListener('click', this.dealerTurn);
    this.dealCards();
  }

  hitCard() {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.playerPoints.innerHTML = this.player.calculatePoints();
    if (this.player.points > 21) {
      this.messageBox.setText('Dealer Wins!').show();
      this.hideButtons();
    }
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
      this.playerPoints.innerHTML = this.player.calculatePoints();
      await this.sleep(1000);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealersCard(card2);
      this.dealerPoints.innerHTML = this.dealer.calculatePoints();
      await this.sleep(1000);
    }
  }

  async dealerTurn() {
    while (
      this.dealer.points <= this.player.points &&
      this.dealer.points <= 21 &&
      this.player.points <= 21
    ) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealersCard(card);
      this.dealerPoints.innerHTML = this.dealer.calculatePoints();
      await this.sleep(1000);
    }
    this.endGame();
  }

  hideButtons() {
    this.hitButton.removeEventListener('click', this.hitCard);
    this.standButton.removeEventListener('click', this.dealerTurn);

    this.hitButton.style.display = 'none';
    this.standButton.style.display = 'none';
  }

  endGame() {
    this.hideButtons();

    if (this.player.points <= 21 && this.player.points == this.dealer.points) {
      this.messageBox.setText('Draw').show();
      return;
    }

    if (this.player.points > 21) {
      this.messageBox.setText('Dealer Wins!').show();
      return;
    }

    if (this.dealer.points > 21) {
      this.messageBox.setText('You Win!').show();
      return;
    }

    if (this.player.points < this.dealer.points) {
      this.messageBox.setText('Dealer Wins!').show();
      return;
    }
  }
}

const table = new Table(
  document.getElementById('dealersCards'),
  document.getElementById('playersCards')
);
const messageBox = new Message(document.getElementById('message'));
const player = new Player('Tom');
const game = new Game({
  hitButton: document.getElementById('hit'),
  standButton: document.getElementById('stand'),
  dealerPoints: document.getElementById('dealerPoints'),
  playerPoints: document.getElementById('playerPoints'),
  player,
  table,
  messageBox,
});

game.start();
