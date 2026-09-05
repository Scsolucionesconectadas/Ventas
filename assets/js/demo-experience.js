(function () {
  "use strict";

  const body = document.body;
  const appMain = document.querySelector(".app-main");

  if (!body.classList.contains("medical-app") || !appMain) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = {
    activity: [],
    activeOverlay: null,
    lastTrigger: null,
    unread: 0,
    tourIndex: 0,
    tourSteps: [],
    highlightedTarget: null,
    lastToastMessage: "",
    lastToastAt: 0,
  };

  const slug = body.dataset.demoSlug || "medica";
  body.dataset.demoSlug = slug;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    buildExperienceBar();
    buildExperienceLayer();
    bindExperienceActions();
    observeDemoActivity();
    seedActivity();
    restoreResetFeedback();
    renderActivity();
    renderSystemState("loading");
    refreshIcons();
  }

  function buildExperienceBar() {
    const bar = document.createElement("section");
    bar.className = "demo-experience-bar";
    bar.setAttribute("aria-label", "Herramientas de la demostración");
    bar.innerHTML = `
      <div class="experience-status">
        <span class="experience-badge experience-badge-live">
          <span class="live-dot" aria-hidden="true"></span>
          Demo pública
        </span>
        <span class="experience-badge">
          <i data-lucide="shield-check" aria-hidden="true"></i>
          Funciones simuladas
        </span>
      </div>
      <div class="experience-actions" role="group" aria-label="Acciones de la demo">
        ${toolButton("route", "Recorrido", "tour")}
        ${toolButton("monitor-up", "Presentación", "presentation")}
        ${toolButton("search", "Buscar", "search")}
        ${toolButton("panels-top-left", "Estados", "states")}
        ${toolButton("bell", "Actividad", "activity", '<span class="experience-count" data-activity-count hidden>0</span>')}
        ${toolButton("rotate-ccw", "Reiniciar", "reset")}
      </div>
    `;

    appMain.insertBefore(bar, appMain.firstChild);

    const exitButton = document.createElement("button");
    exitButton.className = "presentation-exit";
    exitButton.type = "button";
    exitButton.hidden = true;
    exitButton.dataset.experienceAction = "exit-presentation";
    exitButton.setAttribute("aria-label", "Salir del modo presentación");
    exitButton.title = "Salir del modo presentación";
    exitButton.innerHTML = '<i data-lucide="minimize-2" aria-hidden="true"></i><span>Salir de presentación</span>';
    body.appendChild(exitButton);
  }

  function toolButton(icon, label, action, extra = "") {
    return `
      <button
        class="experience-tool-button"
        type="button"
        data-experience-action="${action}"
        aria-label="${label}"
        title="${label}"
      >
        <i data-lucide="${icon}" aria-hidden="true"></i>
        <span class="experience-tool-label">${label}</span>
        ${extra}
      </button>
    `;
  }

  function buildExperienceLayer() {
    const layer = document.createElement("div");
    layer.className = "demo-experience-layer";
    layer.innerHTML = `
      <div class="experience-overlay" data-experience-overlay="search" hidden>
        <section class="experience-dialog experience-search-dialog" role="dialog" aria-modal="true" aria-labelledby="experienceSearchTitle" tabindex="-1">
          ${dialogHeader("search", "Búsqueda global", "experienceSearchTitle", "Busca módulos, clientes y registros de esta demo.")}
          <label class="experience-search-field">
            <i data-lucide="search" aria-hidden="true"></i>
            <span class="sr-only">Buscar en la demo</span>
            <input type="search" data-experience-search placeholder="Ej.: reportes, cliente, stock o turno" autocomplete="off" />
          </label>
          <div class="experience-search-results" data-experience-search-results aria-live="polite"></div>
        </section>
      </div>

      <div class="experience-overlay experience-drawer-overlay" data-experience-overlay="activity" hidden>
        <aside class="experience-dialog experience-drawer" role="dialog" aria-modal="true" aria-labelledby="experienceActivityTitle" tabindex="-1">
          ${dialogHeader("bell", "Actividad reciente", "experienceActivityTitle", "Eventos simulados y acciones realizadas durante la presentación.")}
          <div class="experience-trust-note">
            <i data-lucide="info" aria-hidden="true"></i>
            <span>No se envían mensajes ni se conectan servicios externos reales.</span>
          </div>
          <div class="experience-activity-list" data-experience-activity-list></div>
        </aside>
      </div>

      <div class="experience-overlay" data-experience-overlay="states" hidden>
        <section class="experience-dialog experience-state-dialog" role="dialog" aria-modal="true" aria-labelledby="experienceStatesTitle" tabindex="-1">
          ${dialogHeader("panels-top-left", "Estados del sistema", "experienceStatesTitle", "Visualiza cómo responde la interfaz en cada situación operativa.")}
          <div class="experience-state-switcher" role="group" aria-label="Seleccionar estado">
            <button type="button" data-system-state="loading" aria-pressed="true">Cargando</button>
            <button type="button" data-system-state="success" aria-pressed="false">Completado</button>
            <button type="button" data-system-state="error" aria-pressed="false">Error</button>
            <button type="button" data-system-state="empty" aria-pressed="false">Sin resultados</button>
          </div>
          <div class="experience-state-preview" data-system-state-preview aria-live="polite"></div>
        </section>
      </div>

      <div class="experience-overlay" data-experience-overlay="reset" hidden>
        <section class="experience-dialog experience-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="experienceResetTitle" aria-describedby="experienceResetDescription" tabindex="-1">
          <div class="experience-confirm-icon"><i data-lucide="rotate-ccw" aria-hidden="true"></i></div>
          <p class="eyebrow">Restablecer demostración</p>
          <h2 id="experienceResetTitle">¿Reiniciar los datos ficticios?</h2>
          <p id="experienceResetDescription">Se descartarán los cambios realizados durante esta sesión y la demo volverá a su estado inicial.</p>
          <div class="experience-confirm-actions">
            <button class="secondary-link" type="button" data-experience-close>Cancelar</button>
            <button class="primary-link" type="button" data-confirm-reset>
              <i data-lucide="rotate-ccw" aria-hidden="true"></i>
              <span>Reiniciar demo</span>
            </button>
          </div>
        </section>
      </div>

      <section class="experience-tour-panel" role="dialog" aria-modal="false" aria-labelledby="experienceTourTitle" hidden>
        <div class="experience-tour-head">
          <div>
            <p class="eyebrow" data-tour-progress>Paso 1 de 1</p>
            <h2 id="experienceTourTitle" data-tour-title>Recorrido de la demo</h2>
          </div>
          <button class="experience-close-button" type="button" data-tour-close aria-label="Cerrar recorrido" title="Cerrar recorrido">
            <i data-lucide="x" aria-hidden="true"></i>
          </button>
        </div>
        <p data-tour-description></p>
        <div class="experience-tour-meter" aria-hidden="true"><span data-tour-meter></span></div>
        <div class="experience-tour-actions">
          <button class="secondary-link" type="button" data-tour-previous>
            <i data-lucide="arrow-left" aria-hidden="true"></i>
            Anterior
          </button>
          <button class="primary-link" type="button" data-tour-next>
            <span data-tour-next-label>Siguiente</span>
            <i data-lucide="arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </section>

      <div class="experience-live" role="status" aria-live="polite" hidden></div>
    `;

    body.appendChild(layer);
  }

  function dialogHeader(icon, title, titleId, description) {
    return `
      <header class="experience-dialog-head">
        <div class="experience-dialog-heading">
          <span class="experience-dialog-icon"><i data-lucide="${icon}" aria-hidden="true"></i></span>
          <div>
            <h2 id="${titleId}">${title}</h2>
            <p>${description}</p>
          </div>
        </div>
        <button class="experience-close-button" type="button" data-experience-close aria-label="Cerrar" title="Cerrar">
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
      </header>
    `;
  }

  function bindExperienceActions() {
    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("keydown", handleGlobalKeydown);
    document.addEventListener("click", interceptLegacyTour, true);

    const searchInput = document.querySelector("[data-experience-search]");
    searchInput?.addEventListener("input", () => renderSearchResults(searchInput.value));
  }

  function handleGlobalClick(event) {
    const actionButton = event.target.closest("[data-experience-action]");
    if (actionButton) {
      runExperienceAction(actionButton.dataset.experienceAction, actionButton);
      return;
    }

    const closeButton = event.target.closest("[data-experience-close]");
    if (closeButton) {
      closeOverlay();
      return;
    }

    const overlay = event.target.closest("[data-experience-overlay]");
    if (overlay && event.target === overlay) {
      closeOverlay();
      return;
    }

    const searchResult = event.target.closest("[data-search-view]");
    if (searchResult) {
      openView(searchResult.dataset.searchView, searchResult.dataset.searchText);
      closeOverlay();
      addActivity("Resultado consultado", searchResult.dataset.searchText || "Se abrió un resultado de la búsqueda.");
      return;
    }

    const stateButton = event.target.closest("[data-system-state]");
    if (stateButton) {
      renderSystemState(stateButton.dataset.systemState);
      return;
    }

    if (event.target.closest("[data-state-retry]")) {
      retrySystemState();
      return;
    }

    if (event.target.closest("[data-state-clear]")) {
      renderSystemState("success");
      addActivity("Vista restablecida", "Se limpiaron los filtros simulados.");
      return;
    }

    if (event.target.closest("[data-confirm-reset]")) {
      confirmReset();
      return;
    }

    if (event.target.closest("[data-tour-close]")) {
      closeTour(false);
      return;
    }

    if (event.target.closest("[data-tour-previous]")) {
      moveTour(-1);
      return;
    }

    if (event.target.closest("[data-tour-next]")) {
      moveTour(1);
    }
  }

  function interceptLegacyTour(event) {
    const trigger = event.target.closest("[data-demo-flow]");
    if (!trigger) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    startTour(trigger);
  }

  function runExperienceAction(action, trigger) {
    if (action === "tour") startTour(trigger);
    if (action === "presentation") enterPresentation();
    if (action === "exit-presentation") exitPresentation();
    if (action === "search") openOverlay("search", trigger);
    if (action === "states") openOverlay("states", trigger);
    if (action === "activity") openOverlay("activity", trigger);
    if (action === "reset") openOverlay("reset", trigger);
  }

  function openOverlay(name, trigger) {
    closeTour(false);
    closeOverlay(false);
    const overlay = document.querySelector(`[data-experience-overlay="${name}"]`);
    if (!overlay) return;

    state.activeOverlay = name;
    state.lastTrigger = trigger || document.activeElement;
    overlay.hidden = false;
    body.classList.add("experience-dialog-open");

    if (name === "search") {
      const input = overlay.querySelector("[data-experience-search]");
      input.value = "";
      renderSearchResults("");
      window.requestAnimationFrame(() => input.focus());
    } else {
      window.requestAnimationFrame(() => {
        const firstControl = overlay.querySelector("button:not([disabled]), input:not([disabled]), a[href]");
        const dialog = overlay.querySelector("[role='dialog'], [role='alertdialog']");
        (firstControl || dialog)?.focus();
      });
    }

    if (name === "activity") {
      state.unread = 0;
      updateActivityCount();
      renderActivity();
    }
  }

  function closeOverlay(restoreFocus = true) {
    const active = document.querySelector("[data-experience-overlay]:not([hidden])");
    if (!active) return;

    active.hidden = true;
    state.activeOverlay = null;
    body.classList.remove("experience-dialog-open");

    if (restoreFocus && state.lastTrigger instanceof HTMLElement) {
      state.lastTrigger.focus();
    }
  }

  function handleGlobalKeydown(event) {
    if (event.key === "Escape") {
      if (!document.querySelector(".experience-tour-panel[hidden]")) {
        closeTour(false);
      } else if (state.activeOverlay) {
        closeOverlay();
      } else if (body.classList.contains("presentation-mode")) {
        exitPresentation();
      }
      return;
    }

    if (event.key !== "Tab" || !state.activeOverlay) return;
    const dialog = document.querySelector("[data-experience-overlay]:not([hidden]) .experience-dialog");
    if (!dialog) return;

    const focusable = Array.from(
      dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
    ).filter((element) => !element.hidden && element.offsetParent !== null);

    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function enterPresentation() {
    closeOverlay(false);
    closeTour(false);
    document.querySelectorAll("details[open]").forEach((details) => {
      details.open = false;
    });
    body.classList.add("presentation-mode");
    const exitButton = document.querySelector(".presentation-exit");
    const presentationButton = document.querySelector('[data-experience-action="presentation"]');
    exitButton.hidden = false;
    presentationButton?.setAttribute("aria-pressed", "true");
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
    addActivity("Modo presentación activado", "La navegación secundaria quedó oculta para mostrar la solución.");
  }

  function exitPresentation() {
    body.classList.remove("presentation-mode");
    const exitButton = document.querySelector(".presentation-exit");
    const presentationButton = document.querySelector('[data-experience-action="presentation"]');
    exitButton.hidden = true;
    presentationButton?.setAttribute("aria-pressed", "false");
    presentationButton?.focus();
  }

  function startTour(trigger) {
    closeOverlay(false);
    document.querySelectorAll("details[open]").forEach((details) => {
      details.open = false;
    });

    state.lastTrigger = trigger || document.activeElement;
    state.tourSteps = buildTourSteps();
    state.tourIndex = 0;
    const panel = document.querySelector(".experience-tour-panel");
    panel.hidden = false;
    renderTourStep();
    panel.querySelector("[data-tour-next]")?.focus();
    addActivity("Recorrido iniciado", `Presentación guiada de ${getDemoName()}.`);
  }

  function buildTourSteps() {
    const views = getAvailableViews();
    const operational = views.find((view) => !["overview", "reportes", "chatbot", "asistente"].includes(view.id));
    const reports = views.find((view) => view.id === "reportes");
    const assistant = views.find((view) => ["chatbot", "asistente"].includes(view.id));

    return [
      {
        selector: ".app-title",
        title: "Contexto del negocio",
        description: "Presenta el problema operativo y el alcance de la solución antes de entrar en los módulos.",
      },
      {
        selector: ".medical-hero, .industry-hero",
        title: "Proceso conectado",
        description: "Este resumen convierte tareas aisladas en un flujo visible, trazable y fácil de explicar al cliente.",
      },
      {
        selector: ".metrics-grid",
        title: "Indicadores clave",
        description: "Los KPI permiten detectar prioridades y respaldar decisiones con información actualizada.",
      },
      {
        selector: ".view-tabs",
        title: "Módulos integrados",
        description: "Cada pestaña representa un área del sistema y conserva una experiencia consistente en todos los rubros.",
      },
      operational
        ? {
            view: operational.id,
            selector: `#view-${operational.id} .module-panel, #view-${operational.id}`,
            title: operational.label,
            description: "Aquí se ejecuta la operación principal y se registra cada cambio para mantener trazabilidad.",
          }
        : null,
      reports
        ? {
            view: reports.id,
            selector: `#view-${reports.id} .module-panel, #view-${reports.id}`,
            title: "Reportes y seguimiento",
            description: "La demo reúne tableros, PDF y preparación de emails sin realizar envíos externos reales.",
          }
        : null,
      assistant
        ? {
            view: assistant.id,
            selector: `#view-${assistant.id} .module-panel, #view-${assistant.id}`,
            title: assistant.label,
            description: "El asistente simula consultas frecuentes y muestra cómo derivar casos que requieren intervención humana.",
          }
        : null,
    ].filter(Boolean);
  }

  function renderTourStep() {
    const step = state.tourSteps[state.tourIndex];
    if (!step) return;

    if (step.view) activateView(step.view);
    clearTourHighlight();

    const target = document.querySelector(step.selector);
    if (target) {
      state.highlightedTarget = target;
      target.classList.add("experience-tour-highlight");
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
      });
    }

    const panel = document.querySelector(".experience-tour-panel");
    const total = state.tourSteps.length;
    panel.querySelector("[data-tour-progress]").textContent = `Paso ${state.tourIndex + 1} de ${total}`;
    panel.querySelector("[data-tour-title]").textContent = step.title;
    panel.querySelector("[data-tour-description]").textContent = step.description;
    panel.querySelector("[data-tour-meter]").style.width = `${((state.tourIndex + 1) / total) * 100}%`;
    panel.querySelector("[data-tour-previous]").disabled = state.tourIndex === 0;
    panel.querySelector("[data-tour-next-label]").textContent = state.tourIndex === total - 1 ? "Finalizar" : "Siguiente";
  }

  function moveTour(direction) {
    const isLastStep = state.tourIndex === state.tourSteps.length - 1;
    if (direction > 0 && isLastStep) {
      closeTour(true);
      return;
    }

    state.tourIndex = Math.max(0, Math.min(state.tourSteps.length - 1, state.tourIndex + direction));
    renderTourStep();
  }

  function closeTour(completed) {
    const panel = document.querySelector(".experience-tour-panel");
    if (!panel || panel.hidden) return;

    panel.hidden = true;
    clearTourHighlight();
    if (completed) {
      addActivity("Recorrido completado", "Se recorrieron los módulos clave de la solución.", "success");
      showLiveNotice("Recorrido completado.");
    }
  }

  function clearTourHighlight() {
    state.highlightedTarget?.classList.remove("experience-tour-highlight");
    state.highlightedTarget = null;
  }

  function getAvailableViews() {
    const controls = Array.from(document.querySelectorAll(".view-tabs [data-view], .side-nav [data-view]"));
    const seen = new Set();

    return controls.reduce((views, control) => {
      const id = control.dataset.view;
      if (!id || seen.has(id)) return views;
      seen.add(id);
      views.push({ id, label: cleanText(control.textContent) || formatLabel(id) });
      return views;
    }, []);
  }

  function renderSearchResults(query) {
    const container = document.querySelector("[data-experience-search-results]");
    if (!container) return;

    const normalizedQuery = normalizeText(query);
    const index = buildSearchIndex();
    const results = normalizedQuery
      ? index.filter((item) => normalizeText(`${item.title} ${item.meta}`).includes(normalizedQuery)).slice(0, 12)
      : index.filter((item) => item.type === "module").slice(0, 9);

    if (!results.length) {
      container.innerHTML = `
        <div class="experience-search-empty">
          <i data-lucide="search-x" aria-hidden="true"></i>
          <strong>Sin coincidencias</strong>
          <p>Prueba con el nombre de un módulo, una persona o un estado.</p>
        </div>
      `;
      refreshIcons();
      return;
    }

    container.innerHTML = results
      .map(
        (item) => `
          <button
            class="experience-search-result"
            type="button"
            data-search-view="${escapeHtml(item.view)}"
            data-search-text="${escapeHtml(item.title)}"
          >
            <span class="experience-result-icon"><i data-lucide="${item.type === "module" ? "panel-top" : "file-search"}" aria-hidden="true"></i></span>
            <span>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.meta)}</small>
            </span>
            <i data-lucide="arrow-up-right" aria-hidden="true"></i>
          </button>
        `,
      )
      .join("");
    refreshIcons();
  }

  function buildSearchIndex() {
    const index = getAvailableViews().map((view) => ({
      type: "module",
      title: view.label,
      meta: "Módulo de la demo",
      view: view.id,
    }));
    const seen = new Set(index.map((item) => `${item.view}:${normalizeText(item.title)}`));
    const contentSelectors = [
      ".view-panel h2",
      ".view-panel h3",
      ".view-panel .record-item strong",
      ".view-panel .appointment-item strong",
      ".view-panel .task-item strong",
      ".view-panel .delivery-card strong",
      ".view-panel td:first-child",
    ].join(",");

    document.querySelectorAll(contentSelectors).forEach((element) => {
      const title = cleanText(element.textContent);
      const panel = element.closest(".view-panel");
      const view = panel?.id.replace(/^view-/, "");
      const key = `${view}:${normalizeText(title)}`;
      if (!title || !view || title.length > 90 || seen.has(key)) return;
      seen.add(key);
      const moduleLabel = getAvailableViews().find((item) => item.id === view)?.label || formatLabel(view);
      index.push({ type: "record", title, meta: `Registro en ${moduleLabel}`, view });
    });

    return index;
  }

  function openView(view, searchText) {
    activateView(view);
    window.requestAnimationFrame(() => {
      const panel = document.getElementById(`view-${view}`);
      if (!panel) return;
      const target = searchText
        ? Array.from(panel.querySelectorAll("h2, h3, strong, td")).find((element) => cleanText(element.textContent) === searchText)
        : null;
      (target || panel).scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    });
  }

  function activateView(view) {
    const controls = Array.from(document.querySelectorAll(`[data-view="${view}"]`));
    const preferred = controls.find((control) => control.closest(".view-tabs")) || controls[0];
    preferred?.click();
  }

  function renderSystemState(type) {
    document.querySelectorAll("[data-system-state]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.systemState === type));
    });

    const preview = document.querySelector("[data-system-state-preview]");
    if (!preview) return;

    const content = {
      loading: `
        <div class="experience-state-heading"><span class="experience-spinner" aria-hidden="true"></span><div><strong>Actualizando información</strong><p>Consultando registros y recalculando indicadores.</p></div></div>
        <div class="experience-skeleton" aria-label="Contenido cargando"><span></span><span></span><span></span></div>
      `,
      success: `
        <div class="experience-state-message is-success"><i data-lucide="circle-check" aria-hidden="true"></i><div><strong>Operación completada</strong><p>Los datos quedaron actualizados y listos para continuar.</p></div></div>
      `,
      error: `
        <div class="experience-state-message is-error"><i data-lucide="triangle-alert" aria-hidden="true"></i><div><strong>No se pudo completar la consulta</strong><p>La interfaz conserva los datos y permite reintentar sin perder el trabajo.</p></div></div>
        <button class="secondary-link" type="button" data-state-retry><i data-lucide="refresh-cw" aria-hidden="true"></i>Reintentar</button>
      `,
      empty: `
        <div class="experience-state-message"><i data-lucide="inbox" aria-hidden="true"></i><div><strong>No hay resultados para estos filtros</strong><p>Ajusta los criterios o restablece la vista para consultar todos los registros.</p></div></div>
        <button class="secondary-link" type="button" data-state-clear><i data-lucide="filter-x" aria-hidden="true"></i>Limpiar filtros</button>
      `,
    };

    preview.innerHTML = content[type] || content.loading;
    refreshIcons();
  }

  function retrySystemState() {
    renderSystemState("loading");
    addActivity("Reintento iniciado", "Se volvió a consultar la fuente de datos simulada.");
    window.setTimeout(() => {
      renderSystemState("success");
      addActivity("Consulta recuperada", "La información volvió a estar disponible.", "success");
    }, reducedMotion.matches ? 50 : 700);
  }

  function seedActivity() {
    const demoName = getDemoName();
    addActivity("Demo preparada", `${demoName} está lista para presentar.`, "success", false);
    addActivity("Datos ficticios cargados", "Los registros pueden modificarse sin afectar sistemas reales.", "info", false);
    addActivity("Reportes disponibles", "El tablero, el PDF y la vista previa de email están habilitados.", "info", false);
    state.unread = state.activity.length;
    updateActivityCount();
  }

  function observeDemoActivity() {
    const toast = document.getElementById("toast");
    if (!toast) return;

    const observer = new MutationObserver(() => {
      if (!toast.classList.contains("show")) return;
      const message = cleanText(toast.textContent);
      const now = Date.now();
      if (!message || (message === state.lastToastMessage && now - state.lastToastAt < 1500)) return;
      state.lastToastMessage = message;
      state.lastToastAt = now;
      addActivity("Acción realizada", message, "success");
    });

    observer.observe(toast, { attributes: true, childList: true, characterData: true, subtree: true });
  }

  function addActivity(title, detail, kind = "info", incrementUnread = true) {
    state.activity.unshift({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      time: new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
      title,
      detail,
      kind,
    });
    state.activity = state.activity.slice(0, 20);

    if (incrementUnread && state.activeOverlay !== "activity") state.unread += 1;
    updateActivityCount();
    renderActivity();
  }

  function renderActivity() {
    const container = document.querySelector("[data-experience-activity-list]");
    if (!container) return;

    container.innerHTML = state.activity
      .map(
        (item) => `
          <article class="experience-activity-item">
            <span class="experience-activity-dot ${item.kind === "success" ? "is-success" : ""}" aria-hidden="true"></span>
            <div>
              <div class="experience-activity-title"><strong>${escapeHtml(item.title)}</strong><time>${escapeHtml(item.time)}</time></div>
              <p>${escapeHtml(item.detail)}</p>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function updateActivityCount() {
    const count = document.querySelector("[data-activity-count]");
    const button = document.querySelector('[data-experience-action="activity"]');
    if (!count || !button) return;

    count.textContent = String(Math.min(state.unread, 9));
    count.hidden = state.unread === 0;
    button.setAttribute("aria-label", state.unread ? `Actividad, ${state.unread} novedades` : "Actividad");
  }

  function confirmReset() {
    const button = document.querySelector("[data-confirm-reset]");
    if (!button) return;

    button.disabled = true;
    button.querySelector("span").textContent = "Restableciendo...";
    button.querySelector("svg")?.classList.add("experience-spin");
    sessionStorage.setItem("sc-demo-reset", slug);
    window.setTimeout(() => window.location.reload(), reducedMotion.matches ? 50 : 500);
  }

  function restoreResetFeedback() {
    if (sessionStorage.getItem("sc-demo-reset") !== slug) return;
    sessionStorage.removeItem("sc-demo-reset");
    addActivity("Datos restablecidos", "La demo volvió a su estado ficticio inicial.", "success");
    showLiveNotice("Datos ficticios restablecidos correctamente.");
  }

  function showLiveNotice(message) {
    const notice = document.querySelector(".experience-live");
    if (!notice) return;
    notice.textContent = message;
    notice.hidden = false;
    window.setTimeout(() => {
      notice.hidden = true;
    }, 3200);
  }

  function getDemoName() {
    return cleanText(document.querySelector(".sidebar .brand strong")?.textContent) || cleanText(document.querySelector(".app-title h1")?.textContent) || "La demo";
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function normalizeText(value) {
    return cleanText(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function formatLabel(value) {
    const text = String(value || "").replace(/[-_]/g, " ");
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function refreshIcons() {
    window.lucide?.createIcons();
  }
})();
