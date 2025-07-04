// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
    });
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                showMessage('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            const email = this.querySelector('input[type="email"]').value;
            if (!isValidEmail(email)) {
                showMessage('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Show loading message
            showMessage('Gönderiliyor...', 'loading');
            
            // Submit form via fetch
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showMessage('Mesajınız gönderildi!', 'success');
                    this.reset();
                } else {
                    showMessage('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
                }
            })
            .catch(error => {
                showMessage('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            });
        });
    }
    
    // Setup scroll animations
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
    
    const animateElements = document.querySelectorAll('.service-card, .ceo-card, .announcement-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Enhanced hover effects
    const cards = document.querySelectorAll('.service-card, .ceo-card, .announcement-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    console.log('MotiveX - Intelligence website loaded successfully!');
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.success-overlay');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    
    let icon = '';
    let bgColor = '';
    
    if (type === 'success') {
        icon = '✓';
        bgColor = '#22c55e';
    } else if (type === 'loading') {
        icon = '⏳';
        bgColor = '#3b82f6';
    } else {
        icon = '✗';
        bgColor = '#ef4444';
    }
    
    overlay.innerHTML = `
        <div class="success-content">
            <div class="success-icon" style="background: linear-gradient(135deg, ${bgColor}, ${bgColor}dd); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white; font-weight: bold; margin: 0 auto 1.5rem; animation: ${type === 'success' ? 'bounce' : type === 'loading' ? 'spin' : 'shake'} 0.6s ease-out;">
                ${icon}
            </div>
            <div class="success-text" style="font-size: 1.2rem; font-weight: 600; color: #333;">${text}</div>
        </div>
    `;
    
    // Set overlay styles
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    // Set content styles
    const content = overlay.querySelector('.success-content');
    content.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 3rem;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(overlay);
    
    // Auto remove after 3 seconds (except loading)
    if (type !== 'loading') {
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
                setTimeout(() => overlay.remove(), 300);
            }
        }, 3000);
    }
    
    // Click to close
    overlay.addEventListener('click', function() {
        overlay.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => overlay.remove(), 300);
    });
}

// Add dynamic styles for mobile menu and animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: scale(0.8) translateY(-20px); opacity: 0; }
        to { transform: scale(1) translateY(0); opacity: 1; }
    }
    
    @keyframes bounce {
        0% { transform: scale(0.3); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @media (max-width: 768px) {
        .nav-menu.mobile-active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, 
                rgba(30, 144, 255, 0.95) 0%, 
                rgba(0, 191, 255, 0.90) 50%,
                rgba(64, 224, 208, 0.95) 100%);
            backdrop-filter: blur(20px);
            border-radius: 0 0 20px 20px;
            padding: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
        }
        
        .nav-menu.mobile-active li {
            margin: 0.5rem 0;
        }
        
        .nav-menu.mobile-active .nav-link {
            text-align: center;
            padding: 1rem;
            border-radius: 10px;
            background: rgba(255,255,255,0.1);
        }
    }
`;
document.head.appendChild(style);
