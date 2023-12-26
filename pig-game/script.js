'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newButton = document.querySelector('.btn--new');
const rulesButton = document.querySelector('.btn--rules');
const rulesCloseButton = document.querySelector('.rules--close');

const rulesEl = document.querySelector('.rules');
const overlayEl = document.querySelector('.overlay');

let scores, currentScore, currentPlayer, playing;

startGame();

function startGame() {
  diceEl.src = '';
  diceEl.setAttribute('alt', '');
  currentScore = 0;

  currentPlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

holdButton.addEventListener('click', function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    if (scores[currentPlayer] >= 100) {
      currentScore = 0;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      playing = false;
      return;
    }
    switchPlayer();
  }
});

rollButton.addEventListener('click', function () {
  if (playing) {
    const randomScore = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `./dice-${randomScore}.png`;
    diceEl.setAttribute('alt', `Current dice is ${randomScore}`);
    if (randomScore === 1) {
      switchPlayer();
      return;
    }
    currentScore += randomScore;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  }
});

newButton.addEventListener('click', startGame);

function showRule() {
  rulesEl.style.display = 'block';
  overlayEl.style.display = 'block';
}

function hideRule() {
  rulesEl.style.display = 'none';
  overlayEl.style.display = 'none';
}

rulesButton.addEventListener('click', showRule);
rulesCloseButton.addEventListener('click', hideRule);
overlayEl.addEventListener('click', hideRule);
