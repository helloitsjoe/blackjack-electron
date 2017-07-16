const Deck = require('./Deck');
const Player = require('./Player');

const DEALER = 1;

class Game {
    constructor() {
        this.totalPlayers = DEALER;
        this.players = [];
        this.curr = 0;
        this.refresh = this.refresh.bind(this);
        this.endState = document.getElementById('end-state');
        this.endState.addEventListener('click', this.refresh);
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
    }

    deal() {
        for (let i = 0; i < this.totalPlayers; i++) {
            this.players[i].deal();
        }
        this.nextTurn();
    }

    nextTurn() {
        // this.players[this.curr].gui.disable();
        this.curr++;
        if (this.curr < this.totalPlayers) {
            this.players[this.curr].gui.enable();
        } else {
            this.curr = 0;
            this.players[this.curr].dealerTurn();
        }
    }

    end() {
        // TODO: Make this work for multiple players
        const dealer = this.players[0];
        const player = this.players[1];
        let endText;
        let reason;
        if (!dealer.bust && (dealer.blackjack || player.bust || player.score < dealer.score)) {
            endText = 'You lose!';
            reason = player.bust ? 'Busted!' : dealer.blackjack ? 'Dealer has blackjack!' : player.score < dealer.score ? 'Dealer is higher!' : null;
        } else if (dealer.bust || player.blackjack || player.score > dealer.score) {
            endText = 'You win!';
            reason = dealer.bust ? 'Dealer busted!' : player.score > dealer.score ? 'Player is higher!' : player.blackjack ? 'Blackjack!' : null;
        } else {
            endText = 'Tie!';
        }
        this.endState.innerHTML = `<h1>${endText}</h1>
        ${reason}`;
        this.endState.classList.toggle('hidden');
    }

    refresh() {
        this.endState.classList.toggle('hidden');
        this.curr = 0;
        this.deal();
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
