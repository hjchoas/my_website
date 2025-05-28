// Enhanced website functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Ensure body is scrollable on load
    document.body.classList.remove('no-scroll');
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-item, .blog-item, .video-feature, .footer-column').forEach(el => {
        observer.observe(el);
    });
    
    // Add active class to current navigation link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active-link');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active-link');
            }
        });
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Neon Glow Effect on Hover
    const neonElements = document.querySelectorAll('.cta-button, .logo a, .nav-links a');
    neonElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.textShadow = '0 0 10px rgba(0, 255, 157, 0.8), 0 0 20px rgba(0, 255, 157, 0.4)';
        });
        element.addEventListener('mouseout', () => {
            element.style.textShadow = '';
        });
    });

    // Market Item Hover Effects
    const marketItems = document.querySelectorAll('.market-item');
    marketItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 0 20px rgba(0, 255, 157, 0.4)';
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    });

    // Price Animation
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.addEventListener('mouseover', () => {
            price.style.color = '#00ffff';
            price.style.transform = 'scale(1.1)';
        });
        price.addEventListener('mouseout', () => {
            price.style.color = '';
            price.style.transform = '';
        });
    });

    // Game Icon Animation
    const gameIcons = document.querySelectorAll('.game-icon');
    gameIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = '';
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.service-item, .blog-item, .guide-step, .market-item');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial setup for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run reveal on scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // Add particle effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0, 255, 157, ${Math.random() * 0.5});
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: float ${5 + Math.random() * 10}s linear infinite;
            `;
            hero.appendChild(particle);
        }
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        typeWriter();
    }

    // Market Section Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const serverSelect = document.querySelector('.server-select');
    const sortSelect = document.querySelector('.sort-select');
    const listingItems = document.querySelectorAll('.listing-item');

    // Tab switching
    if (tabButtons && tabButtons.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                updateListings(button.textContent);
            });
        });
    }

    // Server filtering
    if (serverSelect) {
        serverSelect.addEventListener('change', () => {
            console.log('Server selected:', serverSelect.value);
        });
    }

    // Sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const listings = Array.from(listingItems || []);
            const sortBy = sortSelect.value;
            listings.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
                const ratingA = parseFloat(a.querySelector('.rating').textContent.split(' ')[0]);
                const ratingB = parseFloat(b.querySelector('.rating').textContent.split(' ')[0]);
                const deliveryA = parseInt(a.querySelector('.delivery-time').textContent.split('-')[0]);
                const deliveryB = parseInt(b.querySelector('.delivery-time').textContent.split('-')[0]);
                switch(sortBy) {
                    case 'Price: Low to High': return priceA - priceB;
                    case 'Price: High to Low': return priceB - priceA;
                    case 'Seller Rating': return ratingB - ratingA;
                    case 'Delivery Time': return deliveryA - deliveryB;
                    default: return 0;
                }
            });
            const marketListings = document.querySelector('.market-listings');
            listings.forEach(listing => marketListings && marketListings.appendChild(listing));
        });
    }

    // Update listings based on selected game
    function updateListings(game) {
        const amounts = {
            'World of Warcraft': ['100,000 Gold', '500,000 Gold', '1,000,000 Gold'],
            'New World': ['100,000 Coins', '500,000 Coins', '1,000,000 Coins'],
            'Path of Exile': ['100 Exalted', '500 Exalted', '1,000 Exalted']
        };

        const prices = {
            'World of Warcraft': ['$50.00', '$230.00', '$450.00'],
            'New World': ['$45.00', '$210.00', '$400.00'],
            'Path of Exile': ['$60.00', '$280.00', '$550.00']
        };

        const pricePerUnit = {
            'World of Warcraft': ['$0.50/1K', '$0.46/1K', '$0.45/1K'],
            'New World': ['$0.45/1K', '$0.42/1K', '$0.40/1K'],
            'Path of Exile': ['$0.60/1K', '$0.56/1K', '$0.55/1K']
        };

        listingItems.forEach((item, index) => {
            item.querySelector('.currency-amount').textContent = amounts[game][index];
            item.querySelector('.price').textContent = prices[game][index];
            item.querySelector('.price-per-unit').textContent = pricePerUnit[game][index];
        });
    }

    // Buy button functionality
    if (document.querySelectorAll('.buy-button').length) {
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', () => {
                const listing = button.closest('.listing-item');
                const amount = listing.querySelector('.currency-amount').textContent;
                const price = listing.querySelector('.price').textContent;
                const seller = listing.querySelector('.seller-name').textContent;
                console.log(`Buying ${amount} from ${seller} for ${price}`);
            });
        });
    }

    // Cart button functionality
    if (document.querySelectorAll('.cart-button').length) {
        document.querySelectorAll('.cart-button').forEach(button => {
            button.addEventListener('click', () => {
                const listing = button.closest('.listing-item');
                const amount = listing.querySelector('.currency-amount').textContent;
                const price = listing.querySelector('.price').textContent;
                console.log(`Added ${amount} to cart for ${price}`);
                button.textContent = 'Added to Cart';
                button.style.background = '#00ff9d';
                button.style.color = '#0a0a0a';
                setTimeout(() => {
                    button.textContent = 'Add to Cart';
                    button.style.background = 'transparent';
                    button.style.color = '#00ff9d';
                }, 2000);
            });
        });
    }

    // Coin Rain Effect
    function createCoin(x, y) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.innerHTML = '💰';
        coin.style.left = x + 'px';
        coin.style.top = y + 'px';
        document.body.appendChild(coin);
        
        // Remove the coin after animation ends
        coin.addEventListener('animationend', () => {
            coin.remove();
        });
    }

    // Add click event listener
    document.addEventListener('click', (e) => {
        // Create 3 coins for each click
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createCoin(e.clientX, e.clientY);
            }, i * 100);
        }
    });

    // DOM Elements
    const fabButton = document.getElementById('fabButton');
    const fabMenu = document.querySelector('.fab-menu');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const navbar = document.querySelector('.navbar');

    // FAB Menu Toggle
    if (fabButton && fabMenu) {
        fabButton.addEventListener('click', () => {
            fabMenu.classList.toggle('active');
            fabButton.classList.toggle('active');
        });
        // Close FAB menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabMenu.contains(e.target)) {
                fabMenu.classList.remove('active');
                fabButton.classList.remove('active');
            }
        });
    }

    // Scroll Progress Bar
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgressBar.style.width = `${scrolled}%`;
        });
    }

    // Navbar Scroll Effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate__animated');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
            
            if (isVisible) {
                element.style.visibility = 'visible';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('پیام شما با موفقیت ارسال شد!');
            contactForm.reset();
        });
    }

    // Market filters functionality
    const marketFilters = document.querySelector('.market-filters');
    if (marketFilters) {
        const searchInput = marketFilters.querySelector('input[type="text"]');
        const sortSelect = marketFilters.querySelector('select:first-of-type');
        const gameSelect = marketFilters.querySelector('select:last-of-type');
        const filterButton = marketFilters.querySelector('.btn-outline-primary');
        const resetButton = marketFilters.querySelector('.btn-primary');

        // Add event listeners for filters
        [searchInput, sortSelect, gameSelect].forEach(element => {
            element.addEventListener('change', () => {
                // Add your filter logic here
                console.log('Filters updated');
            });
        });

        // Reset filters
        resetButton.addEventListener('click', () => {
            searchInput.value = '';
            sortSelect.selectedIndex = 0;
            gameSelect.selectedIndex = 0;
            // Add your reset logic here
            console.log('Filters reset');
        });
    }

    // Add hover effect to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Discord Widget Toggle
    const discordWidget = document.querySelector('.discord-widget');
    const discordToggle = document.querySelector('.discord-widget-toggle');

    if (discordWidget && discordToggle) {
        discordToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            discordWidget.classList.toggle('active');
        });

        // Close widget when clicking outside
        document.addEventListener('click', (e) => {
            if (!discordWidget.contains(e.target)) {
                discordWidget.classList.remove('active');
            }
        });
    }
});