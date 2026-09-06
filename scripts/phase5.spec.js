const { test, expect } = require("playwright/test");

const baseUrl = "http://127.0.0.1:4173";
const demos = [
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

test.use({ channel: "msedge", acceptDownloads: true, reducedMotion: "reduce" });

async function openAutomation(page, slug) {
  await page.goto(`${baseUrl}/rubros/${slug}/index.html`, { waitUntil: "networkidle" });
  await page.locator("#tab-automatizaciones").click();
  await expect(page.locator("#view-automatizaciones")).toBeVisible();
  await expect.poll(() => page.locator("#view-automatizaciones").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
}

test.describe("Fase 5 - automatizaciones y reportería", () => {
  for (const slug of demos) {
    test(`${slug}: centro de automatización disponible`, async ({ page }) => {
      const errors = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      await page.setViewportSize({ width: 1440, height: 1000 });
      await openAutomation(page, slug);

      await expect(page.locator(".side-nav [data-workflow-view='automatizaciones']")).toHaveCount(1);
      await expect(page.locator(".view-tabs [data-workflow-view='automatizaciones']")).toHaveAttribute("aria-selected", "true");
      await expect(page.locator("[data-workflow-step]")).toHaveCount(6);
      await expect(page.locator("[data-workflow-engine]")).toHaveCount(2);
      await expect(page.locator("[data-workflow-history] tr")).toHaveCount(3);
      await expect(page.getByText("Simulación pública", { exact: true })).toBeVisible();

      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(horizontalOverflow).toBeFalsy();
      expect(errors).toEqual([]);
    });
  }

  test("flujo exitoso: aprobación humana, trazabilidad y PDF", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await openAutomation(page, "medica");

    await page.locator("[data-workflow-run]").click();
    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Esperando aprobación");
    await expect(page.locator("[data-workflow-approve]")).toBeEnabled();
    await expect(page.locator("[data-workflow-step='3']")).toHaveClass(/is-waiting/);

    await page.locator("[data-workflow-approve]").click();
    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Ejecutado");
    await expect(page.locator("[data-workflow-step].is-success")).toHaveCount(6);
    await expect(page.locator("[data-workflow-history] tr")).toHaveCount(4);
    await expect(page.locator("[data-workflow-pdf]")).toBeEnabled();

    const downloadPromise = page.waitForEvent("download");
    await page.locator("[data-workflow-pdf]").click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("sc-medica-workflow-demo.pdf");
    await download.path();
    await expect(page.locator("#toast")).toContainText("PDF de automatización generado correctamente");
  });

  test("falla controlada: reintento y segundo intento visible", async ({ page }) => {
    await openAutomation(page, "materiales");
    await page.locator("[data-workflow-scenario]").selectOption("failure");
    await page.locator("[data-workflow-run]").click();

    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Fallido");
    await expect(page.locator("[data-workflow-step='2']")).toHaveClass(/is-failed/);
    await expect(page.locator("[data-workflow-retry]")).toBeEnabled();
    await expect(page.locator("[data-workflow-history] tr")).toHaveCount(4);

    await page.locator("[data-workflow-retry]").click();
    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Esperando aprobación");
    await expect(page.locator("[data-workflow-run-id]")).toContainText("intento 2");
    await page.locator("[data-workflow-approve]").click();

    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Ejecutado");
    await expect(page.locator("[data-workflow-step].is-success")).toHaveCount(6);
    await expect(page.locator("[data-workflow-history] tr")).toHaveCount(5);
  });

  test("motores y panel tipo Grafana responden a filtros", async ({ page }) => {
    await openAutomation(page, "inmobiliarias");

    await page.locator("[data-workflow-engine='node-red']").click();
    await expect(page.locator("[data-workflow-engine='node-red']")).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-workflow-canvas]")).toHaveAttribute("data-engine", "node-red");
    await expect(page.locator("[data-workflow-engine-copy]")).toContainText("Node-RED");

    await page.locator("[data-workflow-select]").selectOption("1");
    await expect(page.locator("[data-workflow-title]")).toHaveText("Contrato y cobranza");
    await expect(page.locator("[data-workflow-dashboard-select]")).toHaveValue("1");

    await page.locator("[data-workflow-period]").selectOption("90");
    await page.locator("[data-workflow-compare]").check();
    await expect(page.locator("[data-workflow-metric='runs']")).toHaveText("335");
    await expect(page.locator("[data-workflow-delta='runs']")).toContainText("período anterior");
    await expect(page.locator("[data-workflow-previous-legend]")).toBeVisible();
    await expect(page.locator("[data-workflow-chart]")).toHaveClass(/is-comparing/);
  });

  test("programación y vista previa no realizan envíos reales", async ({ page }) => {
    await openAutomation(page, "hoteleria");

    await page.locator("#workflowFrequency").selectOption("Semanal");
    await page.locator("#workflowTime").fill("09:30");
    await page.locator("#workflowRecipient").fill("direccion.hotel@demo.local");
    await page.locator("[data-workflow-schedule-form]").getByRole("button", { name: "Guardar programación demo" }).click();
    await expect(page.locator("[data-workflow-schedule-summary]")).toContainText("Semanal · 09:30 · direccion.hotel@demo.local");
    await expect(page.locator("[data-workflow-history] tr")).toHaveCount(4);

    await page.locator("[data-workflow-email]").click();
    const dialog = page.getByRole("dialog", { name: "Vista previa del email" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("No se enviará ningún email real desde esta demostración.")).toBeVisible();
    await expect(dialog.locator("[name='recipient']")).toBeFocused();
    await dialog.getByRole("button", { name: "Preparar email demo" }).click();
    await expect(page.locator("#toast")).toContainText("No se realizó ningún envío real");
    await expect(page.locator("[data-workflow-history] tr")).toHaveCount(5);
  });

  test("teclado: la pestaña nueva participa de la navegación", async ({ page }) => {
    await openAutomation(page, "gomerias");
    const tab = page.locator("#tab-automatizaciones");
    await tab.focus();
    await page.keyboard.press("Home");
    await expect(page.locator(".view-tabs [role='tab']").first()).toBeFocused();
    await expect(page.locator(".view-panel.active")).not.toHaveAttribute("id", "view-automatizaciones");
    await page.keyboard.press("End");
    await expect(tab).toBeFocused();
    await expect(page.locator("#view-automatizaciones")).toBeVisible();
  });

  test("móvil: flujo, reportes y tabla sin desbordar la página", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const slug of demos) {
      await openAutomation(page, slug);
      await expect(page.locator("[data-workflow-step]")).toHaveCount(6);
      const columns = await page.locator("[data-workflow-nodes]").evaluate((element) => getComputedStyle(element).gridTemplateColumns);
      expect(columns.split(" ")).toHaveLength(1);
      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(horizontalOverflow).toBeFalsy();
    }
  });

  test("accesibilidad básica del centro de automatización", async ({ page }) => {
    for (const slug of demos) {
      await openAutomation(page, slug);
      await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
      const seriousViolations = await page.evaluate(async () => {
        const result = await window.axe.run(document, { resultTypes: ["violations"] });
        return result.violations
          .filter((violation) => ["serious", "critical"].includes(violation.impact))
          .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) }));
      });
      expect(seriousViolations).toEqual([]);
    }
  });

  test("capturas visuales de referencia", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await openAutomation(page, "medica");
    await page.locator("[data-workflow-run]").click();
    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Esperando aprobación");
    await page.locator("[data-workflow-approve]").click();
    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Ejecutado");
    await page.screenshot({ path: "test-results/phase5-medica-automation-desktop.png", fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await openAutomation(page, "logistica");
    await page.screenshot({ path: "test-results/phase5-logistica-automation-mobile.png", fullPage: true });
  });
});
