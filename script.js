/**
 * TEMUR MUHAMMADALIYEV — PERSONAL PORTFOLIO
 * Motion, UI/UX Interactions & Dynamic Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const liveClock = document.getElementById('liveClock');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressRingCircle = document.querySelector('.progress-ring-circle');
  
  // Custom Cursor Elements
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  
  // Modals & Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');
  const previewBtns = document.querySelectorAll('.preview-project-btn');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  // Interactive Playground Elements
  const sliderRadius = document.getElementById('sliderRadius');
  const radiusVal = document.getElementById('radiusVal');
  const sliderShadow = document.getElementById('sliderShadow');
  const shadowVal = document.getElementById('shadowVal');
  const colorPickBtns = document.querySelectorAll('.color-pick-btn');
  const btnGlowToggle = document.getElementById('btnGlowToggle');
  const btnResetLab = document.getElementById('btnResetLab');
  const demoCard = document.getElementById('demoCard');
  const demoCardBtn = document.getElementById('demoCardBtn');
  const liveCssCode = document.getElementById('liveCssCode');
  const btnCopyCss = document.getElementById('btnCopyCss');

  // Contact & Form Elements
  const contactForm = document.getElementById('contactForm');
  const btnCopyPhone = document.getElementById('btnCopyPhone');
  const contactPhoneLink = document.getElementById('contactPhoneLink');

  /* -------------------------------------------------------------
     2. SMOOTH CUSTOM CURSOR MOTION
  ------------------------------------------------------------- */
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;

    if (cursorDot) {
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }
  });

  // Smooth lag for outer cursor ring
  function animateCursor() {
    if (isMoving && cursorOutline) {
      outlineX += (mouseX - outlineX) * 0.16;
      outlineY += (mouseY - outlineY) * 0.16;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add hover state to interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, select, textarea, .card, .filter-btn');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* -------------------------------------------------------------
     3. LIVE CLOCK (QUVA / FERGANA — UZBEKISTAN UTC+5)
  ------------------------------------------------------------- */
  function updateLiveClock() {
    if (!liveClock) return;
    try {
      const now = new Date();
      // Format to Asia/Tashkent
      const options = {
        timeZone: 'Asia/Tashkent',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const formatter = new Intl.DateTimeFormat([], options);
      liveClock.textContent = formatter.format(now);
    } catch {
      const now = new Date();
      liveClock.textContent = now.toTimeString().split(' ')[0];
    }
  }
  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  /* -------------------------------------------------------------
     4. HEADER SCROLL & PROGRESS BAR & BACK-TO-TOP
  ------------------------------------------------------------- */
  const circumference = 2 * Math.PI * 20; // 125.66
  if (progressRingCircle) {
    progressRingCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRingCircle.style.strokeDashoffset = `${circumference}`;
  }

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = docHeight > 0 ? (scrollTop / docHeight) : 0;

    // Header Shrink Class
    if (scrollTop > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Top Progress Line
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercentage * 100}%`;
    }

    // Back to top button visibility and progress ring
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      if (progressRingCircle) {
        const offset = circumference - (scrollPercentage * circumference);
        progressRingCircle.style.strokeDashoffset = offset;
      }
    }

    // Active Navigation Highlight based on scroll position
    const sections = document.querySelectorAll('section[id]');
    let currentActiveId = '';
    sections.forEach((sec) => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollTop >= secTop && scrollTop < secTop + secHeight) {
        currentActiveId = sec.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to Top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* -------------------------------------------------------------
     5. THEME TOGGLE (LIGHT / DARK MIDNIGHT NAVY)
  ------------------------------------------------------------- */
  const savedTheme = localStorage.getItem('temur_portfolio_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('temur_portfolio_theme', nextTheme);
      showToast(nextTheme === 'dark' ? 'To\'q ko\'k (Midnight) rejimi yoqildi' : 'Yorqin oq rejim yoqildi');
    });
  }

  /* -------------------------------------------------------------
     6. MOBILE MENU TOGGLE
  ------------------------------------------------------------- */
  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggleBtn.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggleBtn.classList.remove('active');
      });
    });
  }

  /* -------------------------------------------------------------
     7. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  ------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, parseInt(delay, 10));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  /* -------------------------------------------------------------
     8. METRIC NUMBERS COUNTER ANIMATION
  ------------------------------------------------------------- */
  const metricCards = document.querySelectorAll('.hero-metrics');
  let metricsAnimated = false;

  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !metricsAnimated) {
        metricsAnimated = true;
        animateCounters();
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  metricCards.forEach((card) => metricsObserver.observe(card));

  function animateCounters() {
    const numberEls = document.querySelectorAll('.metric-number');
    numberEls.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);
        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(update);
    });
  }

  /* -------------------------------------------------------------
     9. 3D TILT EFFECT ON HERO PICTURE & CARDS
  ------------------------------------------------------------- */
  const visualWrapper = document.getElementById('heroVisualWrapper');
  const profileCard = document.querySelector('.profile-card');

  if (visualWrapper && profileCard) {
    visualWrapper.addEventListener('mousemove', (e) => {
      const rect = visualWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    visualWrapper.addEventListener('mouseleave', () => {
      profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  /* -------------------------------------------------------------
     10. PROJECT FILTERING
  ------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* -------------------------------------------------------------
     11. PROJECT DETAIL MODALS
  ------------------------------------------------------------- */
  previewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalBackdrops.forEach((modal) => modal.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  modalBackdrops.forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrops.forEach((modal) => modal.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  /* -------------------------------------------------------------
     12. INTERACTIVE VIBE LAB / KOD LABORATORIYASI
  ------------------------------------------------------------- */
  let currentRadius = 24;
  let currentShadowLevel = 2;
  let currentAccent = '#0a192f';
  let isGlowActive = true;

  const shadowLevels = {
    1: '0 4px 12px rgba(10, 25, 47, 0.05)',
    2: '0 15px 35px rgba(10, 25, 47, 0.12)',
    3: '0 25px 50px rgba(10, 25, 47, 0.22)',
    4: '0 35px 70px rgba(10, 25, 47, 0.32)'
  };

  const shadowNames = {
    1: 'Minimal',
    2: 'O\'rtacha (Tavsiya)',
    3: 'Chuqur',
    4: 'Maksimal'
  };

  function updateVibeLab() {
    if (!demoCard) return;

    // Apply Radius
    demoCard.style.borderRadius = `${currentRadius}px`;
    if (demoCardBtn) {
      demoCardBtn.style.borderRadius = `${Math.min(currentRadius, 9999)}px`;
    }

    // Apply Shadow & Glow
    let combinedShadow = shadowLevels[currentShadowLevel];
    if (isGlowActive) {
      combinedShadow += `, 0 0 30px ${currentAccent}40`;
    }
    demoCard.style.boxShadow = combinedShadow;

    // Apply Color
    if (demoCardBtn) {
      demoCardBtn.style.background = currentAccent;
    }

    // Update Text Labels
    if (radiusVal) radiusVal.textContent = `${currentRadius}px`;
    if (shadowVal) shadowVal.textContent = shadowNames[currentShadowLevel];

    // Update Output Code Snippet
    if (liveCssCode) {
      liveCssCode.innerHTML = `<code>.vibe-element {
  border-radius: ${currentRadius}px;
  box-shadow: ${shadowLevels[currentShadowLevel]}${isGlowActive ? `,\n              0 0 30px ${currentAccent}40` : ''};
  background: #ffffff;
  accent-color: ${currentAccent};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}</code>`;
    }
  }

  // Radius Slider Event
  if (sliderRadius) {
    sliderRadius.addEventListener('input', (e) => {
      currentRadius = e.target.value;
      updateVibeLab();
    });
  }

  // Shadow Slider Event
  if (sliderShadow) {
    sliderShadow.addEventListener('input', (e) => {
      currentShadowLevel = e.target.value;
      updateVibeLab();
    });
  }

  // Color Pickers
  colorPickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      colorPickBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentAccent = btn.getAttribute('data-color');
      updateVibeLab();
    });
  });

  // Glow Toggle
  if (btnGlowToggle) {
    btnGlowToggle.addEventListener('click', () => {
      isGlowActive = !isGlowActive;
      btnGlowToggle.classList.toggle('active', isGlowActive);
      const span = btnGlowToggle.querySelector('span');
      if (span) {
        span.textContent = isGlowActive ? 'Glow: Yoqilgan' : 'Glow: O\'chirilgan';
      }
      updateVibeLab();
    });
  }

  // Reset Button
  if (btnResetLab) {
    btnResetLab.addEventListener('click', () => {
      currentRadius = 24;
      currentShadowLevel = 2;
      currentAccent = '#0a192f';
      isGlowActive = true;

      if (sliderRadius) sliderRadius.value = 24;
      if (sliderShadow) sliderShadow.value = 2;
      colorPickBtns.forEach((b, idx) => b.classList.toggle('active', idx === 0));
      if (btnGlowToggle) {
        btnGlowToggle.classList.add('active');
        const span = btnGlowToggle.querySelector('span');
        if (span) span.textContent = 'Glow: Yoqilgan';
      }

      updateVibeLab();
      showToast('Laboratoriya asliga qaytarildi');
    });
  }

  // Copy CSS snippet
  if (btnCopyCss) {
    btnCopyCss.addEventListener('click', () => {
      const codeText = liveCssCode ? liveCssCode.innerText : '';
      navigator.clipboard.writeText(codeText).then(() => {
        showToast('CSS kodidan nusxa olindi!');
      }).catch(() => {
        showToast('Nusxa olishda xatolik bo\'ldi');
      });
    });
  }

  /* -------------------------------------------------------------
     13. FAQ ACCORDION INTERACTION
  ------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* -------------------------------------------------------------
     14. COPY PHONE NUMBER & TOAST
  ------------------------------------------------------------- */
  const phoneNumber = '+998905607374';
  const formattedPhone = '+998 90 560 73 74';

  if (btnCopyPhone) {
    btnCopyPhone.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(formattedPhone).then(() => {
        showToast('Telefon raqam nusxalandi: ' + formattedPhone);
      }).catch(() => {
        showToast('Raqam: ' + formattedPhone);
      });
    });
  }

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    clearTimeout(toastNotification.timer);
    toastNotification.timer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3500);
  }

  /* -------------------------------------------------------------
     15. CONTACT FORM VALIDATION & SUBMISSION
  ------------------------------------------------------------- */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const phoneInput = document.getElementById('userPhone');
      const messageInput = document.getElementById('userMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('has-error');
      }

      // Validate Phone
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        phoneInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      } else {
        phoneInput.closest('.form-group').classList.remove('has-error');
      }

      if (isValid) {
        const submitBtn = document.getElementById('btnSubmitForm');
        const origContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Yuborilmoqda...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origContent;
          contactForm.reset();
          showToast('Rahmat! Xabaringiz qabul qilindi. Tez orada bog\'lanaman.');
        }, 1200);
      }
    });

    // Clear error on input
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }

  // Update Footer Year
  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Initial call to set up the lab
  updateVibeLab();
});
