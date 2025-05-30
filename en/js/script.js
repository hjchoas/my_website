// DOM Elements
const fabButton = document.querySelector('.fab-button');
const fabMenu = document.querySelector('.fab-menu');
const fabOptions = document.querySelector('.fab-options');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('#contactForm');
const marketSearch = document.querySelector('#marketSearch');
const marketSort = document.querySelector('#marketSort');
const marketReset = document.querySelector('#marketReset');
const gameCards = document.querySelectorAll('.game-card');
const buttons = document.querySelectorAll('.btn');

// FAB Menu Toggle
fabButton.addEventListener('click', () => {
    fabMenu.classList.toggle('active');
});

// Close FAB Menu when clicking outside
document.addEventListener('click', (e) => {
    if (!fabMenu.contains(e.target)) {
        fabMenu.classList.remove('active');
    }
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgressBar.style.width = `${scrolled}%`;
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Coin Drop Effect
function createCoin(x, y) {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.innerHTML = '💰';
    coin.style.position = 'fixed';
    coin.style.left = x + 'px';
    coin.style.top = y + 'px';
    coin.style.pointerEvents = 'none';
    document.body.appendChild(coin);

    // Remove the coin after animation ends
    coin.addEventListener('animationend', () => {
        coin.remove();
    });
}

// Listen globally for pointerdown (mouse/touch only)
document.addEventListener('pointerdown', function (e) {
    // Only trigger for left mouse button or touch
    if (e.pointerType !== 'mouse' && e.pointerType !== 'touch') return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Only on interactive elements
    const interactive = e.target.closest('.btn, .game-card, .fab-option, .listing-card, .contact-card, .blog-card');
    if (!interactive) return;

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createCoin(e.clientX, e.clientY);
        }, i * 100);
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Don't scroll if href is just "#"
        
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return; // Don't scroll if target doesn't exist
        
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
    });
});

// Initialize Bootstrap Tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition) {
            element.style.visibility = 'visible';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const message = contactForm.querySelector('#message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        
        setTimeout(() => {
            // Show success message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-3';
            alertDiv.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
            contactForm.appendChild(alertDiv);
            
            // Reset form
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }, 2000);
    });
}

// Market Filters
if (marketSearch && marketSort && marketReset) {
    // Search functionality
    marketSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const listings = document.querySelectorAll('.listing-card');
        
        listings.forEach(listing => {
            const title = listing.querySelector('.card-title').textContent.toLowerCase();
            const seller = listing.querySelector('.seller-name').textContent.toLowerCase();
            const price = listing.querySelector('.price').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || seller.includes(searchTerm) || price.includes(searchTerm)) {
                listing.style.display = 'block';
            } else {
                listing.style.display = 'none';
            }
        });
    });
    
    // Sort functionality
    marketSort.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        const listingsContainer = document.querySelector('.listings-container');
        const listings = Array.from(document.querySelectorAll('.listing-card'));
        
        listings.sort((a, b) => {
            if (sortBy === 'price-asc') {
                return parseFloat(a.querySelector('.price').textContent) - parseFloat(b.querySelector('.price').textContent);
            } else if (sortBy === 'price-desc') {
                return parseFloat(b.querySelector('.price').textContent) - parseFloat(a.querySelector('.price').textContent);
            } else if (sortBy === 'rating') {
                return parseFloat(b.querySelector('.seller-rating').textContent) - parseFloat(a.querySelector('.seller-rating').textContent);
            }
        });
        
        listings.forEach(listing => listingsContainer.appendChild(listing));
    });
    
    // Reset filters
    marketReset.addEventListener('click', () => {
        marketSearch.value = '';
        marketSort.value = 'price-asc';
        const listings = document.querySelectorAll('.listing-card');
        listings.forEach(listing => listing.style.display = 'block');
    });
}

// Game Cards Hover Effect
gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Button Ripple Effect
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Discord Widget Toggle
const discordWidget = document.querySelector('.discord-widget');
const discordWidgetToggle = document.querySelector('.discord-widget-toggle');

if (discordWidgetToggle) {
    discordWidgetToggle.addEventListener('click', () => {
        discordWidget.classList.toggle('active');
    });

    // Close widget when clicking outside
    document.addEventListener('click', (e) => {
        if (!discordWidget.contains(e.target)) {
            discordWidget.classList.remove('active');
        }
    });
} 