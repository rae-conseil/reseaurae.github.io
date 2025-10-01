// Navigation mobile toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navbarHeight = 70;
        const elementPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Active navigation highlight based on scroll
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 100; // Offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Call once on load
}

// Modal functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Basic validation
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;
    const errors = [];

    requiredFields.forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const value = formData.get(fieldName);
        
        if (!value || value.trim() === '') {
            isValid = false;
            errors.push(`Le champ ${getFieldLabel(fieldName)} est obligatoire.`);
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    // Email validation
    const email = formData.get('email');
    if (email && !isValidEmail(email)) {
        isValid = false;
        errors.push('Veuillez entrer une adresse email valide.');
        form.querySelector('[name="email"]').classList.add('error');
    }

    if (!isValid) {
        showFormErrors(errors);
        return;
    }

    // Simulate form submission
    simulateFormSubmission(formData)
        .then(() => {
            showModal('confirmationModal');
            form.reset();
            clearFormErrors();
        })
        .catch((error) => {
            showFormErrors(['Une erreur est survenue lors de l\'envoi. Veuillez réessayer.']);
        });
}

function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Nom',
        'email': 'Email',
        'message': 'Message'
    };
    return labels[fieldName] || fieldName;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormErrors(errors) {
    // Remove existing error messages
    clearFormErrors();
    
    const form = document.getElementById('contactForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-errors';
    errorDiv.innerHTML = `
        <div style="background: rgba(192, 21, 47, 0.1); border: 1px solid rgba(192, 21, 47, 0.3); color: #C0152F; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
            <strong>Erreurs de validation :</strong>
            <ul style="margin: 8px 0 0 20px;">
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Scroll to form to show errors
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearFormErrors() {
    const existingErrors = document.querySelector('.form-errors');
    if (existingErrors) {
        existingErrors.remove();
    }
    
    // Remove error styling from fields
    document.querySelectorAll('.form-control.error').forEach(field => {
        field.classList.remove('error');
    });
}

function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // In a real application, you would send the data to your server
            console.log('Form data submitted:', Object.fromEntries(formData));
            resolve();
        }, 1000);
    });
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Call once on load
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.service-card, .advantage-item, .testimonial, .method-step, .pricing-item');
    animateElements.forEach(el => observer.observe(el));
}

// Form field enhancements
function initFormEnhancements() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        // Add focus/blur effects
        control.addEventListener('focus', () => {
            control.parentElement.classList.add('form-group-focused');
        });
        
        control.addEventListener('blur', () => {
            control.parentElement.classList.remove('form-group-focused');
            if (control.value.trim() !== '') {
                control.parentElement.classList.add('form-group-filled');
            } else {
                control.parentElement.classList.remove('form-group-filled');
            }
        });

        // Check if field is pre-filled
        if (control.value.trim() !== '') {
            control.parentElement.classList.add('form-group-filled');
        }
    });
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes modals
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('.modal.visible');
            if (visibleModal) {
                const modalId = visibleModal.getAttribute('id');
                hideModal(modalId);
            }
        }
        
        // Enter key on nav toggle activates it
        if (e.key === 'Enter' || e.key === ' ') {
            const navToggle = document.getElementById('navToggle');
            if (document.activeElement === navToggle) {
                e.preventDefault();
                navToggle.click();
            }
        }
    });
}

// Handle service selection in contact form
function initServiceSelection() {
    const serviceSelect = document.getElementById('service');
    
    // Pre-fill service if coming from a specific section
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedService = urlParams.get('service');
    
    if (preSelectedService && serviceSelect) {
        serviceSelect.value = preSelectedService;
    }
}

// Add click handlers for service cards to pre-select service in contact form
function initServiceCardInteraction() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceTitle = card.querySelector('h3').textContent.toLowerCase();
            let serviceValue = '';
            
            switch(serviceTitle) {
                case 'conseil en organisation':
                    serviceValue = 'conseil-organisation';
                    break;
                case 'conseil stratégique':
                    serviceValue = 'conseil-strategique';
                    break;
                case 'gestion & management':
                    serviceValue = 'gestion-management';
                    break;
                case 'soutien professionnel':
                    serviceValue = 'soutien-professionnel';
                    break;
            }
            
            if (serviceValue) {
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    serviceSelect.value = serviceValue;
                }
            }
            
            scrollToSection('contact');
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initSmoothScrolling();
    initNavigationHighlight();
    initContactForm();
    initNavbarScroll();
    initScrollAnimations();
    initFormEnhancements();
    initKeyboardNavigation();
    initServiceSelection();
    initServiceCardInteraction();
    
    console.log('RAÉ website initialized successfully');
});

// Make functions globally available
window.scrollToSection = scrollToSection;
window.showModal = showModal;
window.hideModal = hideModal;

// Add CSS for form error states
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-control.error {
        border-color: #C0152F !important;
        box-shadow: 0 0 0 3px rgba(192, 21, 47, 0.1) !important;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .form-group-focused .form-label {
        color: var(--rae-blue-primary);
    }
    
    .nav-link.active {
        color: var(--rae-blue-primary);
        font-weight: var(--font-weight-semibold);
    }
    
    .service-card {
        cursor: pointer;
    }
    
    .service-card:hover h3 {
        color: var(--rae-blue-hover);
    }
`;

document.head.appendChild(errorStyles);