const { test, expect } = require("playwright/test");

const baseUrl = "http://127.0.0.1:4173";

test.use({ channel: "msedge", reducedMotion: "reduce" });

test.describe("Mejoras de interfaz compartidas", () => {
  test("el formulario comercial explica los errores y los limpia al corregirlos", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/contacto/index.html`, { waitUntil: "networkidle" });

    await page.getByRole("button", { name: "Enviar consulta" }).click();

    await expect(page.locator("[data-ui-form-status]")).toContainText("Revisá los campos señalados");
    await expect(page.locator("#nombre")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#nombre-feedback")).toHaveText("Este campo es obligatorio.");

    await page.locator("#nombre").fill("Lucía Pérez");
    await page.locator("#nombre").blur();
    await expect(page.locator("#nombre")).toHaveAttribute("aria-invalid", "false");
    await expect(page.locator("#nombre-feedback")).toBeHidden();

    await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
    const violations = await page.evaluate(async () => {
      const result = await window.axe.run(document, { resultTypes: ["violations"] });
      return result.violations
        .filter((violation) => ["serious", "critical"].includes(violation.impact))
        .map((violation) => violation.id);
    });
    expect(violations).toEqual([]);
  });

  test("un envío válido muestra progreso sin abandonar la demo", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/contacto/index.html`, { waitUntil: "networkidle" });
    await page.locator("form[data-contact-form]").evaluate((form) => {
      form.addEventListener("submit", (event) => event.preventDefault(), { capture: true });
    });

    await page.locator("#nombre").fill("Lucía Pérez");
    await page.locator("#empresa").fill("Empresa Demo");
    await page.locator("#email").fill("lucia@empresa.com");
    await page.locator("#rubro").selectOption("medica");
    await page.locator("#necesidad").selectOption("sistema");
    await page.locator("#mensaje").fill("Necesitamos ordenar turnos, coberturas y reportes internos.");
    await page.locator("[name='autorizacion_de_contacto']").check();

    const submit = page.locator(".contact-submit");
    await submit.click();
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await expect(submit).toContainText("Enviando consulta");
    await expect(page.locator("[data-ui-form-status]")).toContainText("Datos validados");
    await page.screenshot({ path: "test-results/ui-contact-feedback-desktop.png", fullPage: true });
  });

  test("las demos confirman operaciones con estados visibles en el botón", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/talleres/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Órdenes" }).click();
    await page.locator("#title").fill("Cliente Demo - Fiat Cronos");
    await page.locator("#subtitle").selectOption("Diagnóstico");
    await page.locator("#meta").fill("Turno 16:00 · Web");
    await page.locator("#amount").fill("$ 180.000");
    await page.locator("#notes").fill("Revisar frenos y preparar presupuesto.");

    const submit = page.locator("#demoQuickForm button[type='submit']");
    await submit.click();
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await expect(page.locator("#recordsList .record-item")).toHaveCount(4);
    await expect(submit).toContainText("Registro creado");

    await page.goto(`${baseUrl}/rubros/medica/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Turnero", exact: true }).last().click();
    const initialAppointments = await page.locator("#appointmentListTurnos .appointment-item").count();
    await page.locator("#appointmentReason").fill("Control anual y seguimiento");

    const medicalSubmit = page.locator("#appointmentForm button[type='submit']");
    await medicalSubmit.click();
    await expect(medicalSubmit).toHaveAttribute("aria-busy", "true");
    await expect(page.locator("#appointmentListTurnos .appointment-item")).toHaveCount(initialAppointments + 1);
    await expect(medicalSubmit).toContainText("Turno confirmado");
  });

  test("los iconos explican su acción al recibir foco", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/medica/index.html`, { waitUntil: "networkidle" });
    const openSchedule = page.locator(".icon-button[aria-label='Abrir turnero']");
    await expect(openSchedule).toHaveAttribute("data-ui-tooltip", "Abrir turnero");
    await openSchedule.hover();
    const tooltipContent = await openSchedule.evaluate((element) => getComputedStyle(element, "::after").content);
    expect(tooltipContent).toContain("Abrir turnero");
    await expect.poll(
      () => openSchedule.evaluate((element) => Number(getComputedStyle(element, "::after").opacity)),
    ).toBeGreaterThan(0.95);

    const rowAction = page.locator(".row-menu-button[aria-label]").first();
    await expect(rowAction).toHaveAttribute("data-ui-tooltip", "Acciones del turno");
  });

  test("los detalles de servicios no generan una barra horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
    const services = page.locator("[data-service]");
    const modal = page.locator(".service-modal-card");
    const close = page.locator("[data-service-close]");

    for (let index = 0; index < await services.count(); index += 1) {
      await services.nth(index).click();
      await expect(modal).toBeVisible();
      await expect(modal).toHaveCSS("overflow-x", "hidden");
      await expect(close).not.toHaveAttribute("data-ui-tooltip", /.+/);
      const horizontalOverflow = await modal.evaluate((element) => element.scrollWidth - element.clientWidth);
      expect(horizontalOverflow).toBeLessThanOrEqual(1);
      if (index === 3) await page.screenshot({ path: "test-results/service-modal-desktop.png" });
      await close.click();
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/index.html`, { waitUntil: "networkidle" });
    await page.locator("[data-service='asistentes']").click();
    await expect(modal).toBeVisible();
    const bounds = await modal.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, viewport: document.documentElement.clientWidth };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(bounds.viewport);
    const mobileOverflow = await modal.evaluate((element) => element.scrollWidth - element.clientWidth);
    expect(mobileOverflow).toBeLessThanOrEqual(1);
    await page.screenshot({ path: "test-results/service-modal-mobile.png" });
  });

  test("la programación de automatizaciones valida y confirma sin saltos", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/logistica/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Automatizaciones" }).click();
    const recipient = page.locator("#workflowRecipient");
    const submit = page.locator("[data-workflow-schedule-form] button[type='submit']");

    await recipient.fill("correo-invalido");
    await submit.click();
    await expect(recipient).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#workflowRecipient-feedback")).toContainText("Ingresá un email válido");

    await recipient.fill("operaciones@demo.local");
    await submit.click();
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await expect(page.locator("[data-workflow-schedule-summary]")).toContainText("operaciones@demo.local");
    await expect(submit).toContainText("Programación guardada");
  });

  test("el comparador usa un switch claro y la interfaz no desborda en móvil", async ({ page }) => {
    await page.goto(`${baseUrl}/rubros/logistica/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("tab", { name: "Automatizaciones" }).click();
    const compare = page.locator("[data-workflow-compare]");
    await expect(compare).toHaveCSS("appearance", "none");
    await expect(compare).toHaveCSS("width", "38px");
    await expect(compare).toHaveCSS("height", "22px");
    await compare.check();
    await expect(compare).toBeChecked();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/contacto/index.html`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Enviar consulta" }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBeFalsy();
    await page.screenshot({ path: "test-results/ui-contact-validation-mobile.png", fullPage: true });
  });
});
