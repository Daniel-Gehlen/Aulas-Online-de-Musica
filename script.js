// Configurações globais
const CONFIG = {
  whatsappNumber: "5551989345497",
  professorName: "Professor Daniel",
  defaultMessage:
    "Olá, Professor Daniel! Sou maior de idade e vim da sua Landing Page. Gostaria de mais informações sobre as aulas Online.",
};

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  initApp();
});

function initApp() {
  setupSmoothScroll();
  setupHeaderEffects();
  setupAnimations();
  setupWhatsAppLinks();
  setupCardInteractions();
  setupStatsAnimation();
}

// Scroll suave para navegação
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Não aplicar para links que são overlays dos cards
      if (this.classList.contains("card-hover-overlay")) return;

      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Efeitos do header ao scrollar
function setupHeaderEffects() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.backdropFilter = "blur(20px)";
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.backdropFilter = "blur(20px)";
      header.style.boxShadow = "none";
    }
  });
}

// Animações de entrada
function setupAnimations() {
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

  // Observar elementos para animação
  document
    .querySelectorAll(
      ".benefit-card, .class-card, .testimonial-card, .step-card"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
}

// Configurar links do WhatsApp
function setupWhatsAppLinks() {
  const defaultMessage = encodeURIComponent(CONFIG.defaultMessage);

  // Links gerais do WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    const currentHref = link.getAttribute("href");
    if (
      !currentHref.includes("text=") &&
      !link.classList.contains("card-hover-overlay")
    ) {
      link.setAttribute(
        "href",
        `https://wa.me/${CONFIG.whatsappNumber}?text=${defaultMessage}`
      );
    }
  });
}

// Interações com os cards
function setupCardInteractions() {
  const cards = document.querySelectorAll(".class-card, .course-card");

  cards.forEach((card) => {
    // Efeito de hover no card
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
    });

    // Prevenir que o overlay interfira com outros cliques no card
    const overlay = card.querySelector(".card-hover-overlay");
    if (overlay) {
      overlay.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }
  });
}

// Animação dos números de estatísticas
function setupStatsAnimation() {
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    statsObserver.observe(heroSection);
  }
}

function animateStats() {
  const stats = document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {
    const originalText = stat.textContent;
    const hasPlus = originalText.includes("+");
    const target = parseInt(originalText.replace("+", "").replace("%", ""));
    let current = 0;
    const increment = target / 50;
    const isPercentage = originalText.includes("%");

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent =
          target + (hasPlus ? "+" : "") + (isPercentage ? "%" : "");
        clearInterval(timer);
      } else {
        stat.textContent =
          Math.floor(current) +
          (hasPlus ? "+" : "") +
          (isPercentage ? "%" : "");
      }
    }, 30);
  });
}

// Tracking de eventos (opcional)
document.querySelectorAll(".newsletter-simple a").forEach((link) => {
  link.addEventListener("click", function () {
    console.log("Newsletter subscription clicked");
  });
});

document.querySelectorAll('a[href*="hotmart"]').forEach((link) => {
  link.addEventListener("click", function () {
    console.log("Hotmart course purchase clicked");
  });
});

// Animações ao scrollar
window.addEventListener("scroll", animateOnScroll);

function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".benefit-card, .class-card, .testimonial-card, .step-card"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animate-in");
    }
  });
}
