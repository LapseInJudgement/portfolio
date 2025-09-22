// Initialize Lucide icons
lucide.createIcons();

// Navigation

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');



    // scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        
        navToggle.classList.toggle('active');

        // hamburger menu animation
        const hamburgers = navToggle.querySelectorAll('.hamburger');
        hamburgers.forEach((hamburger, index) => {
            if (navMobile.classList.contains('active')) {
                if (index === 0) hamburger.style.transform = 'rotate(45deg) translateY(6px)';
                if (index === 1) hamburger.style.opacity = '0';
                if (index === 2) hamburger.style.transform = 'rotate(-45deg) translateY(-6px)';
            } else {
                hamburger.style.transform ='none';
                hamburger.style.opacity = '1';
            }
        });
    });

// Handle smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMobile.classList.remove('active');
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(hamburger => {
                    hamburger.style.transform = 'none';
                    hamburger.style.opacity = '1';
                });
            }
        });
    });

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Simulate form submission (replace with actual form handling)
            console.log('Form submitted:', data);
            alert('Thank you for your message! I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.project-card, .highlight-card, .skill-category, .contact-form-container, .contact-info');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add typing effect to hero title (optional enhancement)
    
        
    window.addEventListener("DOMContentLoaded", () => {
    const heroTitle = document.querySelector(".hero-title");
    const originalText = heroTitle.textContent.trim();
    let index = 0;

    heroTitle.textContent = "";

    function typeText() {
    if (index < originalText.length) {
      heroTitle.textContent += originalText.charAt(index);
      index++;
      setTimeout(typeText, 100);
    }
  }

      setTimeout(typeText, 1000);
    });

    // Add parallax effect to hero background (optional enhancement)
    const heroBackground = document.querySelector('.hero-background img');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Utility function to handle external links
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Add loading animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Handle resize events
window.addEventListener('resize', function() {
    const navMobile = document.getElementById('navMobile');
    if (window.innerWidth >= 768) {
        navMobile.classList.remove('active');
        const hamburgers = document.querySelectorAll('.hamburger');
        hamburgers.forEach(hamburger => {
            hamburger.style.transform = 'none';
            hamburger.style.opacity = '1';
        });
    }
});