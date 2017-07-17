class PlayerGUI {
    constructor(player) {
        this.hit = this.hit.bind(this);
        this.endTurn = this.endTurn.bind(this);
        this.player = player;
        this.init();
    }

    init() {
        let position = this.player.position;
        let boardParent = position > 0 ? document.getElementById('player-list') : document.getElementById('dealer-box');;
        let infoText = position > 0 ? 'Player: ' : 'Dealer: ';

        this.board = e('div', 'player', `player-${this.player.position}`, boardParent);
        this.cardBox = e('div', null, null, this.board);

        this.buttonBox = e('div', 'button-box', null, this.board);
        this.hitButton = e('button', null, null, this.buttonBox, 'Hit');
        this.stayButton = e('button', null, null, this.buttonBox, 'Stay');

        this.infoBox = e('div', 'info', null, this.board)
        this.label = e('span', null, null, this.infoBox, infoText);
        this.score = e('span', null, null, this.infoBox);
    }

    addCard(cardData) {
        this.score.innerHTML = this.player.score.toString();
        let card = e('div', 'card', null, this.cardBox);
        card.innerHTML = cardData.toString();
        return card;
    }

    clearCards() {
        this.cardBox.innerHTML = '';
    }

    enable() {
        this.hitButton.addEventListener('click', this.hit);
        this.stayButton.addEventListener('click', this.endTurn);
    }

    disable() {
        if (this.buttonBox) {
            this.hitButton.removeEventListener('click', this.hit);
            this.stayButton.removeEventListener('click', this.endTurn);
        }
    }

    hit() {
        this.player.hit();
    }

    endTurn() {
        this.player.endTurn();
    }
}

function e(tag, classes, id, parentNode, innerHTML) {
    const element = document.createElement(tag);
    if (classes) {
        let classArr = [];
        if (typeof classes === 'string') {
            classArr = classes.split(' ');
        }
        classArr.forEach((className) => {
            element.classList.add(className);
        });
    }
    if (id) {
        element.id = id;
    }
    if (parentNode) {
        parentNode.appendChild(element);
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
}

module.exports = PlayerGUI;
