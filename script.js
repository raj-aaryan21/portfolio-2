// =====================================
// AARYAN RAJPAL PORTFOLIO - INTERACTIONS
// =====================================

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Close mobile menu after selecting a link
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// -------------------------------------
// Scroll reveal animation
// -------------------------------------
const revealItems = document.querySelectorAll(
  ".section-title, .section-subtitle, .about-text p, .education-card, .skill, .certificate, .project-card, .contact-form"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");

  // Small stagger so elements appear one after another.
  item.style.transitionDelay = `${Math.min((index % 6) * 0.08, 0.4)}s`;
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -50px 0px"
});

revealItems.forEach(item => revealObserver.observe(item));

// -------------------------------------
// Skill bar animation + percentage count
// -------------------------------------
const fills = document.querySelectorAll(".fill");

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const fill = entry.target;
    const target = parseInt(fill.dataset.width, 10);
    const percentage = fill.querySelector("b");

    fill.style.width = fill.dataset.width;

    if (percentage) {
      let current = 0;
      const duration = 1100;
      const start = performance.now();

      function count(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.round(target * progress);
        percentage.textContent = `${current}%`;

        if (progress < 1) {
          requestAnimationFrame(count);
        }
      }

      requestAnimationFrame(count);
    }

    observer.unobserve(fill);
  });
}, { threshold: 0.4 });

fills.forEach(fill => skillObserver.observe(fill));

// -------------------------------------
// Back-to-top button
// -------------------------------------
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 450) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// -------------------------------------
// Contact form interaction
// -------------------------------------
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  status.textContent = "Thank you! Your message has been prepared successfully.";
  status.style.animation = "fadeUp .5s ease both";

  form.reset();
});

// -------------------------------------
// Active navigation link while scrolling
// -------------------------------------
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));

      const active = document.querySelector(
        `.nav a[href="#${entry.target.id}"]`
      );

      if (active) active.classList.add("active");
    }
  });
}, {
  threshold: 0.35
});

sections.forEach(section => activeObserver.observe(section));
