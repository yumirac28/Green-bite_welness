// DOM Elements
const calculatorForm = document.getElementById('calculator-form');
const resultsContainer = document.getElementById('results');
const bmrResult = document.getElementById('bmr-result');
const tdeeResult = document.getElementById('tdee-result');
const carbsValue = document.getElementById('carbs-value');
const proteinValue = document.getElementById('protein-value');
const fatValue = document.getElementById('fat-value');
const carbsBar = document.getElementById('carbs-bar');
const proteinBar = document.getElementById('protein-bar');
const fatBar = document.getElementById('fat-bar');

// Mobile navigation toggle (same as other pages)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Calculate nutrition needs
calculatorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);
    
    // Calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Calculate TDEE
    const tdee = bmr * activityLevel;
    
    // Calculate Macros
    const carbsGrams = Math.round((tdee * 0.50) / 4);
    const proteinGrams = Math.round((tdee * 0.20) / 4);
    const fatGrams = Math.round((tdee * 0.30) / 9);
    
    // Display results with animation
    animateValue(bmrResult, 0, Math.round(bmr), 1000);
    animateValue(tdeeResult, 0, Math.round(tdee), 1000);
    
    // Animate progress bars and values
    setTimeout(() => {
        animateValue(carbsValue, 0, carbsGrams, 500, 'g');
        animateProgress(carbsBar, 0, 100, 500);
    }, 1000);
    
    setTimeout(() => {
        animateValue(proteinValue, 0, proteinGrams, 500, 'g');
        animateProgress(proteinBar, 0, 100, 500);
    }, 1500);
    
    setTimeout(() => {
        animateValue(fatValue, 0, fatGrams, 500, 'g');
        animateProgress(fatBar, 0, 100, 500);
    }, 2000);
    
    // Show results container
    resultsContainer.style.display = 'block';
});

// Animate number values
function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + suffix;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Animate progress bars
function animateProgress(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.style.width = current + '%';
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Hide results initially
    resultsContainer.style.display = 'none';
    
    // Set default values for demo purposes (can be removed)
    document.getElementById('age').value = '30';
    document.getElementById('height').value = '170';
    document.getElementById('weight').value = '70';
});
