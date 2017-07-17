const PlayerGUI = require('./PlayerGUI');
const DealerGUI = require('./DealerGUI');

class Player {
    constructor(game, position, deck) {
        this.game = game;
        this.position = position;
        this.deck = deck;

        this.hand = [];

        this.score = 0;
        this.bust = false;
        this.blackjack = false;

        this.gui = position > 0 ? new PlayerGUI(this) : new DealerGUI(this);
    }

    deal() {
        // move cards from hand to discard
        this.deck.discards = this.deck.discards.concat(this.hand);
        this.hand.length = 0;

        // clear card data
        this.gui.clearCards();
        this.score = 0;
        this.bust = false;
        this.blackjack = false;

        this.hit();
        this.hit();
    }

    hit() {
        if (!this.deck.cards.length) {
            this.deck.shuffle();
        }

        let card = this.deck.cards.pop();
        this.hand.push(card);

        if (card.value === 11 && this.score + card.value > 21) {
            card.value = 1;
        }

        this.score += card.value;
        this.gui.addCard(card);

        if (this.score > 21) {
            this.bust = true;
            this.gui.disable();
            this.game.end();
        } else if (this.score === 21) {
            this.blackjack = true;
            this.gui.disable();
            this.game.end();
        }
    }

    endTurn() {
        this.game.nextPlayer();
    }
}

module.exports = Player;
