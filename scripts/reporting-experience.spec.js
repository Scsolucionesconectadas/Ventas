const { test, expect } = require("playwright/test");

const baseUrl = "http://127.0.0.1:4173";
const demoSlugs = [
  "gestion-pyme",
  "turnos",
  "medica",
  "hoteleria",
  "inmobiliarias",
  "materiales",
  "gastronomia",
  "educacion",
  "gomerias",
  "agrimensores",
  "logistica",
  "talleres",
  "estudios-contables",
  "constructoras",
];

test.use({ channel: "msedge", reducedMotion: "reduce" });

async function openReports(page, slug) {
  await page.goto(`${baseUrl}/rubros/${slug}/`, { waitUntil: "domcontentloaded" });
  await page.locator('[data-view="reportes"]').first().click();
  const analysis = page.locator(".report-analysis");
  await expect(analysis).toBeVisible();
  await analysis.scrollIntoViewIfNeeded();
}

test.describe("Reportería interactiva de las demos", () => {
  test("las catorce demos ofrecen análisis, períodos y recomendación por rubro", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    for (const slug of demoSlugs) {
      await openReports(page, slug);
      await expect(page.locator(".report-card")).toHaveCount(4);
      await expect(page.locator("[data-report-select]")).toHaveCount(4);
      await expect(page.locator('[data-report-period="30"]')).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("[data-report-recommendation]")).not.toHaveText("");
      await expect(page.locator("[data-report-chart]")).toHaveAttribute("role", "img");

      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(horizontalOverflow, slug).toBeFalsy();
    }
  });

  test("una métrica actualiza el gráfico, la comparación y la lectura ejecutiva", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await openReports(page, "gestion-pyme");

    await expect.poll(() => page.locator("[data-report-chart-frame]").getAttribute("data-chart-state")).toBe("ready");
    await expect(page.locator('script[data-sc-reporting-library="4.5.1"]')).toHaveCount(1);

    const secondMetric = page.locator(".report-card").nth(1);
    const expectedLabel = await secondMetric.getAttribute("data-report-label");
    await secondMetric.getByRole("button", { name: "Analizar" }).click();
    await expect(secondMetric).toHaveClass(/is-selected/);
    await expect(secondMetric.getByRole("button", { name: "Analizando" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-report-metric-label]")).toHaveText(expectedLabel);
    await expect(page.locator("[data-report-summary]")).toContainText(expectedLabel);

    await page.locator('[data-report-period="7"]').click();
    await expect(page.locator('[data-report-period="7"]')).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-report-chart]")).toHaveAttribute("aria-label", /7 días/);

    await page.locator(".report-compare-control").click();
    await expect(page.locator("[data-report-compare]")).not.toBeChecked();
    await expect(page.locator("[data-report-insight-title]")).toHaveText("Evolución del período");

    await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
    const violations = await page.evaluate(async () => {
      const result = await window.axe.run(document, { resultTypes: ["violations"] });
      return result.violations
        .filter((violation) => ["serious", "critical"].includes(violation.impact))
        .map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.length }));
    });
    expect(violations).toEqual([]);

    await page.screenshot({ path: "test-results/reporting-experience-desktop.png", fullPage: true });
  });

  test("la vista simplificada conserva el contenido si Chart.js no responde", async ({ page }) => {
    await page.route("**/chart.umd.min.js", (route) => route.abort());
    await openReports(page, "medica");

    await expect.poll(() => page.locator("[data-report-chart-frame]").getAttribute("data-chart-state")).toBe("fallback");
    await expect(page.getByText("Vista simplificada activa")).toBeVisible();
    await expect(page.locator("[data-report-summary]")).not.toHaveText("");
    await expect(page.locator(".mini-chart")).toHaveCount(4);
  });

  test("la reportería conserva lectura y controles en móvil", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openReports(page, "medica");

    await expect(page.locator(".report-period-control")).toBeVisible();
    await expect(page.locator("[data-report-compare]")).toBeChecked();
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(horizontalOverflow).toBeFalsy();
    await page.screenshot({ path: "test-results/reporting-experience-mobile.png", fullPage: true });
  });
});
