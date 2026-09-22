const { test, expect } = require("playwright/test");

const baseUrl = "http://127.0.0.1:4173";
const route = `${baseUrl}/rubros/administracion-facturacion/`;

test.use({ channel: "msedge", acceptDownloads: true, reducedMotion: "reduce" });

test.describe("Demo de administración y facturación", () => {
  test("presenta controles administrativos y respeta el estado terminal", async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { name: "Facturas, documentos y aprobaciones bajo control" })).toBeVisible();
    await expect(page.locator("#demoSidebarNote")).toContainText("documentos demo no fiscales");
    await expect(page.locator("#primaryList .record-item")).toHaveCount(4);
    await expect(page.locator("#primaryList").getByText("Posible duplicado · OC-4471")).toBeVisible();

    const completed = page.locator("#primaryList .record-item").filter({ hasText: "Transferencia · Cliente Delta" });
    await completed.getByRole("button", { name: "Acciones del registro" }).click();
    await expect(page.locator("[data-floating-action='avance']")).toHaveCount(0);
  });

  test("el asistente explica prioridades y ambos workflows están disponibles", async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });

    await page.getByRole("tab", { name: "Asistente" }).click();
    await page.getByRole("button", { name: "¿Qué pagos esperan aprobación?" }).click();
    await expect(page.locator("#industryChatStream")).toContainText("nueve aprobaciones abiertas");
    await expect(page.locator("#industryChatStream")).toContainText("posible duplicado");

    await page.getByRole("tab", { name: "Automatizaciones" }).click();
    await expect(page.locator("[data-workflow-select] option")).toHaveText([
      "Servicio, factura y cobranza",
      "Factura de proveedor y pago",
    ]);
    await page.locator("[data-workflow-select]").selectOption("1");
    await page.locator("[data-workflow-run]").click();
    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Esperando aprobación");
    await page.locator("[data-workflow-approve]").click();
    await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Ejecutado");
  });

  test("genera el PDF demo y conserva accesibilidad en móvil", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Reportes" }).click();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Ver PDF", exact: true }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("sc-administracion-facturacion-reporte-demo.pdf");
    await download.path();

    await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
    const violations = await page.evaluate(async () => {
      const result = await window.axe.run(document, { resultTypes: ["violations"] });
      return result.violations
        .filter((violation) => ["serious", "critical"].includes(violation.impact))
        .map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.length }));
    });
    expect(violations).toEqual([]);

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(horizontalOverflow).toBeFalsy();
  });
});
