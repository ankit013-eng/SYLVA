const loader = document.getElementById('loader');
const progressBar = document.getElementById('progress');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const faqButtons = document.querySelectorAll('.faq-question');
const galleryImages = document.querySelectorAll('.gallery-grid img');
const galleryLightbox = document.querySelector('.gallery-lightbox');
const galleryLightboxImage = document.querySelector('.gallery-lightbox img');
const backToTop = document.querySelector('.back-to-top');
const compareSlider = document.querySelector('.compare__slider');
const compareAfter = document.querySelector('.compare__image--after');
const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
const carouselButtons = document.querySelectorAll('.carousel-btn');
const newsletterForm = document.querySelector('.newsletter-form');
const formMessage = document.querySelector('.form-message');
const registrationForm = document.querySelector('.registration-form');
const registrationMessage = document.querySelector('.registration-message');
const registrationList = document.querySelector('.registration-list');
const revealItems = Array.from(document.querySelectorAll('.reveal'));

const STORAGE_KEY = 'sylvaRegistrations';

const getRegistrationApiBase = () => {
  const params = new URLSearchParams(window.location.search);
  const override = params.get('api') || window.SYLVA_REGISTRATION_API;
  if (override) return override.replace(/\/$/, '');

  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
    return 'http://127.0.0.1:3000';
  }

  return 'http://127.0.0.1:3000';
};

const registrationApiUrl = `${getRegistrationApiBase()}/registrations`;

const readStoredEntries = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const persistEntries = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 100)));
  } catch (error) {
    console.error('Unable to save registration locally', error);
  }
};

const saveRegistration = async (entry) => {
  const existing = readStoredEntries();
  const nextEntries = [entry, ...existing].slice(0, 100);
  persistEntries(nextEntries);

  try {
    const response = await fetch(registrationApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });

    if (response.ok) {
      const payload = await response.json();
      if (Array.isArray(payload.entries)) {
        persistEntries(payload.entries);
      }
    }
  } catch (error) {
    console.warn('Shared registration endpoint unavailable, using local storage only.', error);
  }

  return nextEntries;
};

const renderRegistrations = () => {
  if (!registrationList) return;

  try {
    const entries = readStoredEntries();

    if (!entries.length) {
      registrationList.innerHTML = '<p class="empty-state">No registrations yet. Submit the form to see entries here.</p>';
      return;
    }

    registrationList.innerHTML = entries.map((entry) => `
      <article class="registration-entry">
        <h3>${entry.name || 'Unknown'}</h3>
        <p><strong>Phone:</strong> ${entry.phone || '-'}</p>
        <p><strong>Email:</strong> ${entry.email || '-'}</p>
        <p><strong>Submitted:</strong> ${entry.time || 'Just now'}</p>
      </article>
    `).join('');
  } catch (error) {
    registrationList.innerHTML = '<p class="empty-state">Unable to load registrations right now.</p>';
  }
};

const hideLoader = () => {
  if (loader) {
    loader.classList.add('is-hidden');
    setTimeout(() => loader.remove(), 400);
  }
};

const initAnimations = () => {
  const gsapAvailable = typeof window.gsap !== 'undefined' && typeof window.gsap.to === 'function';

  if (gsapAvailable) {
    if (typeof window.gsap.registerPlugin === 'function') {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    window.gsap.from('.hero h1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
    window.gsap.from('.hero__description, .hero__actions', { y: 30, opacity: 0, duration: 1, delay: 0.2 });

    window.gsap.utils.toArray('.reveal').forEach((item) => {
      window.gsap.from(item, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true
        }
      });
    });

    window.gsap.to('.hero__media img', {
      y: 12,
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: 'sine.inOut'
    });
  } else {
    revealItems.forEach((item) => item.classList.add('in-view'));
  }
};

window.addEventListener('DOMContentLoaded', () => {
  if (loader) {
    if (typeof window.gsap !== 'undefined' && typeof window.gsap.to === 'function') {
      window.gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        onComplete: hideLoader
      });
    } else {
      hideLoader();
    }
  }

  initAnimations();

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      answer.style.maxHeight = expanded ? null : `${answer.scrollHeight}px`;
    });
  });

  if (compareSlider && compareAfter) {
    compareSlider.addEventListener('input', (event) => {
      compareAfter.style.clipPath = `inset(0 0 0 ${event.target.value}%)`;
    });
  }

  if (carouselButtons.length && testimonialCards.length) {
    let currentIndex = 0;
    const updateCards = () => {
      testimonialCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
      });
    };
    carouselButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.dataset.direction === 'next' ? 1 : -1;
        currentIndex = (currentIndex + direction + testimonialCards.length) % testimonialCards.length;
        updateCards();
      });
    });
    updateCards();
  }

  galleryImages.forEach((image) => {
    image.addEventListener('click', () => {
      galleryLightboxImage.src = image.src;
      galleryLightbox.classList.add('show');
      galleryLightbox.setAttribute('aria-hidden', 'false');
    });
  });

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (event) => {
      if (event.target === galleryLightbox || event.target.closest('.gallery-close')) {
        galleryLightbox.classList.remove('show');
        galleryLightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (!input.value.trim()) {
        formMessage.textContent = 'Please enter your email to stay updated.';
        return;
      }
      formMessage.textContent = 'Thank you for joining the SYLVA ritual.';
      newsletterForm.reset();
    });
  }

  if (registrationForm) {
    registrationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = registrationForm.querySelector('#reg-name').value.trim();
      const phone = registrationForm.querySelector('#reg-phone').value.trim();
      const email = registrationForm.querySelector('#reg-email').value.trim();

      if (!name || !phone || !email) {
        registrationMessage.textContent = 'Please complete all fields to reserve your offer.';
        return;
      }

      const entry = {
        name,
        phone,
        email,
        time: new Date().toLocaleString()
      };

      await saveRegistration(entry);
      registrationMessage.textContent = `Thank you ${name}! Your registration is confirmed for the ₹99 launch offer.`;
      registrationForm.reset();
      renderRegistrations();
    });
  }

  renderRegistrations();

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 500 ? 'grid' : 'none';
    });
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  setTimeout(() => {
    const popup = document.getElementById('luxPopup');
    if (popup) {
      popup.classList.add('show');
      popup.setAttribute('aria-hidden', 'false');
    }
  }, 3000);
});

function closeLux() {
  const popup = document.getElementById('luxPopup');
  if (popup) {
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  }
}