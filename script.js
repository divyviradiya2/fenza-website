document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-mobile');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        toggleMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  }

  const mooncycleCard = document.getElementById('mooncycle-card');
  if (mooncycleCard) {
    mooncycleCard.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      window.open('https://fenza.fun/mooncycle/', '_blank', 'noopener,noreferrer');
    });
  }

  const fetchDiscordCounts = async () => {
    const onlineEl = document.getElementById('live-online-count');
    const memberEl = document.getElementById('live-member-count');
    if (!onlineEl || !memberEl) return;

    try {
      const res = await fetch('https://discord.com/api/v9/invites/ZeBFhWhctB?with_counts=true');
      if (!res.ok) return;
      const data = await res.json();
      if (typeof data.approximate_presence_count === 'number') {
        onlineEl.textContent = data.approximate_presence_count.toLocaleString();
      }
      if (typeof data.approximate_member_count === 'number') {
        memberEl.textContent = data.approximate_member_count.toLocaleString();
      }
    } catch {
    }
  };

  fetchDiscordCounts();
});
