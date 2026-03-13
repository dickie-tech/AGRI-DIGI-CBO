/* =============================================
   AGRI-DIGI — js/main.js
   ============================================= */

/* ---- 1. STICKY HEADER ---- */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  updateActiveLink();
  toggleBackToTop();
});

/* ---- 2. MOBILE NAV TOGGLE ---- */
const burger  = document.getElementById('nav-burger');
const navMenu = document.getElementById('nav-menu');

function toggleMenu() {
  const isOpen = navMenu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
  navMenu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}

/* Close menu when clicking outside */
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) closeMenu();
});

/* ---- 3. SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- 4. ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

/* ---- 5. SCROLL-TRIGGERED ANIMATIONS (replaces AOS-style) ---- */
const animatedEls = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animatedEls.forEach(el => observer.observe(el));

/* ---- 6. MARKET TICKER (duplicate items for seamless loop) ---- */
const ticker = document.getElementById('ticker');
if (ticker) {
  const clone = ticker.innerHTML;
  ticker.innerHTML += clone; // duplicate for continuous scroll
}

/* ---- 7. BACK TO TOP ---- */
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle('visible', window.scrollY > 400);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- 8. FEATURE CARD INTERACTIVE HIGHLIGHT ---- */
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    featureCards.forEach(c => c.style.opacity = c === card ? '1' : '0.75');
  });
  card.addEventListener('mouseleave', () => {
    featureCards.forEach(c => c.style.opacity = '1');
  });
});

/* ---- 9. HERO PARALLAX (subtle) ---- */
const heroBg = document.querySelector('.hero__bg');

window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrolled = window.scrollY;
  heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
}, { passive: true });

/* ---- INIT ---- */
updateActiveLink();
toggleBackToTop();

console.log('🌱 Agri-Digi — loaded successfully');
