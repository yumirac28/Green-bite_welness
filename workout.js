document.getElementById("generateBtn").addEventListener("click", function () {
    let equipment = [];
    if (document.getElementById("none").checked) equipment.push("Bodyweight");
    if (document.getElementById("dumbbells").checked) equipment.push("Dumbbells");
    if (document.getElementById("bands").checked) equipment.push("Resistance Bands");
    if (document.getElementById("mat").checked) equipment.push("Yoga Mat");

    let duration = parseInt(document.getElementById("duration").value);

    // Example Workout Database (expanded for variety)
    let workoutDatabase = {
        Bodyweight: ["Push-ups", "Squats", "Jumping Jacks", "Lunges", "Burpees", "Mountain Climbers", "High Knees", "Tricep Dips"],
        Dumbbells: ["Dumbbell Curls", "Shoulder Press", "Dumbbell Rows", "Goblet Squats", "Dumbbell Deadlifts", "Dumbbell Bench Press"],
        "Resistance Bands": ["Band Rows", "Band Squats", "Chest Press with Band", "Band Pull-aparts", "Glute Bridge with Band"],
        "Yoga Mat": ["Plank", "Mountain Climbers", "Leg Raises", "Bridge Pose", "Russian Twists", "Side Plank"]
    };

    let selectedExercises = [];

    if (equipment.length === 0) {
        selectedExercises = workoutDatabase.Bodyweight; // Default
    } else {
        equipment.forEach(eq => {
            selectedExercises = selectedExercises.concat(workoutDatabase[eq]);
        });
    }

    // Randomize list
    selectedExercises = selectedExercises.sort(() => Math.random() - 0.5);

    // Estimate: 1 exercise = ~3 minutes
    let numExercises = Math.min(selectedExercises.length, Math.ceil(duration / 3));

    let workoutPlan = selectedExercises.slice(0, numExercises);

    // Display Workout
    let output = document.getElementById("workoutOutput");
    output.style.display = "block";
    output.innerHTML = `
        <h3>Your ${duration}-Minute Workout</h3>
        <ul>
            ${workoutPlan.map(ex => `<li>${ex}</li>`).join("")}
        </ul>
    `;
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Optional: close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}



