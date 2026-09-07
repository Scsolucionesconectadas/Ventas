const fs = require("fs");
const path = require("path");
const { test, expect } = require("playwright/test");

const baseUrl = "http://127.0.0.1:4173";
const publicBase = "https://scsolucionesconectadas.github.io/Ventas";
const pages = [
  { route: "/", canonical: `${publicBase}/` },
  { route: "/demos/", canonical: `${publicBase}/demos/` },
  { route: "/servicios/", canonical: `${publicBase}/servicios/` },
  { route: "/automatizaciones/", canonical: `${publicBase}/automatizaciones/` },
  { route: "/contacto/", canonical: `${publicBase}/contacto/` },
  ...[
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
  ].map((slug) => ({ route: `/rubros/${slug}/`, canonical: `${publicBase}/rubros/${slug}/` })),
];

test.use({ channel: "msedge", reducedMotion: "reduce" });

test.describe("Fase 6 - publicación y presentación comercial", () => {
  test("las páginas indexables tienen SEO único y previsualización social", async ({ page, request }) => {
    const titles = new Set();
    const descriptions = new Set();
    const cloudflareRequests = [];
    page.on("request", (networkRequest) => {
      if (networkRequest.url().includes("static.cloudflareinsights.com")) cloudflareRequests.push(networkRequest.url());
    });

    for (const item of pages) {
      await page.goto(`${baseUrl}${item.route}?phase6=1`, { waitUntil: "domcontentloaded" });
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      const image = await page.locator('meta[property="og:image"]').getAttribute("content");

      expect(title).not.toContain("Mockups Ventas");
      expect(title.length).toBeGreaterThan(20);
      expect(description.length).toBeGreaterThan(50);
      expect(titles.has(title)).toBeFalsy();
      expect(descriptions.has(description)).toBeFalsy();
      titles.add(title);
      descriptions.add(description);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", item.canonical);
      await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#22333f");
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_AR");
      await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Soluciones Conectadas");
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", item.canonical);
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveCount(1);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", image);
      await expect(page.locator('script[src*="analytics.js"]')).toHaveCount(1);
      expect(await page.evaluate(() => window.SCAnalytics)).toEqual({
        provider: "cloudflare-web-analytics",
        enabled: false,
      });

      const localImagePath = new URL(image).pathname.replace("/Ventas", "");
      const imageResponse = await request.get(`${baseUrl}${localImagePath}`);
      expect(imageResponse.ok()).toBeTruthy();
      expect(imageResponse.headers()["content-type"]).toContain("image/");
    }

    expect(cloudflareRequests).toEqual([]);
  });

  test("la portada declara datos estructurados verificables", async ({ page }) => {
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    const structuredData = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    const organization = structuredData["@graph"].find((item) => item["@type"] === "Organization");
    const website = structuredData["@graph"].find((item) => item["@type"] === "WebSite");

    expect(organization.name).toBe("Soluciones Conectadas");
    expect(organization.url).toBe(`${publicBase}/`);
    expect(organization.email).toBe("contacto.solucionesconectadas@gmail.com");
    expect(organization.sameAs).toEqual(["https://www.instagram.com/sc.soluciones.ar/"]);
    expect(website.publisher["@id"]).toBe(organization["@id"]);
    expect(website.inLanguage).toBe("es-AR");
  });

  test("la portada presenta indicadores comerciales y separa el texto de las acciones", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

    const proofItems = page.locator(".proof-item");
    await expect(proofItems).toHaveCount(4);
    await expect(proofItems.nth(0).locator("strong")).toHaveText("12");
    await expect(proofItems.nth(0).locator("span")).toHaveText("demos sectoriales");
    await expect(proofItems.nth(1)).toContainText("7+");
    await expect(proofItems.nth(1)).toContainText("módulos por experiencia");
    await expect(proofItems.nth(2)).toContainText("2");
    await expect(proofItems.nth(2)).toContainText("procesos automáticos por rubro");
    await expect(proofItems.nth(3)).toContainText("360°");
    await expect(proofItems.nth(3)).toContainText("gestión, automatización y reportes");
    await expect(page.locator(".outcome-item").nth(2)).toContainText("Hasta 60% menos");
    await expect(page.locator(".outcome-item").nth(2)).toContainText("Tareas manuales repetitivas");

    const viewports = [
      { name: "desktop", width: 1366, height: 768 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "mobile", width: 390, height: 844 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
      await expect(page.locator(".service-button").first()).toHaveCSS("opacity", "1");

      const serviceLayout = await page.locator(".service-button").evaluateAll((cards) =>
        cards.map((card) => {
          const cardRect = card.getBoundingClientRect();
          const action = getComputedStyle(card, "::after");
          const actionRect = {
            left: cardRect.right - parseFloat(action.right) - parseFloat(action.width),
            top: cardRect.bottom - parseFloat(action.bottom) - parseFloat(action.height),
            right: cardRect.right - parseFloat(action.right),
            bottom: cardRect.bottom - parseFloat(action.bottom),
          };
          const paragraph = card.querySelector("p");
          const range = document.createRange();
          range.selectNodeContents(paragraph);
          const textRects = Array.from(range.getClientRects());
          const overlapsAction = textRects.some(
            (rect) =>
              rect.right + 10 > actionRect.left &&
              rect.left - 10 < actionRect.right &&
              rect.bottom + 10 > actionRect.top &&
              rect.top - 10 < actionRect.bottom,
          );

          return { overlapsAction, text: paragraph.textContent.trim() };
        }),
      );
      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );

      expect(serviceLayout.filter((item) => item.overlapsAction), viewport.name).toEqual([]);
      expect(horizontalOverflow, viewport.name).toBeFalsy();

      if (viewport.name !== "tablet") {
        await page.locator("#servicios").screenshot({
          path: `test-results/landing-services-${viewport.name}.png`,
        });
      }
    }
  });

  test("el catálogo usa lenguaje claro, fotos por rubro y controles alineados", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/demos/`, { waitUntil: "networkidle" });

    await expect(page.getByRole("heading", { name: "Demos navegables para presentar soluciones reales en cada rubro." })).toBeVisible();
    await expect(page.getByRole("button", { name: "En planificación" })).toBeVisible();
    await expect(page.getByText("Roadmap", { exact: true })).toHaveCount(0);

    const expectedImages = {
      Gomerías: "tires-team-demo.webp",
      Agrimensores: "survey-team-demo.webp",
      "Logística y transporte": "logistics-team-demo.webp",
    };
    for (const [title, fileName] of Object.entries(expectedImages)) {
      const card = page.locator(".industry-card").filter({ has: page.getByRole("heading", { name: title }) });
      await expect(card.locator("img")).toHaveAttribute("src", new RegExp(fileName));
      expect(await card.locator("img").evaluate((image) => image.complete && image.naturalWidth === 1600)).toBeTruthy();
    }

    const layout = await page.evaluate(() => {
      const heading = document.querySelector(".demos-hero .section-heading");
      const title = heading.querySelector("h1").getBoundingClientRect();
      const copy = heading.querySelector(":scope > p").getBoundingClientRect();
      const rows = new Map();
      document.querySelectorAll(".demos-catalog-grid .industry-card").forEach((card) => {
        const row = Math.round(card.getBoundingClientRect().top);
        const disclosureTop = card.querySelector(".feature-disclosure").getBoundingClientRect().top;
        rows.set(row, [...(rows.get(row) || []), disclosureTop]);
      });
      return {
        titleIsWider: title.width > copy.width,
        alignedRows: [...rows.values()].every((tops) => Math.max(...tops) - Math.min(...tops) <= 1),
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    });

    expect(layout.titleIsWider).toBeTruthy();
    expect(layout.alignedRows).toBeTruthy();
    expect(layout.overflow).toBeFalsy();
    await page.locator(".demos-catalog-grid").screenshot({ path: "test-results/catalog-aligned-with-photos.png" });
  });

  test("contacto solicita una aclaración para otro rubro u otra necesidad", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/contacto/`, { waitUntil: "networkidle" });

    const rubroField = page.locator("#rubro-otro-field");
    const rubroInput = page.locator("#rubro-otro");
    await expect(rubroField).toBeHidden();
    await page.locator("#rubro").selectOption("otro");
    await expect(rubroField).toBeVisible();
    await expect(rubroInput).toBeEnabled();
    await expect(rubroInput).toHaveAttribute("required", "");
    await expect(rubroInput).toBeFocused();
    await rubroInput.fill("Distribuidora regional");

    const necesidadField = page.locator("#necesidad-otra-field");
    const necesidadInput = page.locator("#necesidad-otra");
    await expect(necesidadField).toBeHidden();
    await page.locator("#necesidad").selectOption("otra");
    await expect(necesidadField).toBeVisible();
    await expect(necesidadInput).toBeEnabled();
    await expect(necesidadInput).toHaveAttribute("required", "");
    await expect(necesidadInput).toBeFocused();
    await expect(necesidadField.locator(".field-help")).toContainText("campo siguiente");

    await page.locator("#rubro").selectOption("medica");
    await expect(rubroField).toBeHidden();
    await expect(rubroInput).toBeDisabled();
    await expect(rubroInput).toHaveValue("");

    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(horizontalOverflow).toBeFalsy();
  });

  test("sitemap y robots cubren todas las páginas públicas", async () => {
    const sitemap = fs.readFileSync(path.join(__dirname, "..", "sitemap.xml"), "utf8");
    const robots = fs.readFileSync(path.join(__dirname, "..", "robots.txt"), "utf8");
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    const lastModified = [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map((match) => match[1]);

    expect(urls).toEqual(pages.map((item) => item.canonical));
    expect(lastModified).toHaveLength(pages.length);
    expect(lastModified.every((date) => date === "2026-09-06")).toBeTruthy();
    expect(robots).toContain(`Sitemap: ${publicBase}/sitemap.xml`);
    expect(sitemap).not.toContain("presentacion");
  });

  test("la presentación navega, muestra el guion y se imprime completa", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/presentacion/`, { waitUntil: "networkidle" });

    await expect(page.locator("[data-presentation-slide]")).toHaveCount(8);
    await expect(page.locator("[data-presentation-slide]:not([hidden])")).toHaveCount(1);
    await expect(page.locator("[data-presentation-counter]")).toHaveText("01 / 08");
    await page.getByRole("button", { name: "Diapositiva siguiente" }).click();
    await expect(page.locator("[data-presentation-counter]")).toHaveText("02 / 08");

    await page.getByRole("button", { name: "Notas del expositor" }).click();
    await expect(page.getByRole("complementary", { name: "Notas del expositor" })).toBeVisible();
    await expect(page.locator("[data-presentation-notes-title]")).toHaveText("El desafío");
    await expect(page.locator("[data-presentation-notes-body]")).toContainText("validamos");
    await page.getByRole("button", { name: "Cerrar notas" }).click();

    await page.keyboard.press("End");
    await expect(page.locator("[data-presentation-counter]")).toHaveText("08 / 08");
    await page.keyboard.press("Home");
    await expect(page.locator("[data-presentation-counter]")).toHaveText("01 / 08");

    await page.emulateMedia({ media: "print" });
    const printableSlides = await page.locator("[data-presentation-slide]").evaluateAll((slides) =>
      slides.filter((slide) => getComputedStyle(slide).display !== "none").length,
    );
    expect(printableSlides).toBe(8);
  });

  test("la presentación funciona sin desbordes en móvil", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/presentacion/`, { waitUntil: "networkidle" });
    await page.keyboard.press("End");
    await expect(page.locator("[data-presentation-counter]")).toHaveText("08 / 08");
    const closingTitle = page.locator("[data-presentation-slide]:not([hidden]) h2");
    await expect(closingTitle).toBeVisible();
    await expect(closingTitle).toHaveCSS("opacity", "1");
    await expect(page.getByRole("link", { name: /Email/ })).toBeVisible();
    await expect(page.locator(".presentation-contact-grid svg")).toHaveCount(3);

    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      emailFits: (() => {
        const email = document.querySelector('.presentation-contact-grid a[href^="mailto:"] small');
        return email.scrollWidth <= email.clientWidth + 1;
      })(),
    }));
    expect(layout.overflow).toBeFalsy();
    expect(layout.emailFits).toBeTruthy();

    await page.screenshot({ path: "test-results/phase6-presentation-mobile.png", fullPage: true });
  });

  test("las ocho diapositivas caben en una notebook", async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(`${baseUrl}/presentacion/`, { waitUntil: "networkidle" });

    for (let index = 0; index < 8; index += 1) {
      const activeSlide = page.locator("[data-presentation-slide]:not([hidden])");
      await expect(activeSlide.locator("h1, h2")).toBeVisible();
      const fit = await activeSlide.evaluate((slide) => ({
        horizontalOverflow: slide.scrollWidth > slide.clientWidth + 1,
        verticalOverflow: slide.scrollHeight > slide.clientHeight + 1,
      }));
      expect(fit.horizontalOverflow, `La diapositiva ${index + 1} desborda horizontalmente`).toBeFalsy();
      expect(fit.verticalOverflow, `La diapositiva ${index + 1} desborda verticalmente`).toBeFalsy();
      if (index < 7) {
        await page.getByRole("button", { name: "Diapositiva siguiente" }).click();
        await expect(page.locator("[data-presentation-counter]")).toHaveText(`${String(index + 2).padStart(2, "0")} / 08`);
      }
    }
  });

  test("la presentación no tiene fallas graves de accesibilidad", async ({ page }) => {
    await page.goto(`${baseUrl}/presentacion/`, { waitUntil: "networkidle" });
    await page.addScriptTag({ url: "https://unpkg.com/axe-core@4.10.3/axe.min.js" });
    const violations = await page.evaluate(async () => {
      const result = await window.axe.run(document, { resultTypes: ["violations"] });
      return result.violations
        .filter((violation) => ["serious", "critical"].includes(violation.impact))
        .map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target) }));
    });
    expect(violations).toEqual([]);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: "test-results/phase6-presentation-desktop.png", fullPage: true });
  });
});
