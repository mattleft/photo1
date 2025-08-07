// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const sessionType = formData.get("session-type");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !sessionType || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Show success message (in a real implementation, you'd send this to a server)
      alert(
        "Thank you for your message! I will get back to you within 24 hours."
      );

      // Reset form
      this.reset();
    });
  }

  // Header scroll effect
  let lastScrollTop = 0;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Gallery image modal (simple lightbox)
  const galleryImages = document.querySelectorAll(".gallery img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      // Create modal
      const modal = document.createElement("div");
      modal.className = "image-modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;

      // Add modal styles
      modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

      const modalContent = modal.querySelector(".modal-content");
      modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;

      const closeBtn = modal.querySelector(".close-modal");
      closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
                z-index: 10001;
            `;

      const modalImg = modal.querySelector("img");
      modalImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 10px;
            `;

      document.body.appendChild(modal);
      document.body.style.overflow = "hidden";

      // Fade in
      setTimeout(() => {
        modal.style.opacity = "1";
      }, 10);

      // Close modal functionality
      const closeModal = () => {
        modal.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(modal);
          document.body.style.overflow = "auto";
        }, 300);
      };

      closeBtn.addEventListener("click", closeModal);
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeModal();
        }
      });

      // Close on escape key
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closeModal();
        }
      });
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections for fade-in animation
  document
    .querySelectorAll(".category, .testimonial, .about-content")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  // Parallax effect for hero image
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".hero-image img");
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });
});
