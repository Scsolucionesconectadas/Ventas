const patients = [
  {
    id: "p-001",
    name: "Lucía Peralta",
    dni: "34.112.908",
    age: 42,
    insurance: "Salud Total",
    plan: "Integral 450",
    lastVisit: "2026-08-22",
    risk: "Hipertensión controlada",
    allergies: "Penicilina",
    channel: "WhatsApp demo",
    initials: "LP",
    history: [
      {
        date: "2026-08-22",
        title: "Control cardiológico",
        detail: "Presión estable. Se mantiene medicación y se solicita laboratorio anual.",
      },
      {
        date: "2026-06-11",
        title: "Electrocardiograma",
        detail: "Estudio sin hallazgos agudos. Seguimiento programado.",
      },
      {
        date: "2025-12-03",
        title: "Alta de antecedente",
        detail: "Se registra hipertensión familiar y alergia declarada a penicilina.",
      },
    ],
  },
  {
    id: "p-002",
    name: "Marco Bustos",
    dni: "29.487.300",
    age: 51,
    insurance: "Prevención Plus",
    plan: "Plan Empresas",
    lastVisit: "2026-08-28",
    risk: "Diabetes tipo 2",
    allergies: "Sin alergias declaradas",
    channel: "Portal paciente",
    initials: "MB",
    history: [
      {
        date: "2026-08-28",
        title: "Consulta diabetología",
        detail: "Se revisa glucemia y adherencia. Nueva receta generada.",
      },
      {
        date: "2026-07-19",
        title: "Telemedicina",
        detail: "Control remoto por valores informados desde app del paciente.",
      },
    ],
  },
  {
    id: "p-003",
    name: "Sofía Montenegro",
    dni: "40.761.144",
    age: 33,
    insurance: "Medired",
    plan: "Joven 300",
    lastVisit: "2026-08-12",
    risk: "Seguimiento traumatológico",
    allergies: "Ibuprofeno",
    channel: "Recepción",
    initials: "SM",
    history: [
      {
        date: "2026-08-12",
        title: "Traumatología",
        detail: "Dolor lumbar. Se indica kinesiología y control en 30 días.",
      },
      {
        date: "2026-05-07",
        title: "Guardia",
        detail: "Atención por contractura. Evolución favorable.",
      },
    ],
  },
  {
    id: "p-004",
    name: "Diego Ferraro",
    dni: "31.955.781",
    age: 47,
    insurance: "Sanar",
    plan: "Premium Familiar",
    lastVisit: "2026-08-31",
    risk: "Chequeo preventivo",
    allergies: "Sin alergias declaradas",
    channel: "Chatbot",
    initials: "DF",
    history: [
      {
        date: "2026-08-31",
        title: "Clínica médica",
        detail: "Chequeo general. Se cargan indicaciones y estudios preventivos.",
      },
    ],
  },
];

const appointments = [
  {
    id: "t-001",
    time: "08:30",
    patientId: "p-001",
    doctor: "Dra. Valeria Ramos",
    specialty: "Cardiología",
    status: "En sala",
    reason: "Control de presión",
  },
  {
    id: "t-002",
    time: "09:10",
    patientId: "p-002",
    doctor: "Dr. Mateo Aguirre",
    specialty: "Diabetología",
    status: "Admitido",
    reason: "Renovación de receta",
  },
  {
    id: "t-003",
    time: "10:00",
    patientId: "p-003",
    doctor: "Dra. Camila Ortega",
    specialty: "Traumatología",
    status: "Pendiente",
    reason: "Dolor lumbar",
  },
  {
    id: "t-004",
    time: "11:20",
    patientId: "p-004",
    doctor: "Dra. Valeria Ramos",
    specialty: "Clínica médica",
    status: "Confirmado",
    reason: "Chequeo anual",
  },
];

const consultations = [
  {
    date: "2026-08-31",
    patientId: "p-004",
    type: "control",
    doctor: "Dra. Valeria Ramos",
    summary: "Chequeo preventivo con solicitud de laboratorio y ecografía.",
    status: "Cerrada",
  },
  {
    date: "2026-08-28",
    patientId: "p-002",
    type: "control",
    doctor: "Dr. Mateo Aguirre",
    summary: "Ajuste de medicación y nueva receta digital.",
    status: "Cerrada",
  },
  {
    date: "2026-08-22",
    patientId: "p-001",
    type: "control",
    doctor: "Dra. Valeria Ramos",
    summary: "Presión estable y seguimiento en 60 días.",
    status: "Cerrada",
  },
  {
    date: "2026-08-18",
    patientId: "p-003",
    type: "telemedicina",
    doctor: "Dra. Camila Ortega",
    summary: "Revisión de evolución por kinesiología.",
    status: "En seguimiento",
  },
  {
    date: "2026-08-05",
    patientId: "p-003",
    type: "urgencia",
    doctor: "Guardia médica",
    summary: "Dolor agudo. Se indica reposo y control traumatológico.",
    status: "Derivada",
  },
];

const insurances = [
  {
    name: "Salud Total",
    plans: "Integral 300 / 450 / 700",
    authorization: "Digital",
    delay: "Aprobación inmediata",
    status: "Activa",
  },
  {
    name: "Prevención Plus",
    plans: "Empresas / Familiar",
    authorization: "Según práctica",
    delay: "24 a 48 hs",
    status: "Activa",
  },
  {
    name: "Medired",
    plans: "Joven 300 / Base 200",
    authorization: "Manual",
    delay: "Validación en recepción",
    status: "Activa",
  },
  {
    name: "Sanar",
    plans: "Premium Familiar",
    authorization: "Digital",
    delay: "Aprobación inmediata",
    status: "Activa",
  },
];

const medicalReports = {
  pdfName: "Reporte ejecutivo de operación médica",
  fileName: "sc-medica-reporte-demo.pdf",
  recipient: "direccion@demo.local",
  panels: [
    { label: "Turnos confirmados", value: "86%", trend: "+9% por recordatorios", detail: "Agenda, admisión y ausentismo.", icon: "calendar-check", series: [46, 55, 61, 72, 79, 86] },
    { label: "Coberturas validadas", value: "94%", trend: "12 obras asociadas", detail: "Control por obra social, plan y práctica.", icon: "badge-check", series: [60, 68, 74, 82, 90, 94] },
    { label: "Consultas cerradas", value: "128", trend: "5 en seguimiento", detail: "Evolución médica y próximos pasos.", icon: "clipboard-list", series: [32, 42, 55, 63, 74, 88] },
    { label: "Chats resueltos", value: "31", trend: "Sin espera telefónica", detail: "Recepción automatizada y derivaciones.", icon: "message-square", series: [24, 30, 42, 54, 68, 78] },
  ],
  delivery: [
    { icon: "file-text", title: "PDF de dirección", detail: "Turnos, coberturas, consultas y productividad.", status: "Programado" },
    { icon: "mail-check", title: "Email automático", detail: "Adjunta PDF y CSV al cierre diario.", status: "Demo" },
    { icon: "bell-ring", title: "Alertas de admisión", detail: "Avisa turnos demorados y coberturas pendientes.", status: "Activo" },
  ],
};

const state = {
  selectedPatientId: "p-001",
  chatCount: 31,
  activeAppointmentMenu: null,
  guidedDemoRun: 0,
  suppressMenuCloseUntil: 0,
  reportEvents: [
    { time: "08:00", title: "Reporte diario preparado", detail: "PDF y CSV listos para dirección." },
    { time: "07:45", title: "Coberturas sincronizadas", detail: "Validaciones disponibles para admisión." },
  ],
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", () => {
  bindViewControls();
  bindDropdowns();
  bindAppointmentForm();
  bindPatientSearch();
  bindConsultationFilter();
  bindChatbot();
  bindGuidedDemo();
  bindMedicalReports();
  setDefaultAppointmentValues();
  setupRevealAnimations();
  renderAll();

  refreshIcons();
});

function bindViewControls() {
  $$("[data-view]").forEach((control) => {
    control.addEventListener("click", () => {
      setView(control.dataset.view);
    });
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
      closeAppointmentMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAppointmentMenu();
    }
  });

  window.addEventListener("resize", closeAppointmentMenu);
  window.addEventListener("scroll", () => {
    if (Date.now() < state.suppressMenuCloseUntil) return;
    closeAppointmentMenu();
  }, true);
}

function bindAppointmentForm() {
  const form = $("#appointmentForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const patientId = $("#appointmentPatient").value;
    const patient = getPatient(patientId);
    const doctor = $("#appointmentDoctor").value;
    const date = $("#appointmentDate").value;
    const time = $("#appointmentTime").value;
    const reason = $("#appointmentReason").value.trim();

    appointments.push({
      id: `t-${Date.now()}`,
      time,
      patientId,
      doctor,
      specialty: inferSpecialty(doctor),
      status: "Confirmado",
      reason,
      date,
    });

    state.selectedPatientId = patientId;
    form.reset();
    setDefaultAppointmentValues();
    renderAll();
    setView("turnos");
    showToast(`Turno confirmado para ${patient.name} a las ${time}.`);
  });
}

function bindPatientSearch() {
  const input = $("#patientSearch");
  if (!input) return;

  input.addEventListener("input", () => {
    renderPatientList(input.value);
  });
}

function bindConsultationFilter() {
  const filter = $("#consultationFilter");
  if (!filter) return;

  filter.addEventListener("change", () => {
    renderConsultations();
  });
}

function bindChatbot() {
  const form = $("#chatForm");
  const input = $("#chatInput");

  $$(".quick-reply").forEach((button) => {
    button.addEventListener("click", () => {
      handleChatMessage(button.dataset.message);
    });
  });

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

function setDefaultAppointmentValues() {
  const dateInput = $("#appointmentDate");
  const timeInput = $("#appointmentTime");

  if (dateInput) {
    const today = new Date();
    dateInput.value = today.toISOString().slice(0, 10);
  }

  if (timeInput) {
    timeInput.value = "12:30";
  }
}

function renderAll() {
  renderPatientOptions();
  renderAppointments("#appointmentList");
  renderAppointments("#appointmentListTurnos");
  renderPatientSummary("#selectedPatient");
  renderPatientSummary("#historyPatient");
  renderPatientList($("#patientSearch")?.value || "");
  renderHistory();
  renderConsultations();
  renderInsurances();
  renderMedicalReports();
  renderChatIntro();
  renderMetrics();
  window.SCAnimations?.refresh?.();
  refreshIcons();
}

function setView(viewName) {
  if (!viewName) return;

  closeAppointmentMenu();

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

function renderPatientOptions() {
  const select = $("#appointmentPatient");
  if (!select) return;

  select.innerHTML = patients
    .map((patient) => `<option value="${patient.id}">${escapeHtml(patient.name)} - ${escapeHtml(patient.insurance)}</option>`)
    .join("");

  select.value = state.selectedPatientId;
}

function renderAppointments(selector) {
  const container = $(selector);
  if (!container) return;

  const sorted = [...appointments].sort((first, second) => first.time.localeCompare(second.time));

  container.innerHTML = sorted
    .map((appointment) => {
      const patient = getPatient(appointment.patientId);
      const statusClass = getStatusClass(appointment.status);

      return `
        <article class="appointment-item">
          <span class="time-pill">${escapeHtml(appointment.time)}</span>
          <div>
            <strong>${escapeHtml(patient.name)}</strong>
            <span>${escapeHtml(appointment.specialty)} · ${escapeHtml(appointment.doctor)}</span>
            <span>${escapeHtml(appointment.reason)}</span>
          </div>
          <div class="row-actions">
            <span class="tag ${statusClass}">${escapeHtml(appointment.status)}</span>
            <button class="row-menu-button" type="button" data-appointment-id="${escapeHtml(appointment.id)}" aria-label="Acciones del turno">
              <i data-lucide="more-horizontal" aria-hidden="true"></i>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  container.querySelectorAll("[data-appointment-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openAppointmentMenu(button, button.dataset.appointmentId);
    });
  });
}

function openAppointmentMenu(anchor, appointmentId) {
  const appointment = appointments.find((item) => item.id === appointmentId);
  if (!appointment) return;

  const patient = getPatient(appointment.patientId);
  const currentMenu = $(".floating-row-menu");

  if (currentMenu && state.activeAppointmentMenu === appointmentId) {
    closeAppointmentMenu();
    return;
  }

  closeAppointmentMenu();
  state.activeAppointmentMenu = appointmentId;
  state.suppressMenuCloseUntil = Date.now() + 260;
  anchor.setAttribute("aria-expanded", "true");

  const menu = document.createElement("div");
  menu.className = "floating-row-menu";
  menu.setAttribute("role", "menu");
  menu.innerHTML = `
    <div class="floating-menu-head">
      <strong>${escapeHtml(patient.name)}</strong>
      <span>${escapeHtml(appointment.time)} · ${escapeHtml(appointment.specialty)}</span>
    </div>
    <button type="button" role="menuitem" data-floating-action="ficha">
      <i data-lucide="folder-heart" aria-hidden="true"></i>
      Abrir ficha
    </button>
    <button type="button" role="menuitem" data-floating-action="recordatorio">
      <i data-lucide="bell-ring" aria-hidden="true"></i>
      Enviar recordatorio
    </button>
    <button type="button" role="menuitem" data-floating-action="admision">
      <i data-lucide="badge-check" aria-hidden="true"></i>
      Marcar admisión
    </button>
  `;

  document.body.appendChild(menu);
  positionFloatingMenu(anchor, menu);

  menu.querySelectorAll("[data-floating-action]").forEach((button) => {
    button.addEventListener("click", () => {
      handleAppointmentAction(button.dataset.floatingAction, appointment);
    });
  });

  refreshIcons();
  window.SCAnimations?.menuIn?.(menu);
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

function handleAppointmentAction(action, appointment) {
  const patient = getPatient(appointment.patientId);
  state.selectedPatientId = patient.id;
  closeAppointmentMenu();

  if (action === "ficha") {
    renderAll();
    setView("historia");
    showToast(`Ficha abierta para ${patient.name}.`);
    return;
  }

  if (action === "admision") {
    appointment.status = "Admitido";
    renderAll();
    showToast(`Admisión demo marcada para ${patient.name}.`);
    return;
  }

  showToast(`Recordatorio demo preparado para ${patient.name}.`);
}

function closeAppointmentMenu() {
  $(".floating-row-menu")?.remove();
  $$(".row-menu-button").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
  state.activeAppointmentMenu = null;
}

function renderPatientSummary(selector) {
  const container = $(selector);
  if (!container) return;

  const patient = getPatient(state.selectedPatientId);

  container.innerHTML = `
    <div class="patient-card">
      <div class="patient-avatar">${escapeHtml(patient.initials)}</div>
      <div>
        <h3>${escapeHtml(patient.name)}</h3>
        <p>DNI demo ${escapeHtml(patient.dni)} · ${patient.age} años · ${escapeHtml(patient.channel)}</p>
      </div>
    </div>
    <div class="patient-meta">
      <div>
        <span>Obra social</span>
        <strong>${escapeHtml(patient.insurance)}</strong>
      </div>
      <div>
        <span>Plan</span>
        <strong>${escapeHtml(patient.plan)}</strong>
      </div>
      <div>
        <span>Última visita</span>
        <strong>${escapeHtml(patient.lastVisit)}</strong>
      </div>
      <div>
        <span>Alerta clínica</span>
        <strong>${escapeHtml(patient.risk)}</strong>
      </div>
      <div>
        <span>Alergias</span>
        <strong>${escapeHtml(patient.allergies)}</strong>
      </div>
      <div>
        <span>Estado</span>
        <strong>Ficha validada</strong>
      </div>
    </div>
  `;
}

function renderPatientList(search = "") {
  const container = $("#patientList");
  if (!container) return;

  const normalized = normalizeText(search);
  const filtered = patients.filter((patient) => {
    const haystack = normalizeText(`${patient.name} ${patient.dni} ${patient.insurance} ${patient.plan}`);
    return haystack.includes(normalized);
  });

  if (!filtered.length) {
    container.innerHTML = `<div class="empty-state">No hay pacientes para ese criterio de búsqueda.</div>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (patient) => `
        <button class="patient-item" type="button" data-patient-id="${patient.id}">
          <strong>${escapeHtml(patient.name)}</strong>
          <span>${escapeHtml(patient.insurance)} · ${escapeHtml(patient.plan)}</span>
          <span>DNI demo ${escapeHtml(patient.dni)}</span>
        </button>
      `,
    )
    .join("");

  container.querySelectorAll("[data-patient-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPatientId = button.dataset.patientId;
      renderAll();
      showToast("Ficha del paciente actualizada.");
    });
  });
}

function renderHistory() {
  const container = $("#historyTimeline");
  if (!container) return;

  const patient = getPatient(state.selectedPatientId);
  container.innerHTML = patient.history
    .map(
      (item) => `
        <article class="timeline-item">
          <span>${escapeHtml(item.date)}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `,
    )
    .join("");
}

function renderConsultations() {
  const tbody = $("#consultationTableBody");
  if (!tbody) return;

  const filterValue = $("#consultationFilter")?.value || "todas";
  const filtered = consultations.filter((consultation) => {
    return filterValue === "todas" || consultation.type === filterValue;
  });

  tbody.innerHTML = filtered
    .map((consultation) => {
      const patient = getPatient(consultation.patientId);
      const tagClass = consultation.type === "urgencia" ? "urgent" : consultation.type === "telemedicina" ? "waiting" : "ok";

      return `
        <tr>
          <td>${escapeHtml(consultation.date)}</td>
          <td>${escapeHtml(patient.name)}</td>
          <td><span class="tag ${tagClass}">${escapeHtml(labelForType(consultation.type))}</span></td>
          <td>${escapeHtml(consultation.doctor)}</td>
          <td>${escapeHtml(consultation.summary)}</td>
          <td>${escapeHtml(consultation.status)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderInsurances() {
  const container = $("#insuranceList");
  if (!container) return;

  container.innerHTML = insurances
    .map(
      (insurance) => `
        <article class="insurance-item">
          <div class="insurance-row">
            <strong>${escapeHtml(insurance.name)}</strong>
            <span class="tag ok">${escapeHtml(insurance.status)}</span>
          </div>
          <span>Planes: ${escapeHtml(insurance.plans)}</span>
          <span>Autorización: ${escapeHtml(insurance.authorization)} · ${escapeHtml(insurance.delay)}</span>
        </article>
      `,
    )
    .join("");
}

function renderChatIntro() {
  const stream = $("#chatStream");
  if (!stream || stream.dataset.ready === "true") return;

  stream.dataset.ready = "true";
  stream.innerHTML = `
    <div class="message bot">
      Hola, soy el asistente de recepción. Puedo orientar sobre turnos, obras sociales, horarios y últimas consultas.
    </div>
  `;
}

function handleChatMessage(message) {
  const stream = $("#chatStream");
  if (!stream) return;

  addMessage("user", message);
  state.chatCount += 1;
  renderMetrics();

  window.setTimeout(() => {
    addMessage("bot", buildBotResponse(message));
  }, 260);
}

function runGuidedDemo() {
  closeAppointmentMenu();
  state.guidedDemoRun += 1;
  const runId = state.guidedDemoRun;
  showToast("Demo guiada iniciada.");

  const steps = [
    () => {
      setView("chatbot");
      handleChatMessage("Quiero sacar un turno para cardiología");
      window.SCAnimations?.pulse?.($(".chat-box"));
    },
    () => {
      setView("turnos");
      window.SCAnimations?.pulse?.($("#appointmentForm"));
      showToast("La recepción confirma el turno desde una sola pantalla.");
    },
    () => {
      setView("historia");
      state.selectedPatientId = "p-001";
      renderAll();
      window.SCAnimations?.pulse?.($("#historyPatient"));
      showToast("La historia clínica queda disponible para el equipo autorizado.");
    },
    () => {
      setView("obras");
      window.SCAnimations?.pulse?.($("#insuranceList"));
      showToast("La cobertura se valida antes de la atención.");
    },
    () => {
      setView("reportes");
      window.SCAnimations?.pulse?.($("#medicalReportDashboard"));
      showToast("La reportería médica prepara Grafana, PDF y email automático.");
    },
  ];

  playGuidedStep(steps, 0, runId);
}

function bindMedicalReports() {
  $$("[data-medical-report-action]").forEach((button) => {
    button.addEventListener("click", () => {
      handleMedicalReportAction(button.dataset.medicalReportAction);
    });
  });
}

function renderMedicalReports() {
  const panels = $("#medicalReportPanels");
  const delivery = $("#medicalReportDelivery");

  if (panels) {
    panels.innerHTML = medicalReports.panels
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
  }

  if (delivery) {
    delivery.innerHTML = medicalReports.delivery
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
  }

  renderMedicalReportLog();
}

function renderMedicalReportLog() {
  const log = $("#medicalReportLog");
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

function handleMedicalReportAction(action) {
  if (action === "pdf") {
    downloadMedicalReportPdf();
    addMedicalReportEvent("PDF generado", `${medicalReports.pdfName} quedó listo para descargar.`);
    showToast("PDF médico demo generado con indicadores y resumen ejecutivo.");
    return;
  }

  if (action === "email") {
    addMedicalReportEvent("Email preparado", `Reporte enviado en modo demo a ${medicalReports.recipient}.`);
    showToast("Email demo preparado con PDF y CSV adjuntos. No se envió correo real.");
    return;
  }

  addMedicalReportEvent("Dashboard revisado", "Se abrió la vista SC Salud Operativa con filtros aplicados.");
  showToast("Dashboard Grafana demo actualizado con el período seleccionado.");
}

function addMedicalReportEvent(title, detail) {
  state.reportEvents.unshift({
    time: new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
    title,
    detail,
  });

  renderMedicalReportLog();
  refreshIcons();
  window.SCAnimations?.pulse?.($("#medicalReportLog"));
}

async function downloadMedicalReportPdf() {
  if (window.SCReportPdf?.downloadReport) {
    const generated = await window.SCReportPdf.downloadReport({
      title: medicalReports.pdfName,
      rubro: "Área médica",
      dashboard: "SC Salud Operativa",
      period: "Últimos 30 días",
      schedule: "Diario 08:00",
      recipient: medicalReports.recipient,
      panels: medicalReports.panels,
      fileName: medicalReports.fileName,
      logoUrl: "../../assets/img/sc-color.png",
      footerLogoUrl: "../../assets/img/sc-white.png",
    });

    if (generated) return;
  }

  const lines = [
    medicalReports.pdfName,
    "Rubro: Área médica",
    "Dashboard: SC Salud Operativa",
    "Período: Últimos 30 días",
    "Programación: Diario 08:00",
    `Destinatarios: ${medicalReports.recipient}`,
    "Indicadores:",
    ...medicalReports.panels.map((panel) => `${panel.label}: ${panel.value} - ${panel.detail}`),
    "Documento demo generado por Soluciones Conectadas.",
  ];
  const blob = new Blob([buildSimplePdf(lines)], { type: "application/pdf" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = medicalReports.fileName;
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

function playGuidedStep(steps, index, runId) {
  if (runId !== state.guidedDemoRun) return;
  if (!steps[index]) return;

  steps[index]();
  const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.4 : 1.35;

  window.setTimeout(() => playGuidedStep(steps, index + 1, runId), delay * 1000);
}

function addMessage(type, text) {
  const stream = $("#chatStream");
  if (!stream) return;

  const bubble = document.createElement("div");
  bubble.className = `message ${type}`;
  bubble.textContent = text;
  stream.appendChild(bubble);
  stream.scrollTop = stream.scrollHeight;
}

function buildBotResponse(message) {
  const normalized = normalizeText(message);

  if (normalized.includes("turno") || normalized.includes("cardiologia")) {
    return "Tenemos disponibilidad hoy a las 12:30 y mañana a las 09:40. En una versión real podría confirmar el turno y enviar recordatorio automático.";
  }

  if (normalized.includes("obra") || normalized.includes("cobertura") || normalized.includes("social")) {
    return "Puedo validar cobertura contra las obras asociadas. En esta demo figuran Salud Total, Prevención Plus, Medired y Sanar.";
  }

  if (normalized.includes("consulta") || normalized.includes("historia")) {
    return "El paciente puede ver un resumen de consultas cerradas y el equipo médico puede revisar la historia clínica según permisos.";
  }

  if (normalized.includes("reprogramar")) {
    return "Puedo tomar la solicitud de reprogramación, sugerir horarios y dejar una tarea para recepción.";
  }

  return "Puedo derivar la consulta a recepción, cargar una solicitud y guardar el intercambio en el historial del paciente.";
}

function renderMetrics() {
  const appointmentsMetric = $("#metricAppointments");
  const chatsMetric = $("#metricChats");

  if (appointmentsMetric) {
    appointmentsMetric.textContent = String(appointments.length + 14);
  }

  if (chatsMetric) {
    chatsMetric.textContent = String(state.chatCount);
  }
}

function getPatient(patientId) {
  return patients.find((patient) => patient.id === patientId) || patients[0];
}

function inferSpecialty(doctor) {
  if (doctor.includes("Mateo")) return "Diabetología";
  if (doctor.includes("Camila")) return "Traumatología";
  return "Clínica médica";
}

function getStatusClass(status) {
  const value = normalizeText(status);
  if (value.includes("en sala") || value.includes("admitido") || value.includes("programado") || value.includes("activo") || value.includes("demo")) return "ok";
  if (value.includes("pendiente")) return "waiting";
  return "";
}

function labelForType(type) {
  const labels = {
    control: "Control",
    urgencia: "Urgencia",
    telemedicina: "Telemedicina",
  };

  return labels[type] || type;
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

function setupRevealAnimations() {
  const animatedItems = $$(".medical-hero, .command-bar, .metric-card, .module-panel");

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
