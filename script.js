
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

const typingText = document.getElementById("typing-text");

const roles = [
  "B.Tech IT Student",
  "Web Developer",
  "Aspiring Software Developer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  typingText.textContent = deleting
    ? currentRole.substring(0, charIndex - 1)
    : currentRole.substring(0, charIndex + 1);

  charIndex += deleting ? -1 : 1;

  let delay = deleting ? 45 : 90;

  if (!deleting && charIndex === currentRole.length) {
    deleting = true;
    delay = 1200;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

if (typingText) {
  typeEffect();
}

/* ===== ACTIVE NAVBAR SECTION ===== */
const navLinksList = document.querySelectorAll('nav a[href^="#"]');

const pageSections = document.querySelectorAll(
    'section[id], main[id]'
);

function updateActiveNav() {
    let currentSection = "";

    pageSections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

navLinksList.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);



/* ===== CREATE BUBBLES ===== */
(() => {
  const container = document.getElementById("bubble-container");
  console.log("Bubble container:", container);

  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = "true";

  const count = window.innerWidth < 600 ? 18 : 35;

  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("span");
    const size = Math.random() * 35 + 10;
    const duration = Math.random() * 12 + 10;

    bubble.className = "bubble";
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${-Math.random() * duration}s`;

    container.appendChild(bubble);
  }
})();

/* ===== MOUSE CURSOR PARTICLE EFFECT ===== */
(() => {
  // Touch devices par effect nahi chalega
  if (window.matchMedia("(hover: none)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.id = "cursor-particles";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];
  let lastParticleTime = 0;

  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  document.addEventListener("mousemove", (event) => {
    const now = performance.now();
    if (now - lastParticleTime < 18) return;
    lastParticleTime = now;

    for (let i = 0; i < 2; i++) {
      particles.push({
        x: event.clientX + (Math.random() - 0.5) * 8,
        y: event.clientY + (Math.random() - 0.5) * 8,
        size: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        life: 1,
        decay: Math.random() * 0.025 + 0.015
      });
    }

    if (particles.length > 140) {
      particles.splice(0, particles.length - 140);
    }
  });

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles = particles.filter(p => p.life > 0);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.life})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#00d4ff";
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  }

  animate();
})();
console.log("Cursor particle code loaded");

console.log("Canvas:", document.getElementById("cursor-particles"));

/* ===== LIVE DIGITAL CLOCK ===== */
(() => {
  const timeElement = document.getElementById("live-time");
  const dateElement = document.getElementById("live-date");

  if (!timeElement || !dateElement) return;

  function updateClock() {
    const now = new Date();

    timeElement.textContent = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(now);

    dateElement.textContent = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(now);
  }

  updateClock();
  setInterval(updateClock, 1000);
})();

/* ===== SCROLL REVEAL ===== */
(() => {
  const elements = document.querySelectorAll(
    "section, .project-card, .skill-card, .education-card, .certificate-card"
  );

  elements.forEach(element => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => element.classList.add("visible"));
  }
})();

/* ===== ANIMATED COUNTER ===== */
(() => {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  const animateCounter = (counter) => {
    if (counter.dataset.animated === "true") return;
    counter.dataset.animated = "true";

    const target = Number(counter.dataset.target);
    if (!Number.isFinite(target) || target < 0) {
      counter.textContent = "0";
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      counter.textContent = Math.floor(target * easedProgress).toLocaleString("en-IN");

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString("en-IN");
      }
    }

    requestAnimationFrame(updateCounter);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }
})();
