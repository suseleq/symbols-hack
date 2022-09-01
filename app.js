let interval;
let round;
let symbolToGuess;
let partGame;
let randomTile;

const charSet = [
    'Λ',
    'Δ',
    'θ',
    'Ξ',
    'Ω',
    'ζ',
    'Π',
    'φ',
    'Ψ',
    '∳',
    'ω'
]

const roundInfo = document.querySelector('.info');
const taskInfo = document.querySelector('.task');
const symbolsDisplayed = document.querySelector('.number');
const firstPartOfGame = document.querySelector('.first-part');
const secondPartOfGame = document.querySelector('.second-part');
const tilesFirstPart = firstPartOfGame.querySelectorAll('.tiles');
const tilesSecondPart = secondPartOfGame.querySelectorAll('.tiles');
const loadingBar = document.querySelector('.loading-bar');
const popup = document.querySelector('.popup-part');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', restartGame);

loadingBar.addEventListener('animationend', () => {
    endGame(false);
});

tilesFirstPart.forEach(tile => {
    tile.addEventListener('click', checkTile);
});

tilesSecondPart.forEach(tile => {
    tile.addEventListener('click', checkTile);
});

function creatingSymbols() {
    let symbols = '';
    for(let i = 0; i < 4;i++){
        symbols += charSet[Math.floor(Math.random() * 10)]
    }
    return symbols;
} 

function checkTile(e) {
    if (e.target.classList.contains('target')) {
        round++;
        clearInterval(interval);
        if (partGame == 1) {
            if (round == 3) {
                loadingBar.classList.remove('loading');
                round = 0;
                partGame = 2; 
                setTimeout(() => {
                    tilesFirstPart[randomTile].classList.remove('target');
                    symbolsDisplayed.innerText = '';
                    taskInfo.innerText = 'Wybierz poprawny!';
                    firstPartOfGame.classList.toggle('show');
                    secondPartOfGame.classList.toggle('show');
                    loadingBar.classList.add('loading');
                    startRoundSecondPart();
                }, 100);
            } else {
                setTimeout(() => {   
                    startRoundFirstPart();
                }, 100);
            }
        } else {
            if (round == 3) { 
                endGame(true);
                tilesSecondPart[randomTile].classList.remove('target');
            } else {
                setTimeout(() => {
                    tilesSecondPart[randomTile].classList.remove('target');
                    startRoundSecondPart();
                }, 100);
            }
        }
    } else {
        endGame(false);
    }
}

function randomizeFirstTiles() {
    tilesFirstPart[randomTile].classList.remove('target');
    tilesFirstPart.forEach(tile => {
        tile.innerText = creatingSymbols();
    });
    randomTile = Math.floor(Math.random() * 35);
    tilesFirstPart[randomTile].innerText = symbolToGuess[round];
    tilesFirstPart[randomTile].classList.add('target');
}

function randomizeSecondTiles() {
    tilesSecondPart.forEach(tile => {
        tile.innerText = creatingSymbols();
    });
    randomTile = Math.floor(Math.random() * 4);
    tilesSecondPart[randomTile].innerText = symbolToGuess[round];
    tilesSecondPart[randomTile].classList.add('target');
}

function startRoundFirstPart() {
    symbolToGuess.push(creatingSymbols());
    symbolsDisplayed.innerText = symbolToGuess[round];
    roundInfo.innerText = round + 1;
    randomizeFirstTiles();
    interval = setInterval(randomizeFirstTiles, 3500);
}

function startRoundSecondPart() {
    roundInfo.innerText = round + 1;
    randomizeSecondTiles()
}

function restartGame() {
    firstPartOfGame.classList.add('show');
    secondPartOfGame.classList.remove('show');
    round = 0;
    randomTile = 0;
    symbolToGuess = [];
    partGame = 1;
    popup.classList.toggle('show');
    setTimeout(() => {
        loadingBar.classList.toggle('loading');
        startRoundFirstPart();
    }, 100);
}

function endGame(isWin) {
    clearInterval(interval);
    loadingBar.classList.remove('loading');
    let info = popup.querySelector('h1');
    if (isWin) {
        info.innerText = 'Wygrałeś, zacznij od nowa';
    } else {
        info.innerText = 'Przegrałeś, zacznij od nowa';
    }
    popup.classList.toggle('show');
}