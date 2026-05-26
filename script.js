// ============================================================
// DOCUMENT READY - Initialize all functions
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('NAREN Archive Initialized');
    
    // Initialize all features
    initSmoothScrolling();
    initNavbar();
    initFadeOnScroll();
    initButtonListeners();
    initMobileMenu();
    initCardExpansion();
});

// ============================================================
// SMOOTH SCROLLING - for navigation links and buttons
// ============================================================

function initSmoothScrolling() {
    // Select all links that navigate to sections
    const links = document.querySelectorAll('a[href^="#"], button[data-target]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section
            const targetId = this.getAttribute('href') || this.getAttribute('data-target');
            
            // Check if target exists
            if (!targetId || targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            // Scroll to target with offset for fixed navbar
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeNavbarMenu();
            }
        });
    });
}

// ============================================================
// NAVBAR - Scroll effects and active link highlighting
// ============================================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll listener for navbar styling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink(navLinks);
    });
}

// Function to update active navigation link
function updateActiveNavLink(navLinks) {
    let currentSection = '';
    
    // Define sections to track
    const sections = [
        { id: 'hero', link: 'a[href="#subject"]' },
        { id: 'subject', link: 'a[href="#subject"]' },
        { id: 'cast', link: 'a[href="#cast"]' },
        { id: 'memorial', link: 'a[href="#memorial"]' }
    ];
    
    // Check which section is currently in view
    sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            if (window.scrollY >= elementTop - 200 && window.scrollY < elementTop + elementHeight - 200) {
                currentSection = section.id;
            }
        }
    });
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section link
    if (currentSection === 'hero') {
        // No active link for hero section
    } else if (currentSection === 'subject') {
        document.querySelector('a[href="#subject"]')?.classList.add('active');
    } else if (currentSection === 'cast') {
        document.querySelector('a[href="#cast"]')?.classList.add('active');
    } else if (currentSection === 'memorial') {
        document.querySelector('a[href="#memorial"]')?.classList.add('active');
    }
}

// ============================================================
// FADE-IN ON SCROLL - Trigger animations as elements come into view
// ============================================================

function initFadeOnScroll() {
    // Select all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    // Create Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // Add in-view class when element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Stop observing this element after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================================
// BUTTON LISTENERS - Handle navigation button clicks
// ============================================================

function initButtonListeners() {
    // Select all buttons with data-target attribute
    const buttons = document.querySelectorAll('button[data-target]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            if (targetId) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smooth scroll to target
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================================
// MOBILE MENU - Toggle and close functionality
// ============================================================

function initMobileMenu() {
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeNavbarMenu();
        });
    });
}

// Function to close the mobile navbar menu
function closeNavbarMenu() {
    const navbarToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close menu if it's open
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarToggle.click();
    }
}

// ============================================================
// CAST CARD EXPANSION - Click to show relationship info
// ============================================================

function initCardExpansion() {
    const castCards = document.querySelectorAll('.cast-card');
    
    castCards.forEach(card => {
        // Click on card to expand
        card.addEventListener('click', function(e) {
            // Don't expand if clicking the close button
            if (e.target.closest('.close-btn')) {
                return;
            }
            
            // Close any other expanded cards
            document.querySelectorAll('.cast-card.expanded').forEach(expandedCard => {
                if (expandedCard !== card) {
                    expandedCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            this.classList.toggle('expanded');
        });
        
        // Close button functionality
        const closeBtn = card.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('expanded');
            });
        }
    });
    
    // Close expanded card when clicking outside
    document.addEventListener('click', function(e) {
        // Don't close if clicking inside a card
        if (!e.target.closest('.cast-card')) {
            document.querySelectorAll('.cast-card.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });
}

// ============================================================
// LOADING ANIMATION (Optional) - Remove after page loads
// ============================================================

window.addEventListener('load', function() {
    // Page fully loaded
    console.log('NAREN Archive - Page fully loaded');
    
    // Optional: Add loading animation here
    // You can fade out a loading screen or trigger animations
});

// ============================================================
// PERFORMANCE - Debounce scroll events for better performance
// ============================================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

// Optional: Apply debounce to scroll-heavy operations if needed
// window.addEventListener('scroll', debounce(function() {
//     // Heavy scroll operations here
// }, 100));

// ============================================================
// DYNAMIC YEAR - Update copyright year automatically (if needed)
// ============================================================

function updateCopyrightYear() {
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Update on load
updateCopyrightYear();

// ============================================================
// CONSOLE MESSAGE - Fun Easter egg
// ============================================================

console.log('%c🎬 NAREN ARCHIVES 🎬', 'color: #e8e8e8; font-size: 16px; font-weight: bold;');
console.log('%cSome memories refuse to disappear.', 'color: #888888; font-size: 12px; font-style: italic;');
console.log('%c- - - - - - - - - - - - - - - - - - - -', 'color: #555555;');
console.log('%cIf you are reading this, the story never really ended.', 'color: #b8b8b8; font-size: 12px;');
