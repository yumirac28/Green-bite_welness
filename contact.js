// DOM Elements
const feedbackForm = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const confirmationMessage = document.getElementById('confirmation-message');
const faqQuestions = document.querySelectorAll('.faq-question');

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

// Form Validation and Submission
feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    // Validate inputs
    let isValid = true;
    
    // Name validation
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Email validation
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Message validation
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    // If form is valid, process submission
    if (isValid) {
        saveFeedback();
        showConfirmation();
        feedbackForm.reset();
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function saveFeedback() {
    // Get existing feedback from localStorage or initialize empty array
    const feedbackList = JSON.parse(localStorage.getItem('greenbiteFeedback')) || [];
    
    // Create new feedback object
    const newFeedback = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        date: new Date().toISOString()
    };
    
    // Add new feedback to array
    feedbackList.push(newFeedback);
    
    // Save back to localStorage
    localStorage.setItem('greenbiteFeedback', JSON.stringify(feedbackList));
}

function showConfirmation() {
    confirmationMessage.textContent = 'Thank you for your feedback! We will get back to you soon.';
    confirmationMessage.style.display = 'block';
    
    // Hide confirmation after 5 seconds
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 5000);
}

// FAQ Accordion
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        // Close all other open FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
                item.querySelector('i').classList.remove('fa-chevron-up');
                item.querySelector('i').classList.add('fa-chevron-down');
            }
        });
        
        // Toggle current FAQ
        faqItem.classList.toggle('active');
        
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            answer.style.maxHeight = null;
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// Initialize FAQ - close all answers by default
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.maxHeight = null;
    });
});