'use strict';
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const guessEl = document.querySelector('.guess');
const messageEl = document.querySelector('.message');

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');

let score = 20;
let highScore = 0;

let secretNumber = generateRandomNumber();

function displayMessage(message) {
  messageEl.textContent = message;
}
function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}
againButton.addEventListener('click', startGame);

function startGame() {
  guessEl.disabled = false;
  checkButton.disabled = false;
  guessEl.value = '';
  secretNumber = generateRandomNumber();
  numberEl.textContent = '?';
  score = 20;
  document.querySelector('body').style.backgroundColor = '#222';
  numberEl.style.transform = 'translate(-50%, 50%) scale(1)';
  displayMessage('Start guessing...');
  scoreEl.textContent = score;
  numberEl.style.width = '15rem';
}

checkButton.addEventListener('click', handleGuess);

function handleGuess() {
  const guess = Number(guessEl.value);
  if (!guess) {
    displayMessage('No number? 🤨');
    return;
  }
  if (guess > 20 || guess < 0) {
    displayMessage('Number out of the range');
    return;
  }
  if (guess === secretNumber) {
    numberEl.textContent = secretNumber;
    displayMessage('You got it! 👏🎉');
    document.querySelector('body').style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';
    numberEl.style.transform = 'translate(-50%, 50%) scale(1.2)';
    if (score > highScore) {
      highScore = score;
      highscoreEl.textContent = highScore;
    }
    guessEl.disabled = true;
    checkButton.disabled = true;
  } else {
    score--;
    scoreEl.textContent = score;
    if (score === 0) {
      guessEl.value = 'Boo';
      displayMessage('You lose 😔');
      numberEl.textContent = secretNumber;
      guessEl.disabled = true;
      checkButton.disabled = true;
      return;
    }
    displayMessage(guess > secretNumber ? 'Too high! 📈' : 'Too low! 📉');
  }
}
