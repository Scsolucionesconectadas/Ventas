# Decisiones Técnicas

## 2026-09-06 - Simulador compartido de automatizaciones para las nueve demos

**Decisión:**
Implementar la Fase 5 en `assets/js/workflow-demo.js` como extensión estática configurable por rubro, sin agregar dependencias ni conexiones externas.

**Motivo:**
Las presentaciones necesitan mostrar ejecución, fallos, reintentos, aprobación, métricas y entregables de forma consistente. Un módulo compartido evita duplicar comportamiento y conserva compatibilidad con GitHub Pages.

**Impacto:**
Las nueve demos agregan dos procesos propios, representación n8n/Node-RED, panel tipo Grafana, programación, email demo, PDF e historial. Todo permanece en memoria y usa datos ficticios `@demo.local`.

**Alternativas consideradas:**
- Crear una implementación distinta dentro de cada rubro.
- Incorporar instancias reales de n8n, Node-RED o Grafana en una publicación estática.
- Migrar a un framework antes de validar la experiencia comercial.

**Archivos relacionados:**
- `assets/js/workflow-demo.js`
- `assets/css/base.css`
- `rubros/*/index.html`
- `scripts/phase5.spec.js`

## 2026-09-06 - Extensión compartida para las demos prioritarias

**Decisión:**
Implementar la Fase 4 en `assets/js/priority-demo.js`, cargado solo por área médica, inmobiliarias y venta de materiales, y reutilizar el motor de PDF y la experiencia transversal existentes.

**Motivo:**
Los tres rubros necesitan mayor profundidad comercial sin duplicar catorce módulos en archivos separados ni migrar el sitio estático a un framework. La extensión por configuración mantiene cada demo navegable y permite continuar escalando con bajo acoplamiento.

**Impacto:**
Se agregan facturación, autorizaciones, profesionales, documentos y seguimiento médico; contratos, reservas, cobranzas y propietarios; compras, proveedores, listas de precios, cuentas corrientes y logística/margen. Cada vista incluye KPI, registros, prioridades, altas ficticias, estados, PDF y email simulado.

**Alternativas consideradas:**
- Duplicar cada módulo directamente en los tres HTML.
- Ampliar `industry-demo.js` para todos los rubros aunque seis no requieren estos módulos.
- Migrar las demos a React antes de validar comercialmente la profundidad.

**Archivos relacionados:**
- `assets/js/priority-demo.js`
- `assets/css/base.css`
- `rubros/medica/index.html`
- `rubros/inmobiliarias/index.html`
- `rubros/materiales/index.html`
- `scripts/phase4.spec.js`

## 2026-09-05 - Fase 2 multipágina y formulario estático

**Decisión:**
Separar servicios, automatizaciones y contacto en páginas propias; mantener la home como resumen comercial; y usar FormSubmit para recibir consultas desde GitHub Pages.

**Motivo:**
La web debe escalar sin concentrar toda la información en una sola página. GitHub Pages sirve contenido estático y el formulario necesita un proveedor externo que funcione con HTML estándar sin exponer credenciales.

**Impacto:**
Agrega navegación multipágina, demos relacionadas por servicio, diagnóstico ampliado, explorador de automatizaciones, formulario comercial, confirmación propia, sitemap y nueva lógica compartida.

**Alternativas consideradas:**
- Mantener servicios y automatizaciones únicamente como secciones extensas de la home.
- Usar solo enlaces `mailto:` y WhatsApp sin formulario estructurado.
- Incorporar un backend propio antes de validar el flujo comercial.

**Archivos relacionados:**
- `index.html`
- `servicios/index.html`
- `automatizaciones/index.html`
- `contacto/index.html`
- `contacto/gracias.html`
- `assets/js/commercial-pages.js`
- `assets/js/app.js`
- `assets/css/base.css`
- `sitemap.xml`

## 2026-09-05 - Base de calidad para publicación estática

**Decisión:**
Fijar Lucide `1.41.0`, GSAP `3.15.0` y jsPDF `4.2.1`; servir las imágenes visuales en WebP conservando los JPG como fuentes; agregar `404.html`; y completar la semántica y el manejo de foco de pestañas y modales.

**Motivo:**
GitHub Pages debe publicar una versión reproducible, rápida y navegable con teclado, sin depender de alias CDN cambiantes ni mostrar rutas rotas con una página genérica.

**Impacto:**
Reduce en aproximadamente `52,7%` el peso de las once imágenes de presentación cargadas por la web, estabiliza las librerías externas y mejora accesibilidad, navegación y consistencia responsive.

**Alternativas consideradas:**
- Eliminar los JPG después de convertirlos y perder una fuente simple de regeneración.
- Agregar una herramienta de build solo para optimizar imágenes.
- Mantener `@latest` y versiones mayores flotantes en las URLs CDN.

**Archivos relacionados:**
- `404.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `scripts/optimize_images.py`
- `index.html`
- `demos/index.html`
- `rubros/*/index.html`

## 2026-09-05 - Catálogo separado de demos y PDFs con marca SC

**Decisión:**
Separar el catálogo completo de demos en `demos/index.html`, centralizar los datos de tarjetas en `assets/js/demo-catalog.js` y reemplazar los PDFs simples por un generador con jsPDF `4.2.1` por CDN.

**Motivo:**
La web debe escalar como sitio institucional de SC sin concentrar todo en la home. Los PDFs necesitan verse profesionales en presentaciones, con encabezado, pie institucional, logo, rubro e indicadores organizados.

**Impacto:**
Afecta navegación, landing, páginas de rubros, scripts compartidos, sitemap, estilos, reportería demo y documentación.

**Alternativas consideradas:**
- Mantener todas las demos embebidas manualmente en `index.html`.
- Conservar el generador PDF mínimo hecho a mano sin logos ni estructura visual.
- Incorporar una librería más grande de tablas PDF antes de validar el diseño comercial.

**Archivos relacionados:**
- `index.html`
- `demos/index.html`
- `assets/js/demo-catalog.js`
- `assets/js/pdf-report.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/css/base.css`

## 2026-09-05 - Capa compartida para la experiencia de demos

**Decisión:**
Implementar la Fase 3 en `assets/js/demo-experience.js` y estilos comunes, cargados por las nueve demos después de su motor funcional.

**Motivo:**
Modo presentación, recorrido, búsqueda, actividad, estados y reinicio son capacidades transversales. Centralizarlas evita duplicación y permite que los próximos rubros las reciban con una sola inclusión.

**Impacto:**
Todas las demos muestran herramientas consistentes, identifican claramente que usan datos y funciones simuladas y conservan sus módulos específicos sin modificar su fuente de datos.

**Alternativas consideradas:**
- Copiar la barra y los diálogos en cada HTML.
- Migrar el sitio estático a un framework antes de validar la experiencia comercial.
- Mantener el recorrido automático temporizado sin controles manuales.

**Archivos relacionados:**
- `assets/js/demo-experience.js`
- `assets/css/base.css`
- `rubros/*/index.html`
- `scripts/phase3.spec.js`

## 2026-09-05 - Nuevos rubros gomerías, agrimensores y logística

**Decisión:**
Agregar tres demos nuevas: gomerías para stock/servicios, agrimensores para expedientes y conectividad ATER simulada, y logística/transporte como tercer rubro por su potencial en inventario, rutas, remitos, alertas y coordinación operativa.

**Motivo:**
Gomerías y agrimensores fueron pedidos explícitamente. Logística/transporte se eligió porque permite mostrar automatización de operaciones, visibilidad de entregas, control de SLA, reportes y alertas, rubros de alto valor para clientes B2B.

**Impacto:**
El catálogo pasa de 6 a 9 rubros navegables, se agregan páginas nuevas, datos ficticios, imágenes locales generadas y rutas en `sitemap.xml`.

**Alternativas consideradas:**
- Agregar comercio minorista general.
- Agregar estudios contables como demo inicial.
- Dejar logística para una etapa posterior.

**Archivos relacionados:**
- `assets/js/industry-demo-data.js`
- `assets/js/demo-catalog.js`
- `rubros/gomerias/index.html`
- `rubros/agrimensores/index.html`
- `rubros/logistica/index.html`
- `assets/img/tires-demo.jpg`
- `assets/img/survey-demo.jpg`
- `assets/img/logistics-demo.jpg`

## 2026-09-05 - Publicación simple en GitHub Pages y CTA comercial real

**Decisión:**
Preparar la landing para GitHub Pages desde la rama `main` y carpeta `/`, sin dominio propio, con `.nojekyll`, `robots.txt`, `sitemap.xml`, metadatos sociales, contacto público y un diagnóstico express interactivo.

**Motivo:**
La web debe poder publicarse rápido para presentaciones comerciales y convertir mejor a clientes interesados mediante una acción principal clara: ver demos o coordinar por WhatsApp.

**Impacto:**
Afecta la landing, assets versionados, documentación de deploy, SEO básico y navegación pública.

**Alternativas consideradas:**
- Usar GitHub Actions para publicar un build aunque el sitio no requiere compilación.
- Esperar a tener dominio propio antes de publicar.

**Archivos relacionados:**
- `index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/motion.js`
- `.nojekyll`
- `robots.txt`
- `sitemap.xml`
- `README.md`

## 2026-09-04 - Reporterías demo con Grafana, PDF y email

**Decisión:**
Agregar una vista de reportería a cada demo con paneles tipo Grafana, métricas por rubro, mini gráficos, bitácora, generación de PDF demo y preparación de email demo sin envío real.

**Motivo:**
Los clientes suelen pedir reportes ejecutivos, tableros de control y envíos automáticos. Mostrarlo dentro de cada rubro aumenta valor comercial y conecta mejor con n8n, Node-RED, Grafana y flujos de email.

**Impacto:**
Afecta la landing, las seis demos, el motor común de rubros, la demo médica, estilos compartidos y documentación comercial.

**Alternativas consideradas:**
- Dejar reportería solo como texto en la landing.
- Agregar una librería de gráficos pesada antes de validar la demo comercial.

**Archivos relacionados:**
- `index.html`
- `assets/css/base.css`
- `assets/js/industry-demo-data.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `rubros/medica/index.html`

## 2026-09-04 - Imágenes locales antes de publicación

**Decisión:**
Descargar y referenciar imágenes locales para landing, hero médico y tarjetas/heros de rubros.

**Motivo:**
La tarjeta de educación mostraba una imagen rota al depender de una URL remota. Para presentaciones y publicación inicial, las imágenes deben cargar de forma confiable desde el propio repositorio.

**Impacto:**
La landing y las demos dejan de depender de URLs remotas de imágenes. Queda pendiente revisar licencias/atribución o reemplazar por imágenes propias/generadas para una publicación final.

**Alternativas consideradas:**
- Mantener todas las imágenes desde URLs externas.
- Generar un set visual completo propio en esta misma iteración.

**Archivos relacionados:**
- `index.html`
- `assets/css/base.css`
- `assets/js/industry-demo-data.js`
- `assets/img/landing-hero.jpg`
- `assets/img/medical-hero.jpg`
- `assets/img/*-demo.jpg`

## 2026-09-04 - Motor común para demos por rubro

**Decisión:**
Crear `assets/js/industry-demo-data.js` con datos ficticios por rubro y `assets/js/industry-demo.js` como motor compartido para renderizar vistas, métricas, formularios, pipeline, recursos, tareas, chatbot y menú contextual.

**Motivo:**
Permite avanzar rápido con varios rubros comerciales manteniendo una estética y una experiencia consistentes, sin copiar y mantener lógica distinta en cada página.

**Impacto:**
Las demos de hotelería, inmobiliarias, venta de materiales, gastronomía y educación se alimentan por configuración y comparten comportamiento funcional.

**Alternativas consideradas:**
- Escribir JavaScript independiente para cada rubro.
- Migrar a un framework frontend antes de validar el material comercial.

**Archivos relacionados:**
- `assets/js/industry-demo-data.js`
- `assets/js/industry-demo.js`
- `rubros/hoteleria/index.html`
- `rubros/inmobiliarias/index.html`
- `rubros/materiales/index.html`
- `rubros/gastronomia/index.html`
- `rubros/educacion/index.html`

## 2026-09-04 - Landing principal con portal de demos

**Decisión:**
Convertir `index.html` en la landing principal de Soluciones Conectadas, manteniendo las demos por rubro como un apartado interno.

**Motivo:**
La web debe presentar qué hace SC y, al mismo tiempo, permitir que un prospecto abra demos funcionales por industria.

**Impacto:**
El hub deja de ser solo un roadmap y pasa a incluir hero de marca, servicios, demos, automatizaciones, proceso comercial y CTA.

**Alternativas consideradas:**
- Mantener una página exclusiva de mockups.
- Crear una landing separada y dejar el hub como segunda página.

**Archivos relacionados:**
- `index.html`
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/motion.js`

## 2026-09-04 - Profesionalización visual con identidad SC

**Decisión:**
Usar la paleta visual del logo SC como base del sistema de demos: tinta `#22333f`, azul `#0060c0` y cian `#00b0e8`.

**Motivo:**
Las demos son material comercial de Soluciones Conectadas y deben sentirse propias, profesionales y consistentes entre rubros.

**Impacto:**
Afecta estilos globales, botones, tabs, dropdowns, paneles, métricas, hero, sidebar y assets de marca.

**Alternativas consideradas:**
- Mantener la paleta generica anterior.
- Crear una paleta distinta por rubro.

**Archivos relacionados:**
- `assets/css/base.css`
- `index.html`
- `rubros/medica/index.html`
- `assets/img/sc-imagotipo.png`
- `assets/img/sc-symbol.png`
- `assets/img/sc-favicon.png`

## 2026-09-04 - Animaciones sin dependencias externas nuevas

**Decisión:**
Implementar animaciones y microinteracciones con CSS, JavaScript mínimo y GSAP por CDN.

**Motivo:**
El proyecto es estático y debe abrirse sin instalación ni build. CSS cubre transiciones, dropdowns, entrada de paneles y feedback visual con bajo costo, y GSAP suma timelines, `fromTo`, `stagger`, contadores animados y entrada más pulida.

**Impacto:**
Reduce complejidad y mantiene el repo portable para GitHub Pages o hosting estático.

**Alternativas consideradas:**
- Agregar una librería de animaciones instalada por paquete.
- Migrar a un framework frontend.

**Archivos relacionados:**
- `assets/css/base.css`
- `assets/js/app.js`
- `assets/js/medical-demo.js`
- `assets/js/motion.js`

## 2026-09-04 - Menús flotantes para acciones de turnos

**Decisión:**
Reemplazar el menú interno de cada turno por un menú flotante renderizado en `document.body`.

**Motivo:**
El menú anterior podía quedar por detrás de otros turnos o exigir salir de la agenda para poder seleccionar una acción.

**Impacto:**
Las acciones "Abrir ficha", "Enviar recordatorio" y "Marcar admisión" quedan siempre por encima de la agenda y son clickeables.

**Alternativas consideradas:**
- Subir solo el `z-index` del menú interno.
- Mantener `details` dentro de la tarjeta.

**Archivos relacionados:**
- `assets/js/medical-demo.js`
- `assets/css/base.css`
