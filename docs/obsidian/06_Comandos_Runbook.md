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
node --check assets/js/commercial-pages.js
node --check assets/js/motion.js
node --check assets/js/medical-demo.js
node --check assets/js/demo-catalog.js
node --check assets/js/demo-experience.js
node --check assets/js/priority-demo.js
node --check assets/js/workflow-demo.js
node --check assets/js/analytics.js
node --check assets/js/presentation.js
node --check assets/js/industry-demo-data.js
node --check assets/js/industry-demo.js
node --check assets/js/pdf-report.js
node --check assets/js/ui-enhancements.js
python -m py_compile scripts/optimize_images.py
git diff --check
```

Validación estructural para las plantillas estáticas con contenido hidratado por JavaScript:

```bash
npx --yes html-validate@11.14.0 --rule=doctype-style:off --rule=void-style:off --rule=prefer-native-element:off --rule=no-inline-style:off --rule=empty-heading:off --rule=text-content:off index.html 404.html demos/index.html servicios/index.html automatizaciones/index.html contacto/index.html contacto/gracias.html presentacion/index.html "rubros/*/index.html"
```

Regresión Playwright de Fase 3 usando Microsoft Edge instalado, sin agregar paquetes al repositorio:

```powershell
$root = Get-ChildItem "$env:LOCALAPPDATA/npm-cache/_npx" -Directory | Where-Object { $p = Join-Path $_.FullName 'node_modules/playwright/package.json'; (Test-Path $p) -and ((Get-Content -LiteralPath $p -Raw | ConvertFrom-Json).version -eq '1.55.0') } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$env:NODE_PATH = Join-Path $root.FullName 'node_modules'
npx --yes playwright@1.55.0 test scripts/phase3.spec.js --reporter=line --workers=1
```

Regresión Playwright de Fase 4 para área médica, inmobiliarias y venta de materiales:

```powershell
$root = Get-ChildItem "$env:LOCALAPPDATA/npm-cache/_npx" -Directory | Where-Object { $p = Join-Path $_.FullName 'node_modules/playwright/package.json'; (Test-Path $p) -and ((Get-Content -LiteralPath $p -Raw | ConvertFrom-Json).version -eq '1.55.0') } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$env:NODE_PATH = Join-Path $root.FullName 'node_modules'
npx --yes playwright@1.55.0 test scripts/phase4.spec.js --reporter=line --workers=1
```

Regresión Playwright de Fase 5 para las doce demos:

```powershell
$root = Get-ChildItem "$env:LOCALAPPDATA/npm-cache/_npx" -Directory | Where-Object { $p = Join-Path $_.FullName 'node_modules/playwright/package.json'; (Test-Path $p) -and ((Get-Content -LiteralPath $p -Raw | ConvertFrom-Json).version -eq '1.55.0') } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$env:NODE_PATH = Join-Path $root.FullName 'node_modules'
npx --yes playwright@1.55.0 test scripts/phase5.spec.js --reporter=line --workers=1
```

Regresión Playwright de Fase 6 para SEO, sitemap, analítica y presentación:

```powershell
$root = Get-ChildItem "$env:LOCALAPPDATA/npm-cache/_npx" -Directory | Where-Object { $p = Join-Path $_.FullName 'node_modules/playwright/package.json'; (Test-Path $p) -and ((Get-Content -LiteralPath $p -Raw | ConvertFrom-Json).version -eq '1.55.0') } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$env:NODE_PATH = Join-Path $root.FullName 'node_modules'
npx --yes playwright@1.55.0 test scripts/phase6.spec.js --reporter=line --workers=1
```

Regresión Playwright de Fase 7 para Talleres, Estudios Contables y Constructoras:

```powershell
$root = Get-ChildItem "$env:LOCALAPPDATA/npm-cache/_npx" -Directory | Where-Object { $p = Join-Path $_.FullName 'node_modules/playwright/package.json'; (Test-Path $p) -and ((Get-Content -LiteralPath $p -Raw | ConvertFrom-Json).version -eq '1.55.0') } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$env:NODE_PATH = Join-Path $root.FullName 'node_modules'
npx --yes playwright@1.55.0 test scripts/phase7.spec.js --reporter=line --workers=1
```

Regresión unificada antes de publicar:

```powershell
$root = Get-ChildItem "$env:LOCALAPPDATA/npm-cache/_npx" -Directory | Where-Object { $p = Join-Path $_.FullName 'node_modules/playwright/package.json'; (Test-Path $p) -and ((Get-Content -LiteralPath $p -Raw | ConvertFrom-Json).version -eq '1.55.0') } | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$env:NODE_PATH = Join-Path $root.FullName 'node_modules'
npx --yes playwright@1.55.0 test scripts/phase3.spec.js scripts/phase4.spec.js scripts/phase5.spec.js scripts/phase6.spec.js scripts/phase7.spec.js scripts/ui-enhancements.spec.js --reporter=line --workers=1
```

Las pruebas de PDF esperan `download.path()` y las auditorías visuales esperan opacidad final `1` para no medir una transición incompleta.

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

## Activación de FormSubmit

1. Publicar la página `contacto/index.html`.
2. Completar un primer envío real desde la web pública.
3. Abrir el email de activación recibido en `contacto.solucionesconectadas@gmail.com`.
4. Confirmar el formulario y repetir un envío de prueba.
5. Verificar recepción, reCAPTCHA y redirección a `contacto/gracias.html`.

No desactivar reCAPTCHA ni quitar el campo `_honey` durante la publicación.

## Activación opcional de Cloudflare Web Analytics

1. Crear el sitio en Cloudflare Web Analytics.
2. Copiar el token público entregado por Cloudflare.
3. Agregar el atributo `data-cloudflare-token` y usar como valor el token público entregado por Cloudflare en las diecisiete páginas indexables.
4. Ejecutar `scripts/phase6.spec.js` adaptando la expectativa de analítica a estado activo.
5. Publicar y confirmar en Network que carga `static.cloudflareinsights.com/beacon.min.js` una sola vez.

No agregar claves de API ni credenciales privadas al repositorio.
