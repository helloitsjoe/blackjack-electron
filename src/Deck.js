class Deck {
    constructor(game, numPacks) {
        this.game = game;
        this.cards = [];
        this.discards = [];
        this.init(numPacks);
        this.shuffle();
        // this.cards.forEach((card) => {
        //     console.log(card);
        // });
        // console.log(this.cards.length)
    }

    init(numPacks) {
        const suits = {
            clubs: 0,
            hearts: 1,
            diamonds: 2,
            spades: 3
        }

        const faces = (val) => {
            switch(val) {
                case 1:
                    return 'A';
                    break;
                case 11:
                    return 'J';
                    break;
                case 12:
                    return 'Q';
                    break;
                case 13:
                    return 'K';
                    break;
                default:
                    return val;
                    break;
            }
        }

        // for each pack of cards
        for (let n = 0; n < numPacks; n++) {
            // for each suit
            for (let suit in suits) {
                // push 13 cards
                for (let i = 1; i <= 13; i++) {
                    let value = i > 10 ? 10 : (i === 1 ? 11 : i);
                    let card = {
                        value,
                        suit: suits[suit],
                        face: faces(i),
                        toString: () => `${faces(i)}</br>${suit}`
                    };
                    this.cards.push(card);
                }
            }
        }
    }

    shuffle() {
        console.log('Shuffling...');
        // transfer cards from discard array
        if (!this.cards.length && this.discards.length) {
            this.cards = this.cards.concat(this.discards);
            this.discards.length = 0;
        }
        console.log('cards', this.cards.length);
        // shuffle deck;
        let currIndex = this.cards.length;
        let randomIndex;
        let temp;

        while (currIndex > 0) {
            randomIndex = Math.floor(Math.random() * currIndex);
            currIndex --;

            temp = this.cards[currIndex];
            this.cards[currIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temp;
        }
    }
}

module.exports = Deck;
