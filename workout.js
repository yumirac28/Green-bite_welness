// Workout Data (expanded with more exercises)
const workoutData = {
    full: {
        none: [
            { name: "Jumping Jacks", duration: 30, description: "Start with feet together and hands at sides. Jump while spreading legs and raising arms. Return to start.", image: "images/workouts/jumping-jacks.jpg" },
            { name: "Bodyweight Squats", duration: 45, description: "Feet shoulder-width apart, lower body by bending knees, keep chest up, then stand back up.", image: "images/workouts/squats.jpg" },
            { name: "Push-ups", duration: 45, description: "Plank position, hands wider than shoulders, lower chest to floor then push back up.", image: "images/workouts/pushups.jpg" },
            { name: "Plank", duration: 60, description: "Hold push-up position with straight body line from head to heels, core engaged.", image: "images/workouts/plank.jpg" },
            { name: "Lunges", duration: 45, description: "Step forward, lower hips until both knees at 90°, push back up and alternate legs.", image: "images/workouts/lunges.jpg" }
        ],
        dumbbells: [
            { name: "Dumbbell Thrusters", duration: 45, description: "Dumbbells at shoulders, squat, then press weights overhead as you stand.", image: "images/workouts/thrusters.jpg" },
            { name: "Renegade Rows", duration: 45, description: "Plank with hands on dumbbells, row one up while balancing on other arm.", image: "images/workouts/renegade-rows.jpg" },
            { name: "Goblet Squats", duration: 45, description: "Hold dumbbell close to chest, squat keeping chest up and back straight.", image: "images/workouts/goblet-squats.jpg" },
            { name: "Dumbbell Deadlifts", duration: 45, description: "Feet hip-width apart, hinge at hips to lower weights to mid-shin, then stand.", image: "images/workouts/dumbbell-deadlifts.jpg" }
        ]
    },
    arms: {
        none: [
            { name: "Push-ups", duration: 45, description: "Standard push-ups targeting chest and triceps.", image: "images/workouts/pushups.jpg" },
            { name: "Triceps Dips", duration: 45, description: "Use bench or chair to perform triceps dips.", image: "images/workouts/triceps-dips.jpg" }
        ],
        dumbbells: [
            { name: "Bicep Curls", duration: 45, description: "Classic bicep curls with dumbbells.", image: "images/workouts/bicep-curls.jpg" },
            { name: "Triceps Extensions", duration: 45, description: "Overhead triceps extensions with one dumbbell.", image: "images/workouts/triceps-extensions.jpg" }
        ]
    },
    legs: {
        none: [
            { name: "Squats", duration: 45, description: "Basic bodyweight squats for leg strength.", image: "images/workouts/squats.jpg" },
            { name: "Lunges", duration: 45, description: "Forward, backward, and lateral lunges.", image: "images/workouts/lunges.jpg" }
        ]
    }
};

// DOM Elements
const workoutForm = document.getElementById('workout-form');
const workoutDisplay = document.getElementById('workout-display');
const timerModal = document.getElementById('timer-modal');
const closeTimer = document.querySelector('.close-timer');
const exerciseName = document.getElementById('exercise-name');
const timerDisplay = document.getElementById('timer');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const exerciseDescription = document.getElementById('exercise-description');
const exerciseImage = document.getElementById('exercise-image');
const nextExerciseBtn = document.getElementById('next-exercise');
const timerSound = document.getElementById('timer-sound');

// Variables
let currentWorkout = [];
let currentExerciseIndex = 0;
let timerInterval;
let timeLeft;
let isTimerRunning = false;

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Generate Workout
workoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bodyPart = document.getElementById('body-part').value;
    const equipmentCheckboxes = document.querySelectorAll('input[name="equipment"]:checked');
    const equipment = Array.from(equipmentCheckboxes).map(cb => cb.value);
    const duration = parseInt(document.getElementById('duration').value);
    
    generateWorkout(bodyPart, equipment, duration);
});

function generateWorkout(bodyPart, equipment, totalDuration) {
    let possibleExercises = [];
    
    equipment.forEach(equip => {
        if (workoutData[bodyPart] && workoutData[bodyPart][equip]) {
            possibleExercises = possibleExercises.concat(workoutData[bodyPart][equip]);
        }
    });
    
    // Calculate number of exercises (approx 3 min per exercise)
    const numExercises = Math.min(Math.max(3, Math.floor(totalDuration / 3)), 8);
    currentWorkout = [];
    
    // Randomly select exercises
    for (let i = 0; i < numExercises && possibleExercises.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * possibleExercises.length);
        currentWorkout.push(possibleExercises[randomIndex]);
        possibleExercises.splice(randomIndex, 1);
    }
    
    displayWorkout(currentWorkout);
}

function displayWorkout(workout) {
    workoutDisplay.innerHTML = '';
    
    const workoutDiv = document.createElement('div');
    workoutDiv.className = 'workout-plan';
    
    const header = document.createElement('div');
    header.className = 'workout-header';
    header.innerHTML = `<h2>Your Custom Workout</h2><p>${workout.length} exercises • ${Math.round(workout.reduce((acc, ex) => acc + ex.duration, 0) / 60)} minutes</p>`;
    workoutDiv.appendChild(header);
    
    const exercisesList = document.createElement('div');
    exercisesList.className = 'exercises-list';
    
    workout.forEach((exercise, index) => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise';
        exerciseDiv.innerHTML = `
            <div class="exercise-number">${index + 1}</div>
            <div class="exercise-info">
                <h3>${exercise.name}</h3>
                <p>${exercise.duration} seconds</p>
                <button class="start-exercise" data-index="${index}">Start</button>
            </div>
        `;
        exercisesList.appendChild(exerciseDiv);
    });
    
    workoutDiv.appendChild(exercisesList);
    workoutDisplay.appendChild(workoutDiv);
    
    // Add event listeners to start buttons
    document.querySelectorAll('.start-exercise').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            startExercise(index);
        });
    });
}

// Timer Modal Functions
function startExercise(index) {
    currentExerciseIndex = index;
    const exercise = currentWorkout[currentExerciseIndex];
    
    // Update modal content
    exerciseName.textContent = exercise.name;
    exerciseDescription.textContent = exercise.description;
    exerciseImage.innerHTML = `<img src="${exercise.image}" alt="${exercise.name}">`;
    timeLeft = exercise.duration;
    updateTimerDisplay();
    
    // Reset timer state
    isTimerRunning = false;
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    
    // Show modal
    timerModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isTimerRunning) return;
    
    isTimerRunning = true;
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerSound.play();
            isTimerRunning = false;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
}

function resetTimer() {
    pauseTimer();
    timeLeft = currentWorkout[currentExerciseIndex].duration;
}