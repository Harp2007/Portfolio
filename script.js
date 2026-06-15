document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // THEME MANAGEMENT (Light / Dark Mode)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Retrieve initial theme preference from localStorage or fallback to system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set theme based on saved preference or fallback
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });

    // ==========================================================================
    // MOBILE NAVIGATION
    // ==========================================================================
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu state
    mobileToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside of navigation header
    document.addEventListener('click', (event) => {
        const header = document.getElementById('header');
        if (!header.contains(event.target)) {
            navMenu.classList.remove('open');
        }
    });

    // ==========================================================================
    // NAVIGATION LINK HIGHLIGHTING ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');

    const highlightNavLink = () => {
        let scrollY = window.pageYOffset;
        const headerHeight = 70; // Nav bar height

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 20; // Slight offset for earlier highlight
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);

    // ==========================================================================
    // CONTACT FORM VALIDATION & MOCK SUBMISSION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const nameVal = document.getElementById('name').value.trim();
        const emailVal = document.getElementById('email').value.trim();
        const messageVal = document.getElementById('message').value.trim();

        // Simple validation
        if (!nameVal || !emailVal || !messageVal) {
            showFeedback('Please fill in all required fields.', 'error');
            return;
        }

        if (!validateEmail(emailVal)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }

        // Mock submission progress
        const submitBtn = document.getElementById('form-submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            // Success response
            showFeedback(`Thank you, ${nameVal}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;

            // Clear feedback after 5 seconds
            setTimeout(() => {
                formFeedback.className = 'form-feedback';
                formFeedback.textContent = '';
            }, 5000);
        }, 1200);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
    }
});
