// Navigation Animation
document.querySelectorAll('.nav-item').forEach(item => {
    gsap.from(item, {
        duration: 0.6,
        opacity: 0,
        y: -20,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top center",
            end: "bottom center",
        }
    });
});

// Dynamic Star Rating System
class StarRating {
    constructor(container) {
        this.container = container;
        this.rating = 0;
        this.maxStars = 5;
        this.init();
    }

    init() {
        // Create stars
        for (let i = 1; i <= this.maxStars; i++) {
            const star = document.createElement('span');
            star.innerHTML = '★';
            star.className = 'star';
            star.dataset.value = i;
            
            // Hover effect
            star.addEventListener('mouseover', () => this.highlight(i));
            star.addEventListener('mouseout', () => this.highlight(this.rating));
            star.addEventListener('click', () => this.setRating(i));
            
            this.container.appendChild(star);
        }
    }

    highlight(rating) {
        const stars = this.container.children;
        for (let i = 0; i < stars.length; i++) {
            stars[i].style.color = i < rating ? '#ffd700' : '#ccd6f6';
        }
    }

    setRating(rating) {
        this.rating = rating;
        this.highlight(rating);
        
        // Animate selected stars
        const stars = this.container.children;
        for (let i = 0; i < rating; i++) {
            gsap.from(stars[i], {
                scale: 1.5,
                duration: 0.2,
                ease: "bounce.out"
            });
        }

        // Save rating (could be connected to backend)
        localStorage.setItem(`project-rating-${this.container.id}`, rating);
    }
}

// Initialize ratings
document.querySelectorAll('.project-rating').forEach((container, index) => {
    new StarRating(container);
});

// Scroll Animation
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: card,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });
});

// Team member profile modal
function showProfile(memberId) {
    // Redirect to profilejonathan.html with memberId as a query parameter
    window.location.href = `profilejonathan.html?memberId=${memberId}`;
}


// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-button';
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').appendChild(mobileMenuButton);

mobileMenuButton.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Initialize animations on load
window.addEventListener('load', () => {
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});