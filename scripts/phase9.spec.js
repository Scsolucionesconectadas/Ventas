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

test.describe("Fase 9 - identidad comercial y laboratorio n8n", () => {
  test("las páginas comerciales comparten navegación, portadas visuales y responsive", async ({ page }) => {
    const pages = ["/", "/servicios/", "/demos/", "/automatizaciones/", "/nosotros/", "/contacto/"];
    await page.setViewportSize({ width: 1280, height: 900 });
    for (const route of pages) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      await expect(page.getByRole("link", { name: "Nosotros", exact: true }).first()).toBeVisible();
      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(horizontalOverflow, route).toBeFalsy();
    }

    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of pages) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1").first()).toBeVisible();
      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(horizontalOverflow, `${route} móvil`).toBeFalsy();
    }

    await page.setViewportSize({ width: 1440, height: 940 });
    await page.goto(`${baseUrl}/nosotros/`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: "Conectamos el trabajo antes que la tecnología." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hola, detrás de Soluciones Conectadas estoy yo." })).toBeVisible();
    const profileImage = page.getByRole("img", { name: "Responsable de Soluciones Conectadas" });
    await expect(profileImage).toBeVisible();
    const profileAsset = await profileImage.evaluate((image) => ({
      loaded: image.complete && image.naturalWidth > 0,
      ratio: image.naturalWidth / image.naturalHeight,
    }));
    expect(profileAsset.loaded).toBeTruthy();
    expect(profileAsset.ratio).toBeCloseTo(0.8, 2);
    await expect(page.locator(".about-profile-pillars article")).toHaveCount(3);
    await expect(page.locator(".about-method-card")).toHaveCount(4);
    await expect(page.locator(".about-principles-grid article")).toHaveCount(4);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: "test-results/phase9-nosotros-desktop.png", fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/contacto/`, { waitUntil: "networkidle" });
    await expect(page.locator(".contact-media-hero")).toBeVisible();
    const contactOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(contactOverflow).toBeFalsy();
    await page.waitForTimeout(1800);
    await page.screenshot({ path: "test-results/phase9-contacto-mobile.png", fullPage: false });
  });

  test("la nueva barra comercial conserva el texto y funciona con teclado en móvil", async ({ page }) => {
    const pages = ["/", "/servicios/", "/demos/", "/automatizaciones/", "/nosotros/", "/contacto/"];
    await page.setViewportSize({ width: 1440, height: 900 });

    for (const route of pages) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      const topbar = page.locator(".topbar");
      const navigation = page.getByRole("navigation", { name: "Navegación principal" });
      await expect(topbar).toBeVisible();
      await expect(page.getByRole("button", { name: "Abrir menú principal" })).toBeHidden();
      await expect(navigation.locator("a.ghost-link")).toHaveCount(5);
      await expect(navigation.getByRole("link", { name: "Conversemos" })).toBeVisible();
      await expect(navigation.getByText("Explorar", { exact: true })).toHaveCount(0);
      await expect(navigation.locator('[aria-current="page"]')).toHaveCount(1);

      const fits = await navigation.evaluate((element) => element.scrollWidth <= element.clientWidth + 1);
      expect(fits, route).toBeTruthy();
    }

    await page.goto(`${baseUrl}/nosotros/`, { waitUntil: "networkidle" });
    const cta = page.locator(".about-cta .primary-link");
    await expect(cta).toContainText("Contar mi proceso");
    const ctaFits = await cta.evaluate((element) => ({
      textFits: element.scrollWidth <= element.clientWidth + 1,
      insideParent: element.getBoundingClientRect().right <= element.parentElement.getBoundingClientRect().right + 1,
    }));
    expect(ctaFits).toEqual({ textFits: true, insideParent: true });

    await page.evaluate(() => window.scrollTo(0, 640));
    await expect(page.locator(".topbar")).toHaveClass(/is-scrolled/);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/nosotros/`, { waitUntil: "networkidle" });
    const toggle = page.locator(".topbar-menu-toggle");
    const mobileNavigation = page.getByRole("navigation", { name: "Navegación principal" });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-label", "Abrir menú principal");
    await expect(mobileNavigation).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole("link", { name: "Inicio", exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await expect(mobileNavigation).toBeHidden();

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(horizontalOverflow).toBeFalsy();
    await page.screenshot({ path: "test-results/phase10-topbar-mobile.png", fullPage: false });
  });

  test("el laboratorio n8n ejecuta, espera aprobación y completa el workflow", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/automatizaciones/#simulador`, { waitUntil: "networkidle" });

    await expect(page.locator("[data-n8n-flow]")).toHaveCount(6);
    await expect(page.locator("[data-n8n-nodes] .n8n-node")).toHaveCount(6);
    const runButton = page.getByRole("button", { name: "Ejecutar workflow" });
    const runButtonFits = await runButton.evaluate((element) => element.scrollWidth <= element.clientWidth + 1);
    expect(runButtonFits).toBeTruthy();
    await page.getByRole("button", { name: /Lead atendido/ }).click();
    await expect(page.locator("[data-n8n-title]")).toHaveText("De la consulta a la próxima acción comercial");
    await expect(page.locator("[data-n8n-result-badge]")).toHaveText("Vista previa");
    await expect(page.locator("[data-n8n-result-title]")).toHaveText("Oportunidad priorizada");

    await runButton.click();
    await expect(page.locator("[data-n8n-status]")).toHaveText("Esperando aprobación");
    await expect(page.locator("[data-n8n-result-badge]")).toHaveText("Pendiente de aprobación");
    await expect(page.locator(".n8n-node.is-success")).toHaveCount(3);
    await expect(page.locator(".n8n-node.is-waiting")).toHaveCount(1);

    await page.getByRole("button", { name: "Aprobar paso" }).click();
    await expect(page.locator("[data-n8n-status]")).toHaveText("Workflow completado");
    await expect(page.locator("[data-n8n-result-badge]")).toHaveText("Resultado generado");
    await expect(page.locator("[data-n8n-result-details]")).toContainText("Camila Soto");
    await expect(page.locator("[data-n8n-result-run]")).toContainText("RUN-");
    await expect(page.locator(".n8n-node.is-success")).toHaveCount(6);
    await expect(page.locator("[data-n8n-log]")).toContainText("Ejecución completada");
    await page.waitForTimeout(600);
    await page.screenshot({ path: "test-results/phase9-n8n-completado.png", fullPage: true });
  });

  test("el laboratorio conserva contexto y reintenta un error temporal", async ({ page }) => {
    await page.goto(`${baseUrl}/automatizaciones/#simulador`, { waitUntil: "networkidle" });
    await page.getByLabel("Error temporal").check();
    await page.getByRole("button", { name: "Ejecutar workflow" }).click();

    await expect(page.locator("[data-n8n-status]")).toHaveText("Falló con control");
    await expect(page.locator("[data-n8n-result-badge]")).toHaveText("No generado");
    await expect(page.locator(".n8n-node.is-failed")).toHaveCount(1);
    await expect(page.getByRole("button", { name: "Reintentar" })).toBeEnabled();
    await page.getByRole("button", { name: "Reintentar" }).click();
    await expect(page.locator("[data-n8n-status]")).toHaveText("Esperando aprobación");
    await expect(page.locator("[data-n8n-run-id]")).toContainText("intento 2");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/automatizaciones/#simulador`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-n8n-nodes] .n8n-node")).toHaveCount(6);
    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(horizontalOverflow).toBeFalsy();
  });

  test("los seis workflows muestran resultados específicos antes de ejecutarse", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/automatizaciones/#simulador`, { waitUntil: "networkidle" });

    const expectedResults = [
      ["Turno confirmado", "Turno listo para confirmar", "TUR-2048"],
      ["Lead atendido", "Oportunidad priorizada", "LEAD-731"],
      ["Stock repuesto", "Orden de reposición preparada", "OC-1842"],
      ["Cobranza gestionada", "Lote de cobranzas priorizado", "COB-091"],
      ["Reserva confirmada", "Reserva confirmada", "RES-482"],
      ["Reporte distribuido", "Reporte ejecutivo preparado", "REP-2026-0913"],
    ];

    for (const [flowName, title, identifier] of expectedResults) {
      await page.getByRole("button", { name: new RegExp(flowName) }).click();
      await expect(page.locator("[data-n8n-result-title]")).toHaveText(title);
      await expect(page.locator("[data-n8n-result-details]")).toContainText(identifier);
      await expect(page.locator("[data-n8n-result-badge]")).toHaveText("Vista previa");
    }
  });

  test("las catorce demos reciben identidad por rubro sin perder estructura", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    for (const slug of demoSlugs) {
      await page.goto(`${baseUrl}/rubros/${slug}/`, { waitUntil: "domcontentloaded" });
      await expect(page.locator("body")).toHaveAttribute("data-demo-slug", slug);
      const accent = await page.locator("body").evaluate((body) => getComputedStyle(body).getPropertyValue("--demo-accent").trim());
      expect(accent, slug).not.toBe("");
      await expect(page.locator(".metric-card").first()).toBeVisible();
      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(horizontalOverflow, slug).toBeFalsy();
    }

    await page.goto(`${baseUrl}/rubros/gestion-pyme/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    await page.screenshot({ path: "test-results/phase9-demo-gestion.png", fullPage: false });
  });

  test("Servicios organiza cinco recorridos con evidencia visual de las demos", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/servicios/`, { waitUntil: "networkidle" });

    await expect(page.locator(".service-anchor-nav a")).toHaveCount(5);
    await expect(page.locator(".service-showcase")).toHaveCount(5);
    await expect(page.getByRole("heading", { name: "Automatizaciones e integraciones" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Dashboards y reporterías" })).toBeVisible();

    const previews = page.locator(".service-preview img");
    await expect(previews).toHaveCount(5);
    for (let index = 0; index < 5; index += 1) {
      const image = previews.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBeTruthy();
    }

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(horizontalOverflow).toBeFalsy();
    await page.screenshot({ path: "test-results/phase10-servicios-desktop.png", fullPage: true });
  });

  test("Contacto actualiza el resumen sin alterar el envío del formulario", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/contacto/`, { waitUntil: "networkidle" });

    const form = page.locator("[data-contact-form]");
    await expect(form).toHaveAttribute("action", "https://formsubmit.co/contacto.solucionesconectadas@gmail.com");
    await form.getByLabel("Nombre y apellido *").fill("Marina López");
    await form.getByLabel("Empresa u organización *").fill("Distribuidora Central");
    await form.getByLabel("Email *").fill("marina@example.com");
    await form.getByLabel("Rubro *").selectOption("materiales");
    await form.getByLabel("Necesidad principal *").selectOption("automatizacion");
    await form.getByLabel(/Qué tarea, demora o falta de información/).fill(
      "Los pedidos llegan por distintos canales y necesitamos ordenar su seguimiento y confirmación.",
    );
    await form.getByLabel(/Acepto que Soluciones Conectadas/).check();

    await expect(page.locator("[data-contact-preview-name]")).toHaveText("Marina López");
    await expect(page.locator("[data-contact-preview-company]")).toHaveText("Distribuidora Central");
    await expect(page.locator("[data-contact-preview-sector]")).toHaveText("Venta de materiales");
    await expect(page.locator("[data-contact-preview-need]")).toHaveText("Automatización");
    await expect(page.locator("[data-contact-preview-message]")).toContainText("Los pedidos llegan");
    await expect(page.locator("[data-contact-preview-progress]")).toHaveText("7 de 7 datos listos");
    await expect(page.locator("[data-contact-preview-progress]")).toHaveClass(/is-ready/);

    await page.locator(".contact-live-brief").screenshot({ path: "test-results/phase10-contacto-resumen.png" });
  });

  test("las páginas renovadas no presentan fallas graves de accesibilidad", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });

    for (const route of ["/servicios/", "/automatizaciones/#simulador", "/nosotros/", "/contacto/"]) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
      const violations = await page.evaluate(async () => {
        const result = await window.axe.run(document, { resultTypes: ["violations"] });
        return result.violations
          .filter((violation) => ["serious", "critical"].includes(violation.impact))
          .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) }));
      });
      expect(violations, route).toEqual([]);
    }
  });

  test("el footer comercial comparte marca, navegación y contacto sin desbordes", async ({ page }) => {
    const routes = ["/", "/servicios/", "/demos/", "/automatizaciones/", "/nosotros/", "/contacto/"];
    await page.setViewportSize({ width: 1440, height: 900 });

    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      const footer = page.getByRole("contentinfo");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
      await expect(footer.getByRole("navigation", { name: "Navegación del pie" }).getByRole("link")).toHaveCount(6);
      await expect(footer.getByRole("link", { name: "Hablar por WhatsApp" })).toHaveAttribute("href", /wa\.me\/5493442472233/);
      await expect(footer.getByText("14 demos navegables")).toBeVisible();
      const logo = footer.locator(".site-footer-logo img");
      await expect.poll(() => logo.evaluate((image) => image.complete && image.naturalWidth > 0)).toBeTruthy();

      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(horizontalOverflow, route).toBeFalsy();
    }

    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await expect(page.locator(".cta-band")).toHaveCount(0);
    await expect(page.getByText("Mostremos una demo pensada para el rubro de cada cliente.")).toHaveCount(0);
    const desktopFooter = page.locator(".site-footer");
    await desktopFooter.scrollIntoViewIfNeeded();
    await expect
      .poll(() => desktopFooter.locator(".site-footer-brand").evaluate((element) => getComputedStyle(element).opacity))
      .toBe("1");
    await desktopFooter.screenshot({ path: "test-results/site-footer-desktop.png" });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/contacto/`, { waitUntil: "networkidle" });
    const mobileFooter = page.locator(".site-footer");
    await mobileFooter.scrollIntoViewIfNeeded();
    await expect(mobileFooter.getByRole("link", { name: "Hablar por WhatsApp" })).toBeVisible();
    await expect
      .poll(() => mobileFooter.locator(".site-footer-brand").evaluate((element) => getComputedStyle(element).opacity))
      .toBe("1");
    const mobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(mobileOverflow).toBeFalsy();
    await mobileFooter.screenshot({ path: "test-results/site-footer-mobile.png" });
  });
});
