document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-mobile');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle('is-open');
      if (navbar) navbar.classList.toggle('menu-open', isOpen);
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
      if (navMenu.classList.contains('is-open') && navbar && !navbar.contains(e.target)) {
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

  const ipCopyBtn = document.getElementById('ip-copy-btn');
  const ipCopyText = document.getElementById('ip-copy-text');
  if (ipCopyBtn && ipCopyText) {
    let copyTimer = null;
    ipCopyBtn.addEventListener('click', async () => {
      let copied = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText('play.fenza.fun');
          copied = true;
        }
      } catch (_) {
      }
      if (!copied) {
        try {
          const ta = document.createElement('textarea');
          ta.value = 'play.fenza.fun';
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        } catch (_) {
        }
      }
      ipCopyBtn.classList.add('is-copied');
      ipCopyText.textContent = 'Copied';
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        ipCopyBtn.classList.remove('is-copied');
        ipCopyText.textContent = 'Copy IP';
      }, 1400);
    });

    ipCopyBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ipCopyBtn.click();
      }
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

  const initSakura = () => {
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();

    const isMobile = window.innerWidth < 600;
    const petalCount = isMobile ? 16 : 28;
    const petals = [];

    const colors = [
      'rgba(255, 182, 193, 0.85)',
      'rgba(255, 117, 160, 0.78)',
      'rgba(244, 114, 182, 0.72)',
      'rgba(251, 207, 232, 0.9)',
      'rgba(255, 192, 203, 0.8)'
    ];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = Math.random() * 0.03 + 0.01;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.angle) * 0.6;
        this.angle += this.angleSpeed;
        this.flip += this.flipSpeed;

        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(1, Math.cos(this.flip));

        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.45, this.size * 0.85, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resize, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    });
  };

  initSakura();
});
