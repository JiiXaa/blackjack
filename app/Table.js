export class Table {
  constructor(dealersCards, playersCards) {
    this.dealersCards = dealersCards;
    this.playersCards = playersCards;
  }

  showDealersCard(card) {
    this.dealersCards.appendChild(card.render());
  }

  showPlayersCard(card) {
    this.playersCards.appendChild(card.render());
  }
}
