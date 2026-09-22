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

  // Scrollytelling Chapter Tracker & Reveal Observer
  const chapterBlocks = document.querySelectorAll('.chapter-block');
  const trackerItems = document.querySelectorAll('.tracker-item');

  if (chapterBlocks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -25% 0px',
      threshold: [0.15, 0.4]
    };

    const chapterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const currentId = entry.target.id;
          trackerItems.forEach((item) => {
            const isMatch = item.getAttribute('data-target') === currentId;
            item.classList.toggle('is-active', isMatch);
          });
        }
      });
    }, observerOptions);

    chapterBlocks.forEach((block) => chapterObserver.observe(block));

    if (chapterBlocks[0]) {
      chapterBlocks[0].classList.add('is-visible');
    }

    trackerItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Interactive MoonCycle Scrubber
  const moonScrubber = document.getElementById('moon-scrubber');
  const phaseButtons = document.querySelectorAll('.phase-btn');
  const moonPreviewStage = document.getElementById('moon-preview-stage');
  const phaseStatusBadge = document.getElementById('phase-status-badge');
  const phaseThreatLevel = document.getElementById('phase-threat-level');
  const phaseDisplayTitle = document.getElementById('phase-display-title');
  const phaseDisplayDesc = document.getElementById('phase-display-desc');
  const phasePerksList = document.getElementById('phase-perks-list');
  const moonPulseRing = document.getElementById('moon-pulse-ring');

  const moonPhaseData = {
    crescent: {
      badge: 'CALM NIGHT',
      threat: 'Threat: Standard',
      title: 'Standard Vanilla Night',
      desc: 'Normal Minecraft monster spawning and drop rates. Ideal for peaceful exploration, building projects, and mining without heightened danger.',
      perks: [
        'Standard vanilla mob health & damage',
        'PvP disabled outside sanctioned arenas',
        'Regular drop rates and mining yields'
      ],
      badgeBg: 'rgba(0, 248, 255, 0.15)',
      badgeColor: '#00f8ff',
      badgeBorder: 'rgba(0, 248, 255, 0.4)',
      threatColor: '#949ba4',
      ringBorder: 'rgba(0, 248, 255, 0.5)',
      perkSpanBg: 'rgba(0, 248, 255, 0.15)',
      perkSpanColor: '#00f8ff'
    },
    full: {
      badge: 'FULL MOON PHASE',
      threat: 'Threat: High (Buffed Mobs)',
      title: 'Enhanced Mob Ferocity',
      desc: 'Monsters spawn with randomized potion buffs (Speed, Strength, Resistance) and increased aggro radius. Caves and unlit surfaces become lethal.',
      perks: [
        'Mobs spawn with armor & potion buffs',
        'Increased rare mob drop chances',
        'PvP voluntary / standard rules'
      ],
      badgeBg: 'rgba(255, 209, 102, 0.15)',
      badgeColor: '#ffd166',
      badgeBorder: 'rgba(255, 209, 102, 0.45)',
      threatColor: '#ffd166',
      ringBorder: 'rgba(255, 209, 102, 0.65)',
      perkSpanBg: 'rgba(255, 209, 102, 0.18)',
      perkSpanColor: '#ffd166'
    },
    blood: {
      badge: 'BLOOD MOON RISES',
      threat: 'Threat: EXTREME (World PvP + 2x Drops)',
      title: 'The Hunt Begins',
      desc: 'The sky turns blood red. Global wilderness PvP is enabled for the entire night. Mobs hit with maximum fury, but all mob drops and XP are doubled.',
      perks: [
        'Wilderness PvP unlocked across the map',
        '2x Monster drops and experience orbs',
        'Unique blood moon drops & trophies'
      ],
      badgeBg: 'rgba(255, 71, 87, 0.16)',
      badgeColor: '#ff4757',
      badgeBorder: 'rgba(255, 71, 87, 0.45)',
      threatColor: '#ff4757',
      ringBorder: 'rgba(255, 71, 87, 0.7)',
      perkSpanBg: 'rgba(255, 71, 87, 0.18)',
      perkSpanColor: '#ff4757'
    }
  };

  if (moonScrubber && phaseButtons.length > 0) {
    phaseButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const phaseKey = btn.getAttribute('data-phase');
        const phaseInfo = moonPhaseData[phaseKey];
        if (!phaseInfo) return;

        phaseButtons.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        if (moonPreviewStage) {
          moonPreviewStage.style.opacity = '0.35';
          setTimeout(() => {
            if (phaseStatusBadge) {
              phaseStatusBadge.textContent = phaseInfo.badge;
              phaseStatusBadge.style.background = phaseInfo.badgeBg;
              phaseStatusBadge.style.color = phaseInfo.badgeColor;
              phaseStatusBadge.style.borderColor = phaseInfo.badgeBorder;
            }
            if (phaseThreatLevel) {
              phaseThreatLevel.textContent = phaseInfo.threat;
              phaseThreatLevel.style.color = phaseInfo.threatColor;
            }
            if (phaseDisplayTitle) {
              phaseDisplayTitle.textContent = phaseInfo.title;
            }
            if (phaseDisplayDesc) {
              phaseDisplayDesc.textContent = phaseInfo.desc;
            }
            if (phasePerksList) {
              phasePerksList.innerHTML = phaseInfo.perks
                .map((perk) => `<li><span style="background:${phaseInfo.perkSpanBg};color:${phaseInfo.perkSpanColor}">✓</span> ${perk}</li>`)
                .join('');
            }
            if (moonPulseRing) {
              moonPulseRing.style.borderColor = phaseInfo.ringBorder;
            }
            moonPreviewStage.style.opacity = '1';
          }, 140);
        }
      });
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
