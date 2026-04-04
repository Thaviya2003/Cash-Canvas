document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navLogo = document.getElementById('nav-logo');
    
    // Define your image paths here
    const darkLogo = 'assets/logo-white.png';
    const lightLogo = 'assets/logo-black.png';

    // Function to update logo based on theme
    const updateLogo = (isLight) => {
        if (isLight) {
            navLogo.src = lightLogo;
        } else {
            navLogo.src = darkLogo;
        }
    };
    
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.checked = true;
        updateLogo(true);
    } else {
        updateLogo(false);
    }
    
    // Listen for toggle changes
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            updateLogo(true);
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            updateLogo(false);
        }
    });

    // --- 2. Scroll Reveal Animations ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- 3. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});