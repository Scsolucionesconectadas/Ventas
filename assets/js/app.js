document.addEventListener("DOMContentLoaded", () => {
  renderDemoCatalogs();
  bindIndustryFilters();
  bindDropdowns();
  bindServiceModal();
  bindDiagnostic();
  setupRevealAnimations();
  refreshIcons();
});

function renderDemoCatalogs() {
  const catalogs = document.querySelectorAll("[data-demo-catalog]");
  const demos = Array.isArray(window.SCDemoCatalog) ? window.SCDemoCatalog : [];

  catalogs.forEach((catalog) => {
    const rootPrefix = catalog.dataset.rootPrefix || "";
    const mode = catalog.dataset.demoMode || "all";
    const limit = Number(catalog.dataset.demoLimit) || 0;
    let visibleDemos = mode === "featured" ? demos.filter((demo) => demo.featured) : demos;

    if (limit > 0) {
      visibleDemos = visibleDemos.slice(0, limit);
    }

    catalog.innerHTML = visibleDemos.map((demo) => renderDemoCard(demo, rootPrefix)).join("");
  });
}

function renderDemoCard(demo, rootPrefix) {
  const statusLabel = demo.status === "listo" ? "Demo lista" : "Roadmap";
  const statusClass = demo.status === "listo" ? "ready" : "roadmap";
  const modules = (demo.modules || [])
    .map((module) => `<li>${escapeHtml(module)}</li>`)
    .join("");

  return `
    <article class="industry-card" data-status="${escapeHtml(demo.status)}">
      <img src="${escapeHtml(rootPrefix + demo.image)}" alt="${escapeHtml(demo.alt)}" />
      <div class="industry-card-body">
        <span class="status-pill ${statusClass}">${statusLabel}</span>
        <h3>${escapeHtml(demo.title)}</h3>
        <p>${escapeHtml(demo.description)}</p>
        <details class="feature-disclosure">
          <summary>
            Ver módulos
            <i data-lucide="chevron-down" aria-hidden="true"></i>
          </summary>
          <ul>${modules}</ul>
        </details>
        <a href="${escapeHtml(rootPrefix + demo.href)}" class="card-action">
          <i data-lucide="arrow-right" aria-hidden="true"></i>
          Abrir demo
        </a>
      </div>
    </article>
  `;
}

function bindIndustryFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const industryCards = document.querySelectorAll(".industry-card[data-status]");
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
}

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

function bindServiceModal() {
  const services = {
    sistemas: {
      icon: "panel-top",
      title: "Sistemas de gestión",
      copy: "Creamos paneles operativos a medida para ordenar clientes, usuarios, documentos, tareas, permisos y reportes en un único lugar.",
      bullets: [
        "Módulos por área: administración, ventas, operaciones, stock, turnos o expedientes.",
        "Formularios claros, validaciones, estados y permisos por rol.",
        "Trazabilidad completa para saber quién hizo cada acción y cuándo ocurrió.",
      ],
      outcome: "Resultado esperado: menos planillas sueltas y más control diario.",
    },
    automatizaciones: {
      icon: "workflow",
      title: "Automatizaciones",
      copy: "Diseñamos flujos con n8n, Node-RED o servicios propios para que las tareas repetitivas se ejecuten con reglas, alertas y bitácora.",
      bullets: [
        "Recordatorios, derivaciones, avisos internos y seguimiento automático.",
        "Procesos con reintentos, validaciones e idempotencia cuando hay acciones externas.",
        "Alertas ante errores para que el equipo se entere antes que el cliente.",
      ],
      outcome: "Resultado esperado: procesos que avanzan aunque nadie esté copiando datos manualmente.",
    },
    integraciones: {
      icon: "plug-zap",
      title: "Integraciones",
      copy: "Conectamos sistemas existentes mediante APIs, webhooks, bases de datos, formularios, planillas y herramientas de comunicación.",
      bullets: [
        "Sincronización de clientes, productos, turnos, pagos, documentos y estados.",
        "Puentes entre CRMs, ERPs, Odoo, bots, Google Workspace y paneles internos.",
        "Mapeo de datos, normalización y controles para evitar duplicados.",
      ],
      outcome: "Resultado esperado: datos consistentes sin reescribir toda la operación.",
    },
    asistentes: {
      icon: "message-square-text",
      title: "Asistentes y chatbots",
      copy: "Implementamos asistentes para recepción, soporte, consultas frecuentes y derivaciones, siempre con datos controlados y supervisión humana.",
      bullets: [
        "Respuestas frecuentes, toma de datos y clasificación de solicitudes.",
        "Derivación al área correcta con historial y prioridad.",
        "Opciones para WhatsApp, web, Telegram o canales internos.",
      ],
      outcome: "Resultado esperado: atención más rápida y equipos con menos interrupciones.",
    },
    dashboards: {
      icon: "pie-chart",
      title: "Dashboards y Grafana",
      copy: "Transformamos datos operativos en indicadores visibles para tomar decisiones sin esperar cierres manuales de planillas.",
      bullets: [
        "Tableros por ventas, stock, turnos, cobranzas, productividad o logística.",
        "Filtros por período, rubro, responsable, canal y estado.",
        "Alertas visuales y métricas ejecutivas para reuniones de seguimiento.",
      ],
      outcome: "Resultado esperado: dirección y operación mirando la misma información.",
    },
    reporterias: {
      icon: "file-text",
      title: "Reporterías ejecutivas",
      copy: "Generamos PDFs, CSV y resúmenes automáticos con estructura profesional, encabezado de marca, pie institucional y distribución programada.",
      bullets: [
        "Reportes por email con destinatarios según rol o área.",
        "Adjuntos con indicadores, observaciones y próximos pasos.",
        "Bitácora de generación, envío y fallos para auditoría interna.",
      ],
      outcome: "Resultado esperado: reportes listos sin copiar datos ni armar documentos a mano.",
    },
    demos: {
      icon: "presentation",
      title: "Demos comerciales",
      copy: "Armamos mockups funcionales por rubro para que el cliente vea la solución antes de contratarla y pueda imaginar su proceso real.",
      bullets: [
        "Pantallas navegables con datos ficticios y módulos del rubro.",
        "Argumentos comerciales, dashboards, PDFs y flujos de automatización.",
        "Base reutilizable para convertir una demo aprobada en sistema real.",
      ],
      outcome: "Resultado esperado: reuniones más concretas y propuestas más fáciles de vender.",
    },
  };

  const modal = document.querySelector("[data-service-modal]");
  const buttons = document.querySelectorAll("[data-service]");

  if (!modal || !buttons.length) return;

  const icon = modal.querySelector("[data-service-icon]");
  const title = modal.querySelector("[data-service-title]");
  const copy = modal.querySelector("[data-service-copy]");
  const list = modal.querySelector("[data-service-list]");
  const outcome = modal.querySelector("[data-service-outcome]");
  const closeButtons = modal.querySelectorAll("[data-service-close]");

  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const detail = services[button.dataset.service];
      if (!detail) return;

      icon?.setAttribute("data-lucide", detail.icon);
      if (title) title.textContent = detail.title;
      if (copy) copy.textContent = detail.copy;
      if (list) list.innerHTML = detail.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("");
      if (outcome) outcome.textContent = detail.outcome;

      modal.hidden = false;
      document.body.classList.add("modal-open");
      refreshIcons();
      window.SCAnimations?.pulse?.(modal.querySelector(".service-modal-card"));
    });

    button.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      button.click();
    });
  });

  closeButtons.forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
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
    ".landing-hero-copy, .demos-hero, .service-card, .service-modal-card, .proof-item, .diagnostic-panel, .diagnostic-result, .automation-copy, .automation-flow, .automation-card, .process-step, .cta-inner, .contact-card, .industry-card, .method-grid article, .snapshot, .intro-copy",
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
