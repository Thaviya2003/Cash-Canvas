document.addEventListener("DOMContentLoaded", () => {
    
    const navItems = document.querySelectorAll('.nav-item');
    const logoLink = document.querySelector('.logo-link');
    const spotlight = document.querySelector('.nav-spotlight');
    const page = document.body.getAttribute("data-page");

    function moveSpotlight(element) {
        const rect = element.getBoundingClientRect();
        const navRect = element.closest('.navbar').getBoundingClientRect();
        
        spotlight.style.opacity = '1';
        spotlight.style.width = `${rect.width}px`;
        spotlight.style.left = `${rect.left - navRect.left}px`;
        
        navItems.forEach(item => item.classList.remove('active'));
        if (element.parentElement.classList.contains('nav-item')) {
            element.parentElement.classList.add('active');
        }
    }

    // === INITIAL STATE CONTROL ===

    if (logoLink) {
        setTimeout(() => moveSpotlight(logoLink), 200);
    }

    // Move to correct page tab AFTER load (smooth effect)
    setTimeout(() => {
        if (page === "about") {
            const aboutLink = document.querySelector('a[href="about-us.html"]');
            if (aboutLink) moveSpotlight(aboutLink);
        }
        if (page === "shop") {
            const shopLink = document.querySelector('a[href="shop.html"]');
            if (shopLink) moveSpotlight(shopLink);
        }
    }, 1000);

    // Click behavior (unchanged)
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', (e) => {

            if (item.classList.contains('has-dropdown')) {
                e.preventDefault();
            }

            moveSpotlight(link);
        });
    });

    logoLink.addEventListener('click', () => {
        moveSpotlight(logoLink);
    });

    // Scroll animations (UNCHANGED)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slide-up, .fade-in').forEach(el => observer.observe(el));

    // Resize fix
    window.addEventListener('resize', () => {
        const active = document.querySelector('.nav-item.active .nav-link');
        if (active) {
            moveSpotlight(active);
        } else {
            moveSpotlight(logoLink);
        }
    });
});