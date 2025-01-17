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

// Game Logic
function attack() {
    if (enemy.health > 0) {
        enemy.health--;
        updateHealthBar(enemyHealthBar, enemy.health, enemy.maxHealth);
        playAttackAnimation('player-emoji', 'enemy-health');
        playSound('attack');
        logAction('You attacked the enemy!');

        if (enemy.health === 0) {
            logAction('You defeated the enemy! Moving to the next level.');
            setTimeout(() => {
                currentLevel++;
                startNextLevel();
            }, 2000);
        }
    } else {
        logAction('The enemy is already defeated.');
    }
}

function defend() {
    logAction('You defended against the enemy attack!');
    playDefendAnimation('player-emoji');
    playSound('defend');
}

function heal() {
    if (player.health < player.maxHealth) {
        player.health++;
        updateHealthBar(playerHealthBar, player.health, player.maxHealth);
        playHealAnimation('player-emoji');
        playSound('heal');
        logAction('You healed yourself!');
    } else {
        logAction('You are already at full health.');
    }
}

// Event Listeners
attackButton.addEventListener('click', attack);
defendButton.addEventListener('click', defend);
healButton.addEventListener('click', heal);

// Initialize Game
startNextLevel();
