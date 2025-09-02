// Dynamic pricing based on user location
const pricingData = {
    'IN': { 
        currency: '₹', 
        currencySymbol: '₹', 
        price: '999', 
        symbol: '₹999/month',
        currencyCode: 'INR',
        locale: 'en-IN'
    },
    'US': { 
        currency: '$', 
        currencySymbol: '$', 
        price: '5', 
        symbol: '$5/month',
        currencyCode: 'USD',
        locale: 'en-US'
    },
    'GB': { 
        currency: '£', 
        currencySymbol: '£', 
        price: '5', 
        symbol: '£5/month',
        currencyCode: 'GBP',
        locale: 'en-GB'
    },
    'AE': { 
        currency: 'AED', 
        currencySymbol: 'د.إ', 
        price: '99', 
        symbol: 'د.إ 99/month',
        currencyCode: 'AED',
        locale: 'ar-AE'
    },
    'default': { 
        currency: '$', 
        currencySymbol: '$', 
        price: '5', 
        symbol: '$5/month',
        currencyCode: 'USD',
        locale: 'en-US'
    }
};

function detectUserLocation() {
    // Try to get country from browser's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let country = 'default';
    
    // More comprehensive timezone detection
    if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta') || 
        timezone.includes('Asia/Mumbai') || timezone.includes('Asia/Delhi') ||
        timezone.includes('Asia/Chennai') || timezone.includes('Asia/Bangalore')) {
        country = 'IN';
    } else if (timezone.includes('America/New_York') || timezone.includes('America/Los_Angeles') ||
               timezone.includes('America/Chicago') || timezone.includes('America/Denver')) {
        country = 'US';
    } else if (timezone.includes('Europe/London') || timezone.includes('Europe/Dublin')) {
        country = 'GB';
    } else if (timezone.includes('Asia/Dubai') || timezone.includes('Asia/Abu_Dhabi')) {
        country = 'AE';
    }
    
    // Fallback: Try to detect from browser language
    if (country === 'default') {
        const language = navigator.language || navigator.userLanguage;
        if (language.includes('en-IN') || language.includes('hi-IN')) {
            country = 'IN';
        } else if (language.includes('en-US')) {
            country = 'US';
        } else if (language.includes('en-GB')) {
            country = 'GB';
        } else if (language.includes('ar-AE')) {
            country = 'AE';
        }
    }
    
    return country;
}

function formatCurrency(amount, currencyCode, locale = 'en-US') {
    // Use Intl.NumberFormat for proper currency formatting
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    
    // For currencies that don't have proper Intl support, use manual formatting
    if (currencyCode === 'AED') {
        return `د.إ ${amount}`;
    }
    
    return formatter.format(amount);
}

function addRegionSelector() {
    // Create a hidden region selector for debugging (optional)
    const regionSelector = document.createElement('div');
    regionSelector.id = 'region-selector';
    regionSelector.innerHTML = `
        <select id="region-dropdown" onchange="changeRegion(this.value)" style="display: none;">
            <option value="IN">🇮🇳 India (₹999-₹1998)</option>
            <option value="US">🇺🇸 USA ($5-$10)</option>
            <option value="GB">🇬🇧 UK (£5-£10)</option>
            <option value="AE">🇦🇪 UAE (د.إ 99-198)</option>
        </select>
    `;
    
    // Set the current region
    const currentCountry = detectUserLocation();
    const select = regionSelector.querySelector('select');
    select.value = currentCountry;
    
    // Add to page (hidden)
    document.body.appendChild(regionSelector);
}

function changeRegion(country) {
    updatePricing(country);
    
    // Show a brief notification only if manually changed
    if (document.getElementById('region-dropdown').style.display !== 'none') {
        showNotification(`Pricing updated for ${pricingData[country].currency} region!`, 'success');
    }
}

function updatePricing(country) {
    const pricing = pricingData[country] || pricingData['default'];
    
    // Update hero section pricing
    const heroPrice = document.querySelector('.hero-stats .stat-value');
    if (heroPrice) {
        heroPrice.textContent = pricing.symbol;
    }
    
    // Update pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        const priceElement = card.querySelector('.price');
        const currencyElement = card.querySelector('.currency');
        
        if (priceElement && currencyElement) {
            if (card.classList.contains('starter')) {
                currencyElement.textContent = pricing.currencySymbol;
                priceElement.textContent = pricing.price;
            } else if (card.classList.contains('pro')) {
                // Pro plan pricing (2x starter)
                const proPrice = parseInt(pricing.price) * 2;
                currencyElement.textContent = pricing.currencySymbol;
                priceElement.textContent = proPrice.toString();
            }
        }
    });
    
    // Update pricing banner
    const pricingBanner = document.querySelector('.pricing-banner .price');
    if (pricingBanner) {
        pricingBanner.textContent = pricing.symbol;
    }
    
    // Update section title to be universal
    const sectionTitle = document.querySelector('#pricing .section-title');
    if (sectionTitle) {
        sectionTitle.textContent = 'Simple Pricing';
    }
    
    // Update pricing banner text to be universal
    const pricingBannerText = document.querySelector('.pricing-banner-content p');
    if (pricingBannerText) {
        pricingBannerText.textContent = 'Join thousands of businesses worldwide using PingBook';
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Set up dynamic pricing
    const userCountry = detectUserLocation();
    updatePricing(userCountry);
    
    // Add region selector functionality
    addRegionSelector();
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
    
    // Scroll to hero section smoothly, positioning form in the center
    const heroSection = document.querySelector('.hero');
    heroSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
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
