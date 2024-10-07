// Game state
const gameState = {
    timeLeft: 30,
    isPaused: false,
    pauseTime: 15,
    interval: null,
    pauseInterval: null,
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
    { phrase: "wish upon a star", image: "images/8.png" },
    { phrase: "first aid", image: "images/9.png" },
    { phrase: "equal rights", image: "images/10.png" },
    { phrase: "forgive and forget", image: "images/11.png" },
    { phrase: "holy water", image: "images/12.png" },
    { phrase: "water hose", image: "images/13.png" },
    { phrase: "oliver twist", image: "images/14.png" },
    { phrase: "robin hood", image: "images/15.png" },
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

// End game
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

// Start timer
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

// Update timer
function updateTimer(totalTime) {
    gameState.timeLeft--;
    elements.timer.textContent = gameState.timeLeft;
    const progressWidth = (gameState.timeLeft / totalTime) * 100;
    elements.progressBar.style.width = `${progressWidth}%`;
}

// Handle time up
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
        clearInterval(gameState.pauseInterval);
        
        gameState.isPaused = true;
        gameState.pauseTime = GAME_CONFIG.pauseDuration;
        
        elements.submitButton.style.display = 'inline';
        elements.guessInput.style.display = 'inline';
        elements.guessInput.focus();
        
        gameState.pauseInterval = setInterval(() => {
            if (gameState.pauseTime > 0) {
                gameState.pauseTime--;
            } else {
                clearInterval(gameState.pauseInterval);
                gameState.isPaused = false;
                gameState.pauseTime = GAME_CONFIG.pauseDuration;
                elements.submitButton.style.display = 'none';
                elements.guessInput.style.display = 'none';
            }
        }, 1000);
    }
}

// Handle user guess
function handleGuess() {
    const userGuess = elements.guessInput.value.toLowerCase().trim();
    const correctPhrase = catchphrases[gameState.currentPhraseIndex].phrase.toLowerCase();
    
    if (userGuess === correctPhrase) {
        clearInterval(gameState.interval);
        clearInterval(gameState.pauseInterval);
        handleCorrectGuess();
    } else {
        elements.result.textContent = "Incorrect! Try again.";
    }
}

// Handle correct guess
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
