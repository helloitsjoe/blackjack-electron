const Deck = require('./Deck');
const Player = require('./Player');
// const GUI = require('./GUI');

const DEALER = 1;

class Game {
    constructor() {
        this.totalPlayers = DEALER;
        this.players = [];
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

        // Debug
        this.players.forEach((player, idx) => {
            player.hand.forEach((card) => {
                console.log(idx, card.toString());
            });
            console.log('Score:', player.score);
        });
    }

    deal() {
        for (let i = 0; i < this.totalPlayers; i++) {
            this.players[i].deal();
        }
    }

    restart() {
        // clear points, reset deck
    }

    makePlayers() {
        for (let i = 0; i < this.totalPlayers; i++) {
            // dealer is position 0
            let player = new Player(i, this.deck);
            this.players.push(player);
            // if (i > 0) {
            //     this.gui.createPlayer(player);
            // }
        }
    }
}

module.exports = Game;
