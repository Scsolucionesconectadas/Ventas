(() => {
  if (document.body?.dataset.demoSlug !== "gastronomia") return;

  const form = document.querySelector("#restaurantReservationForm");
  const suggestion = document.querySelector("#reservationSuggestion");
  const list = document.querySelector("#restaurantReservationList");
  const count = document.querySelector("#reservationCount");
  if (!form || !suggestion || !list) return;

  const slots = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"];
  const tables = [
    { id: "S1", area: "salon", label: "Salón", capacity: 2, occupied: ["20:30", "22:00"] },
    { id: "S2", area: "salon", label: "Salón", capacity: 4, occupied: ["20:00", "21:30"] },
    { id: "S3", area: "salon", label: "Salón", capacity: 6, occupied: ["21:00", "22:00"] },
    { id: "T1", area: "terraza", label: "Terraza", capacity: 2, occupied: ["20:30", "21:30"] },
    { id: "T2", area: "terraza", label: "Terraza", capacity: 4, occupied: ["21:00", "22:30"] },
    { id: "T3", area: "terraza", label: "Terraza", capacity: 8, occupied: ["22:00"] },
    { id: "B1", area: "barra", label: "Barra", capacity: 2, occupied: ["20:00", "21:00"] },
    { id: "B2", area: "barra", label: "Barra", capacity: 3, occupied: ["22:00"] },
  ];

  const statusOrder = ["En espera", "Confirmada", "En mesa", "Finalizada"];
  const reservations = [
    { id: "res-001", guest: "Martina López", party: 4, time: "20:30", area: "Salón", table: "S2", status: "Confirmada", notes: "Silla para bebé" },
    { id: "res-002", guest: "Diego Acosta", party: 2, time: "21:00", area: "Barra", table: "B1", status: "En mesa", notes: "Sin observaciones" },
    { id: "res-003", guest: "Familia Ríos", party: 6, time: "22:00", area: "Terraza", table: "Por asignar", status: "En espera", notes: "Cumpleaños" },
  ];
  let pending = null;

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function todayLocal() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }

  function findTable(party, area, time) {
    return tables
      .filter((table) => (area === "any" || table.area === area) && table.capacity >= party && !table.occupied.includes(time))
      .sort((left, right) => left.capacity - right.capacity)[0] || null;
  }

  function findAlternatives(party, area, requestedTime) {
    const requestedIndex = slots.indexOf(requestedTime);
    return slots
      .map((time, index) => ({ time, distance: Math.abs(index - requestedIndex), table: findTable(party, area, time) }))
      .filter((option) => option.table && option.time !== requestedTime)
      .sort((left, right) => left.distance - right.distance)
      .slice(0, 2);
  }

  function statusClass(status) {
    if (status === "Finalizada") return "done";
    if (status === "En espera") return "waiting";
    if (status === "En mesa") return "seated";
    return "confirmed";
  }

  function nextLabel(status) {
    if (status === "En espera") return "Confirmar mesa";
    if (status === "Confirmada") return "Marcar ingreso";
    if (status === "En mesa") return "Finalizar visita";
    return "";
  }

  function renderReservations() {
    list.innerHTML = reservations.map((reservation) => {
      const terminal = reservation.status === "Finalizada";
      return `
        <article class="restaurant-reservation-item" data-reservation-id="${escapeHtml(reservation.id)}">
          <div class="reservation-time"><strong>${escapeHtml(reservation.time)}</strong><span>${escapeHtml(reservation.table)}</span></div>
          <div class="reservation-person"><strong>${escapeHtml(reservation.guest)}</strong><span>${reservation.party} personas · ${escapeHtml(reservation.area)}</span><small>${escapeHtml(reservation.notes)}</small></div>
          <div class="reservation-state">
            <span class="reservation-status ${statusClass(reservation.status)}">${escapeHtml(reservation.status)}</span>
            ${terminal ? "" : `<button class="secondary-link reservation-progress" type="button" data-reservation-progress="${escapeHtml(reservation.id)}">${escapeHtml(nextLabel(reservation.status))}<i data-lucide="arrow-right" aria-hidden="true"></i></button>`}
          </div>
        </article>`;
    }).join("");

    const activeCount = reservations.filter((reservation) => reservation.status !== "Finalizada").length;
    count.textContent = `${activeCount} ${activeCount === 1 ? "activa" : "activas"}`;
    window.lucide?.createIcons();
  }

  function renderAvailable(table, data) {
    suggestion.dataset.state = "available";
    suggestion.innerHTML = `
      <i data-lucide="circle-check-big" aria-hidden="true"></i>
      <div class="reservation-suggestion-copy">
        <strong>Mesa ${escapeHtml(table.id)} disponible a las ${escapeHtml(data.time)}</strong>
        <p>Se sugiere ${escapeHtml(table.label)} porque admite ${table.capacity} personas para un grupo de ${data.party} y respeta el sector elegido.</p>
        <button class="submit-button" type="button" data-reservation-action="confirm"><i data-lucide="calendar-check-2" aria-hidden="true"></i>Confirmar reserva demo</button>
      </div>`;
    window.lucide?.createIcons();
  }

  function renderAlternatives(alternatives, data) {
    const options = alternatives.length
      ? alternatives.map((option) => `${option.time} en mesa ${option.table.id}`).join(" o ")
      : "No hay otra mesa compatible en este turno";
    suggestion.dataset.state = "waiting";
    suggestion.innerHTML = `
      <i data-lucide="calendar-x-2" aria-hidden="true"></i>
      <div class="reservation-suggestion-copy">
        <strong>Sin mesa compatible a las ${escapeHtml(data.time)}</strong>
        <p>${escapeHtml(options)}. Podés cambiar el horario o conservar la solicitud en espera.</p>
        <button class="secondary-link" type="button" data-reservation-action="waitlist"><i data-lucide="list-plus" aria-hidden="true"></i>Agregar a lista de espera</button>
      </div>`;
    window.lucide?.createIcons();
  }

  function showToast(message) {
    const toast = document.querySelector("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const button = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    const data = {
      guest: String(formData.get("guest") || "").trim(),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      party: Number(formData.get("party")),
      area: String(formData.get("area") || "any"),
      notes: String(formData.get("notes") || "").trim() || "Sin observaciones",
    };

    window.SCUI?.setButtonState(button, "loading", "Buscando disponibilidad...");
    await (window.SCUI?.wait(320) || Promise.resolve());
    const table = findTable(data.party, data.area, data.time);
    pending = { ...data, table, alternatives: table ? [] : findAlternatives(data.party, data.area, data.time) };
    if (table) renderAvailable(table, data);
    else renderAlternatives(pending.alternatives, data);
    window.SCUI?.restoreButton(button);
  });

  suggestion.addEventListener("click", (event) => {
    const action = event.target.closest?.("[data-reservation-action]")?.dataset.reservationAction;
    if (!action || !pending) return;

    if (action === "confirm" && pending.table) {
      pending.table.occupied.push(pending.time);
      reservations.unshift({
        id: `res-${Date.now()}`,
        guest: pending.guest,
        party: pending.party,
        time: pending.time,
        area: pending.table.label,
        table: pending.table.id,
        status: "Confirmada",
        notes: pending.notes,
      });
      showToast("Reserva demo confirmada y agregada a la agenda.");
    } else if (action === "waitlist") {
      const requestedArea = pending.area === "any" ? "Cualquier sector" : pending.area === "salon" ? "Salón" : pending.area === "terraza" ? "Terraza" : "Barra";
      reservations.unshift({
        id: `res-${Date.now()}`,
        guest: pending.guest,
        party: pending.party,
        time: pending.time,
        area: requestedArea,
        table: "Por asignar",
        status: "En espera",
        notes: pending.notes,
      });
      showToast("Solicitud demo agregada a la lista de espera.");
    }

    renderReservations();
    form.reset();
    form.elements.date.value = todayLocal();
    form.elements.party.value = "2";
    suggestion.removeAttribute("data-state");
    suggestion.innerHTML = '<i data-lucide="sparkles" aria-hidden="true"></i><div><strong>Solicitud registrada</strong><p>Podés buscar otra disponibilidad y comparar la explicación del sistema.</p></div>';
    pending = null;
    window.lucide?.createIcons();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-reservation-progress]");
    if (!button) return;
    const reservation = reservations.find((item) => item.id === button.dataset.reservationProgress);
    if (!reservation) return;
    const nextStatus = statusOrder[statusOrder.indexOf(reservation.status) + 1];
    if (!nextStatus) return;
    reservation.status = nextStatus;
    renderReservations();
    showToast(`${reservation.guest} pasó a ${nextStatus}.`);
  });

  form.elements.date.min = todayLocal();
  form.elements.date.value = todayLocal();
  renderReservations();

  document.addEventListener("click", (event) => {
    if (event.target.closest?.("[data-view='reservas']")) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#reservas`);
    }
  });

  if (window.location.hash === "#reservas") {
    window.requestAnimationFrame(() => document.querySelector("[role='tab'][data-view='reservas']")?.click());
  }
})();
