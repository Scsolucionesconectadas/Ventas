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
- `assets/js/demo-experience.js` inyecta la barra común, modales, cajón de actividad, recorrido y modo presentación en las catorce demos.
- `assets/js/priority-demo.js` extiende únicamente área médica, inmobiliarias y venta de materiales con módulos operativos avanzados definidos por configuración.
- `assets/js/workflow-demo.js` agrega a las catorce demos el simulador de procesos, observabilidad y reportería de Fase 5.
- `rubros/talleres/`, `rubros/estudios-contables/` y `rubros/constructoras/` reutilizan el motor común y declaran metadatos SEO estáticos propios.

## Código compartido

- `assets/css/base.css`: sistema visual y responsive común.
- `assets/js/app.js`: catálogo, filtros, modal y diagnóstico de la home.
- `assets/js/commercial-pages.js`: dropdowns, explorador de automatizaciones y preparación del formulario.
- `assets/js/site-navigation.js`: estado de la barra comercial, menú responsive, cierre por enlace, clic exterior o `Escape`, y cambio visual al desplazarse.
- `assets/js/n8n-lab.js`: simulador comercial central con seis workflows, máquina de estados, resultados por proceso, inspector y bitácora local.
- `assets/js/motion.js`: animación progresiva con GSAP y fallback respetando reducción de movimiento.
- `assets/js/reporting-experience.js`: mejora progresivamente la reportería de las catorce demos, carga Chart.js `4.5.1` bajo demanda y mantiene resumen, métricas y mini gráficos como fallback.
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

## Navegación comercial de Fase 10

Las seis páginas comerciales comparten el mismo contrato HTML: marca, botón hamburguesa, `nav#primary-navigation`, cinco accesos directos y un CTA. En escritorio el menú permanece visible; a partir de `1120 px` se presenta como panel desplegable. La lógica vive en `site-navigation.js` y no modifica las demos de rubro.

`topbar → botón responsive → navegación directa → CTA de contacto`

No se incorporan React, Tailwind, shadcn, Base UI, Lenis ni Swiper. Esas librerías fueron identificadas en Click, pero la mejora se implementa con CSS, JavaScript, Lucide y GSAP ya disponibles para conservar despliegue directo en GitHub Pages.

## Centro de análisis de reportería

Los motores `industry-demo.js` y `medical-demo.js` publican `sc:reports-rendered` después de reconstruir sus métricas. `reporting-experience.js` escucha ese evento, incorpora controles nativos y conserva el estado visual en el propio tablero.

`métricas del rubro → período → comparación → Chart.js → lectura ejecutiva → próxima revisión`

Chart.js no se descarga al abrir la demo: se solicita desde una URL fijada cuando el tablero entra en el viewport. El `canvas` incluye nombre accesible, `prefers-reduced-motion` desactiva su animación y un timeout activa una vista simplificada si el recurso remoto falla. No se consultan datos externos ni se persiste información.

## Publicación y SEO de Fase 6

- Las veinte páginas indexables definen en HTML título, descripción, canonical, Open Graph, Twitter Card, tema e imagen representativa.
- `index.html` agrega JSON-LD con un grafo `Organization` y `WebSite`; solo declara datos públicos verificables de SC.
- `sitemap.xml` enumera las mismas veinte URL y registra `lastmod`; `presentacion/`, `404.html` y `contacto/gracias.html` quedan fuera del índice.
- `assets/js/analytics.js` lee opcionalmente `data-cloudflare-token` desde su propia etiqueta. Sin token publica el estado `SCAnalytics.enabled=false` y no carga recursos externos.
- `presentacion/index.html` es una página interna con `noindex`, ocho diapositivas, notas, hash navegable, teclado, gestos táctiles, pantalla completa e impresión mediante CSS.
- `scripts/phase6.spec.js` controla la correspondencia entre páginas, canonical, imágenes sociales, sitemap, analítica, datos estructurados y presentación.

## Extensión de rubros de Fase 7

Los nuevos rubros se incorporan como configuración en `assets/js/industry-demo-data.js`, catálogo en `assets/js/demo-catalog.js` y workflows en `assets/js/workflow-demo.js`. Cada página carga las mismas capas de experiencia, reportería y motion que los rubros existentes. `scripts/phase7.spec.js` valida catálogo, módulos, altas, chatbot, PDF, workflows, responsive y accesibilidad.

## Soluciones por problema de Fase 8

- `demos/index.html` ofrece una entrada visual por necesidad y conserva el catálogo completo filtrable mediante los grupos declarados en `assets/js/demo-catalog.js`.
- `rubros/gestion-pyme/index.html` y `rubros/turnos/index.html` reutilizan el motor común; sus datos, etapas, reportes y recomendaciones viven en `assets/js/industry-demo-data.js`.
- `assets/js/industry-demo.js` renderiza opcionalmente `insights` con evidencia y enlace a la vista donde se resuelve cada prioridad.
- `rubros/gastronomia/index.html` añade la vista `reservas`; `assets/js/gastronomy-reservations.js` mantiene disponibilidad, alternativas, espera y estados solo en memoria del navegador.
- `assets/js/workflow-demo.js` configura dos procesos para las nuevas demos y reemplaza el segundo proceso gastronómico por reserva, disponibilidad y confirmación.
- `scripts/phase8.spec.js` valida catálogo, altas, workflows, disponibilidad gastronómica, estados terminales, responsive y accesibilidad.

## Identidad comercial y laboratorio de Fase 9

- `nosotros/index.html` incorpora una ruta institucional con método, criterios de trabajo, escenarios de aplicación y CTA.
- Servicios, Automatizaciones, Nosotros y Contacto reutilizan `commercial-media-hero` con imágenes locales y una superposición sólida; Demos conserva su hero orientado a problemas.
- `assets/js/n8n-lab.js` modela `ejecución → error/reintento → aprobación → finalización` únicamente en memoria del navegador.
- `assets/css/base.css` asigna variables de acento mediante `data-demo-slug`; la estructura y la lógica de negocio siguen compartidas.
- `assets/js/motion.js` limita la entrada inicial al primer viewport y usa `IntersectionObserver` para animar bloques secundarios al entrar en pantalla.
- `scripts/phase9.spec.js` valida las páginas comerciales, ambos escenarios del laboratorio y la aplicación del sistema visual en las catorce demos.

## Resultados del laboratorio de automatizaciones

Cada definición de flujo contiene payload, seis nodos y un resultado compuesto por título, resumen, tres métricas y cuatro datos operativos. La vista enlaza ese resultado con la máquina de estados local:

`vista previa → procesando → aprobación pendiente → resultado generado`

El escenario alternativo agrega `error controlado → reintento` sin repetir nodos ya resueltos. No existe persistencia, backend ni conexión con n8n; todo el estado vive en el navegador.

## Perfil de la página Nosotros

La presentación personal se mantiene dentro de `nosotros/index.html` y usa `assets/img/sc-profile.webp`, una versión WebP de `900x1125` generada a partir de la fotografía entregada por el usuario. La sección no requiere JavaScript propio: reutiliza `motion.js`, Lucide y los puntos de corte compartidos de `base.css`.

## Evidencia visual de Servicios y resumen de Contacto

`servicios/index.html` conserva una página estática y referencia cinco imágenes locales `assets/img/service-*-preview.webp`. Son capturas optimizadas de interfaces que ya existen en Gestión PyME, el laboratorio de automatizaciones, el asistente, la reportería médica y el selector de demos.

`contacto/index.html` continúa enviando directamente a FormSubmit. `bindContactPreview()` en `assets/js/commercial-pages.js` solo lee los campos del formulario, calcula el avance sobre controles obligatorios visibles y actualiza nodos mediante `textContent`; no guarda datos ni crea una segunda vía de envío.
