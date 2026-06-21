// components.js — Injects navbar and footer into every page

const NAV_HTML = `
<nav class="navbar navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand" href="../index.html">
      <div class="brand-icon"><i class="bi bi-car-front-fill"></i></div>
      Rental<span class="brand-accent">Car</span>&nbsp;AI
    </a>
    <div class="d-flex align-items-center gap-2 d-lg-none">
      <button class="theme-toggle"><i class="bi bi-sun-fill"></i></button>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav mx-auto gap-1">
        <li class="nav-item"><a class="nav-link" href="../index.html"><i class="bi bi-house-fill me-1"></i>Home</a></li>
        <li class="nav-item"><a class="nav-link" href="cars.html"><i class="bi bi-car-front me-1"></i>Cars</a></li>
        <li class="nav-item"><a class="nav-link" href="ai-recommendation.html"><i class="bi bi-cpu me-1"></i>AI Pick</a></li>
        <li class="nav-item"><a class="nav-link" href="#about"><i class="bi bi-info-circle me-1"></i>About</a></li>
        <li class="nav-item"><a class="nav-link" href="#contact"><i class="bi bi-envelope me-1"></i>Contact</a></li>
      </ul>
      <div class="d-flex align-items-center gap-2">
        <button class="theme-toggle d-none d-lg-grid"><i class="bi bi-sun-fill"></i></button>
        <a class="nav-link btn-nav-login" href="login.html">Login</a>
        <a class="nav-link btn-nav-register" href="register.html">Register</a>
      </div>
    </div>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer id="contact">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="footer-brand">
          <div class="brand-icon me-2" style="width:30px;height:30px;background:var(--c-primary);border-radius:8px;display:inline-grid;place-items:center;font-size:.85rem;">
            <i class="bi bi-car-front-fill text-white"></i>
          </div>
          RentalCar AI
        </div>
        <p class="footer-desc">AI-powered car rentals that match the right car to every driver. Fast, transparent, and always available.</p>
        <div class="social-links">
          <a class="social-btn" href="#"><i class="bi bi-twitter-x"></i></a>
          <a class="social-btn" href="#"><i class="bi bi-instagram"></i></a>
          <a class="social-btn" href="#"><i class="bi bi-facebook"></i></a>
          <a class="social-btn" href="#"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
      <div class="col-6 col-lg-2">
        <div class="footer-heading">Company</div>
        <ul class="footer-links">
          <li><a href="#"><i class="bi bi-chevron-right"></i>About Us</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Careers</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Press</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Blog</a></li>
        </ul>
      </div>
      <div class="col-6 col-lg-2">
        <div class="footer-heading">Services</div>
        <ul class="footer-links">
          <li><a href="cars.html"><i class="bi bi-chevron-right"></i>Browse Cars</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Long Term</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Corporate</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Airport Pickup</a></li>
        </ul>
      </div>
      <div class="col-6 col-lg-2">
        <div class="footer-heading">Support</div>
        <ul class="footer-links">
          <li><a href="#"><i class="bi bi-chevron-right"></i>Help Center</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Safety</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Terms</a></li>
          <li><a href="#"><i class="bi bi-chevron-right"></i>Privacy</a></li>
        </ul>
      </div>
      <div class="col-6 col-lg-2">
        <div class="footer-heading">Contact</div>
        <ul class="footer-links">
          <li><a href="mailto:hello@rentalcarai.com"><i class="bi bi-envelope"></i>hello@rentalcarai.com</a></li>
          <li><a href="tel:+18005551234"><i class="bi bi-telephone"></i>+1 800 555 1234</a></li>
          <li><a href="#"><i class="bi bi-geo-alt"></i>San Francisco, CA</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 RentalCar AI. All rights reserved.</span>
      <span>Built for Java Spring Boot &amp; MySQL integration</span>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  const navSlot = document.getElementById('nav-slot');
  const footSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.innerHTML = NAV_HTML;
  if (footSlot) footSlot.innerHTML = FOOTER_HTML;

  // Mark active nav
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href')?.split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
});