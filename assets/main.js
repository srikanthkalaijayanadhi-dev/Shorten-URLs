// Global Utilities
document.addEventListener('DOMContentLoaded', () => {
  // 1. Handle Dark Mode Logic
  const themeToggle = document.getElementById('theme-toggle');
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      themeToggle.innerText = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
    });
  }

  // 2. Setup standard navigation UI (Auth Removed)
  const authLinks = document.getElementById('auth-links');
  if (authLinks) {
    authLinks.innerHTML = `
      <a href="dashboard.html" class="text-secondary" style="margin-right:1rem">Dashboard</a>
      <a href="admin.html" class="btn btn-primary">Admin Panel</a>
    `;
  }
});

function generateShortCode() {
  return Math.random().toString(36).substr(2, 6);
}
