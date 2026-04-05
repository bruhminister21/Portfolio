// ===== MATRIX RAIN =====
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\;:,.?!@#$%^&*';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 14, 10, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff41';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

// ===== TYPEWRITER EFFECT =====
const roles = [
  'Software Engineer',
  'Backend Developer',
  'Problem Solver',
  'Java Developer',
  'API Builder',
  'DSA Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typeEl.textContent = '> ' + current.substring(0, charIndex--);
  } else {
    typeEl.textContent = '> ' + current.substring(0, charIndex++);
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}

typeWriter();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ===== FADE IN ON SCROLL =====
const fadeElements = document.querySelectorAll(
  '.about-card, .stat-box, .timeline-item, .project-card, .skill-group, .skill-bar-item, .edu-card, .contact-btn, .contact-terminal'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeElements.forEach(el => observer.observe(el));

// ===== SKILL BAR ANIMATION =====
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute('data-width');
        setTimeout(() => {
          target.style.width = width + '%';
        }, 200);
        barObserver.unobserve(target);
      }
    });
  },
  { threshold: 0.3 }
);

barFills.forEach(bar => barObserver.observe(bar));

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    link.style.textShadow = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#00ff41';
      link.style.textShadow = '0 0 8px #00ff41';
    }
  });
});

// ===== TERMINAL HOVER EFFECT ON PROJECT CARDS =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s ease';
  });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c⚡ Hey Recruiter!', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Dev Nag\'s portfolio. Feel free to look around! 👨‍💻', 'color: #c9d1d9; font-size: 14px;');
console.log('%cContact: nagdev2004@gmail.com', 'color: #00ff41; font-size: 12px;');
