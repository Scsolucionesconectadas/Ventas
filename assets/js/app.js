document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const industryCards = document.querySelectorAll("[data-status]");
  const industryEmpty = document.querySelector("#industryEmpty");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      industryCards.forEach((card) => {
        const shouldShow = filter === "todos" || card.dataset.status === filter;
        card.hidden = !shouldShow;
      });

      if (industryEmpty) {
        industryEmpty.hidden = Array.from(industryCards).some((card) => !card.hidden);
      }

      window.SCAnimations?.refresh?.();
      refreshIcons();
    });
  });

  bindDropdowns();
  bindDiagnostic();
  setupRevealAnimations();
  refreshIcons();
});

function bindDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll("details"));

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) return;
      dropdowns.forEach((item) => {
        if (item !== dropdown && item.classList.contains("nav-dropdown")) {
          item.open = false;
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown.classList.contains("nav-dropdown") && !dropdown.contains(event.target)) {
        dropdown.open = false;
      }
    });
  });
}

function bindDiagnostic() {
  const options = {
    agenda: {
      icon: "calendar-clock",
      title: "Demo de agenda inteligente",
      copy: "Conviene mostrar un flujo donde el cliente carga una solicitud, el sistema asigna un turno, envía recordatorios y deja todo visible en un tablero operativo.",
      bullets: [
        "Turnero o reservas por canal.",
        "Recordatorios por WhatsApp o email.",
        "Panel con estados y alertas.",
      ],
      message: "Hola SC, quiero una demo de agenda inteligente para mi empresa.",
    },
    ventas: {
      icon: "badge-dollar-sign",
      title: "Demo de ventas y CRM",
      copy: "La mejor entrada es un pipeline comercial con oportunidades, responsables, cotizaciones, próximas acciones y reportes de conversión por canal.",
      bullets: [
        "Leads desde WhatsApp, formulario o portal.",
        "Seguimiento comercial con tareas y estados.",
        "Reportes de conversión, margen y tiempos de respuesta.",
      ],
      message: "Hola SC, quiero una demo de ventas y CRM para mi empresa.",
    },
    stock: {
      icon: "boxes",
      title: "Demo de stock y operación",
      copy: "Para empresas con inventario o logística, mostramos control de stock, alertas de reposición, pedidos a proveedores y trazabilidad de entregas.",
      bullets: [
        "Stock disponible, reservado y crítico.",
        "Compras sugeridas y recepción de mercadería.",
        "Entregas, responsables y alertas operativas.",
      ],
      message: "Hola SC, quiero una demo de stock y operación.",
    },
    reportes: {
      icon: "bar-chart-3",
      title: "Demo de reportería ejecutiva",
      copy: "El foco es conectar datos operativos con dashboards tipo Grafana, PDF automático, CSV adjunto y email programado para dirección.",
      bullets: [
        "Indicadores por período, rubro y responsable.",
        "PDF ejecutivo generado automáticamente.",
        "Envío por email con bitácora y alertas de fallo.",
      ],
      message: "Hola SC, quiero una demo de reportería ejecutiva con dashboards y PDF.",
    },
    soporte: {
      icon: "bot",
      title: "Demo de atención automática",
      copy: "Mostramos un asistente que responde consultas frecuentes, deriva pedidos, registra datos y deja tareas para el equipo humano.",
      bullets: [
        "Chatbot conectado a procesos reales.",
        "Derivación por tipo de consulta y prioridad.",
        "Historial de conversación y acciones pendientes.",
      ],
      message: "Hola SC, quiero una demo de atención automática con chatbot.",
    },
  };

  const buttons = document.querySelectorAll("[data-diagnostic]");
  const result = document.querySelector("#diagnosticResult");
  const icon = document.querySelector("[data-diagnostic-icon]");
  const title = document.querySelector("[data-diagnostic-title]");
  const copy = document.querySelector("[data-diagnostic-copy]");
  const list = document.querySelector("[data-diagnostic-list]");
  const whatsapp = document.querySelector("#diagnosticWhatsApp");

  if (!buttons.length || !result || !icon || !title || !copy || !list || !whatsapp) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = options[button.dataset.diagnostic];
      if (!selected) return;

      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      icon.setAttribute("data-lucide", selected.icon);
      title.textContent = selected.title;
      copy.textContent = selected.copy;
      list.innerHTML = selected.bullets.map((bullet) => `<li>${bullet}</li>`).join("");
      whatsapp.href = `https://wa.me/5493442472233?text=${encodeURIComponent(selected.message)}`;

      refreshIcons();
      window.SCAnimations?.pulse?.(result);
    });
  });
}

function setupRevealAnimations() {
  const animatedItems = document.querySelectorAll(
    ".landing-hero-copy, .service-card, .proof-item, .diagnostic-panel, .diagnostic-result, .automation-copy, .automation-flow, .automation-card, .process-step, .cta-inner, .contact-card, .industry-card, .method-grid article, .snapshot, .intro-copy",
  );

  if (window.gsap) return;
  if (!("IntersectionObserver" in window)) return;

  animatedItems.forEach((item) => item.style.animationPlayState = "paused");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  animatedItems.forEach((item) => observer.observe(item));
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
