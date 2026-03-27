document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Navbar on Scroll ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize state on load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon between bars and x
        if (navMenu.classList.contains('active')) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-xmark');
        } else {
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown > .nav-link)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        });
    });

    // --- 3. Dropdown Accessible Toggle (Mobile + Keyboard) ---
    const dropdownToggleLinks = document.querySelectorAll('.dropdown > .nav-link');
    dropdownToggleLinks.forEach(toggleLink => {
        toggleLink.addEventListener('click', (e) => {
            // Prevent only if the href is "#"
            if (toggleLink.getAttribute('href') === '#') {
                e.preventDefault();
            }
            const parentDropdown = toggleLink.parentElement;
            
            // On mobile or touch devices, cleanly toggle the active class
            if (window.innerWidth <= 768 || window.matchMedia("(hover: none)").matches) {
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== parentDropdown) {
                        d.classList.remove('active');
                        d.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
                    }
                });
                
                parentDropdown.classList.toggle('active');
                const isExpanded = parentDropdown.classList.contains('active');
                toggleLink.setAttribute('aria-expanded', isExpanded);
            }
        });

        // Keyboard Support for opening dropdowns
        toggleLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const parentDropdown = toggleLink.parentElement;
                parentDropdown.classList.toggle('active');
                toggleLink.setAttribute('aria-expanded', parentDropdown.classList.contains('active'));
            }
        });
    });

    // Close any active dropdowns if user clicks outside of them
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => {
                d.classList.remove('active');
                d.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // --- 4. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
