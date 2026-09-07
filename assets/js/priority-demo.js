(function () {
  "use strict";

  const body = document.body;
  const slug = body.dataset.demoSlug;
  const appMain = document.querySelector(".app-main");
  const demo = getPriorityDemo(slug);
  let lastTrigger = null;
  let toastTimer = null;

  if (!demo || !appMain) return;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    injectNavigation();
    injectPanels();
    buildModal();
    bindInteractions();
    refreshIcons();
  }

  function injectNavigation() {
    const sideNav = document.querySelector(".side-nav");
    const tabs = document.querySelector(".view-tabs");
    if (!sideNav || !tabs) return;

    sideNav.insertAdjacentHTML("beforeend", '<span class="priority-nav-label">Gestión avanzada</span>');
    demo.views.forEach((view) => {
      sideNav.insertAdjacentHTML(
        "beforeend",
        `<button class="nav-button" type="button" data-view="${escapeHtml(view.id)}" data-priority-view="${escapeHtml(view.id)}">
          <i data-lucide="${escapeHtml(view.icon)}" aria-hidden="true"></i>
          ${escapeHtml(view.label)}
        </button>`,
      );
      tabs.insertAdjacentHTML(
        "beforeend",
        `<button
          class="tab-button"
          id="tab-${escapeHtml(view.id)}"
          type="button"
          role="tab"
          data-view="${escapeHtml(view.id)}"
          data-priority-view="${escapeHtml(view.id)}"
          aria-controls="view-${escapeHtml(view.id)}"
          aria-selected="false"
          tabindex="-1"
        >${escapeHtml(view.label)}</button>`,
      );
    });

    const menu = document.querySelector(".action-dropdown .dropdown-menu");
    if (menu) {
      menu.insertAdjacentHTML(
        "beforeend",
        `<button type="button" data-view="${escapeHtml(demo.views[0].id)}" data-priority-view="${escapeHtml(demo.views[0].id)}">Ver gestión avanzada</button>`,
      );
    }
  }

  function injectPanels() {
    demo.views.forEach((view) => {
      const panel = document.createElement("section");
      panel.className = "view-panel priority-view-panel";
      panel.id = `view-${view.id}`;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", `tab-${view.id}`);
      panel.hidden = true;
      panel.innerHTML = renderPanel(view);
      appMain.appendChild(panel);
    });
  }

  function renderPanel(view) {
    return `
      <header class="priority-page-head">
        <div>
          <p class="eyebrow">${escapeHtml(view.eyebrow)}</p>
          <h2>${escapeHtml(view.title)}</h2>
          <p>${escapeHtml(view.description)}</p>
        </div>
      </header>

      <section class="priority-kpi-grid" aria-label="Indicadores de ${escapeHtml(view.label)}">
        ${view.metrics
          .map(
            (metric) => `
              <article class="priority-kpi">
                <span class="priority-kpi-head"><span>${escapeHtml(metric.label)}</span><i data-lucide="${escapeHtml(metric.icon)}" aria-hidden="true"></i></span>
                <strong>${escapeHtml(metric.value)}</strong>
                <small>${escapeHtml(metric.note)}</small>
              </article>`,
          )
          .join("")}
      </section>

      <div class="priority-toolbar" role="group" aria-label="Acciones de ${escapeHtml(view.label)}">
        <button class="primary-link" type="button" data-priority-new="${escapeHtml(view.id)}">
          <i data-lucide="plus" aria-hidden="true"></i>${escapeHtml(view.form.title)}
        </button>
        <button class="secondary-link" type="button" data-priority-pdf="${escapeHtml(view.id)}">
          <i data-lucide="file-down" aria-hidden="true"></i>Generar PDF
        </button>
        <button class="secondary-link" type="button" data-priority-email="${escapeHtml(view.id)}">
          <i data-lucide="mail-check" aria-hidden="true"></i>Vista previa de email
        </button>
      </div>

      <div class="priority-workspace">
        <article class="module-panel priority-table-panel">
          <div class="module-head">
            <div>
              <h3>${escapeHtml(view.table.title)}</h3>
              <p>${escapeHtml(view.table.subtitle)}</p>
            </div>
            <span class="priority-record-count" data-priority-count="${escapeHtml(view.id)}">${view.table.rows.length} registros</span>
          </div>
          <div class="priority-table-wrap">
            <table class="priority-table">
              <thead>
                <tr>
                  ${view.table.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}
                  <th><span class="sr-only">Acciones</span></th>
                </tr>
              </thead>
              <tbody data-priority-table="${escapeHtml(view.id)}">
                ${view.table.rows.map((row) => renderRow(view, row)).join("")}
              </tbody>
            </table>
          </div>
        </article>

        <aside class="module-panel priority-side-panel">
          <div class="module-head">
            <div>
              <h3>${escapeHtml(view.side.title)}</h3>
              <p>${escapeHtml(view.side.subtitle)}</p>
            </div>
          </div>
          <div class="priority-queue">
            ${view.side.items
              .map(
                (item) => `
                  <div class="priority-queue-item">
                    <span class="priority-queue-icon"><i data-lucide="${escapeHtml(item.icon)}" aria-hidden="true"></i></span>
                    <div class="priority-queue-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.meta)}</small></div>
                    <span class="tag ${statusClass(item.status)}">${escapeHtml(item.status)}</span>
                  </div>`,
              )
              .join("")}
          </div>
          <div class="priority-automation-note">
            <i data-lucide="workflow" aria-hidden="true"></i>
            <div><strong>Automatización sugerida</strong><p>${escapeHtml(view.automation)}</p></div>
          </div>
        </aside>
      </div>
    `;
  }

  function renderRow(view, row) {
    const actionLabel = row.actionLabel || view.table.actionLabel;
    const nextStatus = row.nextStatus || view.table.nextStatus;
    const message = row.message || `${row.cells[0]} actualizado correctamente.`;
    const isComplete = isTerminalRowStatus(row.status, nextStatus);
    return `
      <tr data-priority-record>
        ${row.cells.map((cell, index) => `<td>${index === 0 ? `<strong>${escapeHtml(cell)}</strong>` : escapeHtml(cell)}</td>`).join("")}
        <td><span class="tag ${statusClass(row.status)}" data-priority-status>${escapeHtml(row.status)}</span></td>
        <td>
          ${isComplete ? '<span class="sr-only">Sin acciones pendientes</span>' : `
            <button
              class="priority-row-action"
              type="button"
              data-priority-row-action
              data-priority-next-status="${escapeHtml(nextStatus)}"
              data-priority-message="${escapeHtml(message)}"
              aria-label="${escapeHtml(actionLabel)}: ${escapeHtml(row.cells[0])}"
            >${escapeHtml(actionLabel)}</button>
          `}
        </td>
      </tr>
    `;
  }

  function buildModal() {
    const root = document.createElement("div");
    root.className = "priority-modal-root";
    root.innerHTML = `
      <div class="priority-modal-overlay" data-priority-modal hidden>
        <section class="priority-modal" role="dialog" aria-modal="true" aria-labelledby="priorityModalTitle" tabindex="-1">
          <header class="priority-modal-head">
            <div>
              <p class="eyebrow" data-priority-modal-eyebrow>Gestión avanzada</p>
              <h2 id="priorityModalTitle" data-priority-modal-title>Nuevo registro</h2>
              <p data-priority-modal-description></p>
            </div>
            <button class="experience-close-button" type="button" data-priority-modal-close aria-label="Cerrar" title="Cerrar">
              <i data-lucide="x" aria-hidden="true"></i>
            </button>
          </header>
          <div data-priority-modal-content></div>
        </section>
      </div>
    `;
    body.appendChild(root);
  }

  function bindInteractions() {
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("submit", handleSubmit);
  }

  function handleClick(event) {
    const priorityView = event.target.closest("[data-priority-view]");
    if (priorityView && !body.classList.contains("industry-demo-app")) {
      activateView(priorityView.dataset.priorityView);
    }

    const newButton = event.target.closest("[data-priority-new]");
    if (newButton) openRecordModal(newButton.dataset.priorityNew, newButton);

    const emailButton = event.target.closest("[data-priority-email]");
    if (emailButton) openEmailModal(emailButton.dataset.priorityEmail, emailButton);

    const pdfButton = event.target.closest("[data-priority-pdf]");
    if (pdfButton) downloadViewPdf(pdfButton.dataset.priorityPdf, pdfButton);

    const rowButton = event.target.closest("[data-priority-row-action]");
    if (rowButton) completeRowAction(rowButton);

    if (event.target.closest("[data-priority-modal-close]")) closeModal();

    const overlay = event.target.closest("[data-priority-modal]");
    if (overlay && event.target === overlay) closeModal();
  }

  function handleKeydown(event) {
    if (event.key === "Escape" && !document.querySelector("[data-priority-modal][hidden]")) {
      closeModal();
      return;
    }

    const tab = event.target.closest?.("[role='tab'][data-priority-view]");
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

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

  function handleSubmit(event) {
    if (event.target.matches("[data-priority-record-form]")) {
      event.preventDefault();
      addRecord(event.target);
    }

    if (event.target.matches("[data-priority-email-form]")) {
      event.preventDefault();
      const data = new FormData(event.target);
      closeModal();
      showToast(`Email demo preparado para ${String(data.get("recipient"))}. No se realizó ningún envío real.`);
    }
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

  function openRecordModal(viewId, trigger) {
    const view = findView(viewId);
    if (!view) return;
    lastTrigger = trigger;
    openModal({
      eyebrow: `${demo.label} · ${view.label}`,
      title: view.form.title,
      description: view.form.description,
      content: `
        <form class="field-grid priority-form" data-priority-record-form data-priority-form-view="${escapeHtml(viewId)}">
          ${formField("priorityReference", "reference", view.form.firstLabel, view.form.firstPlaceholder)}
          ${formField("priorityDetail", "detail", view.form.secondLabel, view.form.secondPlaceholder)}
          ${formField("priorityThird", "third", view.form.thirdLabel, view.form.thirdPlaceholder)}
          <div class="form-field">
            <label for="priorityStatus">Estado inicial</label>
            <select id="priorityStatus" name="status" required>
              <option value="Pendiente">Pendiente</option>
              <option value="En revisión">En revisión</option>
              <option value="Programado">Programado</option>
            </select>
          </div>
          <div class="form-field full priority-form-actions">
            <button class="secondary-link" type="button" data-priority-modal-close>Cancelar</button>
            <button class="primary-link" type="submit"><i data-lucide="check" aria-hidden="true"></i>Confirmar registro</button>
          </div>
        </form>`,
    });
  }

  function openEmailModal(viewId, trigger) {
    const view = findView(viewId);
    if (!view) return;
    lastTrigger = trigger;
    openModal({
      eyebrow: "Automatización simulada",
      title: `Vista previa · ${view.label}`,
      description: "Revisa el contenido que podría entregar un workflow de n8n o Node-RED.",
      content: `
        <form class="field-grid priority-form" data-priority-email-form>
          <div class="form-field full">
            <label for="priorityRecipient">Destinatario demo</label>
            <input id="priorityRecipient" name="recipient" type="email" value="${escapeHtml(demo.recipient)}" required />
          </div>
          <div class="form-field full">
            <label for="prioritySubject">Asunto</label>
            <input id="prioritySubject" name="subject" type="text" value="Resumen de ${escapeHtml(view.label)} · ${escapeHtml(demo.label)}" required />
          </div>
          <div class="form-field full">
            <label for="priorityEmailBody">Contenido</label>
            <textarea id="priorityEmailBody" name="body" required>${escapeHtml(view.emailBody)}</textarea>
          </div>
          <p class="priority-simulation-note full"><i data-lucide="shield-check" aria-hidden="true"></i>No se enviará ningún email real desde esta demostración.</p>
          <div class="form-field full priority-form-actions">
            <button class="secondary-link" type="button" data-priority-modal-close>Cancelar</button>
            <button class="primary-link" type="submit"><i data-lucide="mail-check" aria-hidden="true"></i>Preparar email demo</button>
          </div>
        </form>`,
    });
  }

  function openModal(options) {
    const overlay = document.querySelector("[data-priority-modal]");
    overlay.querySelector("[data-priority-modal-eyebrow]").textContent = options.eyebrow;
    overlay.querySelector("[data-priority-modal-title]").textContent = options.title;
    overlay.querySelector("[data-priority-modal-description]").textContent = options.description;
    overlay.querySelector("[data-priority-modal-content]").innerHTML = options.content;
    overlay.hidden = false;
    body.classList.add("experience-dialog-open");
    refreshIcons();
    window.requestAnimationFrame(() => overlay.querySelector("[data-priority-modal-content] input, [data-priority-modal-content] select, [data-priority-modal-content] textarea, [data-priority-modal-content] button")?.focus());
  }

  function closeModal() {
    const overlay = document.querySelector("[data-priority-modal]");
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    body.classList.remove("experience-dialog-open");
    if (lastTrigger instanceof HTMLElement) lastTrigger.focus();
  }

  function formField(id, name, label, placeholder) {
    return `<div class="form-field"><label for="${id}">${escapeHtml(label)}</label><input id="${id}" name="${name}" type="text" placeholder="${escapeHtml(placeholder)}" required /></div>`;
  }

  function addRecord(form) {
    const view = findView(form.dataset.priorityFormView);
    if (!view) return;
    const data = new FormData(form);
    const row = {
      cells: [String(data.get("reference")), String(data.get("detail")), String(data.get("third"))],
      status: String(data.get("status")),
      actionLabel: view.table.actionLabel,
      nextStatus: view.table.nextStatus,
      message: `${String(data.get("reference"))} fue actualizado en ${view.label.toLowerCase()}.`,
    };
    const table = document.querySelector(`[data-priority-table="${view.id}"]`);
    table.insertAdjacentHTML("afterbegin", renderRow(view, row));
    const count = table.querySelectorAll("[data-priority-record]").length;
    document.querySelector(`[data-priority-count="${view.id}"]`).textContent = `${count} registros`;
    closeModal();
    refreshIcons();
    showToast(`${row.cells[0]} se agregó correctamente a ${view.label.toLowerCase()}.`);
  }

  function completeRowAction(button) {
    const row = button.closest("[data-priority-record]");
    const tag = row?.querySelector("[data-priority-status]");
    if (!tag) return;
    tag.textContent = button.dataset.priorityNextStatus;
    tag.className = `tag ${statusClass(button.dataset.priorityNextStatus)}`;
    button.replaceWith(Object.assign(document.createElement("span"), {
      className: "sr-only",
      textContent: "Sin acciones pendientes",
    }));
    showToast(button.dataset.priorityMessage);
  }

  async function downloadViewPdf(viewId, button) {
    const view = findView(viewId);
    if (!view || !window.SCReportPdf) return;
    button.disabled = true;
    const original = button.innerHTML;
    button.innerHTML = '<i data-lucide="loader-circle" class="experience-spin" aria-hidden="true"></i>Generando...';
    refreshIcons();
    let downloaded = false;
    try {
      downloaded = await window.SCReportPdf.downloadReport({
        title: `${view.title} · Resumen ejecutivo`,
        rubro: demo.label,
        dashboard: `SC ${demo.label} · ${view.label}`,
        period: "Datos ficticios de la sesión",
        schedule: "Bajo demanda",
        recipient: demo.recipient,
        fileName: `sc-${slug}-${view.id}-demo.pdf`,
        logoUrl: "../../assets/img/sc-symbol.png",
        footerLogoUrl: "../../assets/img/sc-white.png",
        panels: view.metrics.map((metric, index) => ({
          label: metric.label,
          value: metric.value,
          detail: metric.note,
          series: [24 + index * 3, 38 + index * 4, 51 + index * 3, 64 + index * 4, 78 + index * 3],
        })),
      });
    } catch (error) {
      console.error("No se pudo generar el PDF demo.", error);
    } finally {
      button.disabled = false;
      button.innerHTML = original;
      refreshIcons();
    }
    showToast(downloaded ? `PDF demo de ${view.label.toLowerCase()} generado correctamente.` : "No se pudo generar el PDF demo.");
  }

  function findView(viewId) {
    return demo.views.find((view) => view.id === viewId);
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function statusClass(status) {
    const normalized = normalize(status);
    if (/aprob|activo|vigente|pagado|firmado|entregado|completado|validado|disponible|enviado|confirmado|al dia/.test(normalized)) return "ok";
    if (/venc|rechaz|bloque|demorado|critico|atrasado/.test(normalized)) return "urgent";
    return "waiting";
  }

  function isTerminalRowStatus(status, nextStatus) {
    const normalized = normalize(status);
    return normalized === normalize(nextStatus)
      || ["aprobado", "al dia", "cerrado", "completado", "entregado", "finalizado", "firmado", "pagado", "presentado"].includes(normalized);
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function refreshIcons() {
    window.lucide?.createIcons();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getPriorityDemo(demoSlug) {
    const common = {
      medica: {
        label: "Área médica",
        recipient: "administracion.salud@demo.local",
        views: [
          createView("facturacion", "Facturación", "receipt-text", "Administración clínica", "Facturación y cobranzas", "Prestaciones, comprobantes internos, saldos y seguimiento de pagos en una sola vista.",
            [["Facturado este mes", "$ 18,4 M", "+12% frente al mes anterior", "badge-dollar-sign"], ["Pendiente de cobro", "$ 2,1 M", "14 comprobantes", "clock-3"], ["Índice de cobranza", "91%", "Objetivo mensual 90%", "trending-up"], ["Comprobantes", "128", "Datos fiscales simulados", "files"]],
            ["Paciente", "Prestación", "Importe", "Estado"], [["Lucía Peralta", "Consulta cardiológica", "$ 48.000", "Pendiente"], ["Marco Bustos", "Control diabetológico", "$ 41.500", "Pagado"], ["Sofía Montenegro", "Práctica traumatológica", "$ 72.000", "En revisión"]],
            "Registrar pago", "Pagado", "Registrar comprobante", ["Paciente", "Prestación", "Importe"], "Automatizar conciliación, alertas de deuda y resumen diario para administración.",
            [["Cierre diario", "128 comprobantes controlados", "Completado", "circle-check"], ["Saldo por obra social", "Próxima revisión 16:00", "Pendiente", "landmark"]]),
          createView("autorizaciones", "Autorizaciones", "badge-check", "Coberturas", "Autorizaciones y prácticas", "Cola de validaciones por obra social, plan, práctica y prioridad de atención.",
            [["Pendientes", "7", "3 requieren revisión", "clock"], ["Aprobación", "94%", "Últimos 30 días", "badge-check"], ["Tiempo medio", "18 min", "SLA objetivo 25 min", "timer"], ["Observadas", "2", "Documentación incompleta", "triangle-alert"]],
            ["Paciente", "Práctica", "Cobertura", "Estado"], [["Lucía Peralta", "Ecocardiograma", "Salud Total", "Pendiente"], ["Diego Ferraro", "Laboratorio anual", "Cobertura Federal", "Aprobado"], ["Sofía Montenegro", "Resonancia lumbar", "Bienestar Plus", "En revisión"]],
            "Validar", "Aprobado", "Nueva autorización", ["Paciente", "Práctica", "Cobertura"], "Consultar cobertura, solicitar documentación y reintentar automáticamente ante demoras.",
            [["Respuesta prioritaria", "Ecocardiograma de Lucía Peralta", "Pendiente", "heart-pulse"], ["Adjunto recibido", "Orden médica validada", "Aprobado", "file-check-2"]]),
          createView("profesionales", "Profesionales", "stethoscope", "Equipo asistencial", "Profesionales y agendas", "Disponibilidad, especialidades, matrícula, carga horaria y alertas de credenciales.",
            [["Profesionales activos", "24", "8 especialidades", "users"], ["Agendas abiertas", "18", "Próximos 14 días", "calendar-days"], ["Ocupación", "82%", "Pico de 09:00 a 12:00", "activity"], ["Credenciales", "3", "Próximas a vencer", "shield-alert"]],
            ["Profesional", "Especialidad", "Agenda", "Estado"], [["Dra. Valeria Ramos", "Cardiología", "Lun, mié y vie", "Activo"], ["Dr. Mateo Aguirre", "Diabetología", "Mar y jue", "Activo"], ["Dra. Camila Ortega", "Traumatología", "Lun a vie", "En revisión"]],
            "Habilitar", "Activo", "Agregar profesional", ["Profesional", "Especialidad", "Agenda"], "Avisar vencimientos, bloquear agendas incompletas y redistribuir turnos por disponibilidad.",
            [["Matrícula por vencer", "Revisión dentro de 18 días", "Pendiente", "shield-alert"], ["Cobertura de guardia", "Semana completa asignada", "Confirmado", "calendar-check"]]),
          createView("documentos", "Documentos", "folder-open", "Historia documental", "Recetas y documentos clínicos", "Órdenes, recetas, consentimientos y resultados vinculados a cada paciente.",
            [["Documentos", "342", "Últimos 90 días", "files"], ["Recetas emitidas", "67", "12 este mes", "notebook-pen"], ["Firmas pendientes", "5", "Consentimientos", "pen-line"], ["Digitalizados", "100%", "Sin papel en admisión", "scan-line"]],
            ["Documento", "Paciente", "Fecha", "Estado"], [["Receta crónica", "Marco Bustos", "05/09/2026", "Firmado"], ["Orden de laboratorio", "Lucía Peralta", "05/09/2026", "Pendiente"], ["Consentimiento", "Sofía Montenegro", "04/09/2026", "En revisión"]],
            "Firmar", "Firmado", "Nuevo documento", ["Documento", "Paciente", "Fecha"], "Generar documentos, solicitar firma y archivar el PDF en la historia clínica.",
            [["Documento listo", "Receta disponible para descarga", "Firmado", "file-check"], ["Firma solicitada", "Consentimiento enviado al portal", "Pendiente", "pen-line"]]),
          createView("seguimiento", "Seguimiento", "heart-handshake", "Continuidad asistencial", "Seguimiento de pacientes", "Tareas posteriores a la consulta, alertas clínicas y contactos programados.",
            [["En seguimiento", "46", "Programas activos", "heart-handshake"], ["Alertas clínicas", "8", "2 de prioridad alta", "bell-ring"], ["Tareas de hoy", "12", "9 completadas", "list-checks"], ["Adherencia", "88%", "+6% por recordatorios", "trending-up"]],
            ["Paciente", "Próximo paso", "Canal", "Estado"], [["Lucía Peralta", "Control de presión", "WhatsApp demo", "Programado"], ["Marco Bustos", "Renovar receta", "Portal", "Pendiente"], ["Diego Ferraro", "Encuesta posconsulta", "Email demo", "Completado"]],
            "Contactar", "Completado", "Nuevo seguimiento", ["Paciente", "Próximo paso", "Canal"], "Crear recordatorios multicanal, escalar alertas y registrar respuestas en la ficha.",
            [["Alerta prioritaria", "Dos controles sin respuesta", "Pendiente", "bell-ring"], ["Campaña de control", "31 pacientes contactados", "Completado", "send"]]),
        ],
      },
      inmobiliarias: {
        label: "Inmobiliarias",
        recipient: "administracion.inmobiliaria@demo.local",
        views: [
          createView("contratos", "Contratos", "file-signature", "Gestión documental", "Contratos y documentación", "Reservas, boletos, alquileres, firmas y vencimientos con trazabilidad documental.",
            [["Contratos activos", "38", "24 alquileres", "file-signature"], ["Firmas pendientes", "6", "Recordatorio automático", "pen-line"], ["Vencimientos", "4", "Próximos 30 días", "calendar-clock"], ["Digitalizados", "96%", "+18% este trimestre", "scan-line"]],
            ["Operación", "Documento", "Vencimiento", "Estado"], [["Departamento Centro Norte", "Boleto de compraventa", "18/09/2026", "Pendiente"], ["Local Acceso Oeste", "Contrato de alquiler", "31/08/2027", "Firmado"], ["Lote 42", "Reserva", "12/09/2026", "En revisión"]],
            "Solicitar firma", "Firmado", "Nuevo contrato", ["Operación", "Documento", "Vencimiento"], "Solicitar firmas, alertar vencimientos y archivar versiones aprobadas automáticamente.",
            [["Firma pendiente", "Boleto de Centro Norte", "Pendiente", "pen-line"], ["Renovación próxima", "Aviso programado a propietario", "Programado", "calendar-clock"]]),
          createView("reservas", "Reservas", "calendar-check", "Operaciones", "Reservas y aprobaciones", "Señas, condiciones, documentación y aprobación comercial antes del contrato.",
            [["Reservas abiertas", "9", "USD 86 K en señas", "calendar-check"], ["Aprobadas", "71%", "Últimos 60 días", "badge-check"], ["Documentación", "3", "Legajos incompletos", "folder-warning"], ["Tiempo medio", "2,4 días", "De reserva a firma", "timer"]],
            ["Propiedad", "Interesado", "Seña", "Estado"], [["Lote 42", "Grupo Horizonte", "USD 3.800", "En revisión"], ["Casa Jardín Sur", "Valentina Paz", "USD 8.000", "Aprobado"], ["Departamento Centro Norte", "Sofía Alba", "USD 9.200", "Pendiente"]],
            "Aprobar", "Aprobado", "Nueva reserva", ["Propiedad", "Interesado", "Seña"], "Validar documentación, pedir aprobación humana y generar el contrato al confirmar la seña.",
            [["Reserva prioritaria", "Lote 42 vence en 48 horas", "Pendiente", "alarm-clock"], ["Legajo completo", "Casa Jardín Sur", "Aprobado", "folder-check"]]),
          createView("cobranzas", "Cobranzas", "wallet-cards", "Administración", "Cobranzas y cuentas", "Cuotas, alquileres, honorarios, saldos vencidos y conciliación por propietario.",
            [["Cobrado este mes", "$ 42,8 M", "92% del objetivo", "badge-dollar-sign"], ["Saldo vencido", "$ 3,2 M", "8 operaciones", "triangle-alert"], ["Conciliado", "89%", "Bancos y caja", "landmark"], ["Próximos pagos", "17", "Siete días", "calendar-days"]],
            ["Cuenta", "Concepto", "Importe", "Estado"], [["Local Acceso Oeste", "Alquiler septiembre", "$ 780.000", "Pendiente"], ["Casa Jardín Sur", "Seña de reserva", "USD 8.000", "Pagado"], ["Departamento Río", "Honorarios", "$ 1.240.000", "Vencido"]],
            "Registrar pago", "Pagado", "Nueva cobranza", ["Cuenta", "Concepto", "Importe"], "Enviar avisos, conciliar movimientos y liquidar al propietario con control humano.",
            [["Mora detectada", "Departamento Río · 6 días", "Vencido", "triangle-alert"], ["Liquidación semanal", "12 propietarios incluidos", "Programado", "wallet-cards"]]),
          createView("propietarios", "Propietarios", "building-2", "Portal privado", "Portal del propietario", "Rendimiento, contratos, liquidaciones, documentos y solicitudes por inmueble.",
            [["Propietarios", "64", "52 activos este mes", "users"], ["Inmuebles", "128", "91% ocupados", "building-2"], ["Liquidaciones", "47", "Listas para descargar", "file-down"], ["Solicitudes", "6", "Mantenimiento y consultas", "messages-square"]],
            ["Propietario", "Cartera", "Rendimiento", "Estado"], [["Mariana Costa", "3 propiedades", "8,4% anual", "Activo"], ["Grupo Horizonte", "5 lotes", "72% reservado", "Activo"], ["Esteban Robles", "1 local", "Liquidación pendiente", "En revisión"]],
            "Habilitar portal", "Activo", "Nuevo propietario", ["Propietario", "Cartera", "Rendimiento"], "Publicar liquidaciones, avisar documentos nuevos y centralizar solicitudes del propietario.",
            [["Reporte mensual", "47 liquidaciones disponibles", "Completado", "file-check"], ["Solicitud abierta", "Revisión de expensas", "Pendiente", "message-square"]]),
        ],
      },
      materiales: {
        label: "Venta de materiales",
        recipient: "compras.materiales@demo.local",
        views: [
          createView("compras", "Compras", "shopping-cart", "Abastecimiento", "Compras y reposición", "Órdenes sugeridas por stock, rotación, ventas comprometidas y plazo del proveedor.",
            [["Órdenes abiertas", "14", "$ 12,6 M", "shopping-cart"], ["Stock crítico", "12", "5 productos urgentes", "triangle-alert"], ["Cobertura", "18 días", "Promedio de inventario", "boxes"], ["Ahorro estimado", "7,2%", "Compra consolidada", "trending-down"]],
            ["Orden", "Proveedor", "Importe", "Estado"], [["OC-2048", "Cementos del Centro", "$ 4.820.000", "Pendiente"], ["OC-2047", "Aceros Regionales", "$ 6.340.000", "Aprobado"], ["OC-2046", "PVC Distribución", "$ 1.440.000", "En revisión"]],
            "Aprobar", "Aprobado", "Nueva orden", ["Orden", "Proveedor", "Importe"], "Generar compra sugerida, solicitar aprobación y enviar la orden al proveedor elegido.",
            [["Compra urgente", "Cemento 50 kg · 300 bolsas", "Pendiente", "triangle-alert"], ["Recepción prevista", "Hierro 8 mm · mañana 09:00", "Programado", "truck"]]),
          createView("proveedores", "Proveedores", "handshake", "Abastecimiento", "Proveedores y cotizaciones", "Precios, cumplimiento, condiciones comerciales, entregas y evaluación de servicio.",
            [["Proveedores activos", "36", "8 estratégicos", "handshake"], ["Cotizaciones", "11", "Abiertas esta semana", "messages-square"], ["Cumplimiento", "94%", "Entregas en fecha", "badge-check"], ["Variación media", "+3,8%", "Últimas listas", "chart-no-axes-combined"]],
            ["Proveedor", "Familia", "Condición", "Estado"], [["Cementos del Centro", "Cemento y cal", "30 días", "Activo"], ["Aceros Regionales", "Hierro y mallas", "Contado -4%", "Activo"], ["PVC Distribución", "Caños y accesorios", "15 días", "En revisión"]],
            "Solicitar cotización", "Enviado", "Nuevo proveedor", ["Proveedor", "Familia", "Condición"], "Comparar cotizaciones, ponderar cumplimiento y preparar la adjudicación con aprobación humana.",
            [["Cotización recibida", "Aceros Regionales", "Completado", "mail-check"], ["Evaluación pendiente", "PVC Distribución", "Pendiente", "clipboard-check"]]),
          createView("precios", "Listas de precios", "list-restart", "Política comercial", "Listas de precios y márgenes", "Costos, listas por canal, descuentos, vigencia y margen objetivo por familia.",
            [["Listas activas", "6", "Mostrador, obra y mayorista", "list"], ["Actualizaciones", "42", "Productos pendientes", "refresh-cw"], ["Margen promedio", "31%", "Objetivo 29%", "percent"], ["Alertas de costo", "8", "Variación mayor al 5%", "bell-ring"]],
            ["Lista", "Familia", "Variación", "Estado"], [["Mayorista septiembre", "Cemento y cal", "+4,2%", "En revisión"], ["Obras especiales", "Hierro", "+6,8%", "Pendiente"], ["Mostrador general", "Cerámicos", "+2,1%", "Aprobado"]],
            "Publicar", "Aprobado", "Nueva lista", ["Lista", "Familia", "Variación"], "Detectar cambios de costo, recalcular margen y publicar luego de una aprobación comercial.",
            [["Margen bajo", "Caño PVC 110 mm · 18%", "Pendiente", "percent"], ["Lista lista", "Mostrador general", "Aprobado", "badge-check"]]),
          createView("cuentas", "Cuentas corrientes", "book-open-check", "Administración", "Cuentas corrientes", "Crédito, saldos, límites, vencimientos y cobranzas por cliente empresa u obra.",
            [["Saldo total", "$ 28,4 M", "63 cuentas activas", "wallet-cards"], ["Vencido", "$ 3,6 M", "11 comprobantes", "triangle-alert"], ["Límite disponible", "72%", "Cartera global", "gauge"], ["Cobranza", "89%", "Últimos 30 días", "trending-up"]],
            ["Cliente", "Condición", "Saldo", "Estado"], [["Constructora Demo Norte", "30 días", "$ 2.840.000", "Pendiente"], ["Obras Litoral", "15 días", "$ 680.000", "Vencido"], ["Cliente Mayorista Sur", "Contado", "$ 0", "Al día"]],
            "Registrar pago", "Pagado", "Nuevo movimiento", ["Cliente", "Condición", "Saldo"], "Recordar vencimientos, suspender crédito por regla y conciliar pagos recibidos.",
            [["Límite próximo", "Constructora Demo Norte · 86%", "Pendiente", "gauge"], ["Avisos programados", "7 vencimientos esta semana", "Programado", "bell"]]),
          createView("despachos", "Logística y margen", "truck", "Entrega rentable", "Despachos, rutas y márgenes", "Preparación, camiones, ventanas de entrega, costo logístico y rentabilidad por pedido.",
            [["Despachos hoy", "18", "4 en ruta", "truck"], ["Entregas SLA", "94%", "+5% mensual", "badge-check"], ["Costo logístico", "6,8%", "Sobre ventas", "route"], ["Margen neto", "24,2%", "Después del flete", "percent"]],
            ["Despacho", "Destino", "Costo", "Estado"], [["DSP-884", "Obra Plaza Norte", "$ 184.000", "En ruta"], ["DSP-883", "Retiro en sucursal", "$ 0", "Completado"], ["DSP-882", "Refacción Las Lomas", "$ 76.000", "Programado"]],
            "Confirmar entrega", "Entregado", "Nuevo despacho", ["Despacho", "Destino", "Costo"], "Optimizar rutas, avisar al cliente y recalcular margen real cuando se confirma la entrega.",
            [["Ruta optimizada", "Tres entregas consolidadas", "Completado", "route"], ["Demora prevista", "Zona norte · 25 minutos", "Pendiente", "clock-alert"]]),
        ],
      },
    };
    return common[demoSlug];
  }

  function createView(id, label, icon, eyebrow, title, description, metricRows, columns, rows, actionLabel, nextStatus, formTitle, formLabels, automation, queueRows) {
    return {
      id,
      label,
      icon,
      eyebrow,
      title,
      description,
      metrics: metricRows.map(([metricLabel, value, note, metricIcon]) => ({ label: metricLabel, value, note, icon: metricIcon })),
      table: {
        title: `Gestión de ${label.toLowerCase()}`,
        subtitle: "Información ficticia preparada para una demostración comercial.",
        columns,
        actionLabel,
        nextStatus,
        rows: rows.map(([first, second, third, status]) => ({ cells: [first, second, third], status })),
      },
      side: {
        title: "Prioridades y alertas",
        subtitle: "Próximas acciones sugeridas por el sistema.",
        items: queueRows.map(([itemTitle, meta, status, itemIcon]) => ({ title: itemTitle, meta, status, icon: itemIcon })),
      },
      form: {
        title: formTitle,
        description: `Agrega un registro ficticio al módulo ${label.toLowerCase()}.`,
        firstLabel: formLabels[0],
        firstPlaceholder: `Ej.: ${rows[0][0]}`,
        secondLabel: formLabels[1],
        secondPlaceholder: `Ej.: ${rows[0][1]}`,
        thirdLabel: formLabels[2],
        thirdPlaceholder: `Ej.: ${rows[0][2]}`,
      },
      automation,
      emailBody: `Resumen automático de ${label.toLowerCase()}: ${metricRows[0][0]} ${metricRows[0][1]}. Se adjunta información ficticia para revisión del equipo.`,
    };
  }
})();
