export class Table {
  constructor(dealersCards, playersCards) {
    this.dealersCards = dealersCards;
    this.playersCards = playersCards;
  }

  showDealersCard(card) {
    this.dealersCards.appendChild(card);
  }

  showPlayersCard(card) {
    this.playersCards.appendChild(card);
  }
}
