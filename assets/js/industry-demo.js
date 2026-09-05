(function () {
  const slug = document.body.dataset.demoSlug;
  const config = window.SCIndustryDemos?.[slug];

  if (!config) {
    return;
  }

  const records = config.records.map((record) => ({ ...record }));
  const tasks = config.tasks.map((task) => ({ ...task }));
  const initialRecordCount = records.length;
  const state = {
    selectedRecordId: records[0]?.id,
    chatReady: false,
    activeRecordMenu: null,
    guidedDemoRun: 0,
    suppressMenuCloseUntil: 0,
    reportEvents: [...(config.reports?.events || [])],
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  document.addEventListener("DOMContentLoaded", () => {
    hydrateStaticContent();
    ensureReportsPanel();
    renderNavigation();
    bindViewControls();
    bindDropdowns();
    bindForm();
    bindChatbot();
    bindGuidedDemo();
    setupRevealAnimations();
    renderAll();
    refreshIcons();
  });

  function hydrateStaticContent() {
    document.title = `${config.pageTitle} | SC Mockups Ventas`;
    $("#demoSidebarLabel").textContent = config.appLabel;
    $("#demoSidebarNote").textContent = config.sidebarNote;
    $("#demoArgument").textContent = config.argument;
    $("#demoEyebrow").textContent = config.eyebrow;
    $("#demoHeadline").textContent = config.headline;
    $("#demoDescription").textContent = config.description;
    $("#demoHero").style.setProperty("--demo-hero-image", `url("${config.heroImage}")`);
    $("#demoHeroEyebrow").textContent = `${config.pageTitle} SC`;
    $("#demoHeroTitle").textContent = config.heroTitle;
    $("#demoHeroDescription").textContent = config.heroDescription;
    $("#demoPrimaryActionLabel").textContent = config.primaryAction;
    $("#overviewListTitle").textContent = config.listTitle;
    $("#overviewListSubtitle").textContent = config.listSubtitle;
    $("#detailTitle").textContent = config.detailTitle;
    $("#detailSubtitle").textContent = config.detailSubtitle;
    $("#formTitle").textContent = config.formTitle;
    $("#formSubtitle").textContent = config.formSubtitle;
    $("#listAfterTitle").textContent = config.listAfterTitle;
    $("#listAfterSubtitle").textContent = config.listAfterSubtitle;
    $("#pipelineTitle").textContent = config.pipelineTitle;
    $("#pipelineSubtitle").textContent = config.pipelineSubtitle;
    $("#taskTitle").textContent = config.taskTitle;
    $("#taskSubtitle").textContent = config.taskSubtitle;
    $("#resourcesTitle").textContent = config.resourcesTitle;
    $("#resourcesSubtitle").textContent = config.resourcesSubtitle;
    $("#assistantTitle").textContent = config.assistantTitle;
    $("#assistantSubtitle").textContent = config.assistantSubtitle;
    $("#quickReplyTitle").textContent = config.quickReplyTitle;
    $("#quickReplySubtitle").textContent = config.quickReplySubtitle;
    $("#demoFormSubmitLabel").textContent = config.formTitle.replace(/^Nuevo |^Nueva /, "Confirmar ");

    const workflow = config.reports && !config.workflow.some((step) => normalizeText(step.label) === "reporte")
      ? [...config.workflow, { icon: "bar-chart-3", label: "Reporte" }]
      : config.workflow;

    $("#heroWorkflow").innerHTML = workflow
      .map(
        (step) => `
          <span><i data-lucide="${escapeHtml(step.icon)}" aria-hidden="true"></i> ${escapeHtml(step.label)}</span>
        `,
      )
      .join("");

    const actionMenu = $(".action-dropdown .dropdown-menu");
    if (config.reports && actionMenu && !actionMenu.querySelector("[data-view='reportes']")) {
      actionMenu.insertAdjacentHTML("beforeend", `<button type="button" data-view="reportes">Ver reportes</button>`);
    }
  }

  function renderNavigation() {
    const nav = $("#demoNav");
    const tabs = $("#demoTabs");
    const views = getViews();

    nav.innerHTML = views
      .map(
        (view, index) => `
          <button class="nav-button ${index === 0 ? "active" : ""}" type="button" data-view="${escapeHtml(view.id)}">
            <i data-lucide="${escapeHtml(view.icon)}" aria-hidden="true"></i>
            ${escapeHtml(view.label)}
          </button>
        `,
      )
      .join("");

    tabs.innerHTML = views
      .map(
        (view, index) => `
          <button class="tab-button ${index === 0 ? "active" : ""}" type="button" data-view="${escapeHtml(view.id)}">${escapeHtml(view.label)}</button>
        `,
      )
      .join("");
  }

  function bindViewControls() {
    document.addEventListener("click", (event) => {
      const control = event.target.closest?.("[data-view]");
      if (!control) return;
      setView(control.dataset.view);
    });
  }

  function bindDropdowns() {
    document.addEventListener("click", (event) => {
      $$("details.nav-dropdown").forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
          dropdown.open = false;
        }
      });

      const menu = $(".floating-row-menu");
      const clickedMenuButton = event.target.closest?.(".row-menu-button");
      if (menu && !menu.contains(event.target) && !clickedMenuButton) {
        closeRecordMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeRecordMenu();
      }
    });

    window.addEventListener("resize", closeRecordMenu);
    window.addEventListener("scroll", () => {
      if (Date.now() < state.suppressMenuCloseUntil) return;
      closeRecordMenu();
    }, true);
  }

  function bindForm() {
    const form = $("#demoQuickForm");
    if (!form) return;

    renderFormFields();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const record = {
        id: `${slug}-${Date.now()}`,
        title: String(data.get("title") || "Registro demo").trim(),
        subtitle: String(data.get("subtitle") || config.formTitle).trim(),
        meta: String(data.get("meta") || "Carga demo").trim(),
        status: "Nuevo",
        stage: config.pipelineStages[0],
        initials: getInitials(String(data.get("title") || config.appLabel)),
        amount: String(data.get("amount") || "A definir").trim(),
        notes: String(data.get("notes") || "Registro creado desde la demo.").trim(),
        fields: config.formFields
          .filter((field) => data.has(field.name))
          .map((field) => ({
            label: field.label,
            value: String(data.get(field.name) || "").trim() || "A definir",
          })),
      };

      records.unshift(record);
      state.selectedRecordId = record.id;
      form.reset();
      renderAll();
      setView("operacion");
      showToast(`Registro demo creado desde ${config.formTitle.toLowerCase()}.`);
    });
  }

  function bindChatbot() {
    const form = $("#industryChatForm");
    const input = $("#industryChatInput");

    if (!form || !input) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = input.value.trim();
      if (!message) return;
      input.value = "";
      handleChatMessage(message);
    });
  }

  function bindGuidedDemo() {
    const trigger = $("[data-demo-flow]");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      runGuidedDemo();
    });
  }

  function renderAll() {
    renderMetrics();
    renderRecords("#primaryList", records);
    renderRecords("#recordsList", records);
    renderSelectedRecord();
    renderPipeline();
    renderTasks();
    renderResources();
    renderReports();
    renderChatIntro();
    renderQuickReplies();
    window.SCAnimations?.refresh?.();
    refreshIcons();
  }

  function renderMetrics() {
    $("#industryMetrics").innerHTML = config.metrics
      .map((metric) => {
        const value = getMetricValue(metric);
        const countAttribute = Number.isFinite(Number(value)) ? ` data-count="${Number(value)}"` : "";

        return `
          <article class="metric-card">
            <span><i data-lucide="${escapeHtml(metric.icon)}" aria-hidden="true"></i> ${escapeHtml(metric.label)}</span>
            <strong${countAttribute}>${escapeHtml(value)}</strong>
            <small>${escapeHtml(metric.note)}</small>
          </article>
        `;
      })
      .join("");
  }

  function renderRecords(selector, sourceRecords) {
    const container = $(selector);
    if (!container) return;

    container.innerHTML = sourceRecords
      .map(
        (record) => `
          <article class="record-item ${record.id === state.selectedRecordId ? "selected" : ""}">
            <button class="record-select" type="button" data-record-select="${escapeHtml(record.id)}">
              <span class="record-avatar">${escapeHtml(record.initials)}</span>
              <span class="record-main">
                <strong>${escapeHtml(record.title)}</strong>
                <span>${escapeHtml(record.subtitle)} · ${escapeHtml(record.meta)}</span>
                <em>${escapeHtml(record.notes)}</em>
              </span>
            </button>
            <div class="row-actions">
              <span class="tag ${getStatusClass(record.status)}">${escapeHtml(record.status)}</span>
              <button class="row-menu-button" type="button" data-record-id="${escapeHtml(record.id)}" aria-label="Acciones del registro">
                <i data-lucide="more-horizontal" aria-hidden="true"></i>
              </button>
            </div>
          </article>
        `,
      )
      .join("");

    container.querySelectorAll("[data-record-select]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedRecordId = button.dataset.recordSelect;
        renderAll();
      });
    });

    container.querySelectorAll("[data-record-id]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        openRecordMenu(button, button.dataset.recordId);
      });
    });
  }

  function renderSelectedRecord() {
    const record = getSelectedRecord();
    $("#selectedRecord").innerHTML = `
      <div class="patient-card">
        <div class="patient-avatar">${escapeHtml(record.initials)}</div>
        <div>
          <h3>${escapeHtml(record.title)}</h3>
          <p>${escapeHtml(record.subtitle)} · ${escapeHtml(record.meta)}</p>
        </div>
      </div>
      <div class="patient-meta">
        ${record.fields
          .map(
            (field) => `
              <div>
                <span>${escapeHtml(field.label)}</span>
                <strong>${escapeHtml(field.value)}</strong>
              </div>
            `,
          )
          .join("")}
        <div>
          <span>Importe</span>
          <strong>${escapeHtml(record.amount)}</strong>
        </div>
        <div>
          <span>Estado</span>
          <strong>${escapeHtml(record.status)}</strong>
        </div>
      </div>
    `;
  }

  function renderPipeline() {
    $("#pipelineBoard").innerHTML = config.pipelineStages
      .map((stage) => {
        const stageRecords = records.filter((record) => record.stage === stage);

        return `
          <article class="kanban-column">
            <div class="kanban-head">
              <strong>${escapeHtml(stage)}</strong>
              <span>${stageRecords.length}</span>
            </div>
            <div class="kanban-list">
              ${
                stageRecords.length
                  ? stageRecords.map(renderKanbanCard).join("")
                  : `<div class="empty-state compact">Sin registros</div>`
              }
            </div>
          </article>
        `;
      })
      .join("");

    $("#pipelineBoard").querySelectorAll("[data-record-select]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedRecordId = button.dataset.recordSelect;
        renderAll();
        showToast(`Registro seleccionado: ${getSelectedRecord().title}.`);
      });
    });
  }

  function renderKanbanCard(record) {
    return `
      <button class="kanban-card" type="button" data-record-select="${escapeHtml(record.id)}">
        <strong>${escapeHtml(record.title)}</strong>
        <span>${escapeHtml(record.subtitle)}</span>
        <small>${escapeHtml(record.amount)}</small>
      </button>
    `;
  }

  function renderTasks() {
    $("#taskList").innerHTML = tasks
      .map(
        (task) => `
          <article class="task-item">
            <div>
              <strong>${escapeHtml(task.title)}</strong>
              <span>${escapeHtml(task.meta)}</span>
            </div>
            <span class="tag ${getStatusClass(task.status)}">${escapeHtml(task.status)}</span>
          </article>
        `,
      )
      .join("");
  }

  function renderResources() {
    $("#resourceGrid").innerHTML = config.resources
      .map(
        (resource) => `
          <article class="catalog-card">
            <div class="catalog-card-head">
              <strong>${escapeHtml(resource.title)}</strong>
              <span class="tag ${getStatusClass(resource.status)}">${escapeHtml(resource.status)}</span>
            </div>
            <p>${escapeHtml(resource.subtitle)}</p>
            <small>${escapeHtml(resource.meta)}</small>
          </article>
        `,
      )
      .join("");
  }

  function renderReports() {
    const reports = config.reports;
    if (!reports || !$("#view-reportes")) return;

    $("#reportTitle").textContent = reports.title;
    $("#reportSubtitle").textContent = reports.subtitle;
    $("#reportDashboardName").textContent = reports.dashboard;
    $("#reportRange").textContent = reports.range;
    $("#reportSchedule").textContent = reports.schedule;
    $("#reportRecipient").textContent = reports.recipient;

    $("#reportPanels").innerHTML = reports.panels
      .map(
        (panel) => `
          <article class="report-card">
            <div class="report-card-head">
              <span><i data-lucide="${escapeHtml(panel.icon)}" aria-hidden="true"></i> ${escapeHtml(panel.label)}</span>
              <small>${escapeHtml(panel.trend)}</small>
            </div>
            <strong>${escapeHtml(panel.value)}</strong>
            <p>${escapeHtml(panel.detail)}</p>
            <div class="mini-chart" aria-hidden="true">
              ${panel.series.map((value) => `<span style="height: ${Math.max(18, Math.min(100, Number(value)))}%"></span>`).join("")}
            </div>
          </article>
        `,
      )
      .join("");

    $("#reportDelivery").innerHTML = reports.delivery
      .map(
        (item) => `
          <article class="delivery-card">
            <i data-lucide="${escapeHtml(item.icon)}" aria-hidden="true"></i>
            <div>
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.detail)}</span>
            </div>
            <em class="tag ${getStatusClass(item.status)}">${escapeHtml(item.status)}</em>
          </article>
        `,
      )
      .join("");

    renderReportLog();

    $$("[data-report-action]").forEach((button) => {
      if (button.dataset.reportBound === "true") return;
      button.dataset.reportBound = "true";
      button.addEventListener("click", () => {
        handleReportAction(button.dataset.reportAction);
      });
    });
  }

  function renderReportLog() {
    const log = $("#reportEventLog");
    if (!log) return;

    log.innerHTML = state.reportEvents
      .slice(0, 4)
      .map(
        (event) => `
          <article class="report-log-item">
            <span>${escapeHtml(event.time)}</span>
            <div>
              <strong>${escapeHtml(event.title)}</strong>
              <small>${escapeHtml(event.detail)}</small>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function renderFormFields() {
    $("#formFields").innerHTML = config.formFields
      .map((field) => {
        const required = field.required ? " required" : "";

        if (field.type === "select") {
          return `
            <div class="form-field">
              <label for="${escapeHtml(field.name)}">${escapeHtml(field.label)}</label>
              <select id="${escapeHtml(field.name)}" name="${escapeHtml(field.name)}"${required}>
                ${field.options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}
              </select>
            </div>
          `;
        }

        if (field.type === "textarea") {
          return `
            <div class="form-field full">
              <label for="${escapeHtml(field.name)}">${escapeHtml(field.label)}</label>
              <textarea id="${escapeHtml(field.name)}" name="${escapeHtml(field.name)}" placeholder="${escapeHtml(field.placeholder)}"${required}></textarea>
            </div>
          `;
        }

        return `
          <div class="form-field">
            <label for="${escapeHtml(field.name)}">${escapeHtml(field.label)}</label>
            <input id="${escapeHtml(field.name)}" name="${escapeHtml(field.name)}" type="${escapeHtml(field.type)}" placeholder="${escapeHtml(field.placeholder)}"${required} />
          </div>
        `;
      })
      .join("");
  }

  function renderChatIntro() {
    const stream = $("#industryChatStream");
    if (!stream || state.chatReady) return;

    state.chatReady = true;
    stream.innerHTML = `
      <div class="message bot">
        Hola, soy el asistente demo de ${escapeHtml(config.appLabel)}. Puedo responder consultas, crear tareas y derivar acciones al equipo.
      </div>
    `;
  }

  function renderQuickReplies() {
    $("#industryQuickReplies").innerHTML = config.quickReplies
      .map(
        (message) => `
          <button class="quick-reply" type="button" data-message="${escapeHtml(message)}">
            <i data-lucide="sparkles" aria-hidden="true"></i>
            ${escapeHtml(message)}
          </button>
        `,
      )
      .join("");

    $("#industryQuickReplies").querySelectorAll("[data-message]").forEach((button) => {
      button.addEventListener("click", () => {
        handleChatMessage(button.dataset.message);
      });
    });
  }

  function handleChatMessage(message) {
    addMessage("user", message);
    window.setTimeout(() => {
      addMessage("bot", buildBotResponse(message));
    }, 240);
  }

  function buildBotResponse(message) {
    const normalized = normalizeText(message);
    const match = config.responses.find((response) => {
      return response.keywords.some((keyword) => normalized.includes(normalizeText(keyword)));
    });

    return match?.text || config.fallbackResponse;
  }

  function addMessage(type, text) {
    const stream = $("#industryChatStream");
    if (!stream) return;

    const bubble = document.createElement("div");
    bubble.className = `message ${type}`;
    bubble.textContent = text;
    stream.appendChild(bubble);
    stream.scrollTop = stream.scrollHeight;
  }

  function openRecordMenu(anchor, recordId) {
    const record = records.find((item) => item.id === recordId);
    if (!record) return;

    const currentMenu = $(".floating-row-menu");
    if (currentMenu && state.activeRecordMenu === recordId) {
      closeRecordMenu();
      return;
    }

    closeRecordMenu();
    state.activeRecordMenu = recordId;
    state.suppressMenuCloseUntil = Date.now() + 260;
    anchor.setAttribute("aria-expanded", "true");

    const menu = document.createElement("div");
    menu.className = "floating-row-menu";
    menu.setAttribute("role", "menu");
    menu.innerHTML = `
      <div class="floating-menu-head">
        <strong>${escapeHtml(record.title)}</strong>
        <span>${escapeHtml(record.subtitle)}</span>
      </div>
      <button type="button" role="menuitem" data-floating-action="detalle">
        <i data-lucide="panel-top" aria-hidden="true"></i>
        Abrir detalle
      </button>
      <button type="button" role="menuitem" data-floating-action="aviso">
        <i data-lucide="bell-ring" aria-hidden="true"></i>
        Enviar aviso
      </button>
      <button type="button" role="menuitem" data-floating-action="avance">
        <i data-lucide="badge-check" aria-hidden="true"></i>
        Marcar avance
      </button>
    `;

    document.body.appendChild(menu);
    positionFloatingMenu(anchor, menu);

    menu.querySelectorAll("[data-floating-action]").forEach((button) => {
      button.addEventListener("click", () => {
        handleRecordAction(button.dataset.floatingAction, record);
      });
    });

    refreshIcons();
    window.SCAnimations?.menuIn?.(menu);
  }

  function handleRecordAction(action, record) {
    state.selectedRecordId = record.id;
    closeRecordMenu();

    if (action === "detalle") {
      renderAll();
      setView("overview");
      showToast(`Detalle abierto para ${record.title}.`);
      return;
    }

    if (action === "avance") {
      record.status = config.advanceStatus;
      record.stage = config.advanceStage;
      renderAll();
      showToast(`Avance marcado para ${record.title}.`);
      return;
    }

    showToast(`Aviso demo preparado para ${record.title}.`);
  }

  function closeRecordMenu() {
    $(".floating-row-menu")?.remove();
    $$(".row-menu-button").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
    state.activeRecordMenu = null;
  }

  function positionFloatingMenu(anchor, menu) {
    const rect = anchor.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const gap = 10;
    const viewportPadding = 12;

    let top = rect.bottom + gap;
    let left = rect.right - menuRect.width;

    if (top + menuRect.height > window.innerHeight - viewportPadding) {
      top = rect.top - menuRect.height - gap;
    }

    left = Math.max(viewportPadding, Math.min(left, window.innerWidth - menuRect.width - viewportPadding));
    top = Math.max(viewportPadding, Math.min(top, window.innerHeight - menuRect.height - viewportPadding));

    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }

  function runGuidedDemo() {
    closeRecordMenu();
    state.guidedDemoRun += 1;
    const runId = state.guidedDemoRun;
    showToast(`Demo guiada de ${config.appLabel} iniciada.`);

    const steps = [
      () => {
        setView("asistente");
        handleChatMessage(config.quickReplies[0]);
        window.SCAnimations?.pulse?.($("#assistantPanel"));
      },
      () => {
        setView("operacion");
        window.SCAnimations?.pulse?.($("#demoQuickForm"));
        showToast(`La operación se carga desde ${config.formTitle.toLowerCase()}.`);
      },
      () => {
        setView("crm");
        window.SCAnimations?.pulse?.($("#pipelineBoard"));
        showToast("El pipeline muestra la próxima acción del equipo.");
      },
      () => {
        setView("recursos");
        window.SCAnimations?.pulse?.($("#resourceGrid"));
        showToast("Los recursos críticos quedan visibles para decidir rápido.");
      },
      () => {
        if (!config.reports) return;
        setView("reportes");
        window.SCAnimations?.pulse?.($("#reportDashboard"));
        showToast("La reportería consolida Grafana, PDF y envíos automáticos.");
      },
    ];

    playGuidedStep(steps, 0, runId);
  }

  function playGuidedStep(steps, index, runId) {
    if (runId !== state.guidedDemoRun) return;
    if (!steps[index]) return;

    steps[index]();
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.4 : 1.25;
    window.setTimeout(() => playGuidedStep(steps, index + 1, runId), delay * 1000);
  }

  function setView(viewName) {
    if (!viewName) return;

    closeRecordMenu();
    $$(".view-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `view-${viewName}`);
    });

    $$("[data-view]").forEach((control) => {
      control.classList.toggle("active", control.dataset.view === viewName);
    });

    $$("details.nav-dropdown").forEach((dropdown) => {
      dropdown.open = false;
    });

    const activePanel = $(`#view-${viewName}`);
    window.SCAnimations?.panelIn?.(activePanel);
  }

  function ensureReportsPanel() {
    if (!config.reports || $("#view-reportes")) return;

    const panel = document.createElement("section");
    panel.className = "view-panel";
    panel.id = "view-reportes";
    panel.innerHTML = `
      <div class="wide-grid report-layout">
        <article class="module-panel report-dashboard" id="reportDashboard">
          <div class="module-head">
            <div>
              <h2 id="reportTitle"></h2>
              <p id="reportSubtitle"></p>
            </div>
            <span class="tag ok">Grafana demo</span>
          </div>
          <div class="report-toolbar" aria-label="Filtros de reportería">
            <span><i data-lucide="gauge" aria-hidden="true"></i><strong id="reportDashboardName"></strong></span>
            <span><i data-lucide="calendar-days" aria-hidden="true"></i><strong id="reportRange"></strong></span>
            <span><i data-lucide="clock" aria-hidden="true"></i><strong id="reportSchedule"></strong></span>
          </div>
          <div class="report-grid" id="reportPanels"></div>
        </article>
        <article class="module-panel">
          <div class="module-head">
            <div>
              <h2>PDF, email y alertas</h2>
              <p>Simulación de entregas automáticas para gerencia y equipos.</p>
            </div>
          </div>
          <div class="report-recipient">
            <span>Destinatarios demo</span>
            <strong id="reportRecipient"></strong>
          </div>
          <div class="delivery-stack" id="reportDelivery"></div>
          <div class="report-actions">
            <button class="secondary-link" type="button" data-report-action="grafana">
              <i data-lucide="bar-chart-3" aria-hidden="true"></i>
              Ver dashboard
            </button>
            <button class="secondary-link" type="button" data-report-action="pdf">
              <i data-lucide="file-down" aria-hidden="true"></i>
              Generar PDF
            </button>
            <button class="primary-link" type="button" data-report-action="email">
              <i data-lucide="mail-check" aria-hidden="true"></i>
              Enviar email demo
            </button>
          </div>
          <div class="report-log" id="reportEventLog" aria-live="polite"></div>
        </article>
      </div>
    `;

    const resourcesPanel = $("#view-recursos");
    if (resourcesPanel) {
      resourcesPanel.after(panel);
      return;
    }

    $(".app-main")?.appendChild(panel);
  }

  function getViews() {
    if (!config.reports || config.views.some((view) => view.id === "reportes")) {
      return config.views;
    }

    const reportView = { id: "reportes", label: "Reportes", icon: "bar-chart-3" };
    const views = [...config.views];
    const assistantIndex = views.findIndex((view) => view.id === "asistente");

    if (assistantIndex === -1) {
      views.push(reportView);
      return views;
    }

    views.splice(assistantIndex, 0, reportView);
    return views;
  }

  function handleReportAction(action) {
    const reports = config.reports;
    if (!reports) return;

    if (action === "pdf") {
      downloadReportPdf(reports);
      addReportEvent("PDF generado", `${reports.pdfName} quedó listo para descargar.`);
      showToast("PDF demo generado con indicadores y resumen ejecutivo.");
      return;
    }

    if (action === "email") {
      addReportEvent("Email preparado", `Reporte enviado en modo demo a ${reports.recipient}.`);
      showToast("Email demo preparado con PDF y CSV adjuntos. No se envió correo real.");
      return;
    }

    addReportEvent("Dashboard revisado", `Se abrió la vista ${reports.dashboard} con filtros aplicados.`);
    showToast("Dashboard Grafana demo actualizado con el período seleccionado.");
  }

  function addReportEvent(title, detail) {
    state.reportEvents.unshift({
      time: new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
      title,
      detail,
    });

    renderReportLog();
    refreshIcons();
    window.SCAnimations?.pulse?.($("#reportEventLog"));
  }

  function downloadReportPdf(reports) {
    const lines = [
      reports.pdfName,
      `Rubro: ${config.appLabel}`,
      `Dashboard: ${reports.dashboard}`,
      `Periodo: ${reports.range}`,
      `Programacion: ${reports.schedule}`,
      `Destinatarios: ${reports.recipient}`,
      "Indicadores:",
      ...reports.panels.map((panel) => `${panel.label}: ${panel.value} - ${panel.detail}`),
      "Documento demo generado por Soluciones Conectadas.",
    ];
    const blob = new Blob([buildSimplePdf(lines)], { type: "application/pdf" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = reports.fileName || `${slug}-reporte-demo.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1200);
  }

  function buildSimplePdf(lines) {
    const safeLines = lines.map(toPdfText).slice(0, 18);
    const textCommands = safeLines
      .map((line, index) => {
        if (index === 0) return `/F1 16 Tf 50 790 Td (${escapePdf(line)}) Tj`;
        return `/F1 11 Tf 0 -25 Td (${escapePdf(line)}) Tj`;
      })
      .join("\n");
    const stream = `BT\n${textCommands}\nET`;
    const objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    ];

    let body = "";
    const offsets = [0];
    objects.forEach((object, index) => {
      offsets.push(("%PDF-1.4\n" + body).length);
      body += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });

    const xrefStart = ("%PDF-1.4\n" + body).length;
    const xref = [
      "xref",
      `0 ${objects.length + 1}`,
      "0000000000 65535 f ",
      ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `),
      "trailer",
      `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
      "startxref",
      String(xrefStart),
      "%%EOF",
    ].join("\n");

    return `%PDF-1.4\n${body}${xref}`;
  }

  function toPdfText(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\x20-\x7E]/g, " ")
      .slice(0, 92);
  }

  function escapePdf(value) {
    return String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
  }

  function setupRevealAnimations() {
    const animatedItems = $$(".industry-hero, .command-bar, .metric-card, .module-panel");

    if (window.gsap) return;
    if (!("IntersectionObserver" in window)) return;

    animatedItems.forEach((item) => {
      item.style.animationPlayState = "paused";
    });

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

  function getMetricValue(metric) {
    if (metric.source === "records") {
      return metric.value + records.length - initialRecordCount;
    }

    return metric.value;
  }

  function getSelectedRecord() {
    return records.find((record) => record.id === state.selectedRecordId) || records[0];
  }

  function getStatusClass(status) {
    const value = normalizeText(status);
    if (value.includes("urgente") || value.includes("critico") || value.includes("bajo") || value.includes("vencido")) return "urgent";
    if (value.includes("pendiente") || value.includes("nuevo") || value.includes("revision") || value.includes("cotizado")) return "waiting";
    if (value.includes("confirm") || value.includes("activo") || value.includes("aprobado") || value.includes("listo") || value.includes("ocupada") || value.includes("publicado") || value.includes("cursando") || value.includes("programado") || value.includes("diario") || value.includes("demo") || value.includes("simulado")) return "ok";
    return "";
  }

  function getInitials(value) {
    return String(value)
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0] || "")
      .join("")
      .toUpperCase();
  }

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeText(value) {
    return String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }
})();
