(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.SCAnimations = {
    panelIn,
    menuIn,
    pulse,
    dataSwap,
    refresh: setupSpotlight,
  };

  document.addEventListener("DOMContentLoaded", () => {
    setupSpotlight();

    if (!window.gsap || prefersReducedMotion) {
      return;
    }

    document.documentElement.classList.add("gsap-ready");
    runIntroTimeline();
    setupScrollReveals();
    animateCounters();
  });

  function runIntroTimeline() {
    const animatedSelector =
      ".brand, .topbar-actions > *, .header-actions > *, .landing-hero-copy > *, .commercial-hero-copy > *, .intro-copy > *, .app-title > *, .command-bar, .snapshot, .medical-hero, .industry-hero, .demos-hero, .commercial-summary, .automation-status-board, .hero-method-board, .n8n-lab, .reporting-showcase, .cta-inner";
    const animatedItems = window.gsap.utils.toArray(animatedSelector);
    const finalizeIntro = () => {
      if (animatedItems.length) {
        window.gsap.set(animatedItems, { clearProps: "opacity,visibility,transform" });
      }
    };

    if (animatedItems.length) {
      window.gsap.set(animatedItems, { autoAlpha: 1, y: 0, scale: 1 });
    }

    const timeline = window.gsap.timeline({
      defaults: {
        duration: 0.72,
        ease: "power3.out",
      },
      onComplete: finalizeIntro,
    });

    addStep(
      ".brand, .topbar-actions > *, .header-actions > *",
      { autoAlpha: 0, y: -12 },
      { autoAlpha: 1, y: 0, stagger: 0.055 },
    );
    addStep(
      ".intro-copy > *, .app-title > *, .command-bar",
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, stagger: 0.07 },
      "-=0.45",
    );
    addStep(
      ".landing-hero-copy > *",
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, stagger: 0.08 },
      "-=0.5",
    );
    addStep(
      ".commercial-hero-copy > *",
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, stagger: 0.08 },
      "-=0.5",
    );
    addStep(
      ".snapshot, .medical-hero, .industry-hero, .automation-flow, .reporting-showcase, .cta-inner, .commercial-summary, .automation-status-board, .hero-method-board, .n8n-lab, .contact-form-panel, .contact-live-brief, .contact-options",
      { autoAlpha: 0, y: 24, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1 },
      "-=0.4",
    );
    window.setTimeout(finalizeIntro, 1600);

    function addStep(selector, fromVars, toVars, position) {
      const targets = window.gsap.utils.toArray(selector);
      if (targets.length) {
        timeline.fromTo(targets, fromVars, toVars, position);
      }
      return timeline;
    }
  }

  function setupScrollReveals() {
    if (!("IntersectionObserver" in window)) return;

    const targets = window.gsap.utils.toArray(
      ".service-card, .service-detail, .proof-item, .outcome-item, .diagnostic-panel, .diagnostic-result, .automation-card, .about-profile-portrait, .about-profile-pillars article, .about-profile-statement, .about-method-card, .about-principles-grid article, .about-fit-list span, .capability-grid article, .governance-grid article, .report-card, .delivery-card, .process-step, .commercial-cta, .contact-card, .contact-form-panel, .contact-live-brief, .contact-options, .site-footer-brand, .site-footer-column, .site-footer-contact-panel, .site-footer-bottom, .industry-card, .record-item, .kanban-column, .catalog-card, .task-item, .metric-card, .module-panel, .method-grid article, .faq-list details",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          window.gsap.fromTo(
            entry.target,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.48, ease: "power2.out", clearProps: "opacity,visibility,transform" },
          );
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );

    targets.forEach((target) => observer.observe(target));
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
    const targets = panel.querySelectorAll(".module-panel, .appointment-item, .record-item, .kanban-column, .kanban-card, .catalog-card, .task-item, .report-card, .delivery-card, .report-log-item, .timeline-item, .patient-item, .insurance-item");
    if (!targets.length) return;

    window.gsap.fromTo(
      targets,
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

  function dataSwap(container) {
    if (!container || !window.gsap || prefersReducedMotion) return;
    const targets = container.querySelectorAll("[data-report-chart-frame], [data-report-summary], [data-report-insight]");
    if (!targets.length) return;

    window.gsap.fromTo(
      targets,
      { autoAlpha: 0.7, y: 7 },
      { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out", stagger: 0.045, clearProps: "opacity,visibility,transform" },
    );
  }

  function setupSpotlight() {
    const targets = document.querySelectorAll(
      ".demos-hero, .service-card, .service-detail, .proof-item, .outcome-item, .diagnostic-panel, .diagnostic-result, .contact-card, .contact-form-panel, .contact-live-brief, .contact-options, .automation-card, .automation-goals, .automation-planner, .n8n-lab, .hero-method-board, .about-profile-portrait, .about-profile-pillars article, .about-profile-statement, .about-method-card, .about-principles-grid article, .about-fit-list span, .capability-grid article, .governance-grid article, .report-analysis, .report-card, .delivery-card, .report-log-item, .process-step, .commercial-cta, .industry-card, .record-item, .kanban-card, .catalog-card, .task-item, .module-panel, .metric-card, .appointment-item, .faq-list details",
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
