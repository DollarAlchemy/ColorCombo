// animations.js: Controls dynamic animations for game actions

// Utility function to apply and remove animations
function playAnimation(element, animationClass, duration = 1000) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// Attack Animation
function playAttackAnimation(attackerId, targetId) {
    const attacker = document.getElementById(attackerId);
    const target = document.getElementById(targetId);

    playAnimation(attacker, 'attack-animation', 500);
    playAnimation(target, 'health-bar-decrease', 500);
}

// Heal Animation
function playHealAnimation(playerId) {
    const player = document.getElementById(playerId);

    playAnimation(player, 'heal-animation', 1500);
    playAnimation(player.querySelector('.health-bar'), 'health-bar-increase', 1500);
}

// Defend Animation
function playDefendAnimation(playerId) {
    const player = document.getElementById(playerId);

    playAnimation(player, 'defend-animation', 1000);
}

// Export animations for use in other scripts
if (typeof module !== 'undefined') {
    module.exports = {
        playAnimation,
        playAttackAnimation,
        playHealAnimation,
        playDefendAnimation
    };
}
