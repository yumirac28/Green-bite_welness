// Breathing animation with instructions - FIXED VERSION
const circle = document.getElementById("breathing-circle");
const startBtn = document.getElementById("start-breathing");
const stopBtn = document.getElementById("stop-breathing");
let breathingInterval;
let animationPhase = 0; // Track current animation phase

// Reset circle to initial state
function resetCircle() {
    circle.textContent = "Click Start to Begin";
    circle.style.transform = "scale(1)";
    circle.style.background = "#a5d6a7";
    circle.style.transition = "all 0.5s ease"; // Smooth reset transition
}

startBtn.addEventListener("click", () => {
    // Clear any existing intervals
    clearInterval(breathingInterval);
    
    // Reset animation phase
    animationPhase = 0;
    
    // Define breathing phases
    const phases = ["Inhale...", "Hold...", "Exhale...", "Hold..."];
    const times = [4000, 4000, 4000, 4000]; // 4s each
    
    // Remove smooth transition for the animation
    circle.style.transition = "all 4s ease-in-out";
    
    function runPhase() {
        if (animationPhase === -1) return; // Check if animation was stopped
        
        circle.textContent = phases[animationPhase];
        
        if (animationPhase === 0) {
            // Inhale - expand circle
            circle.style.transform = "scale(1.3)";
            circle.style.background = "#81c784";
        } else if (animationPhase === 2) {
            // Exhale - contract circle
            circle.style.transform = "scale(1)";
            circle.style.background = "#a5d6a7";
        }
        // For hold phases, we don't change the visual
        
        // Move to next phase after the designated time
        setTimeout(() => {
            animationPhase = (animationPhase + 1) % phases.length;
            runPhase();
        }, times[animationPhase]);
    }
    
    // Start the animation
    runPhase();
});

stopBtn.addEventListener("click", () => {
    // Set phase to -1 to stop the animation
    animationPhase = -1;
    
    // Clear any timeouts
    clearInterval(breathingInterval);
    
    // Reset the circle to its initial state
    resetCircle();
});

// Timer code remains the same
let timer;
let timeLeft = 300;
const timerDisplay = document.getElementById("timer-display");

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

document.getElementById("play").addEventListener("click", () => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
        }
    }, 1000);
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(timer);
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    timeLeft = 300;
    updateDisplay();
});

document.querySelectorAll(".set-timer").forEach(btn => {
    btn.addEventListener("click", () => {
        clearInterval(timer);
        timeLeft = parseInt(btn.dataset.time);
        updateDisplay();
    });
});

updateDisplay();

// Ambient Sounds
const sounds = {
    rain: new Audio("sounds/rain.mp3"),
    forest: new Audio("sounds/forest.mp3"),
    waves: new Audio("sounds/waves.mp3"),
    white: new Audio('sounds/white.mp3'),
};

Object.values(sounds).forEach(s => {
    s.loop = true;
    s.volume = 0.5;
});

document.querySelectorAll(".sound").forEach(chk => {
    chk.addEventListener("change", () => {
        const sound = sounds[chk.dataset.sound];
        if (chk.checked) {
            sound.play();
        } else {
            sound.pause();
            sound.currentTime = 0;
        }
    });
});

document.getElementById("volume").addEventListener("input", e => {
    let vol = e.target.value;
    Object.values(sounds).forEach(s => (s.volume = vol));
});

// Mobile navigation function - FIXED VERSION
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
});