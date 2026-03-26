// Nav mega dropdown hover logic
document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.querySelector('.cookie-accept');
  const cookieDecline = document.querySelector('.cookie-decline');
  const consentKey = 'softgiggles_cookie_consent';

  function hideCookieBanner() {
    if (!cookieBanner) return;
    cookieBanner.classList.add('is-hidden');
    window.setTimeout(() => {
      cookieBanner.hidden = true;
    }, 240);
  }

  function saveCookieChoice(choice) {
    try {
      localStorage.setItem(consentKey, choice);
    } catch (error) {
      // Ignore storage errors and keep the UI usable.
    }
    document.cookie = `softgiggles_cookie_consent=${choice}; path=/; max-age=31536000; SameSite=Lax`;
    hideCookieBanner();
  }

  if (cookieBanner) {
    let savedChoice = null;
    try {
      savedChoice = localStorage.getItem(consentKey);
    } catch (error) {
      savedChoice = null;
    }

    if (!savedChoice) {
      cookieBanner.hidden = false;
      window.requestAnimationFrame(() => {
        cookieBanner.classList.add('is-visible');
      });
    }
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => saveCookieChoice('accepted'));
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', () => saveCookieChoice('declined'));
  }

  // Smooth image placeholder fallback
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });

  // Filter chips toggle
  document.querySelectorAll('.size-chip').forEach(chip => {
    chip.addEventListener('click', () => chip.classList.toggle('active'));
  });
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.toggle('active');
    });
  });

  // Grid toggle
  const toggleBtns = document.querySelectorAll('.grid-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Filter group collapse
  document.querySelectorAll('.filter-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.parentElement;
      const content = group.querySelector('.filter-group-content');
      if (content) content.style.display = content.style.display === 'none' ? '' : 'none';
    });
  });

  // Wishlist toggle
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
      btn.style.color = btn.textContent === '♥' ? '#e53e3e' : '#999';
    });
  });

  // Quick add button feedback
  document.querySelectorAll('.quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const orig = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.style.background = 'rgba(45,179,74,0.9)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 1500);
    });
  });
});
