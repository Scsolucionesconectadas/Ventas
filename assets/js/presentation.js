(function () {
  "use strict";

  const slides = Array.from(document.querySelectorAll("[data-presentation-slide]"));
  const stage = document.querySelector("[data-presentation-stage]");
  const counter = document.querySelector("[data-presentation-counter]");
  const progress = document.querySelector("[data-presentation-progress]");
  const notesPanel = document.querySelector("[data-presentation-notes]");
  const notesTitle = document.querySelector("[data-presentation-notes-title]");
  const notesBody = document.querySelector("[data-presentation-notes-body]");
  let current = getInitialSlide();
  let touchStartX = null;

  if (!slides.length || !stage) return;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
    stage.addEventListener("touchstart", handleTouchStart, { passive: true });
    stage.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("fullscreenchange", updateFullscreenButton);
    showSlide(current, false);
    window.lucide?.createIcons();
  }

  function handleClick(event) {
    const action = event.target.closest("[data-presentation-action]")?.dataset.presentationAction;
    if (!action) return;
    if (action === "previous") showSlide(current - 1);
    if (action === "next") showSlide(current + 1);
    if (action === "first") showSlide(0);
    if (action === "notes") toggleNotes();
    if (action === "close-notes") closeNotes();
    if (action === "fullscreen") toggleFullscreen();
    if (action === "print") window.print();
  }

  function handleKeydown(event) {
    if (event.target.matches("input, textarea, select")) return;
    if (event.key === "Escape" && !notesPanel.hidden) {
      closeNotes();
      return;
    }
    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      showSlide(current + 1);
    }
    if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      showSlide(current - 1);
    }
    if (event.key === "Home") showSlide(0);
    if (event.key === "End") showSlide(slides.length - 1);
    if (event.key.toLowerCase() === "n") toggleNotes();
  }

  function handleTouchStart(event) {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event) {
    if (touchStartX === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < 56) return;
    showSlide(current + (distance < 0 ? 1 : -1));
  }

  function showSlide(index, updateHash = true) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle("is-active", active);
      slide.hidden = !active;
      slide.setAttribute("aria-hidden", String(!active));
    });

    const number = current + 1;
    counter.textContent = `${String(number).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    progress.style.setProperty("--presentation-progress", `${(number / slides.length) * 100}%`);
    progress.setAttribute("aria-valuenow", String(number));
    progress.setAttribute("aria-valuemax", String(slides.length));
    document.querySelector("[data-presentation-action='previous']").disabled = current === 0;
    document.querySelector("[data-presentation-action='next']").disabled = current === slides.length - 1;
    updateNotes();
    if (updateHash) history.replaceState(null, "", `#${number}`);
  }

  function updateNotes() {
    const slide = slides[current];
    notesTitle.textContent = slide.dataset.title || `Diapositiva ${current + 1}`;
    notesBody.textContent = slide.querySelector("[data-presenter-note]")?.textContent.trim() || "Sin notas para esta diapositiva.";
  }

  function toggleNotes() {
    notesPanel.hidden ? openNotes() : closeNotes();
  }

  function openNotes() {
    notesPanel.hidden = false;
    document.querySelector("[data-presentation-action='notes']").setAttribute("aria-pressed", "true");
    notesPanel.querySelector("button").focus();
  }

  function closeNotes() {
    notesPanel.hidden = true;
    const trigger = document.querySelector("[data-presentation-action='notes']");
    trigger.setAttribute("aria-pressed", "false");
    trigger.focus();
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  }

  function updateFullscreenButton() {
    const button = document.querySelector("[data-presentation-action='fullscreen']");
    button.setAttribute("aria-pressed", String(Boolean(document.fullscreenElement)));
    button.title = document.fullscreenElement ? "Salir de pantalla completa" : "Pantalla completa";
  }

  function getInitialSlide() {
    const parsed = Number(window.location.hash.replace("#", ""));
    return Number.isFinite(parsed) && parsed > 0 ? parsed - 1 : 0;
  }
})();
