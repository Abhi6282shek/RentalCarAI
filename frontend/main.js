/* ============================================
   RENTAL CAR AI — Main JS
   ============================================ */

// Theme management
const themeToggle = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;
let dark = localStorage.getItem('theme') !== 'light';

function applyTheme() {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = dark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
  });
}

applyTheme();

themeToggle.forEach(btn => {
  btn.addEventListener('click', () => {
    dark = !dark;
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    applyTheme();
  });
});

// Sticky navbar shrink
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '.5rem 0';
    } else {
      navbar.style.padding = '.9rem 0';
    }
  });
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.car-card, .feature-card, .review-card, .stat-card').forEach(el => {
  observer.observe(el);
});

// Favorite toggle
document.querySelectorAll('.car-badge-fav').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    btn.classList.toggle('active');
    btn.innerHTML = btn.classList.contains('active')
      ? '<i class="bi bi-heart-fill"></i>'
      : '<i class="bi bi-heart"></i>';
  });
});

// Price range filter


// Booking date calc
const pickupDate  = document.getElementById('pickupDate');
const returnDate  = document.getElementById('returnDate');
const totalDays   = document.getElementById('totalDays');
const totalPrice  = document.getElementById('totalPrice');
const pricePerDay = 89; // default

function calcTotal() {
  if (pickupDate && returnDate && pickupDate.value && returnDate.value) {
    const d1 = new Date(pickupDate.value);
    const d2 = new Date(returnDate.value);
    const days = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
    if (totalDays) totalDays.textContent = days + (days === 1 ? ' day' : ' days');
    if (totalPrice) totalPrice.textContent = '$' + (days * pricePerDay).toLocaleString();
    updatePriceBreakdown(days);
  }
}

function updatePriceBreakdown(days) {
  const baseEl   = document.getElementById('pb-base');
  const insurEl  = document.getElementById('pb-insur');
  const taxEl    = document.getElementById('pb-tax');
  const totalEl  = document.getElementById('pb-total');
  if (!baseEl) return;
  const base    = days * pricePerDay;
  const insur   = 15;
  const tax     = Math.round(base * 0.08);
  const total   = base + insur + tax;
  baseEl.textContent  = '$' + base.toLocaleString();
  insurEl.textContent = '$' + insur;
  taxEl.textContent   = '$' + tax;
  totalEl.textContent = '$' + total.toLocaleString();
}

if (pickupDate) pickupDate.addEventListener('change', calcTotal);
if (returnDate) returnDate.addEventListener('change', calcTotal);

// Set min dates
if (pickupDate) {
  const today = new Date().toISOString().split('T')[0];
  pickupDate.min = today;
  returnDate && (returnDate.min = today);
  pickupDate.addEventListener('change', () => {
    if (returnDate) returnDate.min = pickupDate.value;
  });
}

// Gallery thumbnail switcher
const galleryMain = document.querySelector('.gallery-main img');
document.querySelectorAll('.thumb').forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    if (galleryMain) {
      const src = thumb.querySelector('img').src;
      galleryMain.src = src;
    }
  });
});

// View toggle (grid/list)
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Search filter live
const searchInput = document.getElementById('carSearch');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.car-card').forEach(card => {
      const name = card.querySelector('.car-name')?.textContent.toLowerCase() || '';
      const brand = card.querySelector('.car-brand')?.textContent.toLowerCase() || '';
      card.closest('.col') && (card.closest('.col').style.display =
        (name.includes(q) || brand.includes(q)) ? '' : 'none');
    });
  });
}

// Toast notification
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toastCustom');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastCustom';
    toast.className = 'toast-custom';
    document.body.appendChild(toast);
  }
  const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill';
  const color = type === 'success' ? '#22c97a' : '#f5b731';
  toast.innerHTML = `<i class="bi ${icon}" style="color:${color}"></i><span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Book now buttons
document.querySelectorAll('.btn-book').forEach(btn => {
  btn.addEventListener('click', e => {
    if (btn.dataset.page) return; // let link handle
    e.preventDefault();
    showToast('Redirecting to booking page…');
  });
});

// Confirm booking
const confirmBtn = document.getElementById('confirmBooking');
if (confirmBtn) {
  confirmBtn.addEventListener('click', () => {
    if (!pickupDate?.value || !returnDate?.value) {
      showToast('Please select pickup and return dates.', 'warn');
      return;
    }
    confirmBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Booking Confirmed!';
    confirmBtn.style.background = 'var(--c-success)';
    showToast('Booking confirmed! Check your dashboard.');
  });
}

// Admin: delete row
document.querySelectorAll('.action-btn.danger').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    if (row && confirm('Delete this entry?')) {
      row.style.opacity = '0';
      row.style.transition = 'opacity .3s';
      setTimeout(() => row.remove(), 300);
      showToast('Entry deleted.');
    }
  });
});

// Dashboard sidebar active
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// Password toggle
document.querySelectorAll('.input-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
      input.type = 'password';
      btn.innerHTML = '<i class="bi bi-eye"></i>';
    }
  });
});

// Auth form prevent default (demo)
document.querySelectorAll('form.auth-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Login successful! Redirecting…');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  });
});

document.querySelectorAll('form.register-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const pw  = form.querySelector('#password')?.value;
    const cpw = form.querySelector('#confirmPassword')?.value;
    if (pw !== cpw) {
      showToast('Passwords do not match.', 'warn');
      return;
    }
    showToast('Account created! Redirecting…');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  });
});