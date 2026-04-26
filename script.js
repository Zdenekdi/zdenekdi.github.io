import translations from './translations.js';

// Language switching
let currentLang = localStorage.getItem('preferredLang') || 'cs';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // Check if it's an input or textarea
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    document.documentElement.lang = lang;
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });
});

// Navigation scroll effect
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Only handle internal section links
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // For demonstration purposes - in production, send to backend
    console.log('Form submitted:', { name, email, message });

    // Show success message
    alert('Děkuji za zprávu! Brzy se vám ozvu.');

    // Reset form
    contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(el => {
    observer.observe(el);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(el => {
    observer.observe(el);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Add loading effect for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.transition = 'opacity 0.5s ease-in';

    // If image is already loaded (cached), show it immediately
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        // Otherwise hide it and wait for load event
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });

        // Safety timeout to ensure visibility even if event is missed
        setTimeout(() => {
            img.style.opacity = '1';
        }, 2000);
    }
});
