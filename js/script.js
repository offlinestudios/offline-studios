// Offline Studios - Main JavaScript File

// ===== Scroll-triggered Animations =====
function initScrollAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    portfolioItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== Smooth Scroll for Navigation Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Navigation Background on Scroll =====
function initNavScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}



// ===== Add stagger animation to stat cards =====
window.addEventListener('load', () => {
    const statCards = document.querySelectorAll('.stat-card-small');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// ===== Hero Visibility Counter Animation =====
function initHeroCounter() {
    const heroCounter = document.querySelector('.stat-number');
    const heroSection = document.querySelector('.hero');
    
    if (!heroCounter || !heroSection) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroCounter.classList.contains('counted')) {
                heroCounter.classList.add('counted');
                
                let current = 0;
                const target = 112;
                const increment = target / 50; // 50 steps
                const stepTime = 30; // 30ms per step = ~1.5s total
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        heroCounter.textContent = '+' + target + '%';
                        clearInterval(timer);
                    } else {
                        heroCounter.textContent = '+' + Math.floor(current) + '%';
                    }
                }, stepTime);
            }
        });
    }, observerOptions);
    
    observer.observe(heroSection);
}

// ===== Process Number Counter Animation =====
function initProcessCounters() {
    const processNumbers = document.querySelectorAll('.process-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 30; // 30 frames for smooth animation
        const duration = 1000; // 1 second
        const stepTime = duration / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = String(target).padStart(2, '0');
                clearInterval(timer);
            } else {
                element.textContent = String(Math.floor(current)).padStart(2, '0');
            }
        }, stepTime);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const targetNumber = parseInt(entry.target.textContent);
                animateCounter(entry.target, targetNumber);
            }
        });
    }, observerOptions);
    
    processNumbers.forEach(number => {
        observer.observe(number);
    });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    // Toggle menu
    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    // Open/close menu
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Update DOMContentLoaded to include counter animation
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScroll();
    initNavScroll();
    initHeroCounter();
    initProcessCounters();
    initMobileMenu();
    
    console.log('Offline Studios website loaded successfully!');
});
