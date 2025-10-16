// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header Scroll Effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "#fff";
      header.style.backdropFilter = "none";
    }
  }
});

// Gallery Filter Functionality
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        galleryItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
            item.style.animation = "fadeIn 0.5s ease-in";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
}

// Blog Category Filter
function initBlogFilter() {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const blogPosts = document.querySelectorAll(".blog-post");

  if (categoryButtons.length > 0 && blogPosts.length > 0) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");

        const category = this.getAttribute("data-category");

        blogPosts.forEach((post) => {
          if (
            category === "all" ||
            post.getAttribute("data-category") === category
          ) {
            post.style.display = "block";
            post.style.animation = "fadeIn 0.5s ease-in";
          } else {
            post.style.display = "none";
          }
        });
      });
    });
  }
}

// Modal Functionality
function initModals() {
  // Image Modal
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.querySelector(".close");

  if (imageModal && modalImage) {
    // Close modal when clicking the X
    if (closeModal) {
      closeModal.addEventListener("click", function () {
        imageModal.style.display = "none";
      });
    }

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === imageModal) {
        imageModal.style.display = "none";
      }
    });
  }

  // Video Modal
  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");

  if (videoModal && modalVideo) {
    // Close video modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === videoModal) {
        videoModal.style.display = "none";
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    });
  }
}

// FAQ Accordion
function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector(".faq-answer");
      const icon = this.querySelector("i");

      // Close all other FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
          const otherAnswer = item.querySelector(".faq-answer");
          const otherIcon = item.querySelector(".faq-question i");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });

      // Toggle current FAQ item
      faqItem.classList.toggle("active");
      if (faqItem.classList.contains("active")) {
        if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
        if (icon) icon.style.transform = "rotate(180deg)";
      } else {
        if (answer) answer.style.maxHeight = null;
        if (icon) icon.style.transform = "rotate(0deg)";
      }
    });
  });
}

// Form Validation and Submission
function initForms() {
  // Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const email = formData.get("email");
      const message = formData.get("message");

      // Simple validation
      if (!name || !phone || !email || !message) {
        showNotification("Vui lòng điền đầy đủ thông tin bắt buộc!", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("Vui lòng nhập email hợp lệ!", "error");
        return;
      }

      // Phone validation
      const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
      if (!phoneRegex.test(phone)) {
        showNotification("Vui lòng nhập số điện thoại hợp lệ!", "error");
        return;
      }

      // Simulate form submission
      showNotification(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
        "success"
      );
      this.reset();
    });
  }

  // Newsletter Form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (!email) {
        showNotification("Vui lòng nhập email!", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("Vui lòng nhập email hợp lệ!", "error");
        return;
      }

      showNotification(
        "Cảm ơn bạn đã đăng ký nhận tin tức! Chúng tôi sẽ gửi email cho bạn sớm nhất.",
        "success"
      );
      this.reset();
    });
  }
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.remove();
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Animation on Scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".service-card, .feature, .testimonial, .gallery-item, .blog-post, .team-member, .award-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (counter) => {
    const target = parseInt(counter.textContent.replace(/[^\d]/g, ""));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = counter.textContent.replace(/\d+/, target);
        clearInterval(timer);
      } else {
        counter.textContent = counter.textContent.replace(
          /\d+/,
          Math.floor(current)
        );
      }
    }, 16);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Back to Top Button
function initBackToTop() {
  // Create back to top button
  const backToTop = document.createElement("button");
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.className = "back-to-top";
  backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #e91e63;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(233, 30, 99, 0.3);
    `;

  document.body.appendChild(backToTop);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  // Scroll to top when clicked
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effect
  backToTop.addEventListener("mouseenter", () => {
    backToTop.style.transform = "scale(1.1)";
    backToTop.style.background = "#c2185b";
  });

  backToTop.addEventListener("mouseleave", () => {
    backToTop.style.transform = "scale(1)";
    backToTop.style.background = "#e91e63";
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initGalleryFilter();
  initBlogFilter();
  initModals();
  initFAQ();
  initForms();
  initScrollAnimations();
  initCounters();
  initLazyLoading();
  initBackToTop();
});

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notification-close:hover {
        opacity: 0.8;
    }

    .back-to-top:hover {
        transform: scale(1.1) !important;
    }
`;
document.head.appendChild(style);
