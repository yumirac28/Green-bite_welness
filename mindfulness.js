// DOM Elements
const elements = {
    // Breathing
    breathingCircle: document.getElementById('breathing-circle'),
    breathingInstruction: document.getElementById('breathing-instruction'),
    startBreathing: document.getElementById('start-breathing'),
    stopBreathing: document.getElementById('stop-breathing'),
    breathingPattern: document.getElementById('breathing-pattern'),
    
    // Meditation Timer
    meditationTimer: document.getElementById('meditation-timer'),
    startMeditation: document.getElementById('start-meditation'),
    pauseMeditation: document.getElementById('pause-meditation'),
    resetMeditation: document.getElementById('reset-meditation'),
    timerPresets: document.querySelectorAll('.preset'),
    
    // Sounds
    soundButtons: document.querySelectorAll('.sound-btn'),
    volumeControl: document.getElementById('volume'),
    
    // Stats
    totalSessions: document.getElementById('total-sessions'),
    totalMinutes: document.getElementById('total-minutes'),
    currentStreak: document.getElementById('current-streak')
};

// Audio Elements
const audio = {
    rain: document.getElementById('rain-sound'),
    forest: document.getElementById('forest-sound'),
    waves: document.getElementById('waves-sound'),
    whiteNoise: document.getElementById('white-noise-sound'),
    bell: document.getElementById('bell-sound')
};

// App State
const state = {
    breathing: {
        interval: null,
        patterns: {
            '4-4-4-4': [4, 4, 4, 0],
            '4-7-8': [4, 7, 8, 0],
            '5-5-5-5': [5, 5, 5, 0]
        }
    },
    meditation: {
        interval: null,
        timeLeft: 300, // 5 minutes in seconds
        running: false
    },
    sounds: {
        active: null,
        volume: 0.5
    },
    sessions: JSON.parse(localStorage.getItem('mindfulnessSessions')) || {
        total: 0,
        minutes: 0,
        streak: 0,
        lastDate: null
    }
};

// Initialize App
function init() {
    // Load saved data
    updateStatsDisplay();
    elements.volumeControl.value = state.sounds.volume;
    
    // Set event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Breathing controls
    elements.startBreathing.addEventListener('click', startBreathingCycle);
    elements.stopBreathing.addEventListener('click', stopBreathingCycle);
    
    // Meditation controls
    elements.startMeditation.addEventListener('click', startMeditationTimer);
    elements.pauseMeditation.addEventListener('click', pauseMeditationTimer);
    elements.resetMeditation.addEventListener('click', resetMeditationTimer);
    elements.timerPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            state.meditation.timeLeft = preset.dataset.minutes * 60;
            updateMeditationDisplay();
        });
    });
    
    // Sound controls
    elements.soundButtons.forEach(btn => {
        btn.addEventListener('click', () => toggleSound(btn.dataset.sound));
    });
    elements.volumeControl.addEventListener('input', updateVolume);
}

// Breathing Exercise Functions
function startBreathingCycle() {
    stopBreathingCycle();
    
    const pattern = elements.breathingPattern.value;
    const [inhale, hold, exhale] = state.breathing.patterns[pattern];
    const phases = [
        { text: "Breathe In", duration: inhale, scale: 1.2, color: '#4CAF50' },
        { text: "Hold", duration: hold, scale: 1, color: '#2E7D32' },
        { text: "Breathe Out", duration: exhale, scale: 0.8, color: '#8BC34A' }
    ];
    
    let phaseIndex = 0;
    let timeInPhase = 0;
    
    state.breathing.interval = setInterval(() => {
        const phase = phases[phaseIndex];
        updateBreathingDisplay(phase);
        
        if (++timeInPhase >= phase.duration) {
            timeInPhase = 0;
            phaseIndex = (phaseIndex + 1) % phases.length;
        }
    }, 1000);
}

function updateBreathingDisplay(phase) {
    elements.breathingInstruction.textContent = phase.text;
    elements.breathingCircle.style.transform = `scale(${phase.scale})`;
    elements.breathingCircle.style.backgroundColor = phase.color;
}

function stopBreathingCycle() {
    clearInterval(state.breathing.interval);
    elements.breathingInstruction.textContent = "Click Start to Begin";
    elements.breathingCircle.style.transform = "scale(1)";
}

// Meditation Timer Functions
function startMeditationTimer() {
    if (state.meditation.running) return;
    
    state.meditation.running = true;
    state.meditation.interval = setInterval(() => {
        if (--state.meditation.timeLeft <= 0) {
            completeMeditationSession();
            return;
        }
        updateMeditationDisplay();
    }, 1000);
}

function pauseMeditationTimer() {
    clearInterval(state.meditation.interval);
    state.meditation.running = false;
}

function resetMeditationTimer() {
    pauseMeditationTimer();
    state.meditation.timeLeft = 300;
    updateMeditationDisplay();
}

function completeMeditationSession() {
    pauseMeditationTimer();
    audio.bell.play();
    
    const minutes = Math.ceil((300 - state.meditation.timeLeft) / 60);
    updateSessionStats(minutes);
    resetMeditationTimer();
}

function updateMeditationDisplay() {
    const mins = Math.floor(state.meditation.timeLeft / 60).toString().padStart(2, '0');
    const secs = (state.meditation.timeLeft % 60).toString().padStart(2, '0');
    elements.meditationTimer.textContent = `${mins}:${secs}`;
}

// Sound Functions
function toggleSound(sound) {
    if (state.sounds.active === sound) {
        stopAllSounds();
        return;
    }
    
    stopAllSounds();
    state.sounds.active = sound;
    audio[sound].play();
    
    elements.soundButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.sound === sound);
    });
}

function stopAllSounds() {
    Object.values(audio).forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    state.sounds.active = null;
}

function updateVolume() {
    state.sounds.volume = elements.volumeControl.value;
    Object.values(audio).forEach(sound => {
        sound.volume = state.sounds.volume;
    });
}

// Session Tracking
function updateSessionStats(minutes) {
    const today = new Date().toDateString();
    
    // Update totals
    state.sessions.total++;
    state.sessions.minutes += minutes;
    
    // Update streak
    if (state.sessions.lastDate !== today) {
        const lastSessionDate = state.sessions.lastDate ? new Date(state.sessions.lastDate) : null;
        const isConsecutiveDay = lastSessionDate && (new Date() - lastSessionDate) <= 86400000;
        state.sessions.streak = isConsecutiveDay ? state.sessions.streak + 1 : 1;
        state.sessions.lastDate = today;
    }
    
    // Save to storage
    localStorage.setItem('mindfulnessSessions', JSON.stringify(state.sessions));
    updateStatsDisplay();
}

function updateStatsDisplay() {
    elements.totalSessions.textContent = state.sessions.total;
    elements.totalMinutes.textContent = state.sessions.minutes;
    elements.currentStreak.textContent = state.sessions.streak;
}

// Start the app
document.addEventListener('DOMContentLoaded', init);