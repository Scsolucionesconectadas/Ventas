const { test, expect } = require("playwright/test");

const baseUrl = "http://127.0.0.1:4173";

test.use({ channel: "msedge", reducedMotion: "reduce" });

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBeFalsy();
}

async function expectNoSeriousA11yViolations(page) {
  await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, { resultTypes: ["violations"] });
    return result.violations
      .filter((violation) => ["serious", "critical"].includes(violation.impact))
      .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) }));
  });
  expect(violations).toEqual([]);
}

test.describe("Fase 8 - soluciones orientadas a problemas", () => {
  test("el catálogo presenta rutas claras, catorce demos y filtros funcionales", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/demos/`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { name: "Elegí el problema. Probá cómo resolverlo." })).toBeVisible();
    await expect(page.locator(".solution-gate")).toHaveCount(4);
    await expect(page.locator(".industry-card")).toHaveCount(14);
    await expect(page.locator(".industry-card-outcome")).toHaveCount(14);

    const managementCard = page.locator(".industry-card").filter({ hasText: "Gestión PyME" });
    const appointmentsCard = page.locator(".industry-card").filter({ hasText: "Turnos y agenda" });
    await expect(managementCard).toBeVisible();
    await expect(appointmentsCard).toBeVisible();
    expect(await managementCard.locator("img").evaluate((image) => image.complete && image.naturalWidth >= 1200)).toBeTruthy();
    expect(await appointmentsCard.locator("img").evaluate((image) => image.complete && image.naturalWidth >= 1200)).toBeTruthy();

    await page.getByRole("button", { name: "Turnos y reservas" }).click();
    await expect(appointmentsCard).toBeVisible();
    await expect(managementCard).toBeHidden();
    await expect(page.locator(".industry-card:not([hidden])")).not.toHaveCount(0);

    await expectNoHorizontalOverflow(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: "test-results/phase8-demos-desktop.png" });
  });

  for (const demo of [
    { slug: "gestion-pyme", heading: "Ventas, caja y clientes en una sola gestión", tab: "Movimientos", stages: ["Pendiente", "Cobro parcial", "Cobrado", "Conciliado"] },
    { slug: "turnos", heading: "Agenda, equipo y recordatorios sin superposiciones", tab: "Turnos", stages: ["Solicitado", "Confirmado", "En atención", "Finalizado"] },
  ]) {
    test(`${demo.slug}: ofrece operación completa e inteligencia explicable`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`${baseUrl}/rubros/${demo.slug}/`, { waitUntil: "networkidle" });

      await expect(page.getByRole("heading", { name: demo.heading })).toBeVisible();
      await expect(page.locator("#operationalInsights .operational-insight")).toHaveCount(3);
      await expect(page.locator("#operationalInsights")).toContainText("Reglas demo explicables");
      expect(await page.evaluate(() => window.SCIndustryDemos[document.body.dataset.demoSlug].pipelineStages)).toEqual(demo.stages);
      if (demo.slug === "gestion-pyme") {
        await expect(page.locator("#demoHero")).toHaveCSS("opacity", "1");
        await page.screenshot({ path: "test-results/phase8-gestion-pyme-desktop.png" });
        await page.locator("#operationalInsights").scrollIntoViewIfNeeded();
        await page.screenshot({ path: "test-results/phase8-gestion-pyme-insights.png" });
      }

      await page.getByRole("tab", { name: demo.tab }).click();
      const before = await page.locator("#recordsList .record-item").count();
      await page.locator("#title").fill("Caso de prueba");
      await page.locator("#subtitle").selectOption({ index: 1 });
      await page.locator("#meta").fill("Hoy · 16:30");
      await page.locator("#amount").fill("$ 125.000");
      const professional = page.locator("#professional");
      if (await professional.count()) await professional.selectOption({ index: 1 });
      await page.locator("#notes").fill("Registro ficticio para validar el recorrido completo.");
      await page.locator("#demoQuickForm button[type='submit']").click();
      await expect(page.locator("#recordsList .record-item")).toHaveCount(before + 1);
      await expect(page.locator("#recordsList")).toContainText("Caso de prueba");

      await page.getByRole("tab", { name: "Automatizaciones" }).click();
      await expect(page.locator("[data-workflow-select] option")).toHaveCount(2);
      await expect(page.locator("[data-workflow-step]")).toHaveCount(6);
      expect(errors).toEqual([]);
    });
  }

  test("gastronomía recomienda mesa, gestiona espera y detiene estados finalizados", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto(`${baseUrl}/rubros/gastronomia/#reservas`, { waitUntil: "networkidle" });

    await expect(page.getByRole("tab", { name: "Reservas" })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#view-reservas")).toBeVisible();
    await expect(page.locator("#restaurantReservationList .restaurant-reservation-item")).toHaveCount(3);

    const reservationForm = page.locator("#restaurantReservationForm");
    await reservationForm.locator("[name='guest']").fill("Cliente Disponible");
    await reservationForm.locator("[name='time']").selectOption("19:30");
    await reservationForm.locator("[name='party']").fill("2");
    await reservationForm.locator("[name='area']").selectOption("salon");
    await reservationForm.getByRole("button", { name: "Buscar mesa" }).click();
    await expect(page.locator("#reservationSuggestion")).toContainText("Mesa S1 disponible");
    await expect(page.locator("#reservationSuggestion")).toContainText("porque admite 2 personas");
    await page.getByRole("button", { name: "Confirmar reserva demo" }).click();

    const created = page.locator(".restaurant-reservation-item").filter({ hasText: "Cliente Disponible" });
    await expect(created.locator(".reservation-status")).toHaveText("Confirmada");
    await created.getByRole("button", { name: "Marcar ingreso" }).click();
    await expect(created.locator(".reservation-status")).toHaveText("En mesa");
    await created.getByRole("button", { name: "Finalizar visita" }).click();
    await expect(created.locator(".reservation-status")).toHaveText("Finalizada");
    await expect(created.locator(".reservation-progress")).toHaveCount(0);

    await reservationForm.locator("[name='guest']").fill("Grupo sin capacidad");
    await reservationForm.locator("[name='time']").selectOption("22:00");
    await reservationForm.locator("[name='party']").fill("12");
    await reservationForm.getByRole("button", { name: "Buscar mesa" }).click();
    await expect(page.locator("#reservationSuggestion")).toContainText("Sin mesa compatible");
    await page.getByRole("button", { name: "Agregar a lista de espera" }).click();
    await expect(page.locator(".restaurant-reservation-item").filter({ hasText: "Grupo sin capacidad" }).locator(".reservation-status")).toHaveText("En espera");
    await expectNoHorizontalOverflow(page);
    await page.screenshot({ path: "test-results/phase8-gastronomia-reservas.png", fullPage: true });
  });

  test("móvil: catálogo y nuevas demos mantienen lectura, navegación y accesibilidad", async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of ["/demos/", "/rubros/gestion-pyme/", "/rubros/turnos/", "/rubros/gastronomia/#reservas"]) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      await expectNoHorizontalOverflow(page);
      await expectNoSeriousA11yViolations(page);
    }

    await page.goto(`${baseUrl}/demos/`, { waitUntil: "networkidle" });
    await page.screenshot({ path: "test-results/phase8-demos-mobile.png" });
  });
});
