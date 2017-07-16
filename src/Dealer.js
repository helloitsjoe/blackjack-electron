const Player = require('./Player');

class Dealer extends Player {
    constructor() {
        super();
    }

    dealerTurn() {
        while (this.score < 17) {
            this.hit();
        }
        if (this.score < 21) {
            this.game.end();
        }
    }
}

module.exports = Dealer;
