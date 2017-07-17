const PlayerGUI = require('./PlayerGUI');

class DealerGUI extends PlayerGUI {

    init() {
        super.init();
        this.buttonBox.style.display = 'none';
        this.infoBox.style.visibility = 'hidden';
    }

    addCard(cardData) {
        // Hide info on first card
        if (this.player.hand.length === 1) {
            let card = super.addCard(cardData);
            card.innerHTML = '???</br>???';
        } else {
            super.addCard(cardData);
        }
    }

    clearCards() {
        super.clearCards();
        // Hide total score
        this.infoBox.style.visibility = 'hidden';
    }

    reveal(card) {
        this.infoBox.style.visibility = 'visible';
        this.cardBox.children[0].innerHTML = card.toString();
    }
}

module.exports = DealerGUI;
