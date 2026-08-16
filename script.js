/**
 * Lera Garcia - Personal Portfolio Website Script
 * Handles:
 * 1. Mobile navigation menu toggle
 * 2. Sticky header background opacity changes on scroll
 * 3. Active menu link updating during page scroll
 * 4. Client-side contact form validation and interactive demo feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE NAVIGATION MENU ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle Menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
      // Accessibility: update aria-expanded status
      const isOpen = hamburger.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });


  // --- STICKY NAV BACKGROUND ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // --- ACTIVE NAVBAR LINKS ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  
  function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      // Get the offset of the section, taking the header height into account
      const sectionTop = current.offsetTop - 85; 
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', scrollActive);


  // --- CONTACT FORM DEMO SUBMISSION ---
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('successToast');
  const toastClose = document.getElementById('toastClose');
  const toastName = document.getElementById('toastName');

  if (contactForm && toast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form fields
      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const messageInput = document.getElementById('formMessage');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Basic client-side validation
      if (!name || !email || !message) {
        alert('Please fill out all fields in the contact form.');
        return;
      }

      // Simple Email Regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Inject submitter's name into toast message
      if (toastName) {
        toastName.textContent = name;
      }

      // Show custom popup toast message
      toast.classList.add('show');

      // Clear input fields
      contactForm.reset();

      // Automatically hide the toast after 6 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 6000);
    });
  }

  // Allow manual closing of the success toast
  if (toastClose && toast) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }
});
