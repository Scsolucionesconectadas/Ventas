from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


OUT = Path("assets/img")
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1280, 760
PRIMARY = (0, 96, 192)
ACCENT = (0, 176, 232)
INK = (34, 51, 63)
MUTED = (101, 117, 131)
SURFACE = (255, 255, 255)
SOFT = (235, 248, 255)
GRID = (221, 234, 244)
LINE = (205, 221, 232)
SUCCESS = (29, 143, 105)
WARNING = (184, 117, 24)


def load_font(name, size):
    try:
        return ImageFont.truetype(name, size)
    except OSError:
        return ImageFont.load_default()


FONT_TITLE = load_font("arialbd.ttf", 46)
FONT_SUB = load_font("arial.ttf", 24)
FONT_SMALL = load_font("arial.ttf", 18)
FONT_BOLD = load_font("arialbd.ttf", 22)


def gradient_bg():
    img = Image.new("RGB", (W, H), (245, 249, 252))
    px = img.load()

    for y in range(H):
        for x in range(W):
            t = (x / W) * 0.65 + (y / H) * 0.35
            px[x, y] = (
                int(245 * (1 - t) + 226 * t),
                int(249 * (1 - t) + 246 * t),
                int(252 * (1 - t) + 248 * t),
            )

    d = ImageDraw.Draw(img)
    for x in range(0, W, 48):
        d.line([(x, 0), (x, H)], fill=GRID, width=1)
    for y in range(0, H, 48):
        d.line([(0, y), (W, y)], fill=GRID, width=1)

    return img


def card(d, box, fill=SURFACE, outline=LINE, radius=18):
    d.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=2)


def shadow_card(d, box):
    x1, y1, x2, y2 = box
    d.rounded_rectangle((x1 + 8, y1 + 10, x2 + 8, y2 + 10), radius=18, fill=(205, 221, 232))
    card(d, box)


def header(d, title, subtitle):
    d.rounded_rectangle((54, 44, 1226, 126), radius=20, fill=SURFACE, outline=LINE, width=2)
    d.rounded_rectangle((78, 64, 144, 106), radius=12, fill=INK)
    d.ellipse((94, 76, 116, 98), fill=ACCENT)
    d.arc((100, 62, 142, 104), start=215, end=325, fill=SURFACE, width=7)
    d.text((172, 62), title, font=FONT_TITLE, fill=INK)
    d.text((174, 106), subtitle, font=FONT_SMALL, fill=MUTED)
    d.rounded_rectangle((1012, 70, 1192, 104), radius=14, fill=(229, 247, 254), outline=(150, 219, 244))
    d.text((1034, 77), "SC demo activo", font=FONT_SMALL, fill=PRIMARY)


def mini_chart(d, box, bars, color=ACCENT):
    x1, y1, x2, y2 = box
    step = (x2 - x1) / len(bars)
    for index, value in enumerate(bars):
        bx1 = x1 + index * step + 5
        bx2 = x1 + (index + 1) * step - 5
        by1 = y2 - value * (y2 - y1)
        d.rounded_rectangle((bx1, by1, bx2, y2), radius=5, fill=color if index % 2 else PRIMARY)


def generate_tires():
    img = gradient_bg()
    d = ImageDraw.Draw(img)
    header(d, "Gomería conectada", "Stock, servicios, reposición y caja")
    shadow_card(d, (66, 166, 526, 638))
    d.text((94, 194), "Control de stock", font=FONT_BOLD, fill=INK)

    rows = [
        ("Cubierta 195/55 R16", 14, "OK", SUCCESS),
        ("Cubierta 205/60 R16", 3, "Crítico", WARNING),
        ("Cámara agrícola", 7, "Reponer", PRIMARY),
        ("Válvulas TR414", 42, "OK", SUCCESS),
    ]
    for index, (name, quantity, status, color) in enumerate(rows):
        y = 248 + index * 76
        d.ellipse((96, y, 150, y + 54), fill=(18, 26, 32), outline=(0, 0, 0), width=2)
        d.ellipse((111, y + 15, 135, y + 39), fill=SOFT)
        d.text((170, y + 3), name, font=FONT_BOLD, fill=INK)
        d.text((170, y + 31), f"{quantity} unidades", font=FONT_SMALL, fill=MUTED)
        pill = tuple(min(255, channel + 80) for channel in color)
        d.rounded_rectangle((390, y + 9, 482, y + 43), radius=16, fill=pill)
        d.text((408, y + 17), status, font=FONT_SMALL, fill=(20, 70, 80))

    shadow_card(d, (566, 166, 1214, 638))
    d.text((598, 194), "Turnos y compras sugeridas", font=FONT_BOLD, fill=INK)
    for index, width in enumerate([0.34, 0.52, 0.76, 0.88, 0.64, 0.92]):
        y = 260 + index * 48
        d.rounded_rectangle((602, y, 1130, y + 18), radius=9, fill=(224, 238, 247))
        d.rounded_rectangle((602, y, 602 + int(528 * width), y + 18), radius=9, fill=ACCENT if index % 2 else PRIMARY)

    mini_chart(d, (650, 530, 1130, 604), [0.34, 0.45, 0.52, 0.7, 0.82, 0.74])
    img.save(OUT / "tires-demo.jpg", quality=92)


def generate_survey():
    img = gradient_bg()
    d = ImageDraw.Draw(img)
    header(d, "Agrimensura digital", "Expedientes, campo, planos y ATER")
    shadow_card(d, (66, 166, 766, 638))
    d.text((96, 194), "Mapa de parcela y avance técnico", font=FONT_BOLD, fill=INK)

    for x in range(114, 720, 64):
        d.line((x, 252, x, 594), fill=(206, 224, 235), width=1)
    for y in range(252, 594, 64):
        d.line((114, y, 720, y), fill=(206, 224, 235), width=1)

    parcel = [(230, 322), (438, 270), (612, 352), (556, 518), (306, 568), (176, 446)]
    d.polygon(parcel, fill=(206, 244, 252), outline=PRIMARY)
    d.line(parcel + [parcel[0]], fill=PRIMARY, width=5)
    for x, y in parcel:
        d.ellipse((x - 8, y - 8, x + 8, y + 8), fill=ACCENT, outline=SURFACE, width=3)

    d.rounded_rectangle((462, 438, 688, 486), radius=14, fill=SURFACE, outline=LINE, width=2)
    d.text((486, 452), "Partida validada", font=FONT_SMALL, fill=SUCCESS)

    shadow_card(d, (806, 166, 1214, 638))
    d.text((838, 194), "Conectividad ATER", font=FONT_BOLD, fill=INK)
    rows = [
        ("CUIT cliente", "Validado"),
        ("Partida", "Sin diferencias"),
        ("Nomenclatura", "Pendiente firma"),
        ("Plano PDF", "Listo"),
    ]
    for index, (label, value) in enumerate(rows):
        y = 252 + index * 76
        d.rounded_rectangle((838, y, 1182, y + 50), radius=12, fill=SOFT, outline=LINE)
        d.text((858, y + 7), label, font=FONT_SMALL, fill=MUTED)
        d.text((858, y + 27), value, font=FONT_BOLD, fill=INK)

    mini_chart(d, (862, 548, 1166, 604), [0.55, 0.62, 0.7, 0.82, 0.88], PRIMARY)
    img.save(OUT / "survey-demo.jpg", quality=92)


def generate_logistics():
    img = gradient_bg()
    d = ImageDraw.Draw(img)
    header(d, "Logística y transporte", "Rutas, remitos, flota y alertas")
    shadow_card(d, (66, 166, 1214, 638))
    d.text((100, 194), "Torre de control operativa", font=FONT_BOLD, fill=INK)

    route = [(150, 510), (300, 420), (460, 452), (620, 330), (800, 374), (1006, 270), (1130, 312)]
    d.line(route, fill=PRIMARY, width=8, joint="curve")
    for index, (x, y) in enumerate(route):
        d.ellipse((x - 14, y - 14, x + 14, y + 14), fill=ACCENT if index in (0, 6) else SURFACE, outline=PRIMARY, width=4)

    d.rounded_rectangle((226, 232, 498, 340), radius=18, fill=SURFACE, outline=LINE, width=2)
    d.text((250, 252), "Viaje LT-2048", font=FONT_BOLD, fill=INK)
    d.text((250, 286), "ETA: 14:35", font=FONT_SUB, fill=PRIMARY)
    d.text((250, 318), "Remito y tracking listos", font=FONT_SMALL, fill=MUTED)

    d.rounded_rectangle((720, 460, 1118, 578), radius=18, fill=SURFACE, outline=LINE, width=2)
    d.text((746, 482), "Alertas de flota", font=FONT_BOLD, fill=INK)
    d.text((746, 516), "Desvío detectado: requiere aprobación", font=FONT_SMALL, fill=WARNING)
    d.text((746, 544), "2 entregas priorizadas por SLA", font=FONT_SMALL, fill=MUTED)
    mini_chart(d, (760, 250, 1098, 334), [0.45, 0.56, 0.49, 0.72, 0.82, 0.9])
    img.save(OUT / "logistics-demo.jpg", quality=92)


if __name__ == "__main__":
    generate_tires()
    generate_survey()
    generate_logistics()
