(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.SCAnimations = {
    panelIn,
    menuIn,
    pulse,
    refresh: setupSpotlight,
  };

  document.addEventListener("DOMContentLoaded", () => {
    setupSpotlight();

    if (!window.gsap || prefersReducedMotion) {
      return;
    }

    document.documentElement.classList.add("gsap-ready");
    runIntroTimeline();
    animateCounters();
  });

  function runIntroTimeline() {
    const animatedSelector =
      ".brand, .topbar-actions > *, .header-actions > *, .landing-hero-copy > *, .intro-copy > *, .app-title > *, .command-bar, .snapshot, .medical-hero, .industry-hero, .service-card, .proof-item, .diagnostic-panel, .diagnostic-result, .automation-copy, .automation-flow, .automation-card, .reporting-showcase, .report-card, .delivery-card, .report-log-item, .process-step, .cta-inner, .contact-card, .industry-card, .record-item, .kanban-column, .catalog-card, .task-item, .metric-card, .module-panel, .method-grid article";
    const finalizeIntro = () => {
      window.gsap.set(animatedSelector, { clearProps: "opacity,visibility,transform" });
    };

    window.gsap.set(animatedSelector, { autoAlpha: 1, y: 0, scale: 1 });

    const timeline = window.gsap.timeline({
      defaults: {
        duration: 0.72,
        ease: "power3.out",
      },
      onComplete: finalizeIntro,
    });

    timeline
      .fromTo(
        ".brand, .topbar-actions > *, .header-actions > *",
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, stagger: 0.055 },
      )
      .fromTo(
        ".intro-copy > *, .app-title > *, .command-bar",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, stagger: 0.07 },
        "-=0.45",
      )
      .fromTo(
        ".landing-hero-copy > *",
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, stagger: 0.08 },
        "-=0.5",
      )
      .fromTo(
        ".snapshot, .medical-hero, .industry-hero, .automation-flow, .reporting-showcase, .cta-inner",
        { autoAlpha: 0, y: 24, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1 },
        "-=0.4",
      )
      .fromTo(
        ".service-card, .proof-item, .diagnostic-panel, .diagnostic-result, .automation-card, .report-card, .delivery-card, .report-log-item, .process-step, .contact-card, .industry-card, .record-item, .kanban-column, .catalog-card, .task-item, .metric-card, .module-panel, .method-grid article",
        { autoAlpha: 0, y: 22, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, stagger: 0.055 },
        "-=0.35",
      );

    window.setTimeout(finalizeIntro, 2400);
  }

  function animateCounters() {
    document.querySelectorAll("[data-count]").forEach((element) => {
      const target = Number(element.dataset.count);
      if (!Number.isFinite(target)) return;

      const counter = { value: 0 };
      window.gsap.to(counter, {
        value: target,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = Math.round(counter.value).toLocaleString("es-AR");
        },
      });
    });
  }

  function panelIn(panel) {
    if (!panel || !window.gsap || prefersReducedMotion) return;

    window.gsap.fromTo(
      panel.querySelectorAll(".module-panel, .appointment-item, .record-item, .kanban-column, .kanban-card, .catalog-card, .task-item, .report-card, .delivery-card, .report-log-item, .timeline-item, .patient-item, .insurance-item"),
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out", stagger: 0.035 },
    );
  }

  function menuIn(menu) {
    if (!menu || !window.gsap || prefersReducedMotion) return;

    window.gsap.fromTo(
      menu,
      { autoAlpha: 0, y: -8, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" },
    );
  }

  function pulse(element) {
    if (!element || !window.gsap || prefersReducedMotion) return;

    window.gsap.fromTo(
      element,
      { scale: 0.985 },
      { scale: 1, duration: 0.26, ease: "back.out(2)" },
    );
  }

  function setupSpotlight() {
    const targets = document.querySelectorAll(
      ".service-card, .proof-item, .diagnostic-panel, .diagnostic-result, .contact-card, .automation-card, .report-card, .delivery-card, .report-log-item, .process-step, .industry-card, .record-item, .kanban-card, .catalog-card, .task-item, .module-panel, .metric-card, .appointment-item",
    );

    targets.forEach((target) => {
      if (target.dataset.spotlightReady === "true") return;

      target.dataset.spotlightReady = "true";
      target.classList.add("spotlight-surface");
      target.addEventListener("pointermove", (event) => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        target.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      });
    });
  }
})();
