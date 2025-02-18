document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Rating system for team members
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        const stars = member.querySelectorAll('.star');
        let rating = parseInt(member.dataset.rating);

        // Initialize stars
        updateStars(stars, rating);

        stars.forEach(star => {
            // Hover effect
            star.addEventListener('mouseover', () => {
                const value = parseInt(star.dataset.value);
                updateStars(stars, value);
            });

            // Mouse leave - reset to actual rating
            star.addEventListener('mouseleave', () => {
                updateStars(stars, rating);
            });

            // Click to set rating
            star.addEventListener('click', () => {
                rating = parseInt(star.dataset.value);
                member.dataset.rating = rating;
                updateStars(stars, rating);
                
                // Add animation
                star.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);

                // Show thank you message
                const ratingDiv = member.querySelector('.rating');
                const originalText = ratingDiv.innerHTML;
                ratingDiv.innerHTML = '<p>Thank you for your rating!</p>';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    ratingDiv.innerHTML = originalText;
                    updateStars(stars, rating);}, 2000);
                });
            });
        });
    
        // Function to update star display
        function updateStars(stars, value) {
            stars.forEach(star => {
                const starValue = parseInt(star.dataset.value);
                if (starValue <= value) {
                    star.classList.add('active');
                    star.innerHTML = '★'; // Filled star
                } else {
                    star.classList.remove('active');
                    star.innerHTML = '☆'; // Empty star
                }
            });
        }
    
        // Form validation
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.querySelector('#name').value;
                const email = document.querySelector('#email').value;
                const message = document.querySelector('#message').value;
                
                if (!name || !email || !message) {
                    showError('Please fill in all fields');
                    return;
                }
    
                if (!isValidEmail(email)) {
                    showError('Please enter a valid email address');
                    return;
                }
    
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';
    
                setTimeout(() => {
                    submitButton.innerHTML = 'Message Sent!';
                    contactForm.reset();
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'Send Message';
                    }, 2000);
                }, 1500);
            });
        }
    
        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            
            contactForm.insertBefore(errorDiv, contactForm.firstChild);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }
    
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    });