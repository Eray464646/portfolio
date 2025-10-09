// ===== DARK MODE =====
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Dark Mode beim Laden prüfen
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark');
}

// Dark Mode Toggle
darkModeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('darkMode', body.classList.contains('dark'));
});

// ===== NAVIGATION SCROLL EFFECT =====
const nav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn?.classList.add('show');
  } else {
    scrollTopBtn?.classList.remove('show');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll('.stat-number');
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  };

  updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      animateCounter(entry.target);
      entry.target.classList.add('counted');
    }
  });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const progress = entry.target.getAttribute('data-progress');
      entry.target.style.width = progress + '%';
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // ESC to close modals/lightboxes
  if (e.key === 'Escape') {
    const lightbox = document.querySelector('.lightbox-overlay.active');
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===== FORM VALIDATION (Contact Page) =====
const contactForm = document.querySelector('.contact-form form');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  
  // Hier könntest du die Daten an ein Backend senden
  console.log('Form submitted:', Object.fromEntries(formData));
  
  // Success Message (Beispiel)
  alert('Vielen Dank für deine Nachricht! Ich werde mich bald bei dir melden.');
  contactForm.reset();
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

console.log('Portfolio loaded successfully! 🚀');