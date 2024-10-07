// Game state
const gameState = {
    timeLeft: 30,
    isPaused: false,
    pauseTime: 15,
    interval: null,
    pauseInterval: null, // Added to track pause interval
    currentPhraseIndex: 0,
    correctGuesses: 0
};

// Game configuration
const GAME_CONFIG = {
    initialTime: 30,
    pauseDuration: 15,
    nextPhraseDelay: 2000
};

// Catchphrases data
const catchphrases = [
    { phrase: "red herring", image: "images/1.png" },
    { phrase: "top secret", image: "images/2.png" },
    { phrase: "ice cube", image: "images/3.png" },
    { phrase: "4 wheel drive", image: "images/4.png" },
    { phrase: "apple pie", image: "images/5.png" },
    { phrase: "once upon a time", image: "images/6.png" },
    { phrase: "tripod", image: "images/7.png" },
];

// DOM Elements
const elements = {
    timer: document.getElementById('timer'),
    progressBar: document.getElementById('progress-bar'),
    guessInput: document.getElementById('guess'),
    submitButton: document.getElementById('submit-guess'),
    pauseButton: document.getElementById('pause-timer'),
    result: document.getElementById('result'),
    image: document.getElementById('catchphrase-image')
};

// Initialize game UI
function initializeUI() {
    elements.guessInput.style.display = 'none';
    elements.submitButton.style.display = 'none';
}

// Load next catchphrase
function loadNextCatchphrase() {
    if (gameState.currentPhraseIndex < catchphrases.length) {
        resetRound();
        startTimer();
    } else {
        endGame();
    }
}

// Reset round state
function resetRound() {
    // Clear any existing intervals
    clearInterval(gameState.interval);
    clearInterval(gameState.pauseInterval);
    
    elements.image.src = catchphrases[gameState.currentPhraseIndex].image;
    elements.guessInput.value = "";
    elements.result.textContent = "";
    gameState.timeLeft = GAME_CONFIG.initialTime;
    elements.timer.textContent = gameState.timeLeft;
    elements.progressBar.style.width = '100%';
    gameState.isPaused = false;
    gameState.pauseTime = GAME_CONFIG.pauseDuration;
    elements.submitButton.style.display = 'none';
    elements.guessInput.style.display = 'none';
}

function endGame() {
    clearInterval(gameState.interval);
    clearInterval(gameState.pauseInterval);
    document.body.innerHTML = `
        <div class="game-container">
            <h1>Game Over</h1>
            <p>You got ${gameState.correctGuesses} correct!</p>
        </div>
    `;
}

function startTimer() {
    clearInterval(gameState.interval);
    const totalTime = gameState.timeLeft;
    
    gameState.interval = setInterval(() => {
        if (!gameState.isPaused) {
            if (gameState.timeLeft > 0) {
                updateTimer(totalTime);
            } else {
                handleTimeUp();
            }
        }
    }, 1000);
}

<<<<<<< HEAD
function updateTimer(totalTime) {
    gameState.timeLeft--;
    elements.timer.textContent = gameState.timeLeft;
    const progressWidth = (gameState.timeLeft / totalTime) * 100;
    elements.progressBar.style.width = `${progressWidth}%`;
}

function handleTimeUp() {
    clearInterval(gameState.interval);
    clearInterval(gameState.pauseInterval);
    elements.result.textContent = "Time's up!";
    gameState.currentPhraseIndex++;
    setTimeout(loadNextCatchphrase, GAME_CONFIG.nextPhraseDelay);
}

// Handle pause button click
function handlePause() {
    if (gameState.timeLeft > 0 && !gameState.isPaused) {
        // Clear any existing pause interval
        clearInterval(gameState.pauseInterval);
        
        // Reset and initialize pause state
        gameState.isPaused = true;
        gameState.pauseTime = GAME_CONFIG.pauseDuration;
        
        // Show input elements
        elements.submitButton.style.display = 'inline';
        elements.guessInput.style.display = 'inline';
        elements.guessInput.focus(); // Focus on input field
        
        // Start pause countdown
        gameState.pauseInterval = setInterval(() => {
            if (gameState.pauseTime > 0) {
                gameState.pauseTime--;
                // Optional: Update pause timer display
                console.log(`Pause time remaining: ${gameState.pauseTime}`);
            } else {
                // Clean up pause state
                clearInterval(gameState.pauseInterval);
                gameState.isPaused = false;
                gameState.pauseTime = GAME_CONFIG.pauseDuration;
                elements.submitButton.style.display = 'none';
                elements.guessInput.style.display = 'none';
=======
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
>>>>>>> 2fff692600e3ac5c1d3785e318719bad597069da
            }
        }, 1000);
    }
}

function handleGuess() {
    const userGuess = elements.guessInput.value.toLowerCase().trim();
    const correctPhrase = catchphrases[gameState.currentPhraseIndex].phrase.toLowerCase();
    
    if (userGuess === correctPhrase) {
        // Clear intervals before proceeding
        clearInterval(gameState.interval);
        clearInterval(gameState.pauseInterval);
        
        handleCorrectGuess();
    } else {
        elements.result.textContent = "Incorrect! Try again.";
    }
<<<<<<< HEAD
}
=======
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
>>>>>>> 2fff692600e3ac5c1d3785e318719bad597069da

function handleCorrectGuess() {
    gameState.correctGuesses++;
    elements.result.textContent = "Correct!";
    gameState.currentPhraseIndex++;
    setTimeout(loadNextCatchphrase, GAME_CONFIG.nextPhraseDelay);
}

// Event listeners
elements.pauseButton.addEventListener('click', handlePause);
elements.submitButton.addEventListener('click', handleGuess);

// Initialize game
initializeUI();
loadNextCatchphrase();
