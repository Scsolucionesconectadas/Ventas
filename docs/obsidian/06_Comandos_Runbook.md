# Comandos Runbook

## Servidor local

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Abrir:

```text
http://127.0.0.1:4173/index.html
```

## Validaciones

```bash
node --check assets/js/app.js
node --check assets/js/motion.js
node --check assets/js/medical-demo.js
node --check assets/js/demo-catalog.js
node --check assets/js/industry-demo-data.js
node --check assets/js/industry-demo.js
node --check assets/js/pdf-report.js
python -m py_compile scripts/optimize_images.py
git diff --check
```

Validación estructural para las plantillas estáticas con contenido hidratado por JavaScript:

```bash
npx --yes html-validate@11.14.0 --rule=doctype-style:off --rule=void-style:off --rule=prefer-native-element:off --rule=no-inline-style:off --rule=empty-heading:off --rule=text-content:off index.html 404.html demos/index.html "rubros/*/index.html"
```

## Optimización de imágenes

Requiere Pillow y conserva los JPG como fuentes:

```bash
python scripts/optimize_images.py
```

El script genera WebP con ancho máximo de `1600 px`, calidad `84` y nombres equivalentes a las fuentes.

## GitHub Pages

```bash
git status --short
git add .
git commit -m "feat: landing sc y demos por rubro"
git push origin main
```

Configuración en GitHub:

```text
Settings > Pages > Build and deployment > Source: Deploy from a branch
Branch: main
Folder: / (root)
```

URL prevista:

```text
https://scsolucionesconectadas.github.io/Ventas/
```
