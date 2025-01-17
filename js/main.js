// main.js: Core game logic for CCC Battle Game

// Import Modules
// If using modules in Node.js or modern browsers with imports:
// const { playAnimation, playAttackAnimation, playHealAnimation, playDefendAnimation } = require('./animations');
// const { levels, getLevelData, initializeLevel } = require('./level-data');
// const { playSound, playBackgroundMusic, stopBackgroundMusic } = require('./sound');

// DOM Elements
const battleArena = document.getElementById('battle-arena');
const dialogueBox = document.getElementById('dialogue');
const attackButton = document.getElementById('attack');
const defendButton = document.getElementById('defend');
const healButton = document.getElementById('heal');
const playerEmoji = document.getElementById('player-emoji');
const enemyEmoji = document.getElementById('enemy-emoji');
const playerHealthBar = document.getElementById('player-health');
const enemyHealthBar = document.getElementById('enemy-health');

// Game State
let currentLevel = 1;
const player = { health: 3, maxHealth: 3, emoji: '😀' };
let enemy = { health: 3, maxHealth: 3, emoji: '🤖' };
const choices = ['attack', 'defend', 'heal']; // Rock-paper-scissors choices

// Utility Functions
function logAction(message) {
    dialogueBox.textContent = message;
}

function updateHealthBar(healthBar, health, maxHealth) {
    const percentage = (health / maxHealth) * 100;
    healthBar.style.width = `${percentage}%`;
    healthBar.style.backgroundColor = health > 1 ? 'red' : 'orange';
}

function startNextLevel() {
    const levelData = getLevelData(currentLevel);

    if (!levelData) {
        logAction('Congratulations! You have completed the game!');
        playSound('victory');
        stopBackgroundMusic();
        return;
    }

    initializeLevel(currentLevel);
    enemy = { ...levelData.enemy }; // Update enemy stats

    playBackgroundMusic('background');
    logAction(`Level ${currentLevel}: A new challenger appears!`);
}

function getRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineOutcome(playerChoice, enemyChoice) {
    // Rock-paper-scissors logic
    if (playerChoice === enemyChoice) return 'draw';
    if (
        (playerChoice === 'attack' && enemyChoice === 'heal') ||
        (playerChoice === 'defend' && enemyChoice === 'attack') ||
        (playerChoice === 'heal' && enemyChoice === 'defend')
    ) {
        return 'win';
    }
    return 'lose';
}

// Game Logic
function attack() {
    const playerChoice = 'attack';
    const enemyChoice = getRandomChoice();

    const outcome = determineOutcome(playerChoice, enemyChoice);

    if (outcome === 'win') {
        enemy.health--;
        updateHealthBar(enemyHealthBar, enemy.health, enemy.maxHealth);
        playAttackAnimation('player-emoji', 'enemy-health');
        playSound('attack');
        logAction(`You attacked, and the enemy tried to ${enemyChoice}. You won this round!`);

        if (enemy.health === 0) {
            logAction('You defeated the enemy! Moving to the next level.');
            setTimeout(() => {
                currentLevel++;
                startNextLevel();
            }, 2000);
        }
    } else if (outcome === 'draw') {
        logAction(`You attacked, and the enemy attacked too. It was a draw!`);
    } else {
        player.health--;
        updateHealthBar(playerHealthBar, player.health, player.maxHealth);
        playSound('defend');
        logAction(`You attacked, but the enemy defended! You lost this round.`);

        if (player.health === 0) {
            logAction('Game Over! You have been defeated.');
            stopBackgroundMusic();
        }
    }
}

function defend() {
    const playerChoice = 'defend';
    const enemyChoice = getRandomChoice();

    const outcome = determineOutcome(playerChoice, enemyChoice);

    if (outcome === 'win') {
        logAction(`You defended, and the enemy tried to ${enemyChoice}. You won this round!`);
        playDefendAnimation('player-emoji');
        playSound('defend');
    } else if (outcome === 'draw') {
        logAction(`You defended, and the enemy defended too. It was a draw!`);
    } else {
        player.health--;
        updateHealthBar(playerHealthBar, player.health, player.maxHealth);
        playSound('attack');
        logAction(`You defended, but the enemy attacked! You lost this round.`);

        if (player.health === 0) {
            logAction('Game Over! You have been defeated.');
            stopBackgroundMusic();
        }
    }
}

function heal() {
    const playerChoice = 'heal';
    const enemyChoice = getRandomChoice();

    const outcome = determineOutcome(playerChoice, enemyChoice);

    if (outcome === 'win') {
        player.health++;
        updateHealthBar(playerHealthBar, player.health, player.maxHealth);
        playHealAnimation('player-emoji');
        playSound('heal');
        logAction(`You healed, and the enemy tried to ${enemyChoice}. You won this round!`);
    } else if (outcome === 'draw') {
        logAction(`You healed, and the enemy healed too. It was a draw!`);
    } else {
        enemy.health++;
        updateHealthBar(enemyHealthBar, enemy.health, enemy.maxHealth);
        playSound('heal');
        logAction(`You healed, but the enemy attacked! You lost this round.`);
    }
}

// Event Listeners
attackButton.addEventListener('click', attack);
defendButton.addEventListener('click', defend);
healButton.addEventListener('click', heal);

// Initialize Game
startNextLevel();
