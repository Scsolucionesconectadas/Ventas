# Bitácora de Desarrollo

## 2026-09-06 - Publicación de Fase 4 e implementación de Fase 5

**Cambios realizados:**
- Se publicó la Fase 4 en `origin/main` con el commit `e643a5d`.
- Se agregó a las nueve demos un centro de automatización con dos procesos específicos por rubro.
- Se implementaron escenarios de éxito y falla temporal, reintento, aprobación humana, seis estados de ejecución e historial.
- Se incorporaron selector n8n/Node-RED, panel tipo Grafana, períodos comparables y métricas dinámicas.
- Se agregó programación diaria, semanal o mensual, vista previa editable de email y PDF con marca SC sin envío real.
- Se corrigió la navegación de pestañas dinámicas con flechas, `Home` y `End`.
- Se ajustó la grilla de programación para evitar recortes y se reforzó el estado visual de controles deshabilitados.

**Archivos modificados:**
- `assets/js/workflow-demo.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/css/base.css`
- `rubros/*/index.html`
- `scripts/phase5.spec.js`
- `README.md`
- `docs/obsidian/*.md`

**Validaciones realizadas:**
- `node --check`: JavaScript de Fase 5 y prueba sin errores.
- `git diff --check`: sin errores de whitespace.
- Playwright: suite unificada de Fases 3, 4 y 5 con `38/38` pruebas aprobadas.
- Axe Core `4.10.3`: cero infracciones serias o críticas en la vista nueva de las nueve demos.
- Responsive `390x844` y escritorio `1440x1000`: sin overflow horizontal.
- PDF, email simulado, programación, falla, reintento y aprobación verificados en Microsoft Edge.
- Capturas de Fase 5 revisadas visualmente en escritorio y móvil.

**Pendientes detectados:**
- Revisar y autorizar la publicación de la Fase 5 en `origin/main`.
- Validar la versión pública desde un celular físico cuando GitHub Pages esté activo.

## 2026-09-06 - Publicación de Fase 3 e implementación de Fase 4

**Cambios realizados:**
- Se publicó la Fase 3 en `origin/main` con el commit `23fa1ff`.
- Se agregaron catorce módulos avanzados para área médica, inmobiliarias y venta de materiales mediante una extensión compartida.
- Cada módulo incorpora cuatro KPI, tabla operativa, cola de prioridades, automatización sugerida, alta ficticia y actualización de estado.
- Se reutilizó el generador SC para descargar PDFs y se agregó una vista previa de email que no realiza envíos reales.
- Se conectaron los módulos con navegación lateral, pestañas, búsqueda global, teclado y actividad reciente.
- En móvil se eliminó la duplicación de accesos avanzados en la barra lateral, manteniéndolos en las pestañas.
- Se reforzó el contraste de KPI, insignias y pestañas activas, y se respetó `prefers-reduced-motion`.

**Archivos modificados:**
- `assets/js/priority-demo.js`
- `assets/css/base.css`
- `rubros/medica/index.html`
- `rubros/inmobiliarias/index.html`
- `rubros/materiales/index.html`
- `scripts/phase4.spec.js`
- `README.md`
- `docs/obsidian/*.md`

**Validaciones realizadas:**
- `node --check`: extensión y pruebas sin errores de sintaxis.
- HTML Validate `11.14.0`: todas las páginas sin errores estructurales.
- Playwright Fase 4: 7 de 7 pruebas aprobadas sobre navegación, altas, estados, PDF, email, búsqueda, teclado y móvil.
- Playwright Fase 3: 14 de 14 pruebas de regresión aprobadas sobre las nueve demos.
- Axe Core `4.10.3`: cero infracciones serias o críticas en los módulos prioritarios.
- Capturas de área médica, materiales e inmobiliarias revisadas después de finalizar las animaciones, sin solapamientos ni desborde.

**Pendientes detectados:**
- Revisar y autorizar la publicación de la Fase 4.
- Activar GitHub Pages y probar la URL pública desde un celular físico.

## 2026-09-05 - Fase 2 comercial multipágina

**Cambios realizados:**
- Se crearon páginas independientes para servicios, automatizaciones y contacto, más una confirmación de envío.
- Se conectó cada servicio con demos relacionadas y una explicación completa de alcance.
- Se amplió el diagnóstico de la home con módulos, rubros y automatizaciones recomendadas.
- Se agregaron resultados ilustrativos con aclaración comercial y seis preguntas frecuentes.
- Se incorporó un explorador interactivo de flujos para agenda, ventas, stock y reportes.
- Se agregó un formulario FormSubmit con campos obligatorios, reCAPTCHA activo, honeypot y redirección a una página SC.
- Se actualizó la navegación del catálogo, el sitemap, el motion y el versionado de assets.

**Archivos modificados:**
- `index.html`
- `demos/index.html`
- `servicios/index.html`
- `automatizaciones/index.html`
- `contacto/index.html`
- `contacto/gracias.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/commercial-pages.js`
- `assets/js/motion.js`
- `rubros/*/index.html`
- `sitemap.xml`
- `README.md`

**Validaciones realizadas:**
- HTML Validate `11.14.0`: todas las páginas sin errores estructurales.
- `node --check`: todos los archivos JavaScript sin errores de sintaxis.
- Axe Core `4.10.3`: cero infracciones WCAG A/AA en landing, servicios, automatizaciones, contacto y catálogo.
- Playwright: 16 páginas y 15 destinos internos sin errores ni enlaces rotos.
- Playwright: sin overflow, imágenes rotas ni controles recortados en `390x844`, `768x1024`, `1366x768` y `1920x1080`.
- Playwright: modal, cinco diagnósticos, seis preguntas frecuentes, cuatro flujos, preselección del formulario y navegación móvil verificados.
- Navegador: cero errores y cero advertencias actuales de consola.

**Pendientes detectados:**
- Confirmar la activación del formulario desde el primer email de FormSubmit.
- Activar GitHub Pages y comprobar la URL pública.

## 2026-09-05 - Fase 1 de calidad y publicación estática

**Cambios realizados:**
- Se revisaron los textos visibles, acentos y codificación UTF-8 de las doce páginas.
- Se fijaron las versiones CDN de Lucide, GSAP y jsPDF.
- Se creó `404.html` con identidad SC, navegación local y compatibilidad con la subruta de GitHub Pages.
- Se convirtieron once imágenes de presentación a WebP y se actualizaron las referencias públicas.
- Se agregaron roles, estados ARIA y navegación por teclado a las pestañas.
- Se agregó entrada, contención y restauración de foco al modal de servicios.
- Se corrigió el recorte de teléfono, email e Instagram en tablet.

**Archivos modificados:**
- `404.html`
- `index.html`
- `demos/index.html`
- `rubros/*/index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/demo-catalog.js`
- `assets/js/industry-demo-data.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/img/*.webp`
- `scripts/optimize_images.py`
- `README.md`

**Validaciones realizadas:**
- HTML Validate `11.14.0`: estructura sin errores, desactivando únicamente reglas estilísticas y comprobaciones de contenido que JavaScript hidrata en runtime.
- Axe Core `4.13.0`: sin infracciones WCAG A/AA en landing, catálogo, nueve demos, todas sus pestañas y 404.
- Playwright: sin overflow ni texto recortado en `390x844`, `768x1024`, `1366x768` y `1920x1080`.
- Playwright: enlaces internos, imágenes, dropdowns, modal, foco, menú de tres puntos y acciones contextuales operativos.
- Playwright: nueve PDFs descargados correctamente, uno por cada demo.
- Navegador: cero errores y cero advertencias de consola en las doce rutas.
- Imágenes: reducción total de `2.061.657` a `975.542` bytes (`52,7%`).

**Pendientes detectados:**
- Hacer commit y push de la Fase 1 cuando el usuario lo autorice.
- Realizar una última prueba desde un celular físico después de activar GitHub Pages.

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

## 2026-09-05 - Fase 3 de experiencia en demos

**Cambios realizados:**
- Se publicó la Fase 2 en `origin/main` con el commit `5d56b77`.
- Se agregó una barra compartida a las nueve demos con modo presentación, recorrido manual, búsqueda global, estados, actividad y reinicio.
- Se interceptó el acceso anterior “Iniciar demo guiada” para abrir el nuevo recorrido controlable.
- Se incorporaron foco administrado, cierre por `Escape`, trampa de foco en modales y soporte de `prefers-reduced-motion`.
- Se agregó una prueba de regresión Playwright reutilizable.

**Archivos modificados:**
- `assets/js/demo-experience.js`
- `assets/css/base.css`
- `rubros/*/index.html`
- `scripts/phase3.spec.js`
- `README.md`
- `docs/obsidian/*.md`

**Validaciones realizadas:**
- `node --check assets/js/demo-experience.js`: sin errores.
- HTML Validate `11.14.0`: todas las páginas sin errores.
- Playwright: nueve demos con búsqueda, actividad, estados, presentación, recorrido, reinicio cancelable y consola sin errores.
- Playwright: reinicio real con recarga y confirmación del estado inicial.
- Responsive `390x844`, `768x1024` y `1366x900`: sin overflow horizontal.
- Axe Core `4.10.3`: cero infracciones serias o críticas en las nueve demos.
- Capturas revisadas en escritorio y móvil con contenido visible después de la entrada animada.

**Pendientes detectados:**
- Profundizar las demos médica, inmobiliaria y venta de materiales en la Fase 4.
- Probar la URL pública desde un celular físico cuando GitHub Pages esté activo.

## 2026-09-06 - Publicación de Fase 5 e implementación de Fase 6

**Cambios realizados:**
- Se publicó Fase 5 en `origin/main` con el commit `aafbb94` y se verificó la propagación en GitHub Pages.
- Se completaron metadatos SEO únicos, Open Graph, Twitter Card, canonical y tema para catorce páginas indexables.
- Se agregó JSON-LD `Organization` y `WebSite` a la portada y fechas `lastmod` al sitemap.
- Se preparó Cloudflare Web Analytics sin token y sin tráfico por defecto.
- Se creó una presentación comercial responsive de ocho diapositivas con notas, teclado, gestos, pantalla completa e impresión.
- Se creó una guía de reunión con diagnóstico, recorrido y selección de demos.
- Se evitó que el motor compartido sobrescribiera los títulos SEO de las demos.
- Se corrigió la visibilidad de diapositivas al usar movimiento reducido y el ícono visual de Instagram.

**Archivos modificados:**
- `index.html`
- `demos/index.html`
- `servicios/index.html`
- `automatizaciones/index.html`
- `contacto/index.html`
- `rubros/*/index.html`
- `assets/js/industry-demo.js`
- `assets/js/analytics.js`
- `presentacion/index.html`
- `assets/css/presentation.css`
- `assets/js/presentation.js`
- `sitemap.xml`
- `scripts/phase6.spec.js`
- `docs/GUIA_PRESENTACION_COMERCIAL.md`
- `README.md`
- `docs/obsidian/*.md`

**Validaciones realizadas:**
- `node --check` sobre los scripts nuevos: sin errores.
- HTML Validate `11.14.0`: todas las páginas, incluida la presentación, sin errores.
- Playwright Fase 6: `7/7` pruebas aprobadas sobre SEO, JSON-LD, sitemap, analítica, presentación, impresión, responsive y accesibilidad.
- Regresión Playwright de Fases 3, 4 y 5: `38/38` pruebas aprobadas.
- Capturas de presentación en `1440x900` y `390x844` revisadas visualmente; las ocho diapositivas también se validaron en `1366x768`.

**Pendientes detectados:**
- Revisar y autorizar la publicación de Fase 6.
- Activar Cloudflare Web Analytics solo si se crea una propiedad y se obtiene su token público.
- Realizar una prueba final desde un celular físico después de publicar.

## 2026-09-06 - Publicación de Fase 6 y nuevos rubros de Fase 7

**Cambios realizados:**
- Se publicó Fase 6 en `origin/main` con el commit `1fb549b` y se verificó la presentación en GitHub Pages.
- Se amplió el catálogo de 9 a 12 rubros con Talleres y Servicios Técnicos, Estudios Contables, y Constructoras y Obras.
- Cada demo nueva incorpora panel, operación, pipeline, recursos, asistente, reportes y automatizaciones n8n/Node-RED simuladas.
- Se agregaron accesos desde Servicios, Contacto, presentación comercial y guía de reuniones.
- Se extendieron SEO, Open Graph, Twitter Card y `sitemap.xml` hasta 17 páginas indexables.
- Se generaron tres fotografías propias sin marcas ni datos reales y se convirtieron a WebP, reduciendo el peso conjunto de 6,6 MB a unos 433 KB.

**Archivos modificados:**
- `assets/js/demo-catalog.js`
- `assets/js/industry-demo-data.js`
- `assets/js/workflow-demo.js`
- `rubros/talleres/index.html`
- `rubros/estudios-contables/index.html`
- `rubros/constructoras/index.html`
- `assets/img/workshop-demo.webp`
- `assets/img/accounting-demo.webp`
- `assets/img/construction-demo.webp`
- `scripts/phase3.spec.js`
- `scripts/phase5.spec.js`
- `scripts/phase6.spec.js`
- `scripts/phase7.spec.js`
- páginas comerciales, sitemap, README y memoria Obsidian.

**Validaciones realizadas:**
- `node --check`: scripts de datos, catálogo, workflows y pruebas sin errores.
- HTML Validate `11.14.0`: todas las páginas sin errores.
- Playwright Fases 3 a 7: `60/60` pruebas aprobadas.
- Playwright Fase 7 final: `9/9` pruebas aprobadas después de optimizar las imágenes.
- Axe Core `4.10.3`: sin infracciones serias o críticas en los tres rubros nuevos.
- Capturas revisadas en catálogo `1440x1000` y hero móvil `390x844`.

**Pendientes detectados:**
- Revisar y autorizar la publicación de Fase 7.
- Probar la versión publicada desde un celular físico.
- Confirmar el primer envío de FormSubmit.

## 2026-09-06 - Publicación de Fase 7

**Cambios realizados:**
- Se publicó Fase 7 en `origin/main` con el commit `0993734`.
- Se verificó la propagación de GitHub Pages sobre la ruta pública de Talleres con respuesta HTTP `200` y contenido actualizado.

**Archivos modificados:**
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/13_Deploy_Infraestructura.md`

**Validaciones realizadas:**
- `git push origin main`: correcto.
- `git ls-remote origin refs/heads/main`: commit `0993734` confirmado antes del cierre documental.
- GitHub Pages: Talleres respondió HTTP `200` con la Fase 7.

**Pendientes detectados:**
- Probar la versión publicada desde un celular físico.
- Confirmar el primer envío de FormSubmit.

## 2026-09-07 - Ajuste comercial y espaciado de servicios en la portada

**Cambios realizados:**
- Se reservó espacio lateral en las tarjetas de servicios para impedir que el botón `+` se superponga con el texto.
- Se reemplazaron indicadores internos o poco atractivos por datos comerciales sobre demos, módulos, procesos automáticos y alcance integral.
- Se reformuló la reducción de carga manual como “Hasta 60% menos” para evitar que el rango se interprete como un aumento.
- Se agregó una regresión geométrica que comprueba separación y ausencia de desborde en desktop, tablet y móvil.

**Archivos modificados:**
- `index.html`
- `assets/css/base.css`
- `scripts/phase6.spec.js`
- `docs/obsidian/00_Contexto_Proyecto.md`
- `docs/obsidian/03_Bitacora_Desarrollo.md`
- `docs/obsidian/05_Pendientes.md`
- `docs/obsidian/10_UI_UX_Diseno.md`

**Validaciones realizadas:**
- `node --check scripts/phase6.spec.js`: sin errores.
- HTML Validate `11.14.0`: todas las páginas sin errores.
- Playwright Fase 6: `8/8` pruebas aprobadas.
- Regresión Playwright de Fases 3 a 7: `61/61` pruebas aprobadas.
- Separación texto/acción y overflow validados en `1366x768`, `768x1024` y `390x844`.
- Capturas de servicios revisadas en desktop y móvil.

**Pendientes detectados:**
- Revisar la redacción comercial en una presentación real y ajustar los mensajes según las preguntas más frecuentes de los clientes.

## 2026-09-07 - Catálogo, admisiones y PDFs comerciales

**Cambios realizados:**
- Se reemplazó “Roadmap” por “En planificación” y se adoptó un lenguaje centrado en ineficiencias o situaciones operativas.
- Se equilibró el hero de Demos y se alinearon verticalmente “Ver módulos” y “Abrir demo” en cada fila.
- Se generaron y optimizaron fotografías con personas para Gomerías, Agrimensores y Logística.
- La demo médica bloquea una segunda admisión y presenta “Admisión completada” como acción deshabilitada.
- Se eliminó “Ver dashboard” de los reportes y se normalizó “Ver PDF” en todas las demos.
- La plantilla PDF recorta transparencias del logo, conserva proporciones, separa título y fecha y coloca una marca “DEMO” diagonal sobre el contenido.

**Archivos modificados:**
- `demos/index.html`
- `index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/demo-catalog.js`
- `assets/js/industry-demo-data.js`
- `assets/js/medical-demo.js`
- `assets/js/industry-demo.js`
- `assets/js/pdf-report.js`
- `rubros/*/index.html`
- `assets/img/tires-team-demo.webp`
- `assets/img/survey-team-demo.webp`
- `assets/img/logistics-team-demo.webp`
- `scripts/phase3.spec.js`
- `scripts/phase6.spec.js`

**Validaciones realizadas:**
- `node --check`, `py_compile` y `git diff --check`: sin errores.
- HTML Validate `11.14.0`: todas las páginas sin errores.
- Playwright Fases 3 a 7: `64/64` pruebas aprobadas.
- PDF médico descargado y revisado visualmente en Edge: una página, logo proporcionado, fecha sin cruce y marca de agua visible.
- Catálogo revisado en `1440x900` y hero en `390x844`, sin desborde horizontal.

**Pendientes detectados:**
- Probar la versión publicada desde un celular físico cuando se autorice la próxima publicación.

## 2026-09-07 - Estados terminales y formularios dependientes

**Cambios realizados:**
- Se reemplazaron los avances fijos por secuencias cronológicas específicas para las once demos configurables.
- Se oculta la acción de avance al llegar al estado final en registros, admisiones médicas y módulos avanzados.
- Talleres finaliza en “Listo para entregar”, Estudios Contables en “Cerrado” y Constructoras en “Finalizado”.
- Inmobiliarias propone `ARS 500.000` para alquiler comercial y `USD 80.000` para compra de vivienda.
- Contacto muestra campos obligatorios de aclaración al seleccionar “Otro rubro” u “Otra necesidad”.
- Se eliminó la insignia comercial “Módulo Fase 4” de las vistas avanzadas.

**Archivos modificados:**
- `assets/js/industry-demo-data.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/js/priority-demo.js`
- `assets/js/commercial-pages.js`
- `assets/css/base.css`
- `contacto/index.html`
- HTML públicos con actualización de caché.
- `scripts/phase3.spec.js`
- `scripts/phase4.spec.js`
- `scripts/phase6.spec.js`

**Validaciones realizadas:**
- `node --check` y `git diff --check`: sin errores.
- HTML Validate `11.14.0`: todas las páginas públicas sin errores.
- Playwright completo: `67/67` pruebas aprobadas.
- Inspección visual de presupuesto inmobiliario, campos condicionales y menú terminal de Talleres.

**Pendientes detectados:**
- Probar estos flujos en la versión publicada desde un celular físico cuando se autorice el próximo push.
