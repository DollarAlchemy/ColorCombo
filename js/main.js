// main.js: Core game logic for CCC Battle Game

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
let round = 1;
const player = { health: 3, maxHealth: 3, emoji: '😀' };
const enemy = { health: 3, maxHealth: 3, emoji: '🤖' };

// Theme Data
const themes = ['default-theme', 'grasslands-theme', 'desert-theme', 'night-sky-theme'];

// Utility Functions
function logAction(message) {
    dialogueBox.textContent = message;
}

function updateHealthBar(healthBar, health, maxHealth) {
    const percentage = (health / maxHealth) * 100;
    healthBar.style.width = `${percentage}%`;
    healthBar.style.backgroundColor = health > 1 ? 'red' : 'orange';
}

function applyTheme(theme) {
    // Remove current theme classes
    themes.forEach((themeClass) => battleArena.classList.remove(themeClass));
    // Apply the new theme
    battleArena.classList.add(theme);
    logAction(`The arena has transformed into the ${theme.replace('-theme', '').replace('-', ' ')}!`);
}

// Game Logic
function nextRound() {
    round++;
    player.health = player.maxHealth;
    enemy.health = enemy.maxHealth;
    player.emoji = ['😀', '😎', '🦸'][Math.min(round - 1, 2)];
    enemy.emoji = ['🤖', '👾', '🛸'][Math.min(round - 1, 2)];

    playerEmoji.textContent = player.emoji;
    enemyEmoji.textContent = enemy.emoji;

    const theme = themes[Math.min(round - 1, themes.length - 1)];
    applyTheme(theme);

    updateHealthBar(playerHealthBar, player.health, player.maxHealth);
    updateHealthBar(enemyHealthBar, enemy.health, enemy.maxHealth);

    logAction(`Round ${round} begins! Prepare for battle!`);
}

function attack() {
    if (enemy.health > 0) {
        enemy.health--;
        updateHealthBar(enemyHealthBar, enemy.health, enemy.maxHealth);
        logAction('You attacked the enemy!');

        if (enemy.health === 0) {
            logAction('You defeated the enemy! Moving to the next round.');
            setTimeout(nextRound, 2000);
        }
    } else {
        logAction('The enemy is already defeated.');
    }
}

function defend() {
    logAction('You defended against the enemy attack!');
    // Future: Add enemy attack counter logic
}

function heal() {
    if (player.health < player.maxHealth) {
        player.health++;
        updateHealthBar(playerHealthBar, player.health, player.maxHealth);
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
applyTheme('default-theme');
updateHealthBar(playerHealthBar, player.health, player.maxHealth);
updateHealthBar(enemyHealthBar, enemy.health, enemy.maxHealth);
logAction('Welcome to the CCC Battle Game! Click an action to start.');
