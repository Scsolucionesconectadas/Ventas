document.addEventListener("DOMContentLoaded", () => {
  bindNavigationDropdowns();
  bindAutomationPlanner();
  bindContactForm();
  refreshCommercialIcons();
});

function bindNavigationDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll("details.nav-dropdown"));

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) return;
      dropdowns.forEach((item) => {
        if (item !== dropdown) item.open = false;
      });
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) dropdown.open = false;
    });
  });
}

function bindAutomationPlanner() {
  const options = {
    agenda: {
      icon: "calendar-check-2",
      eyebrow: "Agenda y atención",
      title: "De la solicitud al turno confirmado",
      copy: "Un flujo coordinado para recibir solicitudes, validar disponibilidad, confirmar y actuar ante ausencias o cambios.",
      steps: ["Formulario o WhatsApp", "Validación de datos", "Asignación de agenda", "Recordatorio", "Confirmación", "Tablero y alerta"],
      demoLabel: "Ver demo médica",
      demoHref: "../rubros/medica/index.html",
      message: "Hola SC, quiero analizar una automatización de agenda y atención.",
    },
    ventas: {
      icon: "badge-dollar-sign",
      eyebrow: "Ventas y seguimiento",
      title: "De la consulta a la próxima acción comercial",
      copy: "Centraliza consultas, asigna responsables y evita que una oportunidad quede sin seguimiento o sin respuesta.",
      steps: ["Lead entrante", "Clasificación", "Asignación", "Cotización", "Seguimiento", "Reporte de conversión"],
      demoLabel: "Ver demo inmobiliaria",
      demoHref: "../rubros/inmobiliarias/index.html",
      message: "Hola SC, quiero analizar una automatización de ventas y seguimiento.",
    },
    stock: {
      icon: "boxes",
      eyebrow: "Stock y logística",
      title: "De la alerta de stock a la entrega trazada",
      copy: "Conecta inventario, compras y despacho para anticipar faltantes y registrar cada movimiento operativo.",
      steps: ["Stock mínimo", "Regla de reposición", "Aprobación", "Orden de compra", "Recepción", "Entrega y control"],
      demoLabel: "Ver demo de materiales",
      demoHref: "../rubros/materiales/index.html",
      message: "Hola SC, quiero analizar una automatización de stock y logística.",
    },
    reportes: {
      icon: "file-chart-column",
      eyebrow: "Reportes y control",
      title: "Del dato operativo al informe distribuido",
      copy: "Consolida indicadores, genera documentos y notifica a cada rol con historial de entregas y fallos.",
      steps: ["Datos operativos", "Validación", "Indicadores", "Dashboard", "PDF o CSV", "Email y bitácora"],
      demoLabel: "Ver demo logística",
      demoHref: "../rubros/logistica/index.html",
      message: "Hola SC, quiero analizar una automatización de reportes y control.",
    },
  };

  const buttons = Array.from(document.querySelectorAll("[data-automation-goal]"));
  const planner = document.querySelector("[data-automation-planner]");
  if (!buttons.length || !planner) return;

  const icon = planner.querySelector("[data-planner-icon]");
  const eyebrow = planner.querySelector("[data-planner-eyebrow]");
  const title = planner.querySelector("[data-planner-title]");
  const copy = planner.querySelector("[data-planner-copy]");
  const steps = planner.querySelector("[data-planner-steps]");
  const demo = planner.querySelector("[data-planner-demo]");
  const contact = planner.querySelector("[data-planner-contact]");

  const render = (key, shouldAnimate = true) => {
    const selected = options[key];
    if (!selected) return;

    buttons.forEach((button) => {
      const isActive = button.dataset.automationGoal === key;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    icon?.setAttribute("data-lucide", selected.icon);
    if (eyebrow) eyebrow.textContent = selected.eyebrow;
    if (title) title.textContent = selected.title;
    if (copy) copy.textContent = selected.copy;
    if (steps) {
      steps.innerHTML = selected.steps
        .map((step, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${escapeCommercialHtml(step)}</li>`)
        .join("");
    }
    if (demo) {
      demo.href = selected.demoHref;
      const label = demo.querySelector("span");
      if (label) label.textContent = selected.demoLabel;
    }
    if (contact) {
      contact.href = `https://wa.me/5493442472233?text=${encodeURIComponent(selected.message)}`;
    }

    refreshCommercialIcons();
    if (shouldAnimate) window.SCAnimations?.pulse?.(planner);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.automationGoal));
  });

  render(buttons.find((button) => button.classList.contains("active"))?.dataset.automationGoal || "agenda", false);
}

function bindContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const rubro = form.elements.namedItem("rubro");
  const necesidad = form.elements.namedItem("necesidad");
  const message = form.elements.namedItem("mensaje");

  if (rubro && params.get("rubro")) rubro.value = params.get("rubro");
  if (necesidad && params.get("necesidad")) necesidad.value = params.get("necesidad");
  if (message && params.get("mensaje")) message.value = params.get("mensaje").slice(0, 1500);

  form.addEventListener("submit", () => {
    const submit = form.querySelector('button[type="submit"]');
    if (!submit) return;
    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    submit.querySelector("span").textContent = "Enviando consulta...";
  });
}

function escapeCommercialHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function refreshCommercialIcons() {
  if (window.lucide) window.lucide.createIcons();
}
