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

test.use({ channel: "msedge" });

test.describe("Fase 3 - experiencia compartida", () => {
  for (const slug of demos) {
    test(`${slug}: herramientas y flujos principales`, async ({ page }) => {
      const consoleErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });

      await page.setViewportSize({ width: 1366, height: 900 });
      await page.goto(`${baseUrl}/rubros/${slug}/index.html`, { waitUntil: "networkidle" });

      const toolbar = page.getByRole("region", { name: "Herramientas de la demostración" });
      await expect(toolbar).toBeVisible();
      await expect(toolbar.getByText("Demo pública")).toBeVisible();
      await expect(toolbar.getByText("Funciones simuladas")).toBeVisible();
      await expect(toolbar.locator("button")).toHaveCount(6);

      await page.getByRole("button", { name: "Buscar" }).click();
      const searchDialog = page.getByRole("dialog", { name: "Búsqueda global" });
      await expect(searchDialog).toBeVisible();
      await searchDialog.getByRole("searchbox").fill("reportes");
      await expect(searchDialog.locator("[data-search-view]").first()).toBeVisible();
      await searchDialog.locator("[data-search-view]").first().click();
      await expect(page.locator("#view-reportes")).toBeVisible();

      await page.getByRole("button", { name: /Actividad/ }).click();
      await expect(page.getByRole("dialog", { name: "Actividad reciente" })).toBeVisible();
      await expect(page.locator("[data-experience-activity-list] article")).toHaveCount(4);
      await page.getByRole("button", { name: "Cerrar" }).click();

      await page.getByRole("button", { name: "Estados" }).click();
      const statesDialog = page.getByRole("dialog", { name: "Estados del sistema" });
      await statesDialog.getByRole("button", { name: "Error", exact: true }).click();
      await expect(statesDialog.getByText("No se pudo completar la consulta")).toBeVisible();
      await statesDialog.getByRole("button", { name: "Reintentar" }).click();
      await expect(statesDialog.getByText("Operación completada")).toBeVisible({ timeout: 2500 });
      await statesDialog.getByRole("button", { name: "Cerrar" }).click();

      await page.getByRole("button", { name: "Presentación" }).click();
      await expect(page.locator("body")).toHaveClass(/presentation-mode/);
      await expect(page.getByRole("button", { name: "Salir del modo presentación" })).toBeVisible();
      await expect(page.locator(".sidebar")).toBeHidden();
      await page.keyboard.press("Escape");
      await expect(page.locator("body")).not.toHaveClass(/presentation-mode/);
      await expect(page.locator(".sidebar")).toBeVisible();

      await page.getByRole("button", { name: "Recorrido" }).click();
      const tour = page.locator(".experience-tour-panel");
      await expect(tour).toBeVisible();
      await expect(page.getByRole("dialog", { name: "Contexto del negocio" })).toBeVisible();
      await expect(tour.getByText(/Paso 1 de/)).toBeVisible();
      await tour.getByRole("button", { name: "Siguiente" }).click();
      await expect(page.locator("[data-tour-progress]")).toContainText("Paso 2");
      await tour.getByRole("button", { name: "Cerrar recorrido" }).click();
      await expect(page.locator(".experience-tour-panel")).toBeHidden();

      await page.getByRole("button", { name: "Reiniciar" }).click();
      await expect(page.getByRole("alertdialog", { name: "¿Reiniciar los datos ficticios?" })).toBeVisible();
      await page.getByRole("button", { name: "Cancelar" }).click();

      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(horizontalOverflow).toBeFalsy();
      expect(consoleErrors).toEqual([]);
    });
  }

  test("móvil y tablet: controles sin desbordes", async ({ page }) => {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(`${baseUrl}/rubros/medica/index.html`, { waitUntil: "networkidle" });
      await expect(page.getByRole("region", { name: "Herramientas de la demostración" })).toBeVisible();
      await page.getByRole("button", { name: "Buscar" }).click();
      await expect(page.getByRole("dialog", { name: "Búsqueda global" })).toBeVisible();
      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(horizontalOverflow).toBeFalsy();
      await page.keyboard.press("Escape");
    }
  });

  test("reinicio: recarga y confirma el estado inicial", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/hoteleria/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Reiniciar" }).click();
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.getByRole("button", { name: "Reiniciar demo" }).click(),
    ]);
    await expect(page.getByRole("status").filter({ hasText: "Datos ficticios restablecidos correctamente." })).toBeVisible();
  });

  test("el acceso Presentar abre el nuevo recorrido manual", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/medica/index.html`, { waitUntil: "networkidle" });
    await page.locator(".action-dropdown > summary").click();
    await page.getByRole("button", { name: "Iniciar demo guiada" }).click();
    await expect(page.getByRole("dialog", { name: "Contexto del negocio" })).toBeVisible();
  });

  test("capturas visuales de referencia", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/rubros/medica/index.html`, { waitUntil: "networkidle" });
    await expect.poll(() => page.locator(".medical-hero").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await page.screenshot({ path: "test-results/phase3-medica-desktop.png", fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/rubros/hoteleria/index.html`, { waitUntil: "networkidle" });
    await expect.poll(() => page.locator(".industry-hero").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await page.screenshot({ path: "test-results/phase3-hoteleria-mobile.png", fullPage: true });
  });

  test("accesibilidad básica de la capa compartida", async ({ page }) => {
    for (const slug of demos) {
      await page.goto(`${baseUrl}/rubros/${slug}/index.html`, { waitUntil: "networkidle" });
      await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
      const seriousViolations = await page.evaluate(async () => {
        const result = await window.axe.run(document, {
          resultTypes: ["violations"],
        });
        return result.violations
          .filter((violation) => ["serious", "critical"].includes(violation.impact))
          .map((violation) => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map((node) => node.target) }));
      });
      expect(seriousViolations).toEqual([]);
    }
  });
});
