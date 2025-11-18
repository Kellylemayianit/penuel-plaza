// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Sticky booking bar for mobile
    const stickyBar = document.getElementById('stickyBar');
    const hero = document.querySelector('.hero');
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    
    if (window.innerWidth <= 768) {
        if (window.scrollY > heroBottom) {
            stickyBar.classList.add('visible');
        } else {
            stickyBar.classList.remove('visible');
        }
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Set minimum date for check-in (today)
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const today = new Date().toISOString().split('T')[0];

checkInInput.setAttribute('min', today);
checkOutInput.setAttribute('min', today);

// Update check-out minimum date based on check-in
checkInInput.addEventListener('change', () => {
    const checkInDate = new Date(checkInInput.value);
    checkInDate.setDate(checkInDate.getDate() + 1);
    const minCheckOut = checkInDate.toISOString().split('T')[0];
    checkOutInput.setAttribute('min', minCheckOut);
    
    // Clear check-out if it's before new minimum
    if (checkOutInput.value && checkOutInput.value < minCheckOut) {
        checkOutInput.value = '';
    }
});

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        checkIn: checkInInput.value,
        checkOut: checkOutInput.value,
        guests: document.getElementById('guests').value,
        package: document.getElementById('package').value
    };

    // Calculate nights
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    // In a real application, this would send data to a server
    alert(`Booking Request:\n\nCheck-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}\nNights: ${nights}\nGuests: ${formData.guests}\nPackage: ${formData.package}\n\nThank you! We'll contact you shortly to confirm your reservation.`);
    
    // Optional: Redirect to booking confirmation page
    // window.location.href = '/booking-confirmation';
});

// Room filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const roomCards = document.querySelectorAll('.room-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter room cards
        roomCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Room CTA buttons
const roomCTAButtons = document.querySelectorAll('.room-cta');
roomCTAButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Scroll to booking form
        const bookingFormCard = document.querySelector('.booking-form-card');
        const offset = 100;
        const targetPosition = bookingFormCard.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Add a highlight effect to the form
        bookingFormCard.style.animation = 'pulse 1s ease';
        setTimeout(() => {
            bookingFormCard.style.animation = '';
        }, 1000);
    });
});

// Sticky booking bar CTA
const stickyBookBtn = document.querySelector('.sticky-book-btn');
if (stickyBookBtn) {
    stickyBookBtn.addEventListener('click', () => {
        const bookingFormCard = document.querySelector('.booking-form-card');
        const offset = 100;
        const targetPosition = bookingFormCard.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}

// Dynamic viewing count (simulated)
function updateViewingCount() {
    const viewingCountElement = document.getElementById('viewingCount');
    const min = 5;
    const max = 15;
    const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
    viewingCountElement.textContent = randomCount;
}

// Update viewing count every 10 seconds
updateViewingCount();
setInterval(updateViewingCount, 10000);

// Dynamic rooms left count (simulated)
function updateRoomsLeft() {
    const roomsLeftElement = document.getElementById('roomsLeft');
    const min = 3;
    const max = 8;
    const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
    roomsLeftElement.textContent = randomCount;
}

// Update rooms left every 15 seconds
updateRoomsLeft();
setInterval(updateRoomsLeft, 15000);

// Scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const highlights = document.querySelector('.highlights');
        const offset = 80;
        const targetPosition = highlights.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // In a real application, this would send data to a server
        alert(`Thank you for subscribing!\n\nWe'll send exclusive offers to: ${email}`);
        emailInput.value = '';
    });
}

// Animate elements on scroll (Intersection Observer)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.highlight-item, .room-card, .activity-card, .facility-item, .perfect-card, .location-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// Gallery lightbox (simple implementation)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    if (!img.complete) {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        });
    }
});

// Performance: Lazy loading for images below fold
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Console welcome message
console.log('%c🏨 Welcome to Penuel Plaza Hotel', 'color: #d4a574; font-size: 20px; font-weight: bold;');
console.log('%cBook direct and save 15%!', 'color: #2c5530; font-size: 14px;');

// Debug mode (remove in production)
const DEBUG = false;
if (DEBUG) {
    console.log('Booking form:', bookingForm);
    console.log('Room cards:', roomCards);
    console.log('Filter buttons:', filterButtons);
}