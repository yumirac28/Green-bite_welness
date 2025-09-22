// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Rotating Health Quotes
const quotes = [
    "Your health is an investment, not an expense.",
    "Let food be thy medicine and medicine be thy food.",
    "Take care of your body. It's the only place you have to live.",
    "Health is a relationship between you and your body.",
    "The greatest wealth is health.",
    "A healthy outside starts from the inside.",
    "Wellness is the complete integration of body, mind, and spirit."
];

const quoteElement = document.querySelector('.rotating-quote');
let currentQuoteIndex = 0;

function rotateQuotes() {
    // Fade out
    quoteElement.style.opacity = 0;
    
    setTimeout(() => {
        // Change quote
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        quoteElement.textContent = quotes[currentQuoteIndex];
        
        // Fade in
        quoteElement.style.opacity = 1;
    }, 1000);
}

// Rotate quotes every 5 seconds
setInterval(rotateQuotes, 5000);

// Daily Health Tip
const dailyTips = {
    monday: "Start your day with a glass of warm water and lemon to kickstart your metabolism.",
    tuesday: "Take a 5-minute break every hour to stretch and move around if you have a desk job.",
    wednesday: "Incorporate at least one serving of leafy greens into each meal today.",
    thursday: "Practice deep breathing for 5 minutes to reduce stress and improve focus.",
    friday: "Try a new physical activity today - even a 15-minute walk counts!",
    saturday: "Prepare healthy snacks for the week ahead to avoid unhealthy choices.",
    sunday: "Reflect on your wellness goals and plan for the coming week."
};

function getDailyTip() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    const todayName = days[today];
    return dailyTips[todayName];
}

document.getElementById('daily-tip').textContent = getDailyTip();

// Newsletter Banner subscription
document.getElementById('banner-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('banner-email').value.trim();
  if (email) {
    localStorage.setItem('bannerNewsletter', email);
    document.getElementById('banner-msg').textContent = "Thanks for joining our community!";
    document.getElementById('banner-email').value = '';
  }
});

// Newsletter Subscription
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const subscriptionMessage = document.getElementById('subscription-message');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (email) {
        // Store in localStorage
        let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
            
            subscriptionMessage.textContent = "Thank you for subscribing!";
            subscriptionMessage.style.color = "white";
            
            // Clear the form
            emailInput.value = '';
            
            // Show confirmation for 5 seconds
            setTimeout(() => {
                subscriptionMessage.textContent = "";
            }, 5000);
        } else {
            subscriptionMessage.textContent = "This email is already subscribed.";
            subscriptionMessage.style.color = "#ffcccb";
        }
    } else {
        subscriptionMessage.textContent = "Please enter a valid email address.";
        subscriptionMessage.style.color = "#ffcccb";
    }
});

// Check for existing subscriptions on page load
window.addEventListener('DOMContentLoaded', () => {
    const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
    if (subscriptions.length > 0) {
        subscriptionMessage.textContent = `You're subscribed with ${subscriptions[subscriptions.length - 1]}`;
        subscriptionMessage.style.color = "white";
        
        // Clear after 5 seconds
        setTimeout(() => {
            subscriptionMessage.textContent = "";
        }, 5000);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
