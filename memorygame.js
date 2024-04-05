const colors = ['red', 'red', 'blue', 'blue', 'green', 'green', 'yellow', 'yellow', 'purple', 'purple'];
const shuffledColors = shuffle(colors);

let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(color) {
    const card = document.createElement('div');
    card.classList.add('card', color);
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (lockBoard || card === flippedCards[0]) return;

    card.style.backgroundColor = card.classList[1];

    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;

    const [card1, card2] = flippedCards;

    if (card1.classList[1] === card2.classList[1]) {
        setTimeout(() => {
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            resetBoard();
            checkWin();
        }, 1000);
    } else {
        setTimeout(() => {
            card1.style.backgroundColor = '#ccc';
            card2.style.backgroundColor = '#ccc';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    flippedCards = [];
    lockBoard = false;
}

function checkWin() {
    matchedPairs += 1;
    if (matchedPairs === colors.length / 2) {
        document.getElementById('congratulations').style.display = 'block';
    }
}

function init() {
    const gameBoard = document.querySelector('.memory-game');
    shuffledColors.forEach(color => {
        const card = createCard(color);
        gameBoard.appendChild(card);
    });
}

init();
