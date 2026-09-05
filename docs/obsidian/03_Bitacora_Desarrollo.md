# Bitácora de Desarrollo

## 2026-09-05 - Mejoras de landing, catálogo de demos y PDFs con marca

**Cambios realizados:**
- Se convirtió el acceso a demos en una página separada `demos/index.html` con catálogo completo de 9 rubros.
- Se agregaron demos funcionales para gomerías, agrimensores y logística/transporte usando el motor configurable.
- Se creó `assets/js/demo-catalog.js` para centralizar tarjetas, links, imágenes y módulos de cada rubro.
- Se agregó `assets/js/pdf-report.js` con jsPDF `4.2.1` por CDN para generar PDFs con encabezado, logo SC, cuerpo ejecutivo, indicadores y pie institucional.
- Se mejoró la landing con topbar a ancho completo, servicios clicables con modal flotante, KPI corregido, contacto más legible e icono estable de Instagram.
- Se ajustó el espaciado de formularios y fichas de detalle en demos.
- Se agregaron logos SC adicionales y tres imágenes generadas localmente para los rubros nuevos.
- Se limpió el motor de animaciones para evitar warnings de GSAP cuando una página no contiene todos los selectores.

**Archivos modificados:**
- `README.md`
- `index.html`
- `demos/index.html`
- `sitemap.xml`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/demo-catalog.js`
- `assets/js/pdf-report.js`
- `assets/js/industry-demo-data.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/js/motion.js`
- `assets/img/sc-color.png`
- `assets/img/sc-white.png`
- `assets/img/sc-imagotipo-dark.png`
- `assets/img/tires-demo.jpg`
- `assets/img/survey-demo.jpg`
- `assets/img/logistics-demo.jpg`
- `rubros/gomerias/index.html`
- `rubros/agrimensores/index.html`
- `rubros/logistica/index.html`
- `rubros/medica/index.html`
- `rubros/hoteleria/index.html`
- `rubros/inmobiliarias/index.html`
- `rubros/materiales/index.html`
- `rubros/gastronomia/index.html`
- `rubros/educacion/index.html`
- `scripts/generate_demo_images.py`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/02_Decisiones_Tecnicas.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/04_Errores_y_Soluciones.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/10_UI_UX_Diseno.md`
- `docs/obsidian/11_Automatizaciones_n8n.md`
- `docs/obsidian/13_Deploy_Infraestructura.md`

**Validaciones realizadas:**
- `node --check assets/js/app.js`: sin errores.
- `node --check assets/js/demo-catalog.js`: sin errores.
- `node --check assets/js/pdf-report.js`: sin errores.
- `node --check assets/js/motion.js`: sin errores.
- `node --check assets/js/medical-demo.js`: sin errores.
- `node --check assets/js/industry-demo-data.js`: sin errores.
- `node --check assets/js/industry-demo.js`: sin errores.
- Servidor local `127.0.0.1:4173`: landing, `/demos/` y las 9 demos respondieron `200`.
- Playwright desktop/mobile: landing sin overflow, topbar a ancho útil completo, preview de 3 demos, KPI sin "marca consistente", email en una línea e Instagram visible.
- Playwright: `/demos/` renderizó 9 rubros sin imágenes rotas ni overflow.
- Playwright: gomerías, agrimensores y logística cargaron con pestañas, registros, imágenes y helper PDF activo.
- Playwright: generación PDF con jsPDF verificada con `ok: true` y nombre de archivo esperado.
- Consola del navegador: sin errores ni warnings después de limpiar selectores de GSAP.

**Pendientes detectados:**
- Hacer commit y push de esta iteración cuando se autorice.
- Activar GitHub Pages desde Settings del repositorio si todavía no está activo.

## 2026-09-05 - Preparación de GitHub Pages y contacto público

**Cambios realizados:**
- Se definió GitHub Pages simple como canal de publicación, usando rama `main` y carpeta `/`.
- Se incorporaron datos públicos de contacto: email, WhatsApp/teléfono e Instagram.
- Se mejoró el copy comercial con foco B2B y el slogan "Tu operación conectada: sistemas, automatizaciones e inteligencia para crecer sin fricción."
- Se agregó un diagnóstico express interactivo que recomienda una ruta de demo y prepara el enlace de WhatsApp.
- Se agregaron metadatos sociales, canonical, `.nojekyll`, `robots.txt`, `sitemap.xml` y `.gitignore`.
- Se actualizó el versionado de assets a `20260905-pages`.

**Archivos modificados:**
- `README.md`
- `index.html`
- `.gitignore`
- `.nojekyll`
- `robots.txt`
- `sitemap.xml`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/motion.js`
- `rubros/medica/index.html`
- `rubros/hoteleria/index.html`
- `rubros/inmobiliarias/index.html`
- `rubros/materiales/index.html`
- `rubros/gastronomia/index.html`
- `rubros/educacion/index.html`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/02_Decisiones_Tecnicas.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/04_Errores_y_Soluciones.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/06_Comandos_Runbook.md`
- `docs/obsidian/10_UI_UX_Diseno.md`
- `docs/obsidian/13_Deploy_Infraestructura.md`

**Validaciones realizadas:**
- `node --check assets/js/app.js`: sin errores.
- `node --check assets/js/motion.js`: sin errores.
- `node --check assets/js/medical-demo.js`: sin errores.
- `node --check assets/js/industry-demo-data.js`: sin errores.
- `node --check assets/js/industry-demo.js`: sin errores.
- `git diff --check`: sin errores; solo advertencia esperada de conversión LF/CRLF en `README.md`.
- Búsqueda de textos rotos, mojibake y typos comunes: sin coincidencias.
- Servidor local `127.0.0.1:4173`: landing, seis demos, `robots.txt` y `sitemap.xml` responden `200`.
- Playwright MCP desktop/mobile: landing sin overflow, imágenes locales cargadas, CTA visible, diagnóstico interactivo correcto y demo educación con reportes.

**Pendientes detectados:**
- Se hizo commit y push a `origin/main` con hash `438b3a7`.
- `gh auth status` indicó que GitHub CLI no está autenticado, por lo que no se pudo activar Pages por API desde la terminal.
- La URL `https://maicolandresb123.github.io/Mokups_Ventas/` respondió `404` después del push; falta activar Pages en Settings del repositorio.

## 2026-09-04 - Mejoras de reportería e imágenes locales

**Cambios realizados:**
- Se reemplazaron imágenes remotas por assets locales para landing, hero médico y tarjetas/heros de rubros.
- Se cambió la imagen de educación por una escena más funcional de capacitación con estudiantes adultos.
- Se agregó una vista "Reportes" en todas las demos con paneles tipo Grafana, mini gráficos, PDF demo, email demo, entregas programadas y bitácora.
- Se amplió la landing con servicios de reportería, Grafana, PDFs, emails programados y un bloque comercial de reporterías automatizadas.
- Se extendió la demo guiada para incluir el momento de reportería.

**Archivos modificados:**
- `README.md`
- `index.html`
- `assets/css/base.css`
- `assets/js/industry-demo-data.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/js/motion.js`
- `rubros/medica/index.html`
- `rubros/hoteleria/index.html`
- `rubros/inmobiliarias/index.html`
- `rubros/materiales/index.html`
- `rubros/gastronomia/index.html`
- `rubros/educacion/index.html`
- `assets/img/landing-hero.jpg`
- `assets/img/medical-hero.jpg`
- `assets/img/*-demo.jpg`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/02_Decisiones_Tecnicas.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/04_Errores_y_Soluciones.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/10_UI_UX_Diseno.md`
- `docs/obsidian/11_Automatizaciones_n8n.md`

**Validaciones realizadas:**
- `node --check assets/js/app.js`: sin errores.
- `node --check assets/js/motion.js`: sin errores.
- `node --check assets/js/medical-demo.js`: sin errores.
- `node --check assets/js/industry-demo-data.js`: sin errores.
- `node --check assets/js/industry-demo.js`: sin errores.
- Playwright con servidor local `127.0.0.1:4173`: imágenes locales cargadas, landing sin overflow, reportes en las seis demos, envío de email demo, descarga de PDF demo y mobile sin overflow horizontal.

**Pendientes detectados:**
- Revisar licencias/atribución o crear imágenes propias/generadas antes de publicar formalmente.
- Definir datos reales de contacto comercial y canal de publicación.

## 2026-09-04 - Demos funcionales para rubros restantes

**Cambios realizados:**
- Se agregaron demos funcionales para hotelería, inmobiliarias, venta de materiales, gastronomía y educación.
- Se creó un motor común de demos por configuración con métricas, registros, detalle, formulario rápido, pipeline, tareas, recursos y asistente simulado.
- Se enlazaron todas las demos desde la landing y se dejó el filtro "Roadmap" con estado vacío cuando todas las demos iniciales están listas.
- Se reforzó el menú flotante de acciones para que no se cierre por el scroll automático del navegador al presionar botones cerca del borde inferior.
- Se ajustó el texto del formulario genérico para evitar errores de concordancia entre rubros.

**Archivos modificados:**
- `index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/industry-demo-data.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/js/motion.js`
- `rubros/hoteleria/index.html`
- `rubros/inmobiliarias/index.html`
- `rubros/materiales/index.html`
- `rubros/gastronomia/index.html`
- `rubros/educacion/index.html`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/02_Decisiones_Tecnicas.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/04_Errores_y_Soluciones.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/10_UI_UX_Diseno.md`

**Validaciones realizadas:**
- `node --check assets/js/app.js`: sin errores.
- `node --check assets/js/motion.js`: sin errores.
- `node --check assets/js/medical-demo.js`: sin errores.
- `node --check assets/js/industry-demo-data.js`: sin errores.
- `node --check assets/js/industry-demo.js`: sin errores.
- Playwright con servidor local `127.0.0.1:4173`: landing con 6 demos listas, filtro "Listos", estado vacío de "Roadmap", carga de los 5 rubros nuevos, logo, métricas, registros, menú flotante, formulario, demo guiada y vista mobile sin overflow horizontal.

**Pendientes detectados:**
- Definir canal de publicación y datos reales de contacto.
- Reemplazar imágenes remotas por assets propios o generados antes de usar la landing en presentaciones sin internet.

## 2026-09-04 - Landing principal responsive de SC

**Cambios realizados:**
- Se transformó `index.html` en la landing principal de Soluciones Conectadas.
- Se agregaron secciones de servicios, impacto, demos por rubro, automatizaciones, proceso, método comercial y CTA.
- Se agregó apartado comercial para n8n, Node-RED, APIs, webhooks, bots y dashboards.
- Se ajustó la navegación mobile para mostrar controles compactos y un dropdown usable dentro del viewport.
- Se extendieron las animaciones y el spotlight a servicios, automatizaciones, proceso y métricas de impacto.

**Archivos modificados:**
- `index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/motion.js`
- `README.md`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/02_Decisiones_Tecnicas.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/10_UI_UX_Diseno.md`
- `docs/obsidian/11_Automatizaciones_n8n.md`

**Validaciones realizadas:**
- `node --check assets/js/app.js`: sin errores.
- `node --check assets/js/motion.js`: sin errores.
- `node --check assets/js/medical-demo.js`: sin errores.
- Playwright desktop `1440x1000`: landing con título correcto, secciones presentes, logo cargado, GSAP activo, filtros de demos funcionales y sin overflow horizontal.
- Playwright mobile `390x844`: landing sin overflow horizontal, hero visible en primera pantalla, navegación compacta, dropdown dentro del viewport y tarjetas visibles.

**Pendientes detectados:**
- Definir datos reales de contacto comercial antes de publicar la landing.
- Definir si las imágenes remotas se reemplazarán por assets propios o generados.

## 2026-09-04 - Corrección de menús, acentos y animaciones GSAP

**Cambios realizados:**
- Se corrigió el menú de tres puntos de los turnos con un menú flotante que no queda detrás de la agenda.
- Se agregó GSAP por CDN para animaciones de entrada, `stagger`, contadores animados y microinteracciones.
- Se agregó `assets/js/motion.js` como capa compartida de motion.
- Se corrigieron acentos en textos visibles del hub, la demo médica, el chatbot y la documentación.
- Se mejoraron los desplegables con mayor contraste, foco, profundidad visual y animación.

**Archivos modificados:**
- `index.html`
- `rubros/medica/index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/medical-demo.js`
- `assets/js/motion.js`
- `README.md`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/02_Decisiones_Tecnicas.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/04_Errores_y_Soluciones.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/10_UI_UX_Diseno.md`

**Validaciones realizadas:**
- `node --check assets/js/app.js`: sin errores.
- `node --check assets/js/medical-demo.js`: sin errores.
- `node --check assets/js/motion.js`: sin errores.
- Playwright desktop `1440x1000`: hub sin overflow horizontal, logo cargado, GSAP cargado, dropdown principal funcional y 6 tarjetas visibles.
- Playwright desktop `1440x1000`: demo médica sin overflow horizontal; menú de tres puntos renderizado como flotante en `body`, con `z-index: 999` y acciones clickeables.
- Playwright: acción "Enviar recordatorio" probada con toast y cierre correcto del menú.
- Playwright: acción "Marcar admisión" probada, actualizando el estado del turno a "Admitido".
- Playwright: demo guiada probada desde "Presentar"; recorre chatbot, turnero, historia clínica y termina en obras sociales.
- Playwright mobile `390x844`: hub sin overflow horizontal, dropdown adaptado a posición estática y tarjetas visibles.
- Playwright mobile `390x844`: menú flotante de turnos dentro del viewport, en `body`, con `z-index: 999`, recordatorio funcional y cierre correcto.

**Pendientes detectados:**
- Revisar si conviene mantener GSAP desde CDN o descargarlo como asset local antes de una presentación sin internet.

## 2026-09-04 - Profesionalización visual con marca SC

**Cambios realizados:**
- Se incorporó el logo SC en assets locales recortados para navegación, superficies amplias y favicon.
- Se actualizó la paleta a tinta SC, azul SC y cian SC.
- Se agregaron animaciones CSS, estados hover/focus, superficies tipo glass sobrias y transiciones entre vistas.
- Se agregaron dropdowns en el hub, tarjetas de rubros, presentación de demo médica y acciones por turno.
- Se mejoraron formularios, selects, tabs, métricas, sidebar, hero médico, chatbot y toast.

**Archivos modificados:**
- `README.md`
- `index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/medical-demo.js`
- `assets/img/sc-imagotipo.png`
- `assets/img/sc-symbol.png`
- `assets/img/sc-favicon.png`
- `rubros/medica/index.html`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/02_Decisiones_Tecnicas.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/04_Errores_y_Soluciones.md`
- `docs/obsidian/10_UI_UX_Diseno.md`

**Validaciones realizadas:**
- `node --check assets/js/app.js`: sin errores.
- `node --check assets/js/medical-demo.js`: sin errores.
- Playwright desktop `1440x1000`: hub y demo médica sin overflow horizontal.
- Playwright mobile `390x844`: hub y demo médica sin overflow horizontal.
- Playwright: logo cargado, dropdowns funcionales, alta de turno, acciones de fila, filtros y chatbot.

**Pendientes detectados:**
- Hacer commit y push cuando se autorice subir los cambios al repositorio remoto.
- Crear assets propios por rubro para no depender de imágenes remotas.

## 2026-09-04 - Base inicial de mockups comerciales

**Cambios realizados:**
- Se creó el hub principal de rubros.
- Se agregó la primera demo funcional para área médica.
- Se implementaron acciones de agenda, búsqueda de pacientes, historial clínico, filtro de consultas, obras sociales y chatbot simulado.
- Se definió un sistema visual base reutilizable para próximos rubros.

**Archivos modificados:**
- `README.md`
- `index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/medical-demo.js`
- `rubros/medica/index.html`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/10_UI_UX_Diseno.md`

**Validaciones realizadas:**
- `node --check assets/js/app.js`: sin errores.
- `node --check assets/js/medical-demo.js`: sin errores.
- Playwright con servidor local temporal en `127.0.0.1:4173`: hub y demo médica cargan correctamente.
- Playwright mobile `390x844`: sin overflow horizontal en hub ni demo médica.
- Playwright desktop `1440x1000`: sin overflow horizontal en hub ni demo médica.
- Interacciones probadas: filtro de rubros, alta de turno, cambio de vista, filtro de pacientes, filtro de consultas y chatbot.

**Pendientes detectados:**
- Definir el siguiente rubro a construir: inmobiliarias, hotelería o venta de materiales.
- Hacer commit y push cuando se autorice subir los cambios al repositorio remoto.
## 2026-09-05 - Corrección de navegación local de demos

**Cambios realizados:**
- Se reemplazaron las rutas dinámicas a carpetas por rutas explícitas a cada `index.html`.
- Se renovó la versión de caché de los scripts del catálogo en la landing y en la página de demos.

**Archivos modificados:**
- `assets/js/demo-catalog.js`
- `index.html`
- `demos/index.html`

**Validaciones realizadas:**
- `node --check assets/js/demo-catalog.js`: sin errores.
- `node --check assets/js/app.js`: sin errores.
- Verificación de rutas: 9 enlaces explícitos, 9 archivos existentes y 0 rutas faltantes.
- Playwright: Gomerías y Gastronomía abrieron desde el catálogo con su URL `index.html` correcta.
- Consola del navegador: 0 errores y 0 advertencias.
- La navegación automatizada mediante `file://` no se ejecutó porque Playwright bloquea ese protocolo por seguridad; la compatibilidad local quedó cubierta por la validación de rutas explícitas.

**Pendientes detectados:**
- Ninguno relacionado con esta corrección.

## 2026-09-05 - Simplificación del cierre en detalles de servicios

**Cambios realizados:**
- Se eliminó el botón inferior "Cerrar" del modal de servicios.
- Se mantuvo la `X` superior como única acción visual de cierre, además del cierre por fondo y tecla Escape.

**Archivos modificados:**
- `index.html`
- `docs/obsidian/10_UI_UX_Diseno.md`

**Validaciones realizadas:**
- Playwright desktop: el modal conserva una sola acción de cierre y un CTA de WhatsApp.
- Playwright mobile `390x844`: no existe el botón inferior "Cerrar", el modal cabe dentro del viewport y no genera overflow horizontal.
- Playwright: la `X` cambia correctamente el modal de visible a cerrado.

**Pendientes detectados:**
- Ninguno relacionado con este ajuste.

## 2026-09-05 - Publicación de la versión consolidada

**Cambios realizados:**
- Se publicó en `origin/main` la landing, el catálogo de nueve demos, los tres rubros nuevos, los PDFs con marca y las mejoras UX.
- Se actualizó el remoto local y las referencias públicas al nuevo nombre del repositorio `Mockups_Ventas` informado por GitHub.

**Archivos modificados:**
- `README.md`
- `index.html`
- `demos/index.html`
- `robots.txt`
- `sitemap.xml`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/06_Comandos_Runbook.md`
- `docs/obsidian/13_Deploy_Infraestructura.md`

**Validaciones realizadas:**
- Commit funcional `4465090` enviado correctamente a `origin/main`.
- Las referencias públicas y la documentación se incluyeron en un commit complementario sobre `main`.

**Pendientes detectados:**
- Activar GitHub Pages y verificar la URL pública.
