(function () {
  const CHART_VERSION = "4.5.1";
  const CHART_URL = `https://cdn.jsdelivr.net/npm/chart.js@${CHART_VERSION}/dist/chart.umd.min.js`;
  const chartInstances = new WeakMap();
  const dashboardObservers = new WeakMap();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let chartLibraryPromise;
  let scheduled = false;

  const recommendations = {
    "administracion-facturacion": "Cruzar vencimientos, documentación, aprobaciones y conciliación antes de emitir, cobrar o programar un pago.",
    "gestion-pyme": "Cruzar esta señal con caja, cobranzas y stock comprometido antes de decidir la próxima acción.",
    turnos: "Revisar horarios con mayor demanda y activar confirmaciones sobre los turnos con riesgo de ausencia.",
    medica: "Cruzar agenda, admisión y coberturas pendientes para anticipar demoras de atención.",
    hoteleria: "Comparar ocupación, canales y tareas de preparación antes de ajustar disponibilidad.",
    inmobiliarias: "Relacionar consultas, visitas y próximos contactos para priorizar oportunidades con intención concreta.",
    materiales: "Contrastar ventas, margen y stock reservado antes de emitir una reposición o actualizar precios.",
    gastronomia: "Comparar reservas, ocupación y tiempos de atención para equilibrar mesas y dotación.",
    educacion: "Cruzar asistencia, entregas y alertas para intervenir antes de que una situación quede atrasada.",
    gomerias: "Relacionar órdenes, repuestos y tiempos prometidos para evitar esperas y retrabajos.",
    agrimensores: "Comparar expedientes, documentación y tareas de campo para destrabar la próxima entrega.",
    logistica: "Cruzar viajes, entregas y alertas para priorizar desvíos con impacto operativo.",
    talleres: "Revisar diagnóstico, aprobación y disponibilidad de repuestos antes de confirmar la fecha de entrega.",
    "estudios-contables": "Relacionar vencimientos, documentación recibida y tareas pendientes para anticipar riesgos.",
    constructoras: "Comparar avance físico, certificaciones e incidencias antes de actualizar el estado del proyecto.",
  };

  window.SCReportingExperience = {
    version: "1.0.0",
    chartVersion: CHART_VERSION,
    enhanceAll,
  };

  document.addEventListener("DOMContentLoaded", enhanceAll);
  document.addEventListener("sc:reports-rendered", scheduleEnhance);

  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      enhanceAll();
    });
  }

  function enhanceAll() {
    document.querySelectorAll(".report-dashboard").forEach(enhanceDashboard);
  }

  function enhanceDashboard(dashboard) {
    const reportGrid = dashboard.querySelector(".report-grid");
    if (!reportGrid) return;

    const metrics = readMetrics(reportGrid);
    if (!metrics.length) return;

    let analysis = dashboard.querySelector(".report-analysis");
    if (!analysis) {
      analysis = createAnalysis();
      const toolbar = dashboard.querySelector(".report-toolbar");
      (toolbar || dashboard.querySelector(".module-head"))?.insertAdjacentElement("afterend", analysis);
      bindAnalysisControls(dashboard, analysis);
      observeDashboard(dashboard);
    }

    bindMetricCards(dashboard, metrics);
    const activeIndex = Math.min(Number(dashboard.dataset.reportActiveMetric || 0), metrics.length - 1);
    dashboard.dataset.reportActiveMetric = String(activeIndex);
    updateExperience(dashboard, metrics, { animate: false });

    if (isDashboardVisible(dashboard)) {
      ensureChart(dashboard);
    }

    window.lucide?.createIcons({ attrs: { "stroke-width": 2 } });
    document.dispatchEvent(new CustomEvent("sc:reporting-ready", { detail: { slug: document.body.dataset.demoSlug } }));
  }

  function createAnalysis() {
    const section = document.createElement("section");
    section.className = "report-analysis";
    section.setAttribute("aria-labelledby", "reportAnalysisTitle");
    section.innerHTML = `
      <div class="report-analysis-head">
        <div>
          <p class="eyebrow">Centro de análisis</p>
          <h3 id="reportAnalysisTitle">Evolución operativa</h3>
          <p>Explorá una señal, cambiá el período y compará su comportamiento.</p>
        </div>
        <span class="report-demo-note"><i data-lucide="flask-conical" aria-hidden="true"></i>Datos ficticios</span>
      </div>
      <div class="report-analysis-controls">
        <div class="report-period-control" role="group" aria-label="Período del análisis">
          <button type="button" data-report-period="7" aria-pressed="false">7 días</button>
          <button type="button" data-report-period="30" aria-pressed="true">30 días</button>
          <button type="button" data-report-period="90" aria-pressed="false">90 días</button>
        </div>
        <label class="report-compare-control">
          <input type="checkbox" data-report-compare checked />
          <span aria-hidden="true"></span>
          Comparar período anterior
        </label>
      </div>
      <div class="report-analysis-body">
        <div class="report-chart-column">
          <div class="report-chart-heading">
            <div>
              <span data-report-metric-label>Métrica seleccionada</span>
              <strong data-report-metric-value>--</strong>
            </div>
            <small data-report-metric-trend>Sin variación</small>
          </div>
          <div class="report-chart-frame" data-report-chart-frame data-chart-state="loading">
            <canvas data-report-chart role="img" aria-label="Evolución de la métrica seleccionada"></canvas>
            <div class="report-chart-fallback" data-report-chart-fallback>
              <span class="report-chart-loader" aria-hidden="true"></span>
              <strong>Preparando visualización</strong>
              <p>Las métricas y el resumen permanecen disponibles.</p>
            </div>
          </div>
        </div>
        <aside class="report-analysis-insight" data-report-insight aria-live="polite">
          <span><i data-lucide="scan-search" aria-hidden="true"></i>Lectura ejecutiva</span>
          <strong data-report-insight-title>Señal principal</strong>
          <p data-report-summary></p>
          <div class="report-analysis-action">
            <small>Próxima revisión sugerida</small>
            <p data-report-recommendation></p>
          </div>
        </aside>
      </div>
    `;
    return section;
  }

  function readMetrics(reportGrid) {
    return Array.from(reportGrid.querySelectorAll(".report-card")).map((card, index) => {
      const inlineSeries = card.dataset.reportSeries
        ? card.dataset.reportSeries.split(",").map(Number).filter(Number.isFinite)
        : Array.from(card.querySelectorAll(".mini-chart span")).map((bar) => Number.parseFloat(bar.style.height));

      return {
        card,
        index,
        label: card.dataset.reportLabel || card.querySelector(".report-card-head span")?.textContent.trim() || `Métrica ${index + 1}`,
        value: card.dataset.reportValue || card.querySelector(":scope > strong")?.textContent.trim() || "--",
        trend: card.dataset.reportTrend || card.querySelector(".report-card-head small")?.textContent.trim() || "",
        detail: card.dataset.reportDetail || card.querySelector(":scope > p")?.textContent.trim() || "",
        series: inlineSeries.length ? inlineSeries : [42, 48, 54, 63, 71, 78],
      };
    });
  }

  function bindAnalysisControls(dashboard, analysis) {
    analysis.querySelectorAll("[data-report-period]").forEach((button) => {
      button.addEventListener("click", () => {
        analysis.querySelectorAll("[data-report-period]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button));
        });
        dashboard.dataset.reportRange = button.dataset.reportPeriod;
        updateExperience(dashboard, readMetrics(dashboard.querySelector(".report-grid")), { animate: true });
      });
    });

    analysis.querySelector("[data-report-compare]")?.addEventListener("change", () => {
      updateExperience(dashboard, readMetrics(dashboard.querySelector(".report-grid")), { animate: true });
    });
  }

  function bindMetricCards(dashboard, metrics) {
    metrics.forEach((metric) => {
      let button = metric.card.querySelector("[data-report-select]");
      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = "report-metric-button";
        button.dataset.reportSelect = String(metric.index);
        button.innerHTML = `<i data-lucide="chart-no-axes-combined" aria-hidden="true"></i><span>Analizar</span>`;
        metric.card.querySelector(".mini-chart")?.insertAdjacentElement("beforebegin", button);
      }

      if (button.dataset.reportBound !== "true") {
        button.dataset.reportBound = "true";
        button.addEventListener("click", () => {
          dashboard.dataset.reportActiveMetric = button.dataset.reportSelect;
          updateExperience(dashboard, readMetrics(dashboard.querySelector(".report-grid")), { animate: true });
          dashboard.querySelector(".report-analysis")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
        });
      }
    });
  }

  function updateExperience(dashboard, metrics, options) {
    if (!metrics.length) return;
    const analysis = dashboard.querySelector(".report-analysis");
    if (!analysis) return;

    const activeIndex = Math.min(Number(dashboard.dataset.reportActiveMetric || 0), metrics.length - 1);
    const metric = metrics[activeIndex];
    const period = Number(dashboard.dataset.reportRange || 30);
    const compare = Boolean(analysis.querySelector("[data-report-compare]")?.checked);
    const series = seriesForPeriod(metric.series, period);
    const previous = previousSeries(series, activeIndex);
    const labels = labelsForPeriod(period, series.length);
    const variation = Math.round((series[series.length - 1] || 0) - (compare ? previous[previous.length - 1] || 0 : series[0] || 0));
    const peakIndex = series.indexOf(Math.max(...series));
    const direction = variation === 0 ? "sin cambios" : `${Math.abs(variation)} puntos ${variation > 0 ? "arriba" : "abajo"}`;

    metrics.forEach((item) => {
      const selected = item.index === activeIndex;
      item.card.classList.toggle("is-selected", selected);
      const selectButton = item.card.querySelector("[data-report-select]");
      selectButton?.setAttribute("aria-pressed", String(selected));
      const selectLabel = selectButton?.querySelector("span");
      if (selectLabel) selectLabel.textContent = selected ? "Analizando" : "Analizar";
    });

    setText(analysis, "[data-report-metric-label]", metric.label);
    setText(analysis, "[data-report-metric-value]", metric.value);
    setText(analysis, "[data-report-metric-trend]", metric.trend);
    setText(analysis, "[data-report-insight-title]", compare ? "Comparación lista" : "Evolución del período");
    setText(
      analysis,
      "[data-report-summary]",
      `${metric.label} cierra en ${metric.value}. El índice queda ${direction} y alcanza su mayor nivel en ${labels[peakIndex]}. ${metric.detail}`,
    );
    setText(
      analysis,
      "[data-report-recommendation]",
      recommendations[document.body.dataset.demoSlug] || "Cruzar esta señal con el detalle operativo antes de definir la próxima acción.",
    );

    const canvas = analysis.querySelector("[data-report-chart]");
    canvas?.setAttribute(
      "aria-label",
      `${metric.label}. ${period} días. ${compare ? `Comparación activada, ${direction}.` : `Evolución ${direction}.`} Valor destacado: ${metric.value}.`,
    );

    dashboard._reportChartPayload = { metric, period, compare, series, previous, labels };
    if (isDashboardVisible(dashboard)) ensureChart(dashboard);
    if (options?.animate) window.SCAnimations?.dataSwap?.(analysis);
  }

  function observeDashboard(dashboard) {
    if (!("IntersectionObserver" in window) || dashboardObservers.has(dashboard)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        ensureChart(dashboard);
      },
      { threshold: 0.08 },
    );
    observer.observe(dashboard);
    dashboardObservers.set(dashboard, observer);
  }

  async function ensureChart(dashboard) {
    const analysis = dashboard.querySelector(".report-analysis");
    const frame = analysis?.querySelector("[data-report-chart-frame]");
    const canvas = analysis?.querySelector("[data-report-chart]");
    if (!analysis || !frame || !canvas || !isDashboardVisible(dashboard)) return;

    const requestId = String(Number(dashboard.dataset.reportChartRequest || 0) + 1);
    dashboard.dataset.reportChartRequest = requestId;
    frame.dataset.chartState = "loading";

    try {
      await loadChartLibrary();
      if (dashboard.dataset.reportChartRequest !== requestId) return;
      renderChart(dashboard, canvas);
      frame.dataset.chartState = "ready";
    } catch (error) {
      frame.dataset.chartState = "fallback";
      const fallback = frame.querySelector("[data-report-chart-fallback]");
      if (fallback) {
        fallback.innerHTML = `
          <i data-lucide="chart-column" aria-hidden="true"></i>
          <strong>Vista simplificada activa</strong>
          <p>El resumen y las métricas siguen disponibles aunque el gráfico detallado no haya cargado.</p>
        `;
        window.lucide?.createIcons({ attrs: { "stroke-width": 2 } });
      }
    }
  }

  function loadChartLibrary() {
    if (window.Chart) return Promise.resolve(window.Chart);
    if (chartLibraryPromise) return chartLibraryPromise;

    chartLibraryPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${CHART_URL}"]`);
      if (existing) {
        existing.addEventListener("load", () => resolve(window.Chart), { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = CHART_URL;
      script.async = true;
      script.dataset.scReportingLibrary = CHART_VERSION;
      const timeout = window.setTimeout(() => reject(new Error("Chart.js demoró demasiado en responder")), 8000);
      script.addEventListener("load", () => {
        window.clearTimeout(timeout);
        resolve(window.Chart);
      }, { once: true });
      script.addEventListener("error", () => {
        window.clearTimeout(timeout);
        reject(new Error("Chart.js no disponible"));
      }, { once: true });
      document.head.appendChild(script);
    });

    return chartLibraryPromise;
  }

  function renderChart(dashboard, canvas) {
    const payload = dashboard._reportChartPayload;
    if (!payload || !window.Chart) return;

    const styles = getComputedStyle(document.body);
    const primary = styles.getPropertyValue("--demo-accent").trim() || styles.getPropertyValue("--primary").trim() || "#0060c0";
    const accent = styles.getPropertyValue("--demo-accent-soft").trim() || styles.getPropertyValue("--accent").trim() || "#00b0e8";
    const datasets = [
      {
        label: "Período actual",
        data: payload.series,
        borderColor: primary,
        backgroundColor: colorWithAlpha(accent, 0.16),
        pointBackgroundColor: "#ffffff",
        pointBorderColor: primary,
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 3,
        tension: 0.34,
        fill: true,
      },
    ];

    if (payload.compare) {
      datasets.push({
        label: "Período anterior",
        data: payload.previous,
        borderColor: "#7b8995",
        backgroundColor: "transparent",
        borderDash: [6, 5],
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.3,
      });
    }

    const existing = chartInstances.get(dashboard);
    if (existing) {
      existing.data.labels = payload.labels;
      existing.data.datasets = datasets;
      existing.update(prefersReducedMotion ? "none" : undefined);
      return;
    }

    const chart = new window.Chart(canvas, {
      type: "line",
      data: { labels: payload.labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: prefersReducedMotion ? false : { duration: 560, easing: "easeOutQuart" },
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: { color: "#405365", boxWidth: 18, boxHeight: 3, padding: 16, font: { family: "Inter, system-ui, sans-serif", weight: 700 } },
          },
          tooltip: {
            backgroundColor: "#22333f",
            titleFont: { weight: 800 },
            bodyFont: { weight: 600 },
            padding: 11,
            displayColors: true,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#657789", font: { size: 11, weight: 700 } },
            border: { display: false },
          },
          y: {
            suggestedMin: 0,
            suggestedMax: 100,
            grid: { color: "rgba(34, 51, 63, 0.08)" },
            ticks: { color: "#657789", font: { size: 11, weight: 700 } },
            border: { display: false },
          },
        },
      },
    });

    chartInstances.set(dashboard, chart);
  }

  function seriesForPeriod(series, period) {
    const targetLength = period === 7 ? 7 : 6;
    const scale = period === 7 ? 0.98 : period === 90 ? 0.94 : 1;
    return resample(series, targetLength).map((value, index) => clamp(Math.round(value * scale + (period === 90 ? index * 1.5 : 0)), 0, 100));
  }

  function previousSeries(series, metricIndex) {
    const offset = 4 + (metricIndex % 3) * 2;
    return series.map((value, index) => clamp(Math.round(value - offset + (index % 2 === 0 ? 1 : -1)), 0, 100));
  }

  function resample(values, targetLength) {
    if (values.length === targetLength) return [...values];
    if (values.length === 1) return Array(targetLength).fill(values[0]);

    return Array.from({ length: targetLength }, (_, index) => {
      const position = (index * (values.length - 1)) / (targetLength - 1);
      const lower = Math.floor(position);
      const upper = Math.min(values.length - 1, Math.ceil(position));
      const ratio = position - lower;
      return values[lower] + (values[upper] - values[lower]) * ratio;
    });
  }

  function labelsForPeriod(period, length) {
    if (period === 7) return ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].slice(0, length);
    if (period === 90) return ["Inicio", "Día 15", "Día 30", "Día 45", "Día 60", "Día 90"].slice(0, length);
    return ["Día 1", "Día 6", "Día 12", "Día 18", "Día 24", "Día 30"].slice(0, length);
  }

  function isDashboardVisible(dashboard) {
    const panel = dashboard.closest(".view-panel");
    return !panel || (!panel.hidden && panel.classList.contains("active"));
  }

  function setText(container, selector, value) {
    const target = container.querySelector(selector);
    if (target) target.textContent = value;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function colorWithAlpha(color, alpha) {
    const match = color.match(/^#([a-f\d]{6})$/i);
    if (!match) return `rgba(0, 176, 232, ${alpha})`;
    const value = Number.parseInt(match[1], 16);
    return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
  }
})();
