const { test, expect } = require("playwright/test");

const baseUrl = "http://127.0.0.1:4173";
const demos = [
  { slug: "medica", views: ["facturacion", "autorizaciones", "profesionales", "documentos", "seguimiento"] },
  { slug: "inmobiliarias", views: ["contratos", "reservas", "cobranzas", "propietarios"] },
  { slug: "materiales", views: ["compras", "proveedores", "precios", "cuentas", "despachos"] },
];

test.use({ channel: "msedge", acceptDownloads: true });

test.describe("Fase 4 - demos prioritarias", () => {
  for (const demo of demos) {
    test(`${demo.slug}: módulos y acciones operativas`, async ({ page }) => {
      const errors = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}/rubros/${demo.slug}/index.html`, { waitUntil: "networkidle" });

      await expect(page.getByRole("region", { name: /Herramientas de la demostración/ })).toBeVisible();
      await expect(page.locator(".side-nav [data-priority-view]")).toHaveCount(demo.views.length);

      for (const viewId of demo.views) {
        await page.locator(`.side-nav [data-priority-view="${viewId}"]`).click();
        await expect(page.locator(`#view-${viewId}`)).toBeVisible();
        await expect(page.locator(`#view-${viewId} .priority-phase-badge`)).toContainText("Módulo Fase 4");
      }

      const firstView = demo.views[0];
      await page.locator(`.side-nav [data-priority-view="${firstView}"]`).click();
      const panel = page.locator(`#view-${firstView}`);
      const tableRows = panel.locator("[data-priority-record]");
      const initialRows = await tableRows.count();

      await panel.locator("[data-priority-new]").click();
      const recordModal = page.locator("[data-priority-modal]:not([hidden])");
      await expect(recordModal.getByRole("dialog")).toBeVisible();
      await expect(recordModal.locator("[name='reference']")).toBeFocused();
      await recordModal.locator("[name='reference']").fill("Registro de prueba");
      await recordModal.locator("[name='detail']").fill("Detalle operativo ficticio");
      await recordModal.locator("[name='third']").fill("Dato complementario");
      await recordModal.locator("[name='status']").selectOption("En revisión");
      await recordModal.getByRole("button", { name: "Confirmar registro" }).click();
      await expect(tableRows).toHaveCount(initialRows + 1);
      await expect(page.locator("#toast")).toContainText("se agregó correctamente");

      const firstRow = tableRows.first();
      const rowAction = firstRow.locator("[data-priority-row-action]");
      const nextStatus = await rowAction.getAttribute("data-priority-next-status");
      await rowAction.click();
      await expect(rowAction).toBeDisabled();
      await expect(firstRow.locator("[data-priority-status]")).toHaveText(nextStatus);

      await panel.locator("[data-priority-email]").click();
      const emailModal = page.locator("[data-priority-modal]:not([hidden])");
      await expect(emailModal.getByText(/No se enviará ningún email real/)).toBeVisible();
      await emailModal.getByRole("button", { name: "Preparar email demo" }).click();
      await expect(page.locator("#toast")).toContainText("No se realizó ningún envío real");

      const downloadPromise = page.waitForEvent("download");
      await panel.locator("[data-priority-pdf]").click();
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toBe(`sc-${demo.slug}-${firstView}-demo.pdf`);
      await download.path();
      await expect(page.locator("#toast")).toContainText("generado correctamente");

      const firstTab = page.locator(`#tab-${demo.views[0]}`);
      await firstTab.focus();
      await page.keyboard.press("ArrowRight");
      await expect(page.locator(`#view-${demo.views[1]}`)).toBeVisible();
      await expect(page.locator(`#tab-${demo.views[1]}`)).toBeFocused();

      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(horizontalOverflow).toBeFalsy();
      expect(errors).toEqual([]);
    });
  }

  test("la búsqueda compartida encuentra los módulos nuevos", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/medica/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Buscar" }).click();
    const dialog = page.getByRole("dialog", { name: "Búsqueda global" });
    await dialog.getByRole("searchbox").fill("Facturación");
    const result = dialog.locator("[data-search-view='facturacion']").first();
    await expect(result).toBeVisible();
    await result.click();
    await expect(page.locator("#view-facturacion")).toBeVisible();
  });

  test("móvil: módulos profundos sin desborde de página", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const demo of demos) {
      await page.goto(`${baseUrl}/rubros/${demo.slug}/index.html`, { waitUntil: "networkidle" });
      await page.locator(`#tab-${demo.views[0]}`).click();
      await expect(page.locator(`#view-${demo.views[0]}`)).toBeVisible();
      const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(horizontalOverflow).toBeFalsy();
      await expect(page.locator(`#view-${demo.views[0]} .priority-table-wrap`)).toBeVisible();
    }
  });

  test("accesibilidad básica en los módulos prioritarios", async ({ page }) => {
    for (const demo of demos) {
      await page.goto(`${baseUrl}/rubros/${demo.slug}/index.html`, { waitUntil: "networkidle" });
      await page.locator(`#tab-${demo.views[0]}`).click();
      await expect.poll(() => page.locator(`#view-${demo.views[0]}`).evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
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
    await page.goto(`${baseUrl}/rubros/medica/index.html`, { waitUntil: "networkidle" });
    await expect.poll(() => page.locator(".medical-hero").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await page.locator("#tab-facturacion").click();
    await expect.poll(() => page.locator("#view-facturacion .module-panel").first().evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await page.screenshot({ path: "test-results/phase4-medica-facturacion-desktop.png", fullPage: true });

    await page.goto(`${baseUrl}/rubros/materiales/index.html`, { waitUntil: "networkidle" });
    await expect.poll(() => page.locator(".industry-hero").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await page.locator("#tab-compras").click();
    await expect.poll(() => page.locator("#view-compras .module-panel").first().evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await page.screenshot({ path: "test-results/phase4-materiales-compras-desktop.png", fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/rubros/inmobiliarias/index.html`, { waitUntil: "networkidle" });
    await expect.poll(() => page.locator(".industry-hero").evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await page.locator("#tab-contratos").click();
    await expect.poll(() => page.locator("#view-contratos .module-panel").first().evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
    await page.screenshot({ path: "test-results/phase4-inmobiliarias-contratos-mobile.png", fullPage: true });
  });
});
