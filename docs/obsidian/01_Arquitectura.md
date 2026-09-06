# Arquitectura

## Enfoque

Sitio estático multipágina sin proceso de build. GitHub Pages sirve HTML, CSS, JavaScript e imágenes desde la rama `main` y la carpeta raíz.

## Páginas comerciales

- `index.html`: landing institucional, resultados posibles, diagnóstico, preguntas frecuentes y acceso a páginas detalladas.
- `servicios/index.html`: capacidades, entregables y demos relacionadas.
- `automatizaciones/index.html`: explorador de procesos, tecnologías y controles operativos.
- `demos/index.html`: catálogo central de demos por rubro.
- `contacto/index.html`: formulario y canales comerciales.
- `contacto/gracias.html`: confirmación posterior al envío, sin indexación.
- `404.html`: recuperación de rutas con identidad SC.

## Demos

- `rubros/medica/`: lógica propia en `assets/js/medical-demo.js`.
- Los demás rubros usan `assets/js/industry-demo.js` y `assets/js/industry-demo-data.js`.
- `assets/js/pdf-report.js` centraliza los PDFs demostrativos con marca SC.
- `assets/js/demo-experience.js` inyecta la barra común, modales, cajón de actividad, recorrido y modo presentación en las doce demos.
- `assets/js/priority-demo.js` extiende únicamente área médica, inmobiliarias y venta de materiales con módulos operativos avanzados definidos por configuración.
- `assets/js/workflow-demo.js` agrega a las doce demos el simulador de procesos, observabilidad y reportería de Fase 5.
- `rubros/talleres/`, `rubros/estudios-contables/` y `rubros/constructoras/` reutilizan el motor común y declaran metadatos SEO estáticos propios.

## Código compartido

- `assets/css/base.css`: sistema visual y responsive común.
- `assets/js/app.js`: catálogo, filtros, modal y diagnóstico de la home.
- `assets/js/commercial-pages.js`: dropdowns, explorador de automatizaciones y preparación del formulario.
- `assets/js/motion.js`: animación progresiva con GSAP y fallback respetando reducción de movimiento.
- `assets/js/demo-catalog.js`: fuente única del catálogo público.
- `assets/js/demo-experience.js`: capa transversal de experiencia comercial sin alterar los motores de datos de cada rubro.
- `assets/js/priority-demo.js`: configuración y comportamiento compartido de Fase 4 para KPI, tablas, prioridades, formularios, estados, PDF y email simulado.
- `assets/js/workflow-demo.js`: configuración por rubro, máquina de estados visual, reintentos, aprobación, métricas, programación, email demo, PDF e historial.

## Flujo de experiencia en demos

Cada página de `rubros/*/index.html` carga primero su motor de negocio y después las extensiones compartidas. En las tres demos prioritarias, `priority-demo.js` agrega módulos avanzados; luego `workflow-demo.js` incorpora Automatizaciones antes de que `demo-experience.js` construya el índice de búsqueda sobre el DOM hidratado. Los cambios de sesión viven solo en memoria; “Reiniciar demo” usa `sessionStorage` únicamente para confirmar la recarga y vuelve a los datos ficticios originales.

## Flujo de Fase 4

`motor de rubro` → `priority-demo.js` si aplica → `workflow-demo.js` → `demo-experience.js` → `motion.js`

La extensión se activa mediante `data-demo-slug`, usa datos ficticios embebidos y reutiliza `window.SCReportPdf`. No crea backend, persistencia, envío real de email ni dependencias nuevas.

## Flujo de Fase 5

`Disparador → Validación → Acción → Aprobación humana → Reporte → Bitácora`

El simulador mantiene un estado por página, permite éxito o falla temporal, habilita reintentos y exige aprobación antes de completar el reporte. Los filtros tipo Grafana y la programación solo actualizan la interfaz; el PDF se genera localmente con `window.SCReportPdf` y la vista previa de email no realiza solicitudes de red.

## Flujo de contacto

`contacto/index.html` → `formsubmit.co` → email público de SC → `contacto/gracias.html`

La integración no agrega backend ni secretos al repositorio. El primer envío requiere confirmación manual desde la casilla receptora.

## Rutas públicas

Todas las referencias usan rutas relativas para funcionar en la subruta `/Ventas/`. Los metadatos canónicos y el sitemap usan `https://scsolucionesconectadas.github.io/Ventas/`.

## Publicación y SEO de Fase 6

- Las diecisiete páginas indexables definen en HTML título, descripción, canonical, Open Graph, Twitter Card, tema e imagen representativa.
- `index.html` agrega JSON-LD con un grafo `Organization` y `WebSite`; solo declara datos públicos verificables de SC.
- `sitemap.xml` enumera las mismas diecisiete URL y registra `lastmod`; `presentacion/`, `404.html` y `contacto/gracias.html` quedan fuera del índice.
- `assets/js/analytics.js` lee opcionalmente `data-cloudflare-token` desde su propia etiqueta. Sin token publica el estado `SCAnalytics.enabled=false` y no carga recursos externos.
- `presentacion/index.html` es una página interna con `noindex`, ocho diapositivas, notas, hash navegable, teclado, gestos táctiles, pantalla completa e impresión mediante CSS.
- `scripts/phase6.spec.js` controla la correspondencia entre páginas, canonical, imágenes sociales, sitemap, analítica, datos estructurados y presentación.

## Extensión de rubros de Fase 7

Los nuevos rubros se incorporan como configuración en `assets/js/industry-demo-data.js`, catálogo en `assets/js/demo-catalog.js` y workflows en `assets/js/workflow-demo.js`. Cada página carga las mismas capas de experiencia, reportería y motion que los rubros existentes. `scripts/phase7.spec.js` valida catálogo, módulos, altas, chatbot, PDF, workflows, responsive y accesibilidad.
