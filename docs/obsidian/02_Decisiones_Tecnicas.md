# Decisiones Técnicas

## 2026-09-21 - Backoffice administrativo separado de Gestión PyME y Estudios Contables

**Decisión:**
Crear la demo `Administración y facturación` como circuito interno transversal para empresas de servicios y comercios, reutilizando el motor configurable existente.

**Motivo:**
Gestión PyME explica ventas, caja y stock diarios, mientras Estudios Contables representa la agenda de un estudio externo. Faltaba mostrar el trabajo administrativo interno que conecta servicio realizado, factura, cobranza, proveedores, aprobaciones, pagos y documentación.

**Impacto:**
El catálogo suma una decimoquinta demo con seis estados cronológicos, cuatro casos trazables, reportería ejecutiva, asistente y dos workflows. Todos los comprobantes se identifican como documentos demo no fiscales y no se conectan con ARCA, bancos ni servicios reales.

**Alternativas consideradas:**
- Extender Gestión PyME hasta convertirla en un ERP generalista.
- Agregar estas funciones a Estudios Contables.
- Crear una experiencia independiente con foco en backoffice interno.

**Archivos relacionados:**
- `rubros/administracion-facturacion/index.html`
- `assets/js/industry-demo-data.js`
- `assets/js/workflow-demo.js`
- `assets/js/demo-catalog.js`
- `scripts/administracion-facturacion.spec.js`

## 2026-09-19 - Footer como cierre comercial único

**Decisión:**
Retirar de la portada la banda “Presentación comercial” ubicada inmediatamente antes del footer y conservar este último como cierre único del recorrido.

**Motivo:**
La banda repetía logo, WhatsApp, email e Instagram que ya están disponibles en la navegación, la página Contacto y el footer compartido. Su eliminación reduce ruido visual y evita dos llamadas comerciales consecutivas.

**Impacto:**
La portada termina con una transición directa desde el último bloque de contenido al footer. No se pierden canales de contacto ni rutas de navegación.

**Alternativas consideradas:**
- Mantener ambas llamadas comerciales.
- Reducir la banda a un CTA compacto.
- Eliminar el footer y conservar la banda exclusiva de la portada.

**Archivos relacionados:**
- `index.html`
- `README.md`
- `docs/obsidian/10_UI_UX_Diseno.md`

## 2026-09-13 - Chart.js bajo demanda para reportería interactiva

**Decisión:**
Incorporar Chart.js `4.5.1` desde una URL CDN fijada y cargarlo únicamente cuando el centro de análisis de una demo entra en pantalla. Mantener GSAP para microinteracciones y no incorporar Lenis, Swiper, Tailwind, shadcn ni Base UI.

**Motivo:**
Las catorce demos ya comparten datos y reportería, pero los mini gráficos no permitían comparar ni explorar. Chart.js agrega una visualización de datos concreta sin migrar el sitio estático a React ni crear un proceso de build. Las demás bibliotecas revisadas en Click atienden navegación suave, carruseles o componentes React que no mejoran este flujo operativo.

**Impacto:**
Cada reporte permite elegir métrica y período, comparar con el período anterior y leer una recomendación específica del rubro. El canvas recibe nombre accesible, respeta movimiento reducido y conserva métricas, resumen y vista simplificada ante error o demora del CDN.

**Alternativas consideradas:**
- Mantener solamente barras CSS sin interacción.
- Dibujar gráficos propios en canvas o SVG.
- Incorporar el stack React completo de Click.
- Cargar Chart.js al abrir cada página aunque el usuario no visite Reportes.

**Archivos relacionados:**
- `assets/js/reporting-experience.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/js/motion.js`
- `assets/css/base.css`
- `rubros/*/index.html`
- `scripts/reporting-experience.spec.js`

## 2026-09-08 - Capa de interfaz compartida sin dependencia de Uiverse

**Decisión:**
Implementar los patrones seleccionados como una capa propia en `base.css` y `ui-enhancements.js`, cargada por las 19 páginas que usan el sistema visual SC. Uiverse se mantiene como referencia de categorías, sin importar código remoto ni sumar una librería.

**Motivo:**
El sitio debe conservar identidad, accesibilidad y compatibilidad con GitHub Pages. Una capa local permite compartir validación, tooltips y estados de botones entre páginas estáticas y contenido generado dinámicamente.

**Impacto:**
Contacto y formularios de demos muestran errores en español, estados de carga y confirmación; los botones de icono reciben tooltips; el consentimiento y el comparador usan controles visuales claros; tarjetas, KPI y skeletons reciben microinteracciones sobrias. No cambia el stack ni se agregan solicitudes externas.

**Alternativas consideradas:**
- Copiar componentes completos de autores individuales de Uiverse.
- Cargar una biblioteca de componentes o CSS desde un CDN.
- Mantener patrones distintos en cada formulario y demo.

**Archivos relacionados:**
- `assets/css/base.css`
- `assets/js/ui-enhancements.js`
- `assets/js/commercial-pages.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/js/priority-demo.js`
- `assets/js/workflow-demo.js`
- `scripts/ui-enhancements.spec.js`
- `index.html`
- `rubros/*/index.html`

## 2026-09-06 - Tres rubros nuevos sobre el motor compartido

**Decisión:**
Agregar Talleres y Servicios Técnicos, Estudios Contables, y Constructoras y Obras como demos estáticas configurables, reutilizando `industry-demo.js`, `workflow-demo.js`, `demo-experience.js` y `pdf-report.js`.

**Motivo:**
Los tres sectores permiten mostrar operaciones con alta carga documental, aprobaciones y seguimiento. La estructura compartida mantiene consistencia, bajo costo de mantenimiento y compatibilidad con GitHub Pages.

**Impacto:**
El catálogo pasa de 9 a 12 demos y el sitemap de 14 a 17 páginas indexables. Cada rubro agrega cinco vistas de negocio, reportes, asistente y dos workflows. Las referencias funcionales de Estudios Contables se basan en agenda, comprobantes, declaraciones, pagos y saldos publicados por ARCA; Constructoras contempla medición, certificado, curva de avance y evidencia solicitada en trámites oficiales. Toda integración sigue siendo ficticia.

**Alternativas consideradas:**
- Crear páginas independientes con lógica duplicada.
- Migrar el catálogo a un framework antes de validar los nuevos sectores.
- Conectar organismos externos desde una demo pública sin backend ni autenticación.

**Archivos relacionados:**
- `assets/js/demo-catalog.js`
- `assets/js/industry-demo-data.js`
- `assets/js/workflow-demo.js`
- `rubros/talleres/index.html`
- `rubros/estudios-contables/index.html`
- `rubros/constructoras/index.html`
- `scripts/phase7.spec.js`

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

## 2026-09-06 - SEO estático por página y presentación interna

**Decisión:**
Definir metadatos completos directamente en cada HTML indexable y crear una presentación comercial propia en `presentacion/`, excluida del índice público.

**Motivo:**
GitHub Pages no tiene renderizado del lado del servidor. Los títulos, descripciones, canonical, vistas sociales y datos estructurados deben estar disponibles desde el documento inicial, mientras que el material interno de reuniones no necesita competir en resultados de búsqueda.

**Impacto:**
Las catorce páginas públicas tienen identidad SEO individual; la home agrega `Organization` y `WebSite`; el equipo dispone de una presentación responsive, imprimible y con guion por diapositiva.

**Alternativas consideradas:**
- Inyectar metadatos con JavaScript.
- Publicar una presentación indexable dentro de la navegación principal.
- Incorporar un framework con generación estática.

**Archivos relacionados:**
- `index.html`
- `demos/index.html`
- `servicios/index.html`
- `automatizaciones/index.html`
- `contacto/index.html`
- `rubros/*/index.html`
- `presentacion/index.html`
- `sitemap.xml`

## 2026-09-06 - Analítica opcional sin seguimiento por defecto

**Decisión:**
Preparar Cloudflare Web Analytics mediante un cargador local que solo agrega el beacon cuando existe un token público configurado.

**Motivo:**
Permite incorporar métricas agregadas en una fase posterior sin declarar una integración inexistente, sin almacenar secretos y sin hacer solicitudes de seguimiento antes de una decisión explícita.

**Impacto:**
`assets/js/analytics.js` se carga en las catorce páginas indexables. En el estado actual no envía datos y expone un indicador verificable para las pruebas.

**Alternativas consideradas:**
- Google Analytics.
- Un contador propio con backend.
- Activar un proveedor sin contar todavía con el token del sitio.

**Archivos relacionados:**
- `assets/js/analytics.js`
- `scripts/phase6.spec.js`
- `docs/obsidian/07_Integraciones.md`

## 2026-09-07 - Plantilla PDF única y descarga directa

**Decisión:**
Mantener un único generador jsPDF para todos los rubros, ajustar cada logo dentro de una caja conservando su relación de aspecto, ubicar la fecha debajo del título y dibujar la marca de agua “DEMO” al final con opacidad reducida. La acción visible queda como “Ver PDF” y se elimina “Ver dashboard”.

**Motivo:**
La plantilla anterior deformaba logos con lienzos transparentes grandes, podía superponer título y fecha y mostraba una acción de dashboard que no aportaba una vista adicional.

**Impacto:**
Los doce rubros descargan documentos visualmente consistentes y el usuario dispone de una única acción de reporte comprobable.

**Alternativas consideradas:**
- Mantener dimensiones fijas para todos los logos.
- Crear una plantilla PDF distinta por rubro.
- Conservar una acción de dashboard sin una vista diferenciada.

**Archivos relacionados:**
- `assets/js/pdf-report.js`
- `assets/js/medical-demo.js`
- `assets/js/industry-demo.js`
- `assets/js/priority-demo.js`
- `assets/js/workflow-demo.js`
- `rubros/*/index.html`

## 2026-09-07 - Secuencias de estados por rubro y acciones terminales

**Decisión:**
Definir en la configuración de cada demo una secuencia cronológica de estados y calcular la próxima transición desde esa secuencia. Cuando el registro ya está en el último estado, la acción de avance se omite del menú. El mismo criterio se aplica a admisiones médicas y tablas de módulos avanzados.

**Motivo:**
Evita transiciones repetidas o incoherentes y hace que Talleres, Estudios Contables, Constructoras y el resto de los rubros representen circuitos operativos comprensibles durante una presentación.

**Impacto:**
Las once demos configurables usan un único mecanismo de progresión, la agenda médica no vuelve a ofrecer admisión para turnos admitidos o en sala y los módulos avanzados ocultan acciones una vez alcanzado un estado terminal.

**Alternativas consideradas:**
- Mantener un estado siguiente fijo por rubro.
- Dejar la acción visible pero deshabilitada.
- Resolver cada demo con lógica independiente.

**Archivos relacionados:**
- `assets/js/industry-demo-data.js`
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`
- `assets/js/priority-demo.js`
- `scripts/phase3.spec.js`
- `scripts/phase4.spec.js`

## 2026-09-07 - Campos comerciales dependientes sin backend

**Decisión:**
Resolver en el navegador los valores y campos que dependen de una selección: el presupuesto inmobiliario cambia según el tipo de interés y el formulario comercial habilita aclaraciones obligatorias para “Otro rubro” y “Otra necesidad”.

**Motivo:**
GitHub Pages no dispone de backend propio y estas dependencias mejoran la calidad del dato antes de enviar el formulario a FormSubmit.

**Impacto:**
Alquiler comercial propone `ARS 500.000`, compra de vivienda `USD 80.000` y lote o inversión `USD 35.000`. Las aclaraciones condicionales permanecen deshabilitadas cuando no corresponden y se incluyen en el envío solo cuando están visibles.

**Alternativas consideradas:**
- Mostrar todos los campos permanentemente.
- Dejar el presupuesto sin valor orientativo.
- Incorporar una dependencia externa para formularios dinámicos.

**Archivos relacionados:**
- `contacto/index.html`
- `assets/js/commercial-pages.js`
- `assets/js/industry-demo.js`
- `assets/js/industry-demo-data.js`

## 2026-09-12 - Organizar las demos por problemas antes que por rubros

**Decisión:**
El catálogo presenta primero cuatro situaciones concretas y conserva después las demos por tipo de operación. Se agregan Gestión PyME y Turnos porque cubren necesidades transversales no representadas por una industria específica.

**Motivo:**
Una persona identifica antes un problema de caja, agenda, reservas o stock que una arquitectura de módulos. La orientación por necesidad hace más clara la conversación comercial y evita agregar rubros sin una diferencia funcional real.

**Impacto:**
`demos/index.html` suma hero fotográfico, rutas numeradas y filtros por grupos. El catálogo pasa de 12 a 14 demos y la home destaca las experiencias con mayor cobertura transversal.

**Alternativas consideradas:**
- Mantener un catálogo ordenado solo por industria.
- Crear una demo separada para cada tipo de comercio.
- Convertir todo el sitio al stack Next.js usado por Click.

**Archivos relacionados:**
- `demos/index.html`
- `index.html`
- `assets/js/demo-catalog.js`
- `assets/js/app.js`
- `assets/css/base.css`

## 2026-09-12 - Profundizar Gastronomía en lugar de duplicar Restaurante

**Decisión:**
La disponibilidad de mesas, reservas y lista de espera se incorpora dentro de Gastronomía. La lógica es local, explicable y se detiene al alcanzar el estado final.

**Motivo:**
Una nueva demo de restaurante repetiría pedidos, caja, menú y stock. Ampliar Gastronomía mantiene una propuesta única y permite mostrar un recorrido completo desde la reserva hasta la atención.

**Impacto:**
La nueva vista busca la mesa de menor capacidad compatible, explica la elección, propone alternativas cuando no hay lugar y permite conservar la solicitud en espera. Todo funciona con datos ficticios en memoria.

**Alternativas consideradas:**
- Crear un rubro adicional llamado Restaurantes.
- Mantener las reservas como un registro genérico de pedido.
- Simular una recomendación sin exponer la evidencia.

**Archivos relacionados:**
- `rubros/gastronomia/index.html`
- `assets/js/gastronomy-reservations.js`
- `assets/js/industry-demo-data.js`
- `assets/js/workflow-demo.js`

## 2026-09-12 - Adaptar el lenguaje visual de Click sin copiar su identidad ni su stack

**Decisión:**
Trasladar a SC los principios que funcionan en Click: portadas fotográficas de alto contraste, títulos directos, bloques numerados, microinteracciones breves y una navegación comercial consistente. La implementación permanece en HTML, CSS y JavaScript estático propio.

**Motivo:**
La calidad percibida proviene de la jerarquía y del recorrido, no de migrar a Next.js ni de copiar componentes. Mantener el stack actual conserva GitHub Pages simple y reduce riesgo sobre las demos existentes.

**Impacto:**
Se crea `nosotros/index.html`, se unifican las cinco áreas comerciales principales más Automatizaciones y se asignan acentos por rubro a las catorce demos.

**Alternativas consideradas:**
- Migrar SC a Next.js, Tailwind y los componentes de Click.
- Copiar animaciones y componentes completos.
- Rediseñar cada demo por separado.

**Archivos relacionados:**
- `nosotros/index.html`
- `assets/css/base.css`
- `assets/js/motion.js`

## 2026-09-12 - Simular conceptos de n8n sin incrustar ni conectar una instancia real

**Decisión:**
Implementar un laboratorio local con tres workflows, inspector de nodos, payload ficticio, aprobación humana, error temporal, reintento y bitácora.

**Motivo:**
Permite explicar automatizaciones durante una reunión sin credenciales, backend, datos reales ni dependencia de disponibilidad externa.

**Impacto:**
El laboratorio aclara su carácter conceptual y no ejecuta definiciones reales de n8n. Una integración futura deberá definir autenticación, idempotencia, tiempos de espera, permisos y persistencia.

**Alternativas consideradas:**
- Incrustar el editor real de n8n.
- Mostrar una captura estática.
- Conectar la demo pública a una instancia con credenciales.

**Archivos relacionados:**
- `automatizaciones/index.html`
- `assets/js/n8n-lab.js`
- `assets/css/base.css`
## 2026-09-13 - Barra comercial sin migrar el stack estático

**Decisión:**
Unificar las seis páginas comerciales con una barra oscura translúcida, navegación directa, un solo CTA y menú móvil controlado por JavaScript local.

**Motivo:**
La interfaz anterior acumulaba botones y un desplegable redundante; además, el CTA de Nosotros podía comprimirse y cortar su texto. La referencia de Click mostró una jerarquía más clara, pero no justificó migrar SC a React o agregar un proceso de build.

**Impacto:**
Mejora lectura, orientación, navegación por teclado y uso móvil. El controlador compartido agrega estado al hacer scroll y cierre por enlace, clic exterior o `Escape`.

**Alternativas consideradas:**
- Migrar a Next.js, Tailwind, shadcn y Base UI como Click: descartado por complejidad y falta de beneficio para el despliegue estático actual.
- Incorporar Lenis, ScrollTrigger y Swiper: postergado hasta existir una necesidad concreta de scroll dirigido o carruseles.
- Mantener la barra clara con botones independientes: descartado por densidad visual y duplicación del menú Explorar.

**Archivos relacionados:**
- `assets/css/base.css`
- `assets/js/site-navigation.js`
- `index.html`
- `servicios/index.html`
- `demos/index.html`
- `automatizaciones/index.html`
- `nosotros/index.html`
- `contacto/index.html`
- `scripts/phase9.spec.js`

## 2026-09-13 - Resultados operativos por workflow

**Decisión:**
Ampliar el laboratorio de tres a seis procesos y modelar un resultado específico para cada uno, visible como expectativa antes de ejecutar y como salida confirmada al finalizar.

**Motivo:**
Una secuencia de nodos sola explica la mecánica, pero no deja claro qué obtiene el negocio. Métricas, identificadores y estados concretos permiten presentar valor operativo sin fingir conexiones reales.

**Impacto:**
Agenda, ventas, stock, cobranzas, reservas y reportes comparten la misma máquina de estados y muestran vista previa, procesamiento, aprobación pendiente, error o resultado generado.

**Alternativas consideradas:**
- Crear una página independiente por flujo: descartado por repetición y mayor mantenimiento.
- Conectar una instancia pública de n8n: descartado hasta definir autenticación, secretos, persistencia y límites.
- Mostrar resultados estáticos sin ejecución: descartado porque reduce el valor demostrativo.

**Archivos relacionados:**
- `automatizaciones/index.html`
- `assets/js/n8n-lab.js`
- `assets/css/base.css`
- `scripts/phase9.spec.js`

## 2026-09-13 - Presentación humana de Soluciones Conectadas

**Decisión:**
Incorporar en Nosotros una sección personal con la fotografía profesional provista por el responsable de SC, seguida por tres criterios de trabajo y una declaración breve.

**Motivo:**
La referencia de Click demuestra que mostrar quién está detrás del servicio mejora confianza y hace más comprensible la forma de trabajo. SC necesitaba esa señal humana sin copiar el lenguaje visual ni los datos personales de otra marca.

**Impacto:**
La página gana una fotografía propia y un relato en primera persona. Hasta recibir nombre y título exactos, la interfaz identifica la función como dirección de proyectos y evita inventar información profesional.

**Alternativas consideradas:**
- Mantener únicamente una presentación institucional: descartado por resultar distante.
- Usar el retrato como fondo del hero: descartado porque reduce inspección de la imagen y competiría con el método visual.
- Copiar la composición de Click de forma literal: descartado para conservar identidad SC.

**Archivos relacionados:**
- `nosotros/index.html`
- `assets/img/sc-profile.webp`
- `assets/css/base.css`
- `assets/js/motion.js`
- `scripts/phase9.spec.js`

## 2026-09-13 - Servicios demostrables y contacto revisable

**Decisión:**
Reorganizar las siete capacidades técnicas en cinco recorridos comerciales, acompañarlos con capturas reales de las demos y agregar al formulario un resumen local previo al envío.

**Motivo:**
La lista anterior era precisa pero repetitiva y no mostraba suficiente evidencia del producto. En Contacto, un resumen visible reduce errores y ayuda a ordenar la consulta sin pedir información adicional.

**Impacto:**
Servicios comunica gestión, automatización e integración, atención, datos y reportes, y diagnóstico sin eliminar capacidades. Contacto conserva FormSubmit y no agrega persistencia, backend ni transmisión automática.

**Alternativas consideradas:**
- Crear una página independiente por cada servicio: descartado por fragmentar el recorrido y aumentar mantenimiento.
- Usar fotografías genéricas en Servicios: descartado porque las capturas propias demuestran mejor el trabajo disponible.
- Generar el resumen de Contacto mediante un servicio externo: descartado porque no aporta valor y ampliaría la exposición de datos.

**Archivos relacionados:**
- `servicios/index.html`
- `contacto/index.html`
- `assets/css/base.css`
- `assets/js/commercial-pages.js`
- `assets/js/motion.js`
- `assets/img/service-*-preview.webp`
- `scripts/phase9.spec.js`
