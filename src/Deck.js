class Deck {
    constructor(game, numPacks) {
        this.game = game;
        this.cards = [];
        this.init(numPacks);
        this.shuffle(this.cards);
        // this.cards.forEach((card) => {
        //     console.log(card);
        // });
        // console.log(this.cards.length)
    }

    init(numPacks) {
        // const suits = {
        //     clubs: 0,
        //     hearts: 1,
        //     diamonds: 2,
        //     spades: 3
        // }

        // for logging purposes
        const suits = [ 'clubs', 'hearts', 'diamonds', 'spades' ];

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
                    let value = i > 10 ? 10 : i;
                    let card = {
                        value,
                        suit: suits[suit],
                        face: faces(i),
                        toString: () => `${faces(i)}</br>${suits[suit]}`
                    };
                    this.cards.push(card);
                }
            }
        }
    }

    shuffle(arr) {
        // shuffle deck;
        let currIndex = this.cards.length;
        let randomIndex;
        let temp;

        while (currIndex > 0) {
            randomIndex = Math.floor(Math.random() * currIndex);
            currIndex --;

            temp = arr[currIndex];
            arr[currIndex] = arr[randomIndex];
            arr[randomIndex] = temp;
        }
    }

    // deal(player) {
    //     // pop two cards off for each player
    //     this.hit(player);
    //     this.hit(player);
    // }
    //
    // hit(player) {
    //     // pop one card off the top
    //     let card = this.cards.pop();
    //     player.hand.push(card);
    //     player.addCard(card);
    //     // this.game.gui.addCard(player, card);
    // }
}

module.exports = Deck;
