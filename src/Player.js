const PlayerGUI = require('./PlayerGUI');

class Player {
    constructor(game, position, deck) {
        this.game = game;
        this.hand = [];
        this.bust = false;
        this.position = position;
        this.score = null;
        this.deck = deck;
        this.dealerInt = null;
        this.gui = new PlayerGUI(this);
    }

    deal() {
        this.hit();
        this.hit();
    }

    hit() {
        let card = this.deck.cards.pop();
        this.hand.push(card);

        this.score += card.value;
        this.gui.addCard(card);

        if (this.score > 21) {
            this.bust = true;
            this.gui.disable();
            this.game.nextTurn();
            return;
            // end turn
        } else if (this.score === 21) {
            this.blackjack = true;
            return;
            // end turn
        }
    }

    endTurn() {
        this.game.nextTurn();
    }

    dealerTurn() {
        this.dealerInt = setInterval(() => {
            if (this.score < 17) {
                this.hit();
            } else {
                clearInterval(this.dealerInt);
            }
        }, 500);
    }
}

module.exports = Player;
