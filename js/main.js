document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Page Load Progress Bar ---
    const progressBar = document.getElementById('page-progress');
    if (progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress >= 95) {
                clearInterval(interval);
                progress = 95;
            }
            progressBar.style.width = progress + '%';
        }, 150);

        window.addEventListener('load', () => {
            clearInterval(interval);
            progressBar.style.width = '100%';
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => progressBar.remove(), 400);
            }, 300);
        });
    }

    // --- 2. Sticky Navbar on Scroll ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // --- 3. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            toggleIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            toggleIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown > .nav-link)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggleIcon.classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // --- 4. Dropdown Toggle ---
    const dropdownToggleLinks = document.querySelectorAll('.dropdown > .nav-link');
    dropdownToggleLinks.forEach(toggleLink => {
        toggleLink.addEventListener('click', (e) => {
            if (toggleLink.getAttribute('href') === '#') e.preventDefault();
            const parentDropdown = toggleLink.parentElement;
            if (window.innerWidth <= 768 || window.matchMedia("(hover: none)").matches) {
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== parentDropdown) {
                        d.classList.remove('active');
                        d.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
                    }
                });
                parentDropdown.classList.toggle('active');
                toggleLink.setAttribute('aria-expanded', parentDropdown.classList.contains('active'));
            }
        });
        toggleLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const parentDropdown = toggleLink.parentElement;
                parentDropdown.classList.toggle('active');
                toggleLink.setAttribute('aria-expanded', parentDropdown.classList.contains('active'));
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => {
                d.classList.remove('active');
                d.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // --- 5. Scroll Reveal (supports reveal, reveal-left, reveal-right) ---
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right'];
    const allRevealElements = document.querySelectorAll(revealClasses.join(', '));

    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    allRevealElements.forEach(el => revealObserver.observe(el));

    // --- 6. Animated Number Counters ---
    const counterElements = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();
        el.classList.add('animated');

        const step = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString('ar-MA') + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString('ar-MA') + suffix;
            }
        };
        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    // --- 7. 3D Mouse Tilt Effect on Cards ---
    const tiltCards = document.querySelectorAll('.service-card, .highlight-card, .news-card, .stat-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });

    // --- 8. Scroll Indicator Hide After First Scroll ---
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.4s ease';
            } else {
                scrollIndicator.style.opacity = '';
            }
        }, { once: false });
    }

    // --- 9. Smooth Page Transition (fade-out on link click) ---
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // Only internal pages, not anchors or external links
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel') && href.endsWith('.html')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transform = 'translateY(-10px)';
                document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                setTimeout(() => window.location.href = href, 300);
            });
        }
    });

    // Fade-in on page load
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(10px)';
    document.body.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        });
    });
});
