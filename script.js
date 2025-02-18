document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion with Rating System
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = question.querySelector('.toggle');
        const stars = item.querySelectorAll('.star');
        let rating = parseInt(item.dataset.rating);

        // Question click handler
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.toggle');
                    otherAnswer.style.display = 'none';
                    otherToggle.textContent = '+';
                    otherToggle.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current FAQ
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                toggle.textContent = '+';
                toggle.style.transform = 'rotate(0deg)';
            } else {
                answer.style.display = 'block';
                toggle.textContent = '-';
                toggle.style.transform = 'rotate(180deg)';
            }
        });

        // Rating system
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
            star.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent FAQ toggle
                rating = parseInt(star.dataset.value);
                item.dataset.rating = rating;
                updateStars(stars, rating);
                
                // Add animation
                star.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 200);

                // Show thank you message
                const feedback = item.querySelector('.faq-feedback');
                const originalText = feedback.innerHTML;
                feedback.innerHTML = '<p>Thank you for your feedback!</p>';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    feedback.innerHTML = originalText;
                    updateStars(stars, rating);
                }, 2000);
            });
        });
    });

    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Add animation to the transition
            const faqContent = document.querySelector('.faq-content');
            faqContent.style.opacity = '0';
            setTimeout(() => {
                faqContent.style.opacity = '1';
            }, 300);
        });
    });

    // Helper function to update stars
    function updateStars(stars, value) {
        stars.forEach(star => {
            const starValue = parseInt(star.dataset.value);
            if (starValue <= value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Animate items on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

      // Observe FAQ items and service cards
      const elementsToAnimate = [...document.querySelectorAll('.card'), ...document.querySelectorAll('.faq-item')];
      elementsToAnimate.forEach(element => {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
          observer.observe(element);
      });
  });