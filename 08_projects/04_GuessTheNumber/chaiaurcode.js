// ============================================================
// PROJECT: Guess the Number
// ============================================================
// Concepts used:
//   - Math.random() + parseInt → generate a random integer 1–100
//   - addEventListener('click') → respond to the submit button
//   - e.preventDefault() → prevent form reload
//   - parseInt(input.value) → read user's guess
//   - isNaN(), range checks → validate input
//   - Array.push() → track previous guesses
//   - DOM manipulation → update guesses, remaining count, hint text
//   - element.setAttribute('disabled') → disable input when game ends
//   - element.removeAttribute('disabled') → re-enable on new game
//   - Dynamic button creation → "Start new Game" button appears on game over
//
// GAME LOGIC:
//   1. Random number 1–100 generated at start
//   2. Player has 10 attempts
//   3. Each guess shows too high / too low / correct
//   4. Game ends on correct guess or after 10 attempts
//   5. "New Game" button resets all state
// ============================================================

let randomNumber = parseInt(Math.random() * 100 + 1);  // 1–100

// DOM references
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');       // displays past guesses
const remaining = document.querySelector('.lastResult');    // remaining attempts
const lowOrHi = document.querySelector('.lowOrHi');        // hint message
const startOver = document.querySelector('.resultParas');  // container for new game button

const p = document.createElement('p');  // will hold the "new game" button

let prevGuess = [];    // history of all guesses
let numGuess = 1;      // current attempt number (starts at 1)
let playGame = true;   // flag to prevent clicks after game ends

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

// Validates the guess before processing it
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('PLease enter a valid number');
  } else if (guess < 1) {
    alert('PLease enter a number more than 1');
  } else if (guess > 100) {
    alert('PLease enter a  number less than 100');
  } else {
    prevGuess.push(guess);
    if (numGuess === 10) {
      // Out of attempts — game over
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

// Compares guess to the random number and shows a hint
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is TOOO low`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOOO High`);
  }
}

// Displays the guess and decrements remaining attempts in the DOM
function displayGuess(guess) {
  userInput.value = '';                          // clear input field
  guessSlot.innerHTML += `${guess}, `;          // append guess to history
  numGuess++;
  remaining.innerHTML = `${11 - numGuess} `;   // update remaining count
}

// Injects a hint message into the page
function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// Locks the game and shows the "Start new Game" button
function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');  // disable input
  p.classList.add('button');
  p.innerHTML = `<button id="newGame">Start new Game</button>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();  // attach listener to the new game button immediately
}

// Resets all game state when "Start new Game" is clicked
function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);  // new random number
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess} `;
    userInput.removeAttribute('disabled');  // re-enable input
    startOver.removeChild(p);              // remove the new game button
    playGame = true;
  });
}
