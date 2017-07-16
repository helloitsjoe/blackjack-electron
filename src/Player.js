const PlayerGUI = require('./PlayerGUI');

class Player {
    constructor(position, deck) {
        this.hand = [];
        this.bust = false;
        this.position = position;
        this.score = null;
        this.deck = deck;
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
            return;
            // end turn
        } else if (this.score === 21) {
            this.blackjack = true;
            return;
            // end turn
        }
    }

    dealerTurn() {
        setInterval(() => {
            if (this.score < 17) {
                this.hit();
            }
        }, 500);
    }
}

module.exports = Player;
