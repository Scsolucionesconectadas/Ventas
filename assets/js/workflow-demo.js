(function () {
  "use strict";

  const body = document.body;
  const slug = body.dataset.demoSlug;
  const appMain = document.querySelector(".app-main");
  const demo = getDemo(slug);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    engine: "n8n",
    scenario: "success",
    workflowIndex: 0,
    running: false,
    waitingApproval: false,
    attempt: 1,
    runNumber: 2407,
    lastTrigger: null,
  };
  let toastTimer = null;

  if (!demo || !appMain) return;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    injectNavigation();
    injectPanel();
    buildModal();
    bindInteractions();
    selectWorkflow(0, false);
    updateDashboard();
    refreshIcons();
  }

  function injectNavigation() {
    const sideNav = document.querySelector(".side-nav");
    const tabs = document.querySelector(".view-tabs");
    if (!sideNav || !tabs) return;

    sideNav.insertAdjacentHTML(
      "beforeend",
      `<button class="nav-button workflow-nav-button" type="button" data-view="automatizaciones" data-workflow-view="automatizaciones">
        <i data-lucide="workflow" aria-hidden="true"></i>Automatizaciones
      </button>`,
    );
    tabs.insertAdjacentHTML(
      "beforeend",
      `<button class="tab-button" id="tab-automatizaciones" type="button" role="tab" data-view="automatizaciones" data-workflow-view="automatizaciones" aria-controls="view-automatizaciones" aria-selected="false" tabindex="-1">Automatizaciones</button>`,
    );

    const menu = document.querySelector(".action-dropdown .dropdown-menu");
    menu?.insertAdjacentHTML(
      "beforeend",
      '<button type="button" data-view="automatizaciones" data-workflow-view="automatizaciones">Abrir automatizaciones</button>',
    );
  }

  function injectPanel() {
    const panel = document.createElement("section");
    panel.className = "view-panel workflow-view-panel";
    panel.id = "view-automatizaciones";
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "tab-automatizaciones");
    panel.hidden = true;
    panel.innerHTML = renderPanel();
    appMain.appendChild(panel);
  }

  function renderPanel() {
    const workflowOptions = demo.workflows.map((item, index) => `<option value="${index}">${escapeHtml(item.name)}</option>`).join("");
    return `
      <header class="workflow-page-head">
        <div>
          <p class="eyebrow">Orquestación y trazabilidad</p>
          <h2>Centro de automatización · ${escapeHtml(demo.label)}</h2>
          <p>Procesos ficticios para visualizar reglas, aprobaciones, reintentos, reportes y evidencia operativa.</p>
        </div>
        <div class="workflow-head-badges">
          <span class="workflow-demo-badge"><i data-lucide="shield-check" aria-hidden="true"></i>Simulación pública</span>
          <span class="workflow-overall-status is-idle" data-workflow-overall aria-live="polite"><span data-workflow-overall-text>Pendiente</span></span>
        </div>
      </header>

      <section class="workflow-command-bar" aria-label="Configuración de la simulación">
        <div class="workflow-control-group">
          <span>Motor visual</span>
          <div class="workflow-segmented" role="group" aria-label="Motor de automatización">
            <button class="active" type="button" data-workflow-engine="n8n" aria-pressed="true">n8n</button>
            <button type="button" data-workflow-engine="node-red" aria-pressed="false">Node-RED</button>
          </div>
        </div>
        <label class="workflow-control-group">
          <span>Proceso</span>
          <select data-workflow-select>${workflowOptions}</select>
        </label>
        <label class="workflow-control-group">
          <span>Escenario</span>
          <select data-workflow-scenario>
            <option value="success">Ejecución controlada</option>
            <option value="failure">Falla temporal</option>
          </select>
        </label>
        <button class="primary-link workflow-run-button" type="button" data-workflow-run>
          <i data-lucide="play" aria-hidden="true"></i>Ejecutar flujo
        </button>
      </section>

      <section class="module-panel workflow-canvas" data-workflow-canvas data-engine="n8n" aria-label="Flujo de automatización">
        <div class="module-head workflow-canvas-head">
          <div>
            <p class="eyebrow" data-workflow-engine-copy>n8n · Orquestación de aplicaciones y APIs</p>
            <h3 data-workflow-title></h3>
          </div>
          <span class="workflow-run-id" data-workflow-run-id>Sin ejecutar</span>
        </div>
        <ol class="workflow-node-list" data-workflow-nodes>
          ${renderSteps()}
        </ol>
        <div class="workflow-execution-actions">
          <button class="secondary-link" type="button" data-workflow-retry disabled>
            <i data-lucide="rotate-ccw" aria-hidden="true"></i>Reintentar
          </button>
          <button class="primary-link" type="button" data-workflow-approve disabled>
            <i data-lucide="user-check" aria-hidden="true"></i>Aprobar y continuar
          </button>
          <span class="workflow-execution-note" data-workflow-execution-note>Preparado para una ejecución ficticia.</span>
        </div>
      </section>

      <div class="workflow-insights-grid">
        <section class="module-panel workflow-dashboard" aria-label="Panel de métricas tipo Grafana">
          <div class="module-head">
            <div><p class="eyebrow">Observabilidad</p><h3>Panel tipo Grafana</h3><p>Indicadores filtrables de ejecuciones ficticias.</p></div>
            <i data-lucide="bar-chart-3" aria-hidden="true"></i>
          </div>
          <div class="workflow-filter-bar">
            <label><span>Período</span><select data-workflow-period><option value="7">7 días</option><option value="30" selected>30 días</option><option value="90">90 días</option></select></label>
            <label><span>Proceso</span><select data-workflow-dashboard-select>${workflowOptions}</select></label>
            <label class="workflow-compare-toggle"><input type="checkbox" data-workflow-compare /><span>Comparar período anterior</span></label>
          </div>
          <div class="workflow-metric-grid">
            <article><span>Ejecuciones</span><strong data-workflow-metric="runs">0</strong><small data-workflow-delta="runs">Últimos 30 días</small></article>
            <article><span>Tasa de éxito</span><strong data-workflow-metric="success">0%</strong><small data-workflow-delta="success">Objetivo 95%</small></article>
            <article><span>Tiempo recuperado</span><strong data-workflow-metric="hours">0 h</strong><small data-workflow-delta="hours">Estimación demo</small></article>
            <article><span>Reintentos</span><strong data-workflow-metric="retries">0</strong><small data-workflow-delta="retries">Fallos controlados</small></article>
          </div>
          <div class="workflow-chart" data-workflow-chart aria-label="Comparación visual de ejecuciones por intervalo">
            ${["01", "02", "03", "04", "05", "06", "07"].map((label, index) => `<div class="workflow-chart-column"><div><span class="workflow-chart-bar current" data-chart-current="${index}"></span><span class="workflow-chart-bar previous" data-chart-previous="${index}"></span></div><small>${label}</small></div>`).join("")}
          </div>
          <div class="workflow-chart-legend"><span><i class="current"></i>Período actual</span><span data-workflow-previous-legend hidden><i class="previous"></i>Período anterior</span></div>
        </section>

        <section class="module-panel workflow-schedule-panel" aria-label="Programación de reportes">
          <div class="module-head"><div><p class="eyebrow">Entrega programada</p><h3>Reporte y destinatarios</h3><p>Configuración ficticia sin envíos externos.</p></div><i data-lucide="calendar-clock" aria-hidden="true"></i></div>
          <form class="field-grid workflow-schedule-form" data-workflow-schedule-form>
            <div class="form-field"><label for="workflowFrequency">Frecuencia</label><select id="workflowFrequency" name="frequency"><option value="Diario">Diario</option><option value="Semanal">Semanal</option><option value="Mensual">Mensual</option></select></div>
            <div class="form-field"><label for="workflowTime">Hora</label><input id="workflowTime" name="time" type="time" value="08:00" required /></div>
            <div class="form-field full"><label for="workflowRecipient">Destinatario demo</label><input id="workflowRecipient" name="recipient" type="email" value="${escapeHtml(demo.recipient)}" required /></div>
            <label class="workflow-output-check full"><input name="includePdf" type="checkbox" checked /><span>Adjuntar PDF ejecutivo</span></label>
            <button class="primary-link full" type="submit"><i data-lucide="calendar-check" aria-hidden="true"></i>Guardar programación demo</button>
          </form>
          <p class="workflow-schedule-summary" data-workflow-schedule-summary><i data-lucide="clock-3" aria-hidden="true"></i>Reporte diario · 08:00 · ${escapeHtml(demo.recipient)}</p>
          <div class="workflow-delivery-actions">
            <button class="secondary-link" type="button" data-workflow-email><i data-lucide="mail-check" aria-hidden="true"></i>Vista previa de email</button>
            <button class="secondary-link" type="button" data-workflow-pdf disabled><i data-lucide="file-down" aria-hidden="true"></i>Descargar último PDF</button>
          </div>
        </section>
      </div>

      <section class="module-panel workflow-history-panel" aria-label="Historial de ejecuciones y documentos">
        <div class="module-head"><div><p class="eyebrow">Evidencia operativa</p><h3>Historial de ejecuciones</h3><p>Estados, intentos, salida y destinatario de cada simulación.</p></div><span class="workflow-history-count" data-workflow-history-count>3 registros</span></div>
        <div class="priority-table-wrap">
          <table class="priority-table workflow-history-table">
            <thead><tr><th>Hora</th><th>Proceso</th><th>Estado</th><th>Intento</th><th>Salida</th><th>Destinatario</th></tr></thead>
            <tbody data-workflow-history>${renderInitialHistory()}</tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderSteps() {
    const definitions = [
      ["Disparador", "webhook"],
      ["Validación", "shield-check"],
      ["Acción", "send"],
      ["Aprobación", "user-check"],
      ["Reporte", "file-chart-column"],
      ["Bitácora", "scroll-text"],
    ];
    return definitions
      .map(
        ([title, icon], index) => `
          <li class="workflow-node is-idle" data-workflow-step="${index}">
            <span class="workflow-node-icon"><i data-lucide="${icon}" aria-hidden="true"></i></span>
            <span class="workflow-node-number">${String(index + 1).padStart(2, "0")}</span>
            <div><strong>${title}</strong><small data-workflow-step-copy></small></div>
            <span class="workflow-node-status" data-workflow-step-status>Pendiente</span>
          </li>`,
      )
      .join("");
  }

  function renderInitialHistory() {
    const workflow = demo.workflows[0];
    return [
      historyRow("08:14", workflow.name, "Ejecutado", "1", "PDF + email demo", demo.recipient),
      historyRow("08:00", demo.workflows[1].name, "Esperando", "1", "Aprobación humana", "operaciones@demo.local"),
      historyRow("07:42", workflow.name, "Fallido", "1", "Alerta registrada", demo.recipient),
    ].join("");
  }

  function historyRow(time, workflow, status, attempt, output, recipient) {
    return `<tr><td>${escapeHtml(time)}</td><td><strong>${escapeHtml(workflow)}</strong></td><td><span class="tag ${historyStatusClass(status)}">${escapeHtml(status)}</span></td><td>${escapeHtml(attempt)}</td><td>${escapeHtml(output)}</td><td>${escapeHtml(recipient)}</td></tr>`;
  }

  function buildModal() {
    const root = document.createElement("div");
    root.innerHTML = `
      <div class="workflow-modal-overlay" data-workflow-modal hidden>
        <section class="workflow-modal" role="dialog" aria-modal="true" aria-labelledby="workflowModalTitle" tabindex="-1">
          <header class="workflow-modal-head"><div><p class="eyebrow">Entrega simulada</p><h2 id="workflowModalTitle">Vista previa del email</h2><p>Contenido editable generado por el flujo ficticio.</p></div><button class="experience-close-button" type="button" data-workflow-modal-close aria-label="Cerrar" title="Cerrar"><i data-lucide="x" aria-hidden="true"></i></button></header>
          <form class="field-grid workflow-email-form" data-workflow-email-form>
            <div class="form-field full"><label for="workflowEmailTo">Destinatario demo</label><input id="workflowEmailTo" name="recipient" type="email" required /></div>
            <div class="form-field full"><label for="workflowEmailSubject">Asunto</label><input id="workflowEmailSubject" name="subject" type="text" required /></div>
            <div class="form-field full"><label for="workflowEmailBody">Contenido</label><textarea id="workflowEmailBody" name="body" required></textarea></div>
            <p class="priority-simulation-note full"><i data-lucide="shield-check" aria-hidden="true"></i>No se enviará ningún email real desde esta demostración.</p>
            <div class="form-field full priority-form-actions"><button class="secondary-link" type="button" data-workflow-modal-close>Cancelar</button><button class="primary-link" type="submit"><i data-lucide="mail-check" aria-hidden="true"></i>Preparar email demo</button></div>
          </form>
        </section>
      </div>`;
    body.appendChild(root);
  }

  function bindInteractions() {
    document.addEventListener("click", handleClick);
    document.addEventListener("change", handleChange);
    document.addEventListener("submit", handleSubmit);
    document.addEventListener("keydown", handleKeydown);
  }

  function handleClick(event) {
    const viewButton = event.target.closest("[data-workflow-view]");
    if (viewButton && !body.classList.contains("industry-demo-app")) activateView("automatizaciones");

    const engineButton = event.target.closest("[data-workflow-engine]");
    if (engineButton) selectEngine(engineButton.dataset.workflowEngine);
    if (event.target.closest("[data-workflow-run]")) runWorkflow();
    if (event.target.closest("[data-workflow-retry]")) retryWorkflow();
    if (event.target.closest("[data-workflow-approve]")) approveWorkflow();

    const emailButton = event.target.closest("[data-workflow-email]");
    if (emailButton) openEmailModal(emailButton);
    const pdfButton = event.target.closest("[data-workflow-pdf]");
    if (pdfButton) downloadPdf(pdfButton);

    if (event.target.closest("[data-workflow-modal-close]")) closeModal();
    const overlay = event.target.closest("[data-workflow-modal]");
    if (overlay && event.target === overlay) closeModal();
  }

  function handleChange(event) {
    if (event.target.matches("[data-workflow-select]")) selectWorkflow(Number(event.target.value));
    if (event.target.matches("[data-workflow-dashboard-select]")) selectWorkflow(Number(event.target.value));
    if (event.target.matches("[data-workflow-scenario]")) state.scenario = event.target.value;
    if (event.target.matches("[data-workflow-period], [data-workflow-compare]")) updateDashboard();
  }

  function handleSubmit(event) {
    if (event.target.matches("[data-workflow-schedule-form]")) {
      event.preventDefault();
      saveSchedule(event.target);
    }
    if (event.target.matches("[data-workflow-email-form]")) {
      event.preventDefault();
      const recipient = String(new FormData(event.target).get("recipient"));
      closeModal();
      appendHistory("Preparado", "Email demo", recipient, state.attempt);
      showToast(`Email demo preparado para ${recipient}. No se realizó ningún envío real.`);
    }
  }

  function handleKeydown(event) {
    const overlay = document.querySelector("[data-workflow-modal]");
    if (event.key === "Escape" && overlay && !overlay.hidden) {
      closeModal();
      return;
    }

    if (event.key === "Tab" && overlay && !overlay.hidden) trapFocus(event, overlay);

    const tab = event.target.closest?.("[role='tab']");
    const navigationKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!tab || event.defaultPrevented || !navigationKeys.includes(event.key)) return;
    if (["ArrowLeft", "ArrowRight"].includes(event.key) && !tab.matches("[data-workflow-view]")) return;
    const tabs = Array.from(document.querySelectorAll(".view-tabs [role='tab']"));
    const index = tabs.indexOf(tab);
    if (index < 0) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  }

  function selectEngine(engine) {
    state.engine = engine;
    document.querySelectorAll("[data-workflow-engine]").forEach((button) => {
      const active = button.dataset.workflowEngine === engine;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const canvas = document.querySelector("[data-workflow-canvas]");
    canvas.dataset.engine = engine;
    canvas.querySelector("[data-workflow-engine-copy]").textContent = engine === "n8n" ? "n8n · Orquestación de aplicaciones y APIs" : "Node-RED · Eventos, señales y operación técnica";
  }

  function selectWorkflow(index, reset = true) {
    state.workflowIndex = Number.isFinite(index) ? Math.max(0, Math.min(index, demo.workflows.length - 1)) : 0;
    document.querySelectorAll("[data-workflow-select], [data-workflow-dashboard-select]").forEach((select) => {
      select.value = String(state.workflowIndex);
    });
    const workflow = currentWorkflow();
    document.querySelector("[data-workflow-title]").textContent = workflow.name;
    document.querySelectorAll("[data-workflow-step-copy]").forEach((copy, stepIndex) => {
      copy.textContent = workflow.steps[stepIndex];
    });
    if (reset) resetExecution();
    updateDashboard();
  }

  async function runWorkflow() {
    if (state.running || state.waitingApproval) return;
    state.running = true;
    state.attempt = 1;
    state.runNumber += 1;
    resetExecution(false);
    setRunLocked(true);
    setOverall("running", "Ejecutando");
    setRunId();
    setExecutionNote("Procesando datos ficticios en un entorno de demostración.");

    await executeStep(0, "Ejecutado");
    await executeStep(1, "Validado");
    if (state.scenario === "failure") {
      await executeStep(2, "Fallido", true);
      state.running = false;
      setOverall("failed", "Fallido");
      setExecutionNote("La API demo no respondió. El reintento está disponible.");
      document.querySelector("[data-workflow-retry]").disabled = false;
      appendHistory("Fallido", "Alerta registrada", demo.recipient, state.attempt);
      showToast("Falla temporal simulada. La ejecución puede reintentarse.");
      return;
    }
    await executeStep(2, "Ejecutado");
    await waitForApproval();
  }

  async function retryWorkflow() {
    if (state.running) return;
    state.running = true;
    state.attempt += 1;
    setRunId();
    document.querySelector("[data-workflow-retry]").disabled = true;
    setOverall("retrying", "Reintentando");
    setStep(2, "retrying", "Reintentando");
    setExecutionNote(`Reintento ${state.attempt} con la misma entrada ficticia.`);
    await pause();
    setStep(2, "success", "Ejecutado");
    await waitForApproval();
  }

  async function waitForApproval() {
    state.running = false;
    state.waitingApproval = true;
    setStep(3, "waiting", "Requiere aprobación");
    setOverall("waiting", "Esperando aprobación");
    setExecutionNote("El flujo se detuvo antes de la entrega para revisión humana.");
    document.querySelector("[data-workflow-approve]").disabled = false;
  }

  async function approveWorkflow() {
    if (!state.waitingApproval || state.running) return;
    state.running = true;
    state.waitingApproval = false;
    document.querySelector("[data-workflow-approve]").disabled = true;
    setOverall("running", "Ejecutando");
    await executeStep(3, "Aprobado");
    await executeStep(4, "Generado");
    await executeStep(5, "Registrado");
    state.running = false;
    setRunLocked(false);
    setOverall("success", "Ejecutado");
    setExecutionNote("Ejecución completada con reporte y trazabilidad ficticia.");
    document.querySelector("[data-workflow-pdf]").disabled = false;
    appendHistory("Ejecutado", "PDF + email demo", demo.recipient, state.attempt);
    updateDashboard(1);
    showToast(`${currentWorkflow().name} se completó correctamente en modo demo.`);
  }

  async function executeStep(index, result, fail = false) {
    setStep(index, "running", "Ejecutando");
    await pause();
    setStep(index, fail ? "failed" : "success", result);
  }

  function resetExecution(enableRun = true) {
    state.running = false;
    state.waitingApproval = false;
    document.querySelectorAll("[data-workflow-step]").forEach((node) => {
      node.className = "workflow-node is-idle";
      node.querySelector("[data-workflow-step-status]").textContent = "Pendiente";
    });
    setOverall("idle", "Pendiente");
    setExecutionNote("Preparado para una ejecución ficticia.");
    document.querySelector("[data-workflow-retry]").disabled = true;
    document.querySelector("[data-workflow-approve]").disabled = true;
    document.querySelector("[data-workflow-pdf]").disabled = true;
    document.querySelector("[data-workflow-run-id]").textContent = "Sin ejecutar";
    if (enableRun) setRunLocked(false);
  }

  function setStep(index, status, text) {
    const node = document.querySelector(`[data-workflow-step="${index}"]`);
    if (!node) return;
    node.className = `workflow-node is-${status}`;
    node.querySelector("[data-workflow-step-status]").textContent = text;
  }

  function setOverall(status, text) {
    const element = document.querySelector("[data-workflow-overall]");
    element.className = `workflow-overall-status is-${status}`;
    element.querySelector("[data-workflow-overall-text]").textContent = text;
  }

  function setRunLocked(locked) {
    document.querySelector("[data-workflow-run]").disabled = locked;
    document.querySelectorAll("[data-workflow-select], [data-workflow-scenario], [data-workflow-engine]").forEach((control) => {
      control.disabled = locked;
    });
  }

  function setRunId() {
    document.querySelector("[data-workflow-run-id]").textContent = `RUN-${state.runNumber} · intento ${state.attempt}`;
  }

  function setExecutionNote(text) {
    document.querySelector("[data-workflow-execution-note]").textContent = text;
  }

  function updateDashboard(increment = 0) {
    const period = Number(document.querySelector("[data-workflow-period]")?.value || 30);
    const compare = Boolean(document.querySelector("[data-workflow-compare]")?.checked);
    const factor = period === 7 ? 0.32 : period === 90 ? 2.72 : 1;
    const offset = state.workflowIndex * 7;
    const metrics = {
      runs: Math.round((demo.base.runs + offset + increment) * factor),
      success: Math.max(88, Math.min(99, demo.base.success - state.workflowIndex + increment)),
      hours: Math.round((demo.base.hours + state.workflowIndex * 3 + increment) * factor),
      retries: Math.max(1, Math.round((demo.base.retries + state.workflowIndex) * factor)),
    };
    setMetric("runs", String(metrics.runs), compare ? "+11% frente al período anterior" : `Últimos ${period} días`);
    setMetric("success", `${metrics.success}%`, compare ? "+3,2 puntos porcentuales" : "Objetivo 95%");
    setMetric("hours", `${metrics.hours} h`, compare ? "+14% de tiempo recuperado" : "Estimación demo");
    setMetric("retries", String(metrics.retries), compare ? "-2 fallos temporales" : "Fallos controlados");

    const values = [48, 66, 58, 82, 72, 91, 76].map((value) => Math.min(96, value + state.workflowIndex * 2 + (period === 90 ? 3 : 0)));
    document.querySelectorAll("[data-chart-current]").forEach((bar, index) => {
      bar.style.height = `${values[index]}%`;
    });
    document.querySelectorAll("[data-chart-previous]").forEach((bar, index) => {
      bar.style.height = `${Math.max(20, values[index] - 10 - (index % 2) * 4)}%`;
    });
    document.querySelector("[data-workflow-chart]").classList.toggle("is-comparing", compare);
    document.querySelector("[data-workflow-previous-legend]").hidden = !compare;
  }

  function setMetric(name, value, detail) {
    document.querySelector(`[data-workflow-metric="${name}"]`).textContent = value;
    document.querySelector(`[data-workflow-delta="${name}"]`).textContent = detail;
  }

  function saveSchedule(form) {
    const data = new FormData(form);
    const frequency = String(data.get("frequency"));
    const time = String(data.get("time"));
    const recipient = String(data.get("recipient"));
    const output = data.get("includePdf") ? "PDF + email demo" : "Email demo";
    document.querySelector("[data-workflow-schedule-summary]").innerHTML = `<i data-lucide="calendar-check" aria-hidden="true"></i>${escapeHtml(frequency)} · ${escapeHtml(time)} · ${escapeHtml(recipient)}`;
    appendHistory("Programado", output, recipient, "—");
    refreshIcons();
    showToast(`Reporte ${frequency.toLowerCase()} programado en modo demo.`);
  }

  function openEmailModal(trigger) {
    state.lastTrigger = trigger;
    const overlay = document.querySelector("[data-workflow-modal]");
    const workflow = currentWorkflow();
    overlay.querySelector("[name='recipient']").value = document.querySelector("#workflowRecipient").value;
    overlay.querySelector("[name='subject']").value = `${workflow.name} · Resumen ejecutivo SC`;
    overlay.querySelector("[name='body']").value = `La ejecución ficticia de ${workflow.name.toLowerCase()} está lista para revisión. El reporte incluye estado, intentos, aprobaciones y métricas del período seleccionado.`;
    overlay.hidden = false;
    body.classList.add("experience-dialog-open");
    overlay.querySelector("[name='recipient']").focus();
  }

  function closeModal() {
    const overlay = document.querySelector("[data-workflow-modal]");
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    body.classList.remove("experience-dialog-open");
    state.lastTrigger?.focus();
  }

  async function downloadPdf(button) {
    if (!window.SCReportPdf || button.disabled) return;
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i data-lucide="loader-circle" class="experience-spin" aria-hidden="true"></i>Generando...';
    refreshIcons();
    let downloaded = false;
    try {
      downloaded = await window.SCReportPdf.downloadReport({
        title: `${currentWorkflow().name} · Ejecución`,
        rubro: demo.label,
        dashboard: `SC Automatizaciones · ${state.engine === "n8n" ? "n8n" : "Node-RED"}`,
        period: document.querySelector("[data-workflow-period]").selectedOptions[0].textContent,
        schedule: document.querySelector("[data-workflow-schedule-summary]").textContent.trim(),
        recipient: document.querySelector("#workflowRecipient").value,
        fileName: `sc-${slug}-workflow-demo.pdf`,
        logoUrl: "../../assets/img/sc-imagotipo.png",
        footerLogoUrl: "../../assets/img/sc-white.png",
        panels: [
          { label: "Estado", value: "Ejecutado", detail: `Intento ${state.attempt}`, series: [32, 48, 67, 78, 92] },
          { label: "Motor", value: state.engine === "n8n" ? "n8n" : "Node-RED", detail: "Simulación visual", series: [25, 42, 59, 74, 88] },
          { label: "Trazabilidad", value: "100%", detail: "Seis pasos registrados", series: [20, 38, 56, 76, 96] },
        ],
      });
    } catch (error) {
      console.error("No se pudo generar el PDF de automatización.", error);
    } finally {
      button.disabled = false;
      button.innerHTML = original;
      refreshIcons();
    }
    if (downloaded) appendHistory("Ejecutado", "PDF generado", document.querySelector("#workflowRecipient").value, state.attempt);
    showToast(downloaded ? "PDF de automatización generado correctamente." : "No se pudo generar el PDF demo.");
  }

  function appendHistory(status, output, recipient, attempt) {
    const tbody = document.querySelector("[data-workflow-history]");
    const time = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    tbody.insertAdjacentHTML("afterbegin", historyRow(time, currentWorkflow().name, status, String(attempt), output, recipient));
    const count = tbody.querySelectorAll("tr").length;
    document.querySelector("[data-workflow-history-count]").textContent = `${count} registros`;
  }

  function historyStatusClass(status) {
    const normalized = normalize(status);
    if (/ejecutado|preparado/.test(normalized)) return "ok";
    if (/fallido/.test(normalized)) return "urgent";
    return "waiting";
  }

  function activateView(viewId) {
    document.querySelectorAll(".view-panel").forEach((panel) => {
      const active = panel.id === `view-${viewId}`;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
    document.querySelectorAll("[data-view]").forEach((control) => {
      const active = control.dataset.view === viewId;
      control.classList.toggle("active", active);
      if (control.getAttribute("role") === "tab") {
        control.setAttribute("aria-selected", String(active));
        control.tabIndex = active ? 0 : -1;
      }
    });
    document.querySelectorAll("details.nav-dropdown").forEach((details) => {
      details.open = false;
    });
    window.SCAnimations?.panelIn?.(document.getElementById(`view-${viewId}`));
  }

  function trapFocus(event, overlay) {
    const focusable = Array.from(overlay.querySelectorAll("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]"));
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

  function pause() {
    return new Promise((resolve) => window.setTimeout(resolve, prefersReducedMotion ? 20 : 260));
  }

  function currentWorkflow() {
    return demo.workflows[state.workflowIndex];
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function refreshIcons() {
    window.lucide?.createIcons();
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function escapeHtml(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }

  function getDemo(demoSlug) {
    const configs = {
      medica: createDemo("Área médica", "direccion.medica@demo.local", [128, 96, 42, 4], [
        createFlow("Confirmación y recordatorio de turnos", "Nuevo turno solicitado", "Paciente, agenda y cobertura", "Preparar recordatorio multicanal", "Recepción revisa excepciones", "PDF de asistencia y agenda", "Resultado asociado a la ficha"),
        createFlow("Autorización de prácticas", "Práctica indicada", "Plan, orden y documentación", "Consultar cobertura demo", "Administración valida observaciones", "Resumen de autorizaciones", "Respuesta registrada en historia"),
      ]),
      hoteleria: createDemo("Hotelería", "operaciones.hotel@demo.local", [94, 97, 36, 3], [
        createFlow("Reserva y preparación de check-in", "Nueva reserva confirmada", "Huésped, tarifa y disponibilidad", "Preparar habitación y aviso", "Recepción aprueba excepción", "Listado de arribos", "Check-in trazado"),
        createFlow("Mantenimiento de habitación", "Incidencia reportada", "Prioridad, sector y disponibilidad", "Asignar responsable", "Gobernanta valida liberación", "Estado de mantenimiento", "Habitación actualizada"),
      ]),
      inmobiliarias: createDemo("Inmobiliarias", "direccion.inmobiliaria@demo.local", [116, 95, 48, 5], [
        createFlow("Lead, visita y seguimiento", "Consulta recibida", "Interés, presupuesto y propiedad", "Asignar asesor y próxima tarea", "Comercial aprueba propuesta", "Pipeline de oportunidades", "Actividad registrada en CRM"),
        createFlow("Contrato y cobranza", "Reserva aprobada", "Documentos, importes y vencimientos", "Preparar contrato y avisos", "Administración autoriza firma", "Estado contractual y saldo", "Documento asociado al propietario"),
      ]),
      materiales: createDemo("Venta de materiales", "compras.materiales@demo.local", [142, 94, 58, 7], [
        createFlow("Reposición por stock crítico", "Stock debajo del mínimo", "Demanda, costo y proveedor", "Preparar orden de compra", "Compras aprueba adjudicación", "PDF de reposición y margen", "Movimiento registrado"),
        createFlow("Despacho y entrega", "Pedido listo", "Stock, ruta y ventana horaria", "Asignar vehículo y avisar", "Logística aprueba salida", "Resumen de entregas", "Remito y margen actualizados"),
      ]),
      gastronomia: createDemo("Gastronomía", "operaciones.gastro@demo.local", [218, 97, 32, 4], [
        createFlow("Pedido, cocina y entrega", "Comanda confirmada", "Mesa, productos y disponibilidad", "Enviar a estación de cocina", "Encargado valida excepción", "Tiempos y ventas por turno", "Pedido cerrado en caja"),
        createFlow("Cierre de caja", "Fin de turno", "Ventas, medios de pago y anulaciones", "Conciliar movimientos", "Responsable aprueba diferencia", "PDF de cierre", "Cierre archivado"),
      ]),
      educacion: createDemo("Educación", "secretaria.instituto@demo.local", [176, 96, 44, 5], [
        createFlow("Inscripción y bienvenida", "Formulario de inscripción", "Alumno, curso y vacante", "Crear legajo y comunicación", "Secretaría valida documentación", "Listado de inscripciones", "Alumno asociado al curso"),
        createFlow("Asistencia y pagos", "Ausencia o vencimiento", "Alumno, comisión y situación", "Preparar aviso personalizado", "Coordinación revisa excepción", "Reporte académico y financiero", "Seguimiento registrado"),
      ]),
      gomerias: createDemo("Gomerías", "stock.gomeria@demo.local", [104, 95, 39, 6], [
        createFlow("Reposición por medida", "Cubierta en stock mínimo", "Medida, rotación y proveedor", "Preparar pedido sugerido", "Compras aprueba cantidad", "Stock y margen proyectado", "Reposición registrada"),
        createFlow("Turno y orden de servicio", "Turno confirmado", "Vehículo, servicio y disponibilidad", "Preparar orden y aviso", "Encargado valida adicional", "Servicios y caja", "Historial del vehículo actualizado"),
      ]),
      agrimensores: createDemo("Agrimensura", "expedientes.agrimensura@demo.local", [72, 93, 46, 5], [
        createFlow("Expediente y consulta ATER simulada", "Expediente creado", "Partida, titular y documentación", "Preparar consulta externa demo", "Profesional valida resultado", "Estado del expediente", "Consulta y respuesta archivadas"),
        createFlow("Campo, plano y entrega", "Trabajo de campo completado", "Mediciones, archivos y observaciones", "Preparar revisión de plano", "Agrimensor aprueba versión", "PDF de avance", "Entrega vinculada al expediente"),
      ]),
      logistica: createDemo("Logística y transporte", "trafico.logistica@demo.local", [188, 94, 64, 8], [
        createFlow("Tracking y alerta de SLA", "Viaje despachado", "Ruta, carga y ventana horaria", "Actualizar tracking y alertas", "Tráfico aprueba desvío", "Cumplimiento de entregas", "Evento asociado al viaje"),
        createFlow("Mantenimiento preventivo", "Kilometraje objetivo alcanzado", "Unidad, taller y disponibilidad", "Crear orden de mantenimiento", "Flota aprueba inmovilización", "Estado y costo de flota", "Servicio registrado"),
      ]),
    };
    return configs[demoSlug];
  }

  function createDemo(label, recipient, base, workflows) {
    return { label, recipient, base: { runs: base[0], success: base[1], hours: base[2], retries: base[3] }, workflows };
  }

  function createFlow(name, trigger, validation, action, approval, report, log) {
    return { name, steps: [trigger, validation, action, approval, report, log] };
  }
})();
