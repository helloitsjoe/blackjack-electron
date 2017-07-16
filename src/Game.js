const Deck = require('./Deck');
const Player = require('./Player');

const DEALER = 1;

class Game {
    constructor() {
        this.totalPlayers = DEALER;
        this.players = [];
        this.curr = 0;
    }

    play() {
        // TODO: set up turns, so hit/stay only works when it's that player's turn
        // Prompt not supported, use smalltalk module?
        // const newPlayers = prompt('How many players?');
        const newPlayers = 1;
        this.totalPlayers = DEALER + newPlayers;
        this.deck = new Deck(this, 1);
        this.makePlayers();
        this.deal();
        this.nextTurn();
    }

    deal() {
        for (let i = 0; i < this.totalPlayers; i++) {
            this.players[i].deal();
        }
    }

    nextTurn() {
        this.curr++;
        if (this.curr < this.totalPlayers) {
            this.players[this.curr].gui.enable();
        } else {
            this.curr = 0;
            this.players[this.curr].dealerTurn();
        }
    }

    restart() {
        // clear points, reset deck
    }

    makePlayers() {
        for (let i = 0; i < this.totalPlayers; i++) {
            // dealer is position 0
            let player = new Player(this, i, this.deck);
            this.players.push(player);
        }
    }
}

module.exports = Game;
