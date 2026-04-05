// Global Utilities
document.addEventListener('DOMContentLoaded', () => {

  // 1. Dark Mode
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.innerText = 'Light Mode';
    if (themeToggleMobile) themeToggleMobile.innerText = 'Light Mode';
  }

  function toggleTheme() {
    document.body.classList.toggle('dark');
    const label = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
    if (themeToggle) themeToggle.innerText = label;
    if (themeToggleMobile) themeToggleMobile.innerText = label;
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // 2. Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close menu when a link inside it is clicked
    mobileMenu.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 3. Navigation links - always open (no auth)
  const authLinks = document.getElementById('auth-links');
  if (authLinks) {
    authLinks.innerHTML = `
      <a href="dashboard.html" class="btn btn-secondary" style="font-size:0.9rem;padding:0.6rem 1rem;">Dashboard</a>
      <a href="admin.html" class="btn btn-primary" style="font-size:0.9rem;padding:0.6rem 1rem;">Admin Panel</a>
    `;
  }
});

function generateShortCode() {
  return Math.random().toString(36).substr(2, 7);
}
