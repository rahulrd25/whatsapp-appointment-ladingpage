// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Zoho form is now integrated directly in HTML
    // Form submission is handled by Zoho's system

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
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
    const animateElements = document.querySelectorAll('.feature-card, .step, .use-case, .pricing-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Pricing button click handlers
    const pricingButtons = document.querySelectorAll('.pricing-button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            scrollToContact();
        });
    });
});



// Demo functionality removed - focusing on early access conversion

// Form submission is now handled by Zoho Forms
// The form data will be sent directly to your Zoho CRM/lead management system

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add keyframe animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Open PingBook form inline in the same page
function openZohoForm() {
    const heroFormContainer = document.getElementById('hero-form-container');
    const heroButton = document.getElementById('hero-cta-button');
    
    // Hide button and show form container
    heroButton.style.display = 'none';
    heroFormContainer.style.display = 'block';
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Load the PingBook form iframe
    loadZohoFormInline();
}

// Load PingBook form inline in the page
function loadZohoFormInline() {
    const formContainer = document.getElementById('hero-form-container');
    const formContent = formContainer.querySelector('.form-content');
    
    // Clear existing content
    formContent.innerHTML = '';
    
    // Create iframe for PingBook form
    const iframe = document.createElement('iframe');
    iframe.src = 'https://forms.zohopublic.in/rahuld1/form/Annu/formperma/uECy0LDwB6M4Kt8kIfdbvfQzGCXSUeYQL-1FoYwUoOg?zf_rszfm=1';
    iframe.style.border = 'none';
    iframe.style.height = '500px';
    iframe.style.width = '100%';
    iframe.style.width = '100%';
    iframe.style.borderRadius = '12px';
    iframe.setAttribute('aria-label', 'Get PingBook');
    
    // Append iframe to form content
    formContent.appendChild(iframe);
}

// Close PingBook form and show button again
function closeZohoForm() {
    const heroFormContainer = document.getElementById('hero-form-container');
    const heroButton = document.getElementById('hero-cta-button');
    
    // Hide form and show button
    heroFormContainer.style.display = 'none';
    heroButton.style.display = 'block';
    
    // Clear form content
    const formContent = heroFormContainer.querySelector('.form-content');
    formContent.innerHTML = '<p>Form will be added here later</p>';
}

// Show form inline in hero section (kept for future use)
function showZohoForm() {
    const heroFormContainer = document.getElementById('hero-form-container');
    const heroButton = document.getElementById('hero-cta-button');
    
    // Hide button and show form
    heroButton.style.display = 'none';
    heroFormContainer.style.display = 'block';
}

// Show form in navigation
function showNavForm() {
    const navFormContainer = document.getElementById('nav-form-container');
    navFormContainer.style.display = 'block';
}

// Show form in pricing cards
function showPricingForm(button, plan) {
    const pricingCard = button.closest('.pricing-card');
    const formContainer = pricingCard.querySelector('.pricing-form-container');
    
    // Hide button and show form
    button.style.display = 'none';
    formContainer.style.display = 'block';
}
