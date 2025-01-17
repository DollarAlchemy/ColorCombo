// level-data.js: Handles scaling difficulty and level progression

const levels = [
    {
        id: 1,
        theme: 'grasslands-theme',
        enemy: {
            emoji: '🤖',
            health: 3,
            maxHealth: 3,
            abilities: ['attack']
        }
    },
    {
        id: 2,
        theme: 'desert-theme',
        enemy: {
            emoji: '👾',
            health: 5,
            maxHealth: 5,
            abilities: ['attack', 'defend']
        }
    },
    {
        id: 3,
        theme: 'night-sky-theme',
        enemy: {
            emoji: '🛸',
            health: 8,
            maxHealth: 8,
            abilities: ['attack', 'defend', 'special']
        }
    }
];

function getLevelData(levelId) {
    return levels.find(level => level.id === levelId) || null;
}

function initializeLevel(levelId) {
    const level = getLevelData(levelId);

    if (!level) {
        console.error(`Level ${levelId} not found!`);
        return;
    }

    // Update Arena Theme
    const battleArena = document.getElementById('battle-arena');
    battleArena.className = ''; // Clear existing themes
    battleArena.classList.add(level.theme);

    // Update Enemy Data
    const enemyEmoji = document.getElementById('enemy-emoji');
    const enemyHealthBar = document.getElementById('enemy-health');

    enemyEmoji.textContent = level.enemy.emoji;
    updateHealthBar(enemyHealthBar, level.enemy.health, level.enemy.maxHealth);

    // Update Dialogue
    const dialogueBox = document.getElementById('dialogue');
    dialogueBox.textContent = `Level ${level.id} begins! Prepare to face ${level.enemy.emoji}!`;
}

function updateHealthBar(healthBar, health, maxHealth) {
    const percentage = (health / maxHealth) * 100;
    healthBar.style.width = `${percentage}%`;
    healthBar.style.backgroundColor = health > 1 ? 'red' : 'orange';
}

// Export functionality for other scripts
if (typeof module !== 'undefined') {
    module.exports = { levels, getLevelData, initializeLevel };
}
