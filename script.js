let timeLeft = 30;
let isPaused = false;
let pauseTime = 10;
let interval;
let currentPhraseIndex = 0;
let correctGuesses = 0;

const timerElement = document.getElementById('timer');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit-guess');
const pauseButton = document.getElementById('pause-timer');
const resultElement = document.getElementById('result');
const imageElement = document.getElementById('catchphrase-image');

// Array of catchphrases and associated images
const catchphrases = [
    { phrase: "ice cube", image: "images/1.png" },
    { phrase: "four wheel drive", image: "images/2.png" },
    
];

// Hide input and submit button by default
guessInput.style.display = 'none';
submitButton.style.display = 'none';

// Function to load the next catchphrase
function loadNextCatchphrase() {
    if (currentPhraseIndex < catchphrases.length) {
        // Load the next catchphrase and reset the timer
        imageElement.src = catchphrases[currentPhraseIndex].image;
        guessInput.value = "";
        resultElement.textContent = "";
        timeLeft = 30;
        timerElement.textContent = timeLeft;
        startTimer();
        submitButton.style.display = 'none';  // Hide input and submit again
        guessInput.style.display = 'none';
    } else {
        // End the game if all catchphrases are done
        endGame();
    }
}

// Function to end the game and show score
function endGame() {
    clearInterval(interval);
    document.body.innerHTML = `
        <div class="game-container">
            <h1>Game Over</h1>
            <p>You got ${correctGuesses} correct!</p>
        </div>
    `;
}

// Start the timer
function startTimer() {
    interval = setInterval(() => {
        if (!isPaused) {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                clearInterval(interval);
                resultElement.textContent = "Time's up!";
                setTimeout(endGame, 2000); // Show the end screen after 2 seconds
            }
        }
    }, 1000);
}

// Pause the timer for 10 seconds and enable submit button and input
pauseButton.addEventListener('click', () => {
    if (timeLeft > 0 && !isPaused) {
        isPaused = true;
        submitButton.style.display = 'inline';  // Show input and submit button
        guessInput.style.display = 'inline';
        let pauseInterval = setInterval(() => {
            if (pauseTime > 0) {
                pauseTime--;
            } else {
                clearInterval(pauseInterval);
                isPaused = false;
                pauseTime = 10; // Reset pause time
                submitButton.style.display = 'none';  // Hide input and submit button again
                guessInput.style.display = 'none';
            }
        }, 1000);
    }
});

// Submit the guess
submitButton.addEventListener('click', () => {
    let userGuess = guessInput.value.toLowerCase().trim();
    if (userGuess === catchphrases[currentPhraseIndex].phrase.toLowerCase()) {
        correctGuesses++;
        resultElement.textContent = "Correct!";
        clearInterval(interval);
        currentPhraseIndex++;
        setTimeout(loadNextCatchphrase, 2000); // Move to the next catchphrase after 2 seconds
    } else {
        resultElement.textContent = "Incorrect! Try again.";
    }
});

// Start the game with the first catchphrase
loadNextCatchphrase();

