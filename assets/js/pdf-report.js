(function () {
  const brand = {
    name: "Soluciones Conectadas",
    subtitle: "Automatización e integración para empresas",
    email: "contacto.solucionesconectadas@gmail.com",
    phone: "+54 9 3442 47-2233",
    instagram: "@sc.soluciones.ar",
    ink: [34, 51, 63],
    muted: [101, 117, 131],
    primary: [0, 96, 192],
    accent: [0, 176, 232],
    soft: [235, 248, 255],
    line: [210, 224, 234],
  };

  async function downloadReport(options) {
    const JsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!JsPDF) return false;

    try {
      const doc = new JsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        putOnlyUsedFonts: true,
        compress: true,
      });
      const logo = await loadImageAsset(options.logoUrl);
      const footerLogo = await loadImageAsset(options.footerLogoUrl);
      const page = {
        width: doc.internal.pageSize.getWidth(),
        height: doc.internal.pageSize.getHeight(),
        margin: 42,
        footerTop: 742,
      };
      const contentWidth = page.width - page.margin * 2;

      doc.setProperties({
        title: options.title || "Reporte ejecutivo SC",
        subject: `Documento demo de ${options.rubro || "Soluciones Conectadas"}`,
        author: brand.name,
        creator: brand.name,
      });

      drawChrome(doc, page, options, logo, footerLogo);

      let y = 116;
      y = drawTitle(doc, page, options, y);
      y = drawMeta(doc, page, options, y + 10, contentWidth);
      y = drawKpis(doc, page, options.panels || [], y + 16, contentWidth);
      y = drawSummary(doc, page, options, y + 18, contentWidth);
      drawWatermark(doc, page);

      const fileName = options.fileName || "sc-reporte-demo.pdf";
      doc.save(fileName);
      return true;
    } catch (error) {
      console.warn("No se pudo generar el PDF con jsPDF.", error);
      return false;
    }
  }

  function drawChrome(doc, page, options, logo, footerLogo) {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, page.width, page.height, "F");

    doc.setDrawColor(...brand.line);
    doc.setLineWidth(1);
    doc.line(page.margin, 86, page.width - page.margin, 86);

    if (logo) {
      drawFittedImage(doc, logo, page.margin, 24, 92, 38);
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(...brand.primary);
      doc.text("SC", page.margin, 54);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...brand.ink);
    doc.text(brand.name, page.width - page.margin, 42, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...brand.muted);
    doc.text(brand.subtitle, page.width - page.margin, 57, { align: "right" });

    doc.setFillColor(...brand.ink);
    doc.rect(0, page.footerTop, page.width, page.height - page.footerTop, "F");
    doc.setFillColor(...brand.accent);
    doc.rect(0, page.footerTop, page.width, 4, "F");

    if (footerLogo) {
      drawFittedImage(doc, footerLogo, page.margin, page.footerTop + 22, 48, 28);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("Elaborado por SC Soluciones Conectadas", page.margin + 64, page.footerTop + 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(210, 228, 238);
    doc.text(`${brand.email}  |  ${brand.phone}  |  ${brand.instagram}`, page.margin + 64, page.footerTop + 45);
    doc.text("Documento demo interno. No reemplaza comprobantes fiscales ni documentación oficial.", page.margin + 64, page.footerTop + 60);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(132, 232, 255);
    doc.text(options.rubro || "Demo SC", page.width - page.margin, page.footerTop + 42, { align: "right" });
  }

  function drawTitle(doc, page, options, y) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.setTextColor(...brand.ink);
    const titleLines = doc.splitTextToSize(options.title || "Reporte ejecutivo", page.width - page.margin * 2);
    doc.text(titleLines, page.margin, y);
    const titleBottom = y + (titleLines.length - 1) * 22;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...brand.muted);
    const generatedAt = new Intl.DateTimeFormat("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());
    doc.text(`Generado: ${generatedAt}`, page.width - page.margin, titleBottom + 18, { align: "right" });

    return titleBottom + 28;
  }

  function drawMeta(doc, page, options, y, contentWidth) {
    const items = [
      ["Rubro", options.rubro],
      ["Dashboard", options.dashboard],
      ["Período", options.period],
      ["Programación", options.schedule],
      ["Destinatarios", options.recipient],
    ].filter((item) => item[1]);
    const gap = 10;
    const cardWidth = (contentWidth - gap) / 2;
    const cardHeight = 54;

    items.forEach(([label, value], index) => {
      const x = page.margin + (index % 2) * (cardWidth + gap);
      const cy = y + Math.floor(index / 2) * (cardHeight + gap);
      drawRounded(doc, x, cy, cardWidth, cardHeight, 8, [247, 251, 253], brand.line);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...brand.muted);
      doc.text(label.toUpperCase(), x + 14, cy + 19);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...brand.ink);
      wrapText(doc, String(value), x + 14, cy + 37, cardWidth - 28, 11);
    });

    return y + Math.ceil(items.length / 2) * (cardHeight + gap);
  }

  function drawKpis(doc, page, panels, y, contentWidth) {
    const titleY = y;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...brand.ink);
    doc.text("Indicadores ejecutivos", page.margin, titleY);

    y += 18;
    const gap = 12;
    const cardWidth = (contentWidth - gap) / 2;
    const cardHeight = 92;

    panels.slice(0, 4).forEach((panel, index) => {
      const x = page.margin + (index % 2) * (cardWidth + gap);
      const cy = y + Math.floor(index / 2) * (cardHeight + gap);
      drawRounded(doc, x, cy, cardWidth, cardHeight, 8, [255, 255, 255], brand.line);

      doc.setFillColor(...brand.soft);
      doc.roundedRect(x + 12, cy + 12, 36, 36, 6, 6, "F");
      doc.setFillColor(...brand.accent);
      doc.circle(x + 30, cy + 30, 7, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...brand.muted);
      doc.text(panel.label || "Indicador", x + 60, cy + 22);

      doc.setFontSize(20);
      doc.setTextColor(...brand.ink);
      doc.text(String(panel.value || "-"), x + 60, cy + 48);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...brand.muted);
      wrapText(doc, panel.detail || panel.trend || "", x + 60, cy + 65, cardWidth - 76, 10);

      const series = Array.isArray(panel.series) ? panel.series : [30, 42, 55, 68, 82];
      drawSparkline(doc, x + 14, cy + 66, 34, 14, series);
    });

    return y + Math.ceil(Math.min(panels.length, 4) / 2) * (cardHeight + gap);
  }

  function drawSummary(doc, page, options, y, contentWidth) {
    drawRounded(doc, page.margin, y, contentWidth, 94, 8, [247, 251, 253], brand.line);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...brand.ink);
    doc.text("Resumen operativo", page.margin + 16, y + 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...brand.muted);
    const summary = [
      `Este reporte consolida indicadores de ${options.rubro || "la demo"} para mostrar cómo SC puede convertir datos operativos en decisiones accionables.`,
      "El flujo completo contempla dashboard, PDF, CSV adjunto, email programado, bitácora de ejecución y alertas ante eventos críticos.",
    ];
    wrapText(doc, summary.join(" "), page.margin + 16, y + 42, contentWidth - 32, 12);

    doc.setFillColor(...brand.primary);
    doc.roundedRect(page.margin + 16, y + 72, 152, 20, 10, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("Demo con datos ficticios", page.margin + 32, y + 86);

    return y + 108;
  }

  function drawWatermark(doc, page) {
    doc.saveGraphicsState();
    if (typeof doc.GState === "function" && typeof doc.setGState === "function") {
      doc.setGState(new doc.GState({ opacity: 0.1 }));
      doc.setTextColor(100, 116, 130);
    } else {
      doc.setTextColor(226, 232, 237);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(94);
    doc.text("DEMO", page.width / 2, page.height / 2 + 28, {
      align: "center",
      angle: 35,
    });
    doc.restoreGraphicsState();
  }

  function drawSparkline(doc, x, y, width, height, series) {
    const max = Math.max(...series);
    const min = Math.min(...series);
    const range = max - min || 1;
    const points = series.map((value, index) => [
      x + (index * width) / Math.max(series.length - 1, 1),
      y + height - ((value - min) / range) * height,
    ]);

    doc.setDrawColor(...brand.accent);
    doc.setLineWidth(1.6);
    points.slice(1).forEach((point, index) => {
      const prev = points[index];
      doc.line(prev[0], prev[1], point[0], point[1]);
    });
  }

  function drawRounded(doc, x, y, width, height, radius, fill, stroke) {
    doc.setFillColor(...fill);
    doc.setDrawColor(...stroke);
    doc.setLineWidth(0.8);
    doc.roundedRect(x, y, width, height, radius, radius, "FD");
  }

  function wrapText(doc, text, x, y, width, lineHeight) {
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, x, y);
    return y + lines.length * lineHeight;
  }

  function drawFittedImage(doc, asset, x, y, maxWidth, maxHeight) {
    if (!asset?.dataUrl || !asset.width || !asset.height) return;

    const scale = Math.min(maxWidth / asset.width, maxHeight / asset.height);
    const width = asset.width * scale;
    const height = asset.height * scale;
    const offsetY = (maxHeight - height) / 2;
    doc.addImage(asset.dataUrl, "PNG", x, y + offsetY, width, height, undefined, "FAST");
  }

  async function loadImageAsset(url) {
    if (!url) return null;

    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const blob = await response.blob();
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const image = await new Promise((resolve, reject) => {
        const element = new Image();
        element.onload = () => resolve(element);
        element.onerror = reject;
        element.src = dataUrl;
      });
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let left = canvas.width;
      let top = canvas.height;
      let right = -1;
      let bottom = -1;

      for (let py = 0; py < canvas.height; py += 1) {
        for (let px = 0; px < canvas.width; px += 1) {
          const alpha = pixels[(py * canvas.width + px) * 4 + 3];
          if (alpha <= 8) continue;
          left = Math.min(left, px);
          top = Math.min(top, py);
          right = Math.max(right, px);
          bottom = Math.max(bottom, py);
        }
      }

      if (right < left || bottom < top) return null;

      const width = right - left + 1;
      const height = bottom - top + 1;
      const cropped = document.createElement("canvas");
      cropped.width = width;
      cropped.height = height;
      cropped.getContext("2d").drawImage(canvas, left, top, width, height, 0, 0, width, height);

      return {
        dataUrl: cropped.toDataURL("image/png"),
        width,
        height,
      };
    } catch (error) {
      return null;
    }
  }

  window.SCReportPdf = { downloadReport };
})();
