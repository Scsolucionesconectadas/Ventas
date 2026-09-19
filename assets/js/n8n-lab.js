(function () {
  const flows = {
    agenda: {
      eyebrow: "Agenda y atención",
      title: "De la solicitud al turno confirmado",
      description: "Recibe una solicitud, valida disponibilidad y confirma sin perder trazabilidad.",
      payload: { solicitud: "TUR-2048", canal: "web", estado: "recibida" },
      result: result(
        "Turno listo para confirmar",
        "La solicitud queda validada, asignada y trazada hasta la confirmación.",
        "El turno quedó confirmado y el recordatorio preparado sin superponer horarios.",
        [["10:30", "Horario"], ["18 s", "Duración"], ["WhatsApp", "Canal demo"]],
        [["Paciente", "Valentina Ruiz"], ["Profesional", "Dra. Laura Méndez"], ["Estado", "Confirmado"], ["ID", "TUR-2048"]],
      ),
      nodes: [
        node("webhook", "Solicitud recibida", "Formulario o WhatsApp", "Normaliza la solicitud y asigna un identificador único", "Solicitud lista para validar", "La solicitud TUR-2048 ingresó desde el formulario web."),
        node("badge-check", "Validar datos", "Solicitud TUR-2048", "Comprueba contacto, servicio y campos obligatorios", "Datos completos y consistentes", "Contacto, especialidad y preferencia horaria validados."),
        node("calendar-search", "Buscar disponibilidad", "Servicio, sede y preferencia", "Consulta agenda y evita superposiciones", "Tres horarios disponibles", "Se encontraron tres horarios sin superposición.", "La agenda respondió y conservó la reserva temporal."),
        node("user-check", "Aprobación humana", "Horario sugerido y contexto", "Solicita aprobación ante una excepción de agenda", "Horario autorizado por recepción", "Recepción aprobó el horario sugerido."),
        node("message-circle", "Enviar confirmación", "Turno autorizado", "Prepara confirmación y recordatorio por el canal elegido", "Mensaje demo preparado", "Confirmación y recordatorio preparados por WhatsApp demo."),
        node("bar-chart-3", "Registrar resultado", "Entrega confirmada", "Actualiza tablero, bitácora e indicador de conversión", "Ejecución trazada", "Turno confirmado y reflejado en el tablero operativo."),
      ],
    },
    ventas: {
      eyebrow: "Ventas y seguimiento",
      title: "De la consulta a la próxima acción comercial",
      description: "Clasifica la oportunidad, asigna responsable y evita seguimientos olvidados.",
      payload: { lead: "LEAD-731", origen: "instagram", interes: "demo" },
      result: result(
        "Oportunidad priorizada",
        "El contacto recibe responsable, prioridad y una próxima acción concreta.",
        "La oportunidad quedó asignada con llamada programada y vencimiento visible.",
        [["Alta", "Prioridad"], ["2 min", "Respuesta"], ["16:00", "Próxima acción"]],
        [["Cuenta", "Ferretería Central"], ["Responsable", "Camila Soto"], ["Acción", "Llamada comercial"], ["ID", "LEAD-731"]],
      ),
      nodes: [
        node("message-square-more", "Lead entrante", "Consulta desde web o redes", "Consolida el contacto sin importar el canal", "Lead LEAD-731 creado", "La consulta se consolidó en un único registro comercial."),
        node("scan-search", "Clasificar interés", "Mensaje y datos del contacto", "Detecta rubro, necesidad y prioridad comercial", "Demo por rubro · prioridad alta", "El lead fue clasificado como comercio con prioridad alta."),
        node("user-round-check", "Asignar responsable", "Lead clasificado", "Aplica reglas por rubro, zona y disponibilidad", "Responsable y vencimiento definidos", "Camila Soto fue asignada con vencimiento para hoy.", "La asignación se retomó sin crear un segundo lead."),
        node("user-check", "Aprobar propuesta", "Alcance y estimación inicial", "Detiene el flujo hasta validar la propuesta", "Propuesta autorizada", "La propuesta inicial fue aprobada para su envío."),
        node("send", "Enviar próximo paso", "Propuesta aprobada", "Prepara email y tarea de seguimiento", "Contacto y tarea programados", "Se preparó el email y la llamada de seguimiento de las 16:00."),
        node("chart-no-axes-combined", "Medir conversión", "Actividad comercial", "Actualiza pipeline, tiempos y resultado", "Bitácora comercial actualizada", "La oportunidad quedó visible en el pipeline y la bitácora."),
      ],
    },
    stock: {
      eyebrow: "Stock y logística",
      title: "De la alerta de faltante a la reposición controlada",
      description: "Cruza inventario y demanda antes de sugerir una compra con aprobación responsable.",
      payload: { sku: "MAT-118", disponible: 8, minimo: 15 },
      result: result(
        "Orden de reposición preparada",
        "La sugerencia combina faltante, consumo, proveedor y fecha necesaria.",
        "La compra quedó preparada con proveedor, cantidad y entrega estimada trazables.",
        [["24 u.", "Cantidad"], ["48 h", "Entrega"], ["2", "Proveedores"]],
        [["Producto", "Cemento CPC40"], ["Proveedor", "Proveedor Norte"], ["Orden", "OC-1842"], ["Estado", "Preparada"]],
      ),
      nodes: [
        node("triangle-alert", "Stock mínimo", "Existencia MAT-118", "Detecta que el disponible quedó por debajo del mínimo", "Alerta de reposición abierta", "El stock disponible quedó siete unidades debajo del mínimo."),
        node("list-checks", "Validar demanda", "Stock, pedidos y consumo", "Evita comprar de más al considerar reservas y rotación", "Reposición sugerida: 24 unidades", "La demanda reservada ajustó la compra sugerida a 24 unidades."),
        node("building-2", "Comparar proveedores", "Cantidad y fecha necesaria", "Evalúa disponibilidad, plazo y precio vigente", "Dos opciones compatibles", "Dos proveedores cumplen cantidad y plazo.", "La comparación se recuperó con precios y plazos vigentes."),
        node("user-check", "Aprobar compra", "Comparación y margen", "Solicita decisión al responsable de compras", "Proveedor y cantidad autorizados", "Compras autorizó cantidad y proveedor sugeridos."),
        node("file-check-2", "Crear orden", "Compra aprobada", "Genera la orden con clave idempotente", "OC-1842 preparada", "La orden OC-1842 se preparó sin duplicados."),
        node("truck", "Trazar entrega", "Orden y fecha prometida", "Registra recepción esperada y alerta ante demora", "Seguimiento logístico activo", "La entrega quedó prevista dentro de 48 horas."),
      ],
    },
    cobranzas: {
      eyebrow: "Cobranzas y seguimiento",
      title: "Del vencimiento detectado al contacto priorizado",
      description: "Ordena saldos, riesgo y canales antes de preparar avisos con supervisión humana.",
      payload: { lote: "COB-091", cartera: "mayoristas", vencidos: 12 },
      result: result(
        "Lote de cobranzas priorizado",
        "Los saldos vencidos quedan ordenados por monto, antigüedad y compromiso previo.",
        "Los avisos quedaron preparados y cada cuenta recibió una próxima acción medible.",
        [["$ 2,4 M", "Saldo demo"], ["12", "Avisos"], ["3", "Prioridades"]],
        [["Cartera", "Mayoristas"], ["Lote", "COB-091"], ["Próximo contacto", "Hoy 14:30"], ["Estado", "Avisos preparados"]],
      ),
      nodes: [
        node("calendar-clock", "Detectar vencimientos", "Facturas y compromisos", "Agrupa documentos vencidos sin duplicar cuentas", "Doce saldos para revisar", "Se agruparon doce saldos vencidos en el lote COB-091."),
        node("shield-check", "Validar saldo", "Cuenta corriente y pagos", "Descarta pagos ya registrados y notas de crédito", "Saldo neto conciliado", "Los saldos fueron conciliados contra pagos y ajustes."),
        node("list-filter", "Priorizar cuentas", "Monto, días y compromisos", "Ordena la gestión por riesgo y antigüedad", "Tres cuentas prioritarias", "Tres cuentas requieren contacto durante el día.", "La priorización se retomó con la misma versión de cartera."),
        node("user-check", "Aprobar contacto", "Lote y mensajes sugeridos", "Permite revisar tono, canal y excepciones", "Campaña autorizada", "Administración aprobó los mensajes y las excepciones."),
        node("messages-square", "Preparar avisos", "Contactos autorizados", "Personaliza recordatorios sin realizar envíos reales", "Doce avisos preparados", "Se prepararon doce avisos por email y WhatsApp demo."),
        node("clipboard-check", "Actualizar seguimiento", "Avisos y próximas acciones", "Registra responsable, fecha y estado de gestión", "Cartera trazada", "La cartera quedó actualizada con responsables y próximos contactos."),
      ],
    },
    reservas: {
      eyebrow: "Gastronomía y reservas",
      title: "De la consulta a la mesa confirmada",
      description: "Valida horario, capacidad y preferencias antes de confirmar una reserva sin sobreventa.",
      payload: { reserva: "RES-482", personas: 4, horario: "21:00" },
      result: result(
        "Reserva confirmada",
        "La mesa se asigna según capacidad, horario y observaciones del cliente.",
        "La reserva quedó confirmada y la ocupación del salón se actualizó automáticamente.",
        [["Mesa 12", "Asignación"], ["4", "Personas"], ["21:00", "Horario"]],
        [["Cliente", "Sofía Luna"], ["Reserva", "RES-482"], ["Zona", "Salón"], ["Estado", "Confirmada"]],
      ),
      nodes: [
        node("utensils", "Solicitud de mesa", "Web, teléfono o WhatsApp", "Unifica comensales, horario y preferencias", "Reserva RES-482 iniciada", "La solicitud para cuatro personas ingresó al registro de reservas."),
        node("users-round", "Validar comensales", "Cantidad y observaciones", "Comprueba capacidad y datos de contacto", "Solicitud completa", "Cantidad, teléfono y observaciones quedaron validados."),
        node("calendar-search", "Buscar mesa", "Horario, zona y capacidad", "Cruza ocupación y duración estimada", "Mesa 12 disponible", "La mesa 12 está disponible a las 21:00.", "La disponibilidad se recuperó sin perder la preasignación."),
        node("user-check", "Aprobar asignación", "Mesa sugerida y ocupación", "Solicita revisión ante capacidad ajustada", "Mesa autorizada", "El encargado aprobó la asignación de la mesa 12."),
        node("message-circle-check", "Confirmar reserva", "Asignación autorizada", "Prepara confirmación y política de tolerancia", "Mensaje demo preparado", "La confirmación quedó preparada con horario y política de tolerancia."),
        node("layout-dashboard", "Actualizar ocupación", "Reserva confirmada", "Actualiza mapa de mesas e indicador por turno", "Ocupación actualizada", "El mapa del salón refleja la nueva reserva."),
      ],
    },
    reportes: {
      eyebrow: "Reportes ejecutivos",
      title: "De los datos operativos al reporte distribuido",
      description: "Consolida indicadores, valida desvíos y prepara un PDF ejecutivo con destinatarios trazables.",
      payload: { reporte: "REP-2026-0913", periodo: "30_dias", formato: "pdf" },
      result: result(
        "Reporte ejecutivo preparado",
        "Los indicadores quedan consolidados con período, versión y destinatarios visibles.",
        "El PDF quedó preparado con cuatro indicadores validados y distribución registrada.",
        [["4 KPI", "Validados"], ["3", "Destinatarios"], ["PDF", "Formato"]],
        [["Reporte", "REP-2026-0913"], ["Período", "Últimos 30 días"], ["Destino", "Dirección demo"], ["Estado", "Preparado"]],
      ),
      nodes: [
        node("clock-3", "Iniciar programación", "Regla diaria 08:00", "Crea una ejecución única para el período", "Ejecución REP-2026-0913", "La programación diaria abrió una ejecución única."),
        node("database", "Consolidar datos", "Ventas, operación y atención", "Agrupa fuentes y normaliza períodos", "Conjunto consolidado", "Las fuentes quedaron consolidadas para los últimos 30 días."),
        node("chart-spline", "Validar indicadores", "Serie consolidada", "Comprueba totales, vacíos y variaciones atípicas", "Cuatro KPI validados", "Los cuatro indicadores superaron los controles de consistencia.", "La validación se retomó desde el conjunto consolidado."),
        node("user-check", "Aprobar publicación", "Resumen y desvíos", "Solicita revisión antes de distribuir el documento", "Publicación autorizada", "Dirección aprobó el resumen ejecutivo."),
        node("file-text", "Generar PDF", "Indicadores aprobados", "Compone portada, métricas y detalle con marca demo", "PDF preparado", "El PDF ejecutivo fue preparado con identidad SC."),
        node("send", "Registrar distribución", "PDF y destinatarios", "Deja trazabilidad sin enviar correos reales", "Tres destinatarios registrados", "La distribución demo quedó registrada para tres destinatarios."),
      ],
    },
  };

  const state = {
    flowKey: "agenda",
    scenario: "success",
    selectedNode: 0,
    statuses: [],
    resultStage: "preview",
    running: false,
    waitingApproval: false,
    failed: false,
    runNumber: 2047,
    events: [],
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    const lab = document.querySelector("[data-n8n-lab]");
    if (!lab) return;

    lab.addEventListener("click", handleClick);
    lab.addEventListener("change", handleChange);
    resetExecution(false);
  }

  function handleClick(event) {
    const flowButton = event.target.closest("[data-n8n-flow]");
    if (flowButton) {
      selectFlow(flowButton.dataset.n8nFlow);
      return;
    }

    const nodeButton = event.target.closest("[data-n8n-node]");
    if (nodeButton) {
      selectNode(Number(nodeButton.dataset.n8nNode));
      return;
    }

    if (event.target.closest("[data-n8n-run]")) runWorkflow();
    if (event.target.closest("[data-n8n-reset]")) resetExecution(true);
    if (event.target.closest("[data-n8n-retry]")) retryWorkflow();
    if (event.target.closest("[data-n8n-approve]")) approveWorkflow();
  }

  function handleChange(event) {
    if (!event.target.matches('input[name="n8n-scenario"]')) return;
    state.scenario = event.target.value;
    resetExecution(true);
  }

  function selectFlow(key) {
    if (!flows[key] || state.running) return;
    state.flowKey = key;
    state.selectedNode = 0;
    document.querySelectorAll("[data-n8n-flow]").forEach((button) => {
      const active = button.dataset.n8nFlow === key;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    resetExecution(false);
  }

  function resetExecution(announce) {
    const flow = currentFlow();
    state.statuses = flow.nodes.map(() => "idle");
    state.resultStage = "preview";
    state.running = false;
    state.waitingApproval = false;
    state.failed = false;
    state.events = [];

    setText("[data-n8n-eyebrow]", flow.eyebrow);
    setText("[data-n8n-title]", flow.title);
    setText("[data-n8n-description]", flow.description);
    setText("[data-n8n-run-id]", "Sin ejecución");
    setOverall("idle", "Listo para ejecutar");
    setText("[data-n8n-note]", announce ? "Simulación reiniciada. Podés elegir otro escenario o volver a ejecutar." : "Seleccioná un nodo para inspeccionar su entrada, acción y salida.");

    renderNodes();
    renderInspector();
    renderResult();
    renderLog();
    setControlState();
    refreshIcons();
  }

  function renderNodes() {
    const container = document.querySelector("[data-n8n-nodes]");
    if (!container) return;

    container.innerHTML = currentFlow().nodes
      .map((item, index) => {
        const selected = index === state.selectedNode;
        const status = state.statuses[index] || "idle";
        return `
          <li class="n8n-node-shell">
            <button
              class="n8n-node is-${status}${selected ? " is-selected" : ""}"
              type="button"
              data-n8n-node="${index}"
              aria-pressed="${selected}"
            >
              <span class="n8n-node-icon"><i data-lucide="${escapeHtml(item.icon)}" aria-hidden="true"></i></span>
              <span class="n8n-node-copy"><small>${String(index + 1).padStart(2, "0")}</small><strong>${escapeHtml(item.title)}</strong></span>
              <span class="n8n-node-state">${statusLabel(status)}</span>
            </button>
          </li>`;
      })
      .join("");
  }

  function selectNode(index) {
    if (!Number.isInteger(index) || !currentFlow().nodes[index]) return;
    state.selectedNode = index;
    renderNodes();
    renderInspector();
    refreshIcons();
  }

  function renderInspector() {
    const selected = currentFlow().nodes[state.selectedNode];
    if (!selected) return;

    const icon = document.querySelector("[data-n8n-inspector-icon]");
    if (icon) icon.innerHTML = `<i data-lucide="${escapeHtml(selected.icon)}" aria-hidden="true"></i>`;
    setText("[data-n8n-inspector-title]", selected.title);
    setText("[data-n8n-input]", selected.input);
    setText("[data-n8n-action]", selected.action);
    setText("[data-n8n-output]", selected.output);
    setText("[data-n8n-payload]", JSON.stringify(currentFlow().payload, null, 2));
  }

  function renderResult() {
    const flow = currentFlow();
    const panel = document.querySelector("[data-n8n-result]");
    const metrics = document.querySelector("[data-n8n-result-metrics]");
    const details = document.querySelector("[data-n8n-result-details]");
    if (!panel || !metrics || !details) return;

    const stage = resultStageCopy(state.resultStage);
    panel.className = `n8n-result is-${state.resultStage}`;
    setText("[data-n8n-result-badge]", stage.label);
    setText("[data-n8n-result-title]", flow.result.title);
    setText("[data-n8n-result-summary]", state.resultStage === "success" ? flow.result.completed : stage.summary || flow.result.summary);
    setText("[data-n8n-result-run]", state.resultStage === "preview" ? "Se generará al completar el flujo" : `RUN-${state.runNumber} · ${state.events.length} eventos`);

    metrics.innerHTML = flow.result.metrics
      .map(([value, label]) => `<div><strong>${escapeHtml(value)}</strong><small>${escapeHtml(label)}</small></div>`)
      .join("");
    details.innerHTML = flow.result.details
      .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join("");
  }

  async function runWorkflow() {
    if (state.running || state.waitingApproval) return;
    state.runNumber += 1;
    state.statuses = currentFlow().nodes.map(() => "idle");
    state.events = [];
    state.failed = false;
    state.running = true;
    state.resultStage = "running";
    setText("[data-n8n-run-id]", `RUN-${state.runNumber} · intento 1`);
    setOverall("running", "Ejecutando");
    addEvent("Ejecución iniciada", `Se recibió el payload ficticio de ${currentFlow().eyebrow.toLowerCase()}.`);
    renderResult();
    setControlState();

    await executeNode(0);
    await executeNode(1);

    if (state.scenario === "failure") {
      await executeNode(2, true);
      state.running = false;
      state.failed = true;
      state.resultStage = "failed";
      setOverall("failed", "Falló con control");
      setText("[data-n8n-note]", "El contexto quedó guardado. Reintentá para continuar sin duplicar los pasos anteriores.");
      addEvent("Error temporal", "Timeout controlado en el nodo 03. No se repitieron acciones previas.");
      renderResult();
      setControlState();
      return;
    }

    await executeNode(2);
    await waitForApproval();
  }

  async function retryWorkflow() {
    if (state.running || !state.failed) return;
    state.running = true;
    state.failed = false;
    state.resultStage = "retrying";
    setOverall("retrying", "Reintentando");
    setText("[data-n8n-run-id]", `RUN-${state.runNumber} · intento 2`);
    addEvent("Reintento iniciado", "Se retoma desde el nodo fallido con la misma clave de ejecución.");
    renderResult();
    setControlState();
    await executeNode(2, false, true);
    await waitForApproval();
  }

  async function waitForApproval() {
    state.running = false;
    state.waitingApproval = true;
    state.resultStage = "waiting";
    state.statuses[3] = "waiting";
    state.selectedNode = 3;
    setOverall("waiting", "Esperando aprobación");
    setText("[data-n8n-note]", "El flujo se pausó correctamente. Revisá el nodo 04 y aprobá para continuar.");
    addEvent("Aprobación solicitada", "El workflow espera una decisión humana antes de producir un efecto externo.");
    renderNodes();
    renderInspector();
    renderResult();
    setControlState();
    refreshIcons();
  }

  async function approveWorkflow() {
    if (state.running || !state.waitingApproval) return;
    state.running = true;
    state.waitingApproval = false;
    state.resultStage = "running";
    setOverall("running", "Continuando");
    renderResult();
    setControlState();
    await executeNode(3);
    await executeNode(4);
    await executeNode(5);
    state.running = false;
    state.resultStage = "success";
    setOverall("success", "Workflow completado");
    setText("[data-n8n-note]", "La ejecución terminó con trazabilidad de entradas, decisiones, resultado e intentos.");
    addEvent("Ejecución completada", currentFlow().result.completed);
    renderResult();
    setControlState();
  }

  async function executeNode(index, fail, retried) {
    const selected = currentFlow().nodes[index];
    state.selectedNode = index;
    state.statuses[index] = "running";
    renderNodes();
    renderInspector();
    refreshIcons();
    await delay();
    state.statuses[index] = fail ? "failed" : "success";
    renderNodes();
    addEvent(fail ? `Nodo ${index + 1} fallido` : `Nodo ${index + 1} ejecutado`, fail ? selected.error : retried ? selected.retry : selected.event);
    renderResult();
    refreshIcons();
  }

  function addEvent(title, detail) {
    state.events.unshift({ title, detail, time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) });
    renderLog();
  }

  function renderLog() {
    const list = document.querySelector("[data-n8n-log]");
    if (!list) return;
    setText("[data-n8n-log-count]", `${state.events.length} ${state.events.length === 1 ? "evento" : "eventos"}`);
    list.innerHTML = state.events.length
      ? state.events.map((event) => `<li><time>${escapeHtml(event.time)}</time><div><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.detail)}</small></div></li>`).join("")
      : "<li>Esperando la primera ejecución.</li>";
  }

  function setControlState() {
    const run = document.querySelector("[data-n8n-run]");
    const retry = document.querySelector("[data-n8n-retry]");
    const approve = document.querySelector("[data-n8n-approve]");
    const reset = document.querySelector("[data-n8n-reset]");

    if (run) run.disabled = state.running || state.waitingApproval;
    if (retry) retry.disabled = state.running || !state.failed;
    if (approve) approve.disabled = state.running || !state.waitingApproval;
    if (reset) reset.disabled = state.running;
    document.querySelectorAll("[data-n8n-flow], [name='n8n-scenario']").forEach((control) => {
      control.disabled = state.running;
    });
  }

  function setOverall(status, label) {
    const element = document.querySelector("[data-n8n-status]");
    if (!element) return;
    element.className = `n8n-overall-status is-${status}`;
    element.textContent = label;
  }

  function currentFlow() {
    return flows[state.flowKey];
  }

  function delay() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return new Promise((resolve) => window.setTimeout(resolve, reduced ? 20 : 420));
  }

  function node(icon, title, input, action, output, event, retry) {
    return {
      icon,
      title,
      input,
      action,
      output,
      event,
      retry: retry || "El servicio se recuperó y la salida quedó validada.",
      error: "El servicio de consulta no respondió dentro del tiempo definido.",
    };
  }

  function result(title, summary, completed, metrics, details) {
    return { title, summary, completed, metrics, details };
  }

  function resultStageCopy(stage) {
    return {
      preview: { label: "Vista previa", summary: "" },
      running: { label: "Procesando", summary: "Los datos están atravesando validaciones y todavía no generaron una salida final." },
      retrying: { label: "Reintentando", summary: "La ejecución continúa desde el punto guardado sin repetir acciones anteriores." },
      waiting: { label: "Pendiente de aprobación", summary: "Las validaciones terminaron. Falta la decisión humana antes de generar el resultado." },
      failed: { label: "No generado", summary: "El error quedó registrado y no se produjo ninguna acción externa. El flujo puede reintentarse." },
      success: { label: "Resultado generado", summary: "" },
    }[stage];
  }

  function statusLabel(status) {
    return { idle: "Pendiente", running: "Ejecutando", waiting: "Requiere aprobación", success: "Ejecutado", failed: "Fallido" }[status] || "Pendiente";
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
