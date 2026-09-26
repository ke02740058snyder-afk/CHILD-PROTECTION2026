/* =========================================
   CHILD PROTECTION - MAIN JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. QUICK EXIT BUTTON (CRITICAL SAFETY FEATURE) ---
    const quickExitBtn = document.getElementById('quick-exit-btn');
    
    if (quickExitBtn) {
        quickExitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace the current page in the browser history with a neutral site (like Google or Weather)
            // This ensures if the user clicks the "Back" button, they won't return to this site.
            window.location.replace('https://www.google.com');
            
            // Optional: Attempt to clear history (works in some modern browsers)
            if (window.history.length > 1) {
                window.history.go(-window.history.length);
            }
        });
    }

    // --- 2. MOBILE NAVIGATION TOGGLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Update aria-expanded for accessibility (screen readers)
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked (for smooth scrolling on mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- 3. SCROLL SPY (Highlight active nav link based on scroll position) ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function activateNavLink() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for sticky header
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active-link');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active-link');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Run once on load

    // --- 4. SMOOTH SCROLLING FOR ANCHOR LINKS ---
    // (Enhances the CSS scroll-behavior: smooth for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. FADE-IN ANIMATION ON SCROLL ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, .action-section, .contact-card').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });

});