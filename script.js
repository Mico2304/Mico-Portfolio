
// DOM elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-list a');
const logo = document.getElementById('logo');
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTop');
const sections = {
home: document.getElementById('home'),
about: document.getElementById('about'),
skills: document.getElementById('skills'),
projects: document.getElementById('projects'),
achievements: document.getElementById('achievements'),
contact: document.getElementById('contact')
};

// Close mobile menu
function closeMenu() {
if (navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
}
}

// Toggle hamburger
hamburger.addEventListener('click', (e) => {
e.stopPropagation();
navMenu.classList.toggle('active');
if (navMenu.classList.contains('active')) {
    hamburger.innerHTML = '<i class="fas fa-times"></i>';
} else {
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
}
});

// Close when clicking outside
document.addEventListener('click', (e) => {
if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
}
});

// Smooth scroll + active nav
navLinks.forEach(link => {
link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('data-nav');
    if (targetId && sections[targetId]) {
        sections[targetId].scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        closeMenu();
    }
});
});

// Logo click
logo.addEventListener('click', () => {
sections.home.scrollIntoView({ behavior: 'smooth' });
navLinks.forEach(l => l.classList.remove('active'));
document.querySelector('[data-nav="home"]').classList.add('active');
closeMenu();
});

// Get in touch button
document.querySelectorAll('.get-in-touch').forEach(btn => {
btn.addEventListener('click', (e) => {
    e.preventDefault();
    sections.contact.scrollIntoView({ behavior: 'smooth' });
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-nav="contact"]').classList.add('active');
    closeMenu();
});
});

// Active nav on scroll
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-nav') === id) link.classList.add('active');
        });
    }
});
}, { threshold: 0.4 });
Object.values(sections).forEach(s => { if (s) observer.observe(s); });

// Scroll header shadow
window.addEventListener('scroll', () => {
if (window.scrollY > 20) header.classList.add('scrolled');
else header.classList.remove('scrolled');
if (window.scrollY > 400) scrollTopBtn.classList.add('show');
else scrollTopBtn.classList.remove('show');
});

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
navLinks.forEach(l => l.classList.remove('active'));
document.querySelector('[data-nav="home"]').classList.add('active');
});

// Dark mode toggle
function setTheme(isDark) {
if (isDark) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
}
}
themeToggle.addEventListener('click', () => {
const isDark = !document.body.classList.contains('dark-mode');
setTheme(isDark);
});
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark');

// Contact form submission
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
form.addEventListener('submit', (e) => {
e.preventDefault();
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const msg = document.getElementById('message').value.trim();
if (!name || !email || !msg) {
    feedback.style.display = 'block';
    feedback.textContent = 'Please fill all fields.';
    feedback.style.background = '#ffe6e5';
    feedback.style.color = '#b3413a';
    setTimeout(() => feedback.style.display = 'none', 3000);
    return;
}
if (!email.includes('@')) {
    feedback.style.display = 'block';
    feedback.textContent = 'Valid email required.';
    feedback.style.background = '#ffe6e5';
    setTimeout(() => feedback.style.display = 'none', 2500);
    return;
}
feedback.style.display = 'block';
feedback.textContent = `Thanks ${name}! Message sent.`;
feedback.style.background = '#d9f0d4';
feedback.style.color = '#246b1a';
form.reset();
setTimeout(() => feedback.style.display = 'none', 4000);
});

// Download resume button
document.getElementById('downloadResume')?.addEventListener('click', () => {
alert('Resume download simulation. You can upload a real PDF later.');
});
