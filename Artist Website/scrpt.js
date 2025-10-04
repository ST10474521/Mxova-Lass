// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
}));

// Music Player Functionality
const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

// Auto-play music when page loads
window.addEventListener('load', function() {
    if (bgMusic) {
        bgMusic.volume = 0.3;
        // Try to play automatically
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started successfully
            }).catch(error => {
                // Autoplay was prevented, show play button
                console.log("Auto-play was prevented, user interaction required");
            });
        }
    }
});

// Play button
if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (bgMusic) bgMusic.play();
    });
}

// Pause button
if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
        if (bgMusic) bgMusic.pause();
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// WhatsApp Integration for Bookings Form
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(bookingForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const eventType = formData.get('event-type');
        const eventDate = formData.get('event-date');
        const budget = formData.get('budget');
        const description = formData.get('description');
        
        // Create WhatsApp message
        const message = `New Booking Request from Mxova Lass Website:
        
Name: ${name}
Email: ${email}
Phone: ${phone}
Event Type: ${eventType}
Event Date: ${eventDate}
Budget: ${budget}
Details: ${description}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp number (replace with your number)
        const whatsappNumber = '+27797927019';
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
        
        // Show confirmation message
        alert('Your booking request has been sent to WhatsApp! We will contact you soon.');
        
        // Reset form
        bookingForm.reset();
    });
}

// Music Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const musicItems = document.querySelectorAll('.music-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            musicItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Animation on scroll
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimation() {
    const animatedElements = document.querySelectorAll('.music-card, .music-item, .influence-card, .show-item, .option-card, .pricing-tier, .faq-item, .photo-item');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.music-card, .music-item, .influence-card, .show-item, .option-card, .pricing-tier, .faq-item, .photo-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Check on load
});