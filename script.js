// Configurações globais
const CONFIG = {
  whatsappNumber: "5551989345497",
  professorName: "Professor Daniel",
  defaultMessage:
    "Olá, Professor Daniel! Sou maior de idade e vim da sua Landing Page. Gostaria de mais informações sobre as aulas Online.",
};

// Sistema de paletas de cores dinâmicas
const COLOR_PALETTES = {
  hero: { primary: "#8b5cf6", secondary: "#06d6a0" },
  about: { primary: "#f59e0b", secondary: "#ef4444" },
  benefits: { primary: "#3b82f6", secondary: "#10b981" },
  live: { primary: "#ec4899", secondary: "#8b5cf6" },
  testimonials: { primary: "#06d6a0", secondary: "#3b82f6" },
  recorded: { primary: "#f59e0b", secondary: "#ef4444" },
  booking: { primary: "#8b5cf6", secondary: "#06d6a0" },
  newsletter: { primary: "#3b82f6", secondary: "#ec4899" },
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
  setupDynamicColors(); // Nova função para cores dinâmicas
  setupEnhancedAnimations(); // Nova função para animações melhoradas
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

// NOVO: Sistema de cores dinâmicas por seção
function setupDynamicColors() {
  const sections = document.querySelectorAll("section[data-section]");
  const headerHeight = document.querySelector(".header").offsetHeight;

  // Função para atualizar cores baseada na seção ativa
  function updateSectionColors() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute("data-section");
      }
    });

    // Atualiza as variáveis CSS baseadas na seção ativa
    if (currentSection && COLOR_PALETTES[currentSection]) {
      const palette = COLOR_PALETTES[currentSection];

      // Aplica transição suave para as mudanças de cor
      document.documentElement.style.transition =
        "--primary 0.5s ease, --secondary 0.5s ease";
      document.documentElement.style.setProperty("--primary", palette.primary);
      document.documentElement.style.setProperty(
        "--secondary",
        palette.secondary
      );

      // Atualiza gradientes
      document.documentElement.style.setProperty(
        "--gradient",
        `linear-gradient(135deg, ${palette.primary}, ${getLightenedColor(
          palette.primary,
          20
        )})`
      );
      document.documentElement.style.setProperty(
        "--gradient-secondary",
        `linear-gradient(135deg, ${palette.secondary}, ${getLightenedColor(
          palette.secondary,
          20
        )})`
      );
    }
  }

  // Helper function para clarear cores
  function getLightenedColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  // Inicializa o observador de scroll para mudanças de cor
  window.addEventListener("scroll", updateSectionColors);
  window.addEventListener("resize", updateSectionColors);

  // Chama uma vez para definir as cores iniciais
  updateSectionColors();
}

// NOVO: Animações melhoradas com efeitos visuais
function setupEnhancedAnimations() {
  // Configuração do Intersection Observer para animações avançadas
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Adiciona classe de animação baseada no tipo de elemento
          if (entry.target.classList.contains("benefit-card")) {
            entry.target.style.animation = "slideUpFade 0.8s ease forwards";
          } else if (entry.target.classList.contains("testimonial-card")) {
            entry.target.style.animation = "slideInLeft 0.8s ease forwards";
          } else if (entry.target.classList.contains("class-card")) {
            entry.target.style.animation = "pulseEntrance 1s ease forwards";
          } else if (entry.target.classList.contains("feature")) {
            entry.target.style.animation = "fadeInScale 0.6s ease forwards";
          }

          // Marca como animado para não repetir
          entry.target.setAttribute("data-animated", "true");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observa elementos para animação avançada
  document
    .querySelectorAll(
      ".benefit-card, .class-card, .testimonial-card, .step-card, .feature"
    )
    .forEach((el) => {
      // Só observa se ainda não foi animado
      if (!el.getAttribute("data-animated")) {
        animationObserver.observe(el);
      }
    });

  // Adiciona estilos CSS dinâmicos para as animações
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideUpFade {
      0% {
        opacity: 0;
        transform: translateY(50px) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes slideInLeft {
      0% {
        opacity: 0;
        transform: translateX(-50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes pulseEntrance {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeInScale {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Efeito de brilho dinâmico nos elementos interativos */
    .btn-primary, .btn-secondary {
      position: relative;
      overflow: hidden;
    }

    .btn-primary::before, .btn-secondary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s;
    }

    .btn-primary:hover::before, .btn-secondary:hover::before {
      left: 100%;
    }

    /* Efeito de flutuação contínua para elementos decorativos */
    @keyframes continuousFloat {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      33% {
        transform: translateY(-10px) rotate(3deg);
      }
      66% {
        transform: translateY(-5px) rotate(-3deg);
      }
    }

    .floating-shapes .shape {
      animation: continuousFloat 8s ease-in-out infinite;
    }

    .shape-1 { animation-delay: 0s; }
    .shape-2 { animation-delay: 2.5s; }
    .shape-3 { animation-delay: 5s; }
  `;
  document.head.appendChild(style);
}

// NOVO: Efeitos de partículas para background hero (opcional)
function setupParticleEffects() {
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  // Cria container de partículas
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-container";
  particlesContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    pointer-events: none;
  `;

  heroSection.querySelector(".hero-background").appendChild(particlesContainer);

  // Cria partículas
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 5}s;
    `;

    particlesContainer.appendChild(particle);
  }

  // Adiciona keyframes para animação de partículas
  const particleStyle = document.createElement("style");
  particleStyle.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(particleStyle);
}

// NOVO: Inicializa efeitos de partículas (opcional - descomente se quiser usar)
// setupParticleEffects();

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

// NOVO: Otimização de performance para animações
let ticking = false;
function updateOnScroll() {
  animateOnScroll();
  ticking = false;
}

window.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

// NOVO: Preloader opcional (pode ser ativado se necessário)
function setupPreloader() {
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--darker);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
  `;

  preloader.innerHTML = `
    <div style="text-align: center; color: white;">
      <div style="width: 50px; height: 50px; border: 3px solid transparent; border-top: 3px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
      <p>Carregando...</p>
    </div>
  `;

  document.body.appendChild(preloader);

  // Remove o preloader quando a página carrega
  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  });
}

// Descomente a linha abaixo para ativar o preloader
// setupPreloader();
