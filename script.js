/* ===== Particle Canvas ===== */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX; this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,92,231,${this.opacity})`; ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108,92,231,${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ===== Navbar Scroll ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== Mobile Menu ===== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* ===== Typing Effect ===== */
const typedEl = document.getElementById('typed-name');
if (typedEl) {
  const name = 'Satyam Shukla';
  let i = 0;
  function typeWriter() {
    if (i < name.length) {
      typedEl.textContent += name.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  setTimeout(typeWriter, 800);
}

/* ===== Counter Animation ===== */
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    if (counter.dataset.animated) return;
    const target = +counter.dataset.count;
    const duration = 2000;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      counter.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else { counter.textContent = target; counter.dataset.animated = 'true'; }
    }
    requestAnimationFrame(step);
  });
}

/* ===== Skill Bars Animation ===== */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    if (bar.dataset.animated) return;
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      bar.style.width = bar.dataset.width;
      bar.dataset.animated = 'true';
    }
  });
}

/* ===== Intersection Observer for animations ===== */
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('about')) animateCounters();
    }
  });
}, observerOptions);

document.querySelectorAll('.about, .skills, .expertise, .skill-card, .expertise-card').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

/* ===== Animate on Scroll CSS injection ===== */
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .animate-on-scroll.visible { opacity: 1; transform: translateY(0); }
  .skill-card.animate-on-scroll { transition-delay: calc(var(--i, 0) * 0.1s); }
`;
document.head.appendChild(style);
document.querySelectorAll('.skill-card').forEach((card, i) => card.style.setProperty('--i', i));
document.querySelectorAll('.expertise-card').forEach((card, i) => card.style.setProperty('--i', i));

/* ===== Contact Form ===== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00cec9, #00b894)';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
