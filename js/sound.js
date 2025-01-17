// sound.js: Handles game sound effects and background music

// Sound file paths
const soundEffects = {
    attack: 'assets/audio/effects/attack.mp3',
    defend: 'assets/audio/effects/defend.mp3',
    heal: 'assets/audio/effects/heal.mp3',
    victory: 'assets/audio/music/victory.mp3',
    background: 'assets/audio/music/round1.mp3'
};

let backgroundAudio = null;

// Play a sound effect
function playSound(effect) {
    const audio = new Audio(soundEffects[effect]);
    audio.play();
}

// Play background music
function playBackgroundMusic(track = 'background') {
    if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
    }
    backgroundAudio = new Audio(soundEffects[track]);
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5;
    backgroundAudio.play();
}

// Stop background music
function stopBackgroundMusic() {
    if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
    }
}

// Export sound functions for use in other scripts
if (typeof module !== 'undefined') {
    module.exports = {
        playSound,
        playBackgroundMusic,
        stopBackgroundMusic
    };
}
