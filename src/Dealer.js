const Player = require('./Player');

class Dealer extends Player {

    dealerTurn() {
        while (this.score < 17) {
            this.hit();
        }
        if (this.score < 21) {
            this.game.end();
        }
    }

    reveal() {
        this.gui.reveal(this.hand[0]);
    }
}

module.exports = Dealer;
