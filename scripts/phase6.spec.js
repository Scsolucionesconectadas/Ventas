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
