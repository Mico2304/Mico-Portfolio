const sectionsMap = {
    home: document.getElementById('home'),
    about: document.getElementById('about'),
    skills: document.getElementById('skills'),
    projects: document.getElementById('projects'),
    achievements: document.getElementById('achievements'),
    contact: document.getElementById('contact')
};
const navLinks = document.querySelectorAll('.buttons a[data-nav]');
const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const logo = document.getElementById('logoHome');
const headerEl = document.querySelector('.header');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Close mobile menu
function closeMenu() {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Update header shadow on scroll
function updateHeaderState() {
    if (window.scrollY > 20) {
        headerEl.classList.add('scrolled');
    } else {
        headerEl.classList.remove('scrolled');
    }
}

// Navigation clicks (smooth scroll + active state)
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const id = link.getAttribute('data-nav');
        if (id && sectionsMap[id]) {
            sectionsMap[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            closeMenu();
        }
    });
});

// Logo click
logo.addEventListener('click', () => {
    sectionsMap.home.scrollIntoView({ behavior: 'smooth' });
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-nav="home"]').classList.add('active');
    closeMenu();
});

// Get in touch button
document.querySelectorAll('.get-in-touch').forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        sectionsMap.contact.scrollIntoView({ behavior: 'smooth' });
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('[data-nav="contact"]').classList.add('active');
        closeMenu();
    });
});

// Intersection Observer for active nav on scroll
const observer = new IntersectionObserver(entries => {
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
Object.values(sectionsMap).forEach(s => { if (s) observer.observe(s); });

// Hamburger toggle
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// Contact form
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const msg = document.getElementById('formMessage').value.trim();
    if (!name || !email || !msg) {
        feedback.style.display = 'block';
        feedback.textContent = '❌ Please fill all fields.';
        feedback.style.background = '#ffe6e5';
        feedback.style.color = '#b3413a';
        setTimeout(() => feedback.style.display = 'none', 3000);
        return;
    }
    if (!email.includes('@')) {
        feedback.style.display = 'block';
        feedback.textContent = '⚠️ Valid email required.';
        feedback.style.background = '#ffe6e5';
        setTimeout(() => feedback.style.display = 'none', 2500);
        return;
    }
    feedback.style.display = 'block';
    feedback.textContent = `✨ Thanks ${name}! Message sent. ✨`;
    feedback.style.background = '#d9f0d4';
    feedback.style.color = '#246b1a';
    form.reset();
    setTimeout(() => feedback.style.display = 'none', 4000);
});

// Download resume simulation
document.getElementById('downloadResumeBtn')?.addEventListener('click', () => alert('📄 Resume download simulation.'));

// Scroll to top button
window.addEventListener('scroll', () => {
    updateHeaderState();
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-nav="home"]').classList.add('active');
});
updateHeaderState();

// Theme toggle (dark/light mode)
function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}
themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    setTheme(isDark);
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme(true);
} else {
    setTheme(false);
}