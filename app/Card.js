export const CardValues = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];

export const Types = ['spades', 'hearts', 'diamonds', 'clubs'];

export class Card {
  mapTypeToValue = {
    hearts: '&hearts;',
    spades: '&spades;',
    diamonds: '&diams;',
    clubs: '&clubs;',
  };

  constructor(cardValue, type) {
    this.cardValue = cardValue;
    this.type = type;
  }

  render() {
    const card = document.createElement('div');
    card.setAttribute('class', `card ${this.type}`);
    card.innerHTML = `${this.cardValue} ${this.mapTypeToValue[this.type]}`;

    return card;
  }
}
