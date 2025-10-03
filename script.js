// Mobile Navigation Toggle - handled in components.js
document.addEventListener('DOMContentLoaded', function() {

    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Enhanced Contact Form Handling with Anti-Abuse Protection
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formMessages = document.getElementById('form-messages');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        const messageTextarea = document.getElementById('message');
        const timestampField = document.getElementById('timestamp');
        
        // Set timestamp when form loads
        if (timestampField) {
            timestampField.value = Date.now();
        }
        
        // Character counter for message field
        if (messageTextarea) {
            const charCounter = messageTextarea.parentNode.querySelector('.char-counter');
            messageTextarea.addEventListener('input', function() {
                const count = this.value.length;
                if (charCounter) {
                    charCounter.textContent = `${count}/2000 characters`;
                    charCounter.style.color = count > 1800 ? '#e74c3c' : '#666';
                }
            });
        }
        
        // Rate limiting - check localStorage for recent submissions
        function checkRateLimit() {
            const lastSubmission = localStorage.getItem('lastContactSubmission');
            if (lastSubmission) {
                const timeSince = Date.now() - parseInt(lastSubmission);
                const cooldownPeriod = 5 * 60 * 1000; // 5 minutes
                
                if (timeSince < cooldownPeriod) {
                    const remainingTime = Math.ceil((cooldownPeriod - timeSince) / 60000);
                    return `Please wait ${remainingTime} minute(s) before submitting another message.`;
                }
            }
            return null;
        }
        
        // Content filtering for spam detection (relaxed)
        function detectSpam(formData) {
            const spamKeywords = [
                'bitcoin', 'cryptocurrency', 'casino', 'viagra', 'pharmacy',
                'click here now', 'limited time offer', 'congratulations you won'
            ];
            
            const textToCheck = `${formData.get('message')} ${formData.get('name')} ${formData.get('organization')}`.toLowerCase();
            
            for (const keyword of spamKeywords) {
                if (textToCheck.includes(keyword)) {
                    return `Message contains prohibited content. Please contact directly via email if this is a legitimate inquiry.`;
                }
            }
            
            // Check for excessive repetition (more lenient)
            const words = textToCheck.split(' ');
            const wordCount = {};
            for (const word of words) {
                if (word.length > 4) {
                    wordCount[word] = (wordCount[word] || 0) + 1;
                    if (wordCount[word] > 8) {
                        return 'Message contains excessive repetition.';
                    }
                }
            }
            
            return null;
        }
        
        // Check minimum time spent on form (bot detection - relaxed)
        function checkFormInteraction() {
            const timestamp = timestampField ? parseInt(timestampField.value) : Date.now();
            const timeSpent = Date.now() - timestamp;
            const minimumTime = 3000; // 3 seconds minimum (reduced from 10)
            
            if (timeSpent < minimumTime) {
                return 'Please take more time to fill out the form properly.';
            }
            return null;
        }
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
        
        function validateField(e) {
            const field = e.target;
            const errorSpan = field.parentNode.querySelector('.error-message');
            let isValid = true;
            
            // Clear previous errors
            field.classList.remove('error');
            if (errorSpan) errorSpan.textContent = '';
            
            // Required field validation
            if (field.hasAttribute('required') && !field.value.trim()) {
                showFieldError(field, `${getFieldLabel(field)} is required`);
                isValid = false;
            }
            
            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Phone validation (optional)
            if (field.type === 'tel' && field.value) {
                const phoneRegex = /^[\d\s\(\)\-\+]+$/;
                if (!phoneRegex.test(field.value)) {
                    showFieldError(field, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
            
            return isValid;
        }
        
        function showFieldError(field, message) {
            field.classList.add('error');
            const errorSpan = field.parentNode.querySelector('.error-message');
            if (errorSpan) errorSpan.textContent = message;
        }
        
        function clearErrors(e) {
            const field = e.target;
            field.classList.remove('error');
            const errorSpan = field.parentNode.querySelector('.error-message');
            if (errorSpan) errorSpan.textContent = '';
        }
        
        function getFieldLabel(field) {
            const label = field.parentNode.querySelector('label');
            return label ? label.textContent.replace(' *', '') : field.name;
        }
        
        function showMessage(message, type = 'success') {
            formMessages.innerHTML = `
                <div class="form-message ${type}">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                    ${message}
                </div>
            `;
            formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Enhanced form submission with real email sending
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Anti-abuse checks
            const rateLimitError = checkRateLimit();
            if (rateLimitError) {
                showMessage(rateLimitError, 'error');
                return;
            }
            
            const interactionError = checkFormInteraction();
            if (interactionError) {
                showMessage(interactionError, 'error');
                return;
            }
            
            // Validate all fields
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField({ target: input })) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                showMessage('Please correct the errors above and try again.', 'error');
                return;
            }
            
            // Get form data and check for spam
            const formData = new FormData(this);
            const spamError = detectSpam(formData);
            if (spamError) {
                showMessage(spamError, 'error');
                return;
            }
            
            // Check honeypot field
            if (formData.get('_gotcha')) {
                showMessage('Please try again.', 'error');
                return;
            }
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            formMessages.innerHTML = '';
            
            try {
                // Send to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success - store timestamp for rate limiting
                    localStorage.setItem('lastContactSubmission', Date.now().toString());
                    
                    showMessage('Thank you for your message! I will get back to you within 24 hours. Your message has been sent successfully.');
                    this.reset();
                    
                    // Reset character counter
                    const charCounter = messageTextarea?.parentNode.querySelector('.char-counter');
                    if (charCounter) {
                        charCounter.textContent = '0/2000 characters';
                        charCounter.style.color = '#666';
                    }
                    
                    // Reset timestamp
                    if (timestampField) {
                        timestampField.value = Date.now();
                    }
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Network response was not ok');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                showMessage(
                    'Sorry, there was an error sending your message. Please try again or email kelly.archambeault.running@gmail.com directly.',
                    'error'
                );
            } finally {
                // Reset button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to top functionality
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 18px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to scroll button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.backgroundColor = '#c0392b';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '#e74c3c';
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-card, .achievement-card, .gallery-item, .timeline-item, .award-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Download PDF functionality
function downloadPDF() {
    // In a real implementation, you would generate and download a PDF
    // For now, we'll just show an alert
    alert('PDF download would be implemented here. For now, please use the print function.');
}

// Print functionality
function printResume() {
    window.print();
}

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add some CSS for loading state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    body.loaded {
        opacity: 1;
    }

    .scroll-top-btn:hover {
        transform: scale(1.1) !important;
    }

    @media (max-width: 768px) {
        .scroll-top-btn {
            bottom: 20px !important;
            right: 20px !important;
            width: 45px !important;
            height: 45px !important;
            font-size: 16px !important;
        }
    }
`;
document.head.appendChild(style);
