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
    { phrase: "4 wheel drive", image: "images/2.png" },
    
];

// Hide input and submit button by default
guessInput.style.display = 'none';
submitButton.style.display = 'none';

function loadNextCatchphrase() {
    if (currentPhraseIndex < catchphrases.length) {
        imageElement.src = catchphrases[currentPhraseIndex].image;
        guessInput.value = "";
        resultElement.textContent = "";
        timeLeft = 30;
        timerElement.textContent = timeLeft;
        isPaused = false;
        pauseTime = 15;
        submitButton.style.display = 'none';
        guessInput.style.display = 'none';
        startTimer();
    } else {
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
    clearInterval(interval);  // Clear any existing interval
    interval = setInterval(() => {
        if (!isPaused) {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                clearInterval(interval);
                resultElement.textContent = "Time's up!";
                currentPhraseIndex++;
                setTimeout(endGame, 2000);
            }
        }
    }, 1000);
}

// Pause the timer for 10 seconds and enable submit button and input
pauseButton.addEventListener('click', () => {
    if (timeLeft > 0 && !isPaused) {
        const pauseSound = document.getElementById('pause-sound');
        pauseSound.play(); // Play the sound when the button is pressed
        isPaused = true;
        submitButton.style.display = 'inline';  // Show input and submit button
        guessInput.style.display = 'inline';
        pauseButton.style.display = 'none'; // Hide the buzzer button
        let pauseInterval = setInterval(() => {
            if (pauseTime > 0) {
                pauseTime--;
            } else {
                clearInterval(pauseInterval);
                isPaused = false;
                pauseTime = 10; // Reset pause time
                submitButton.style.display = 'none';  // Hide input and submit button again
                guessInput.style.display = 'none';
                pauseButton.style.display = 'inline'; // Show the buzzer button again
            }
        }, 1000);
    }
});

submitButton.addEventListener('click', () => {
    let userGuess = guessInput.value.toLowerCase().trim();
    if (userGuess === catchphrases[currentPhraseIndex].phrase.toLowerCase()) {
        correctGuesses++;
        resultElement.textContent = "Correct!";
        clearInterval(interval);
        currentPhraseIndex++;
        setTimeout(loadNextCatchphrase, 2000);
    } else {
        resultElement.textContent = "Incorrect! Try again.";
    }
    // Show the buzzer button again after hiding the submit button and input
    submitButton.style.display = 'none';  // Hide input and submit button again
    guessInput.style.display = 'none';
    pauseButton.style.display = 'inline'; // Show the buzzer button again
});

document.getElementById('pause-timer').addEventListener('click', function() {
    // Add the class to trigger the animation
    const imageContainer = document.querySelector('.image-container');
    imageContainer.classList.add('snake-animation');
    
    // Optionally, remove the animation after it completes to allow retriggering
    setTimeout(() => {
        imageContainer.classList.remove('snake-animation');
    }, 2000); // Match the duration of the animation
});

loadNextCatchphrase();
