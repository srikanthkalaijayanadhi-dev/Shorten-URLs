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

  // 3. Load dynamic ads
  loadDynamicAds().catch(err => console.error("Ads failed load", err));
});

async function loadDynamicAds() {
  if (!window.supabaseClient) return;
  const { data } = await window.supabaseClient.from('settings').select('*');
  if (data) {
      data.forEach(setting => {
          const key = setting.key;
          const val = setting.value;
          if (!val || val.trim() === '') return;

          if (key === 'head_script') {
              const range = document.createRange();
              range.selectNode(document.head);
              const frag = range.createContextualFragment(val);
              document.head.appendChild(frag);
          }
          if (key === 'banner_top') {
              const el = document.getElementById('ad-zone-top');
              if (el) el.innerHTML = val;
          }
          if (key === 'banner_bottom') {
              const el = document.getElementById('ad-zone-bottom');
              if (el) el.innerHTML = val;
          }
          if (key === 'ad_square') {
              const el = document.getElementById('ad-zone-square');
              if (el) el.innerHTML = val;
          }
      });
  }
}

function generateShortCode() {
  return Math.random().toString(36).substr(2, 6);
}
