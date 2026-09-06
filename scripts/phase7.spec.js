const { test, expect } = require("playwright/test");

const baseUrl = "http://127.0.0.1:4173";
const demos = [
  { slug: "talleres", title: "Cada servicio, bajo control", image: "workshop-demo.webp" },
  { slug: "estudios-contables", title: "Vencimientos sin sorpresas", image: "accounting-demo.webp" },
  { slug: "constructoras", title: "La obra visible, todos los días", image: "construction-demo.webp" },
];

test.use({ channel: "msedge", acceptDownloads: true, reducedMotion: "reduce" });

test.describe("Fase 7 - nuevos rubros", () => {
  test("el catálogo presenta doce demos y los nuevos accesos son válidos", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/demos/`, { waitUntil: "networkidle" });

    await expect(page.locator(".industry-card")).toHaveCount(12);
    for (const demo of demos) {
      const card = page.locator(`.industry-card:has(a[href='../rubros/${demo.slug}/index.html'])`);
      await expect(card).toBeVisible();
      await expect(card.locator("img")).toHaveAttribute("src", `../assets/img/${demo.image}`);
      expect(await card.locator("img").evaluate((image) => image.complete && image.naturalWidth >= 1200)).toBeTruthy();
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBeFalsy();
    await page.screenshot({ path: "test-results/phase7-catalog-desktop.png" });
  });

  for (const demo of demos) {
    test(`${demo.slug}: módulos, datos, reportes y automatizaciones disponibles`, async ({ page }) => {
      const errors = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      await page.goto(`${baseUrl}/rubros/${demo.slug}/index.html`, { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { name: demo.title })).toBeVisible();
      await expect(page.locator("#demoNav .nav-button")).toHaveCount(7);
      await expect(page.locator("#demoTabs [role='tab']")).toHaveCount(7);
      await expect(page.locator("#primaryList .record-item")).toHaveCount(3);
      await expect(page.locator("#industryMetrics .metric-card")).toHaveCount(4);
      await expect(page.locator("#demoHero")).toHaveCSS("background-image", new RegExp(demo.image));

      await page.getByRole("tab", { name: "Reportes" }).click();
      await expect(page.locator("#view-reportes .report-card")).toHaveCount(4);
      await page.getByRole("tab", { name: "Automatizaciones" }).click();
      await expect(page.locator("[data-workflow-step]")).toHaveCount(6);
      await expect(page.locator("[data-workflow-select] option")).toHaveCount(2);

      expect(errors).toEqual([]);
    });
  }

  test("talleres: una orden nueva se incorpora a la operación", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/talleres/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Órdenes" }).click();
    await page.locator("#title").fill("Cliente Demo - Chevrolet Onix");
    await page.locator("#subtitle").selectOption("Diagnóstico");
    await page.locator("#meta").fill("Turno 15:30 · Web");
    await page.locator("#amount").fill("$ 210.000");
    await page.locator("#notes").fill("Revisar testigo de motor y preparar presupuesto.");
    await page.locator("#demoQuickForm").getByRole("button", { name: "Confirmar orden" }).click();

    await expect(page.locator("#recordsList .record-item")).toHaveCount(4);
    await expect(page.locator("#recordsList")).toContainText("Cliente Demo - Chevrolet Onix");
    await expect(page.locator("#toast")).toContainText("Registro demo creado");
  });

  test("estudios contables: el asistente responde sobre vencimientos", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/estudios-contables/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Asistente" }).click();
    await page.getByRole("button", { name: "¿Qué vence esta semana?" }).click();
    await expect(page.locator("#industryChatStream .message.bot").last()).toContainText("24 vencimientos próximos");
  });

  test("constructoras: el reporte ejecutivo descarga un PDF con nombre propio", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/constructoras/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Reportes" }).click();
    const downloadPromise = page.waitForEvent("download");
    await page.locator("[data-report-action='pdf']").click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("sc-constructoras-reporte-demo.pdf");
    await download.path();
  });

  test("los nuevos workflows requieren aprobación y completan la bitácora", async ({ page }) => {
    for (const demo of demos) {
      await page.goto(`${baseUrl}/rubros/${demo.slug}/index.html`, { waitUntil: "networkidle" });
      await page.getByRole("tab", { name: "Automatizaciones" }).click();
      await page.locator("[data-workflow-run]").click();
      await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Esperando aprobación");
      await page.locator("[data-workflow-approve]").click();
      await expect(page.locator("[data-workflow-overall-text]")).toHaveText("Ejecutado");
      await expect(page.locator("[data-workflow-history] tr")).toHaveCount(4);
    }
  });

  test("móvil y accesibilidad: las tres demos no presentan bloqueos graves", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const demo of demos) {
      await page.goto(`${baseUrl}/rubros/${demo.slug}/index.html`, { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { name: demo.title })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(overflow).toBeFalsy();

      await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
      const violations = await page.evaluate(async () => {
        const result = await window.axe.run(document, { resultTypes: ["violations"] });
        return result.violations
          .filter((violation) => ["serious", "critical"].includes(violation.impact))
          .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) }));
      });
      expect(violations).toEqual([]);
    }
    const constructionHero = page.locator("#demoHero");
    await constructionHero.scrollIntoViewIfNeeded();
    await expect(constructionHero).toHaveCSS("opacity", "1");
    await constructionHero.screenshot({ path: "test-results/phase7-constructoras-mobile.png" });
  });
});
