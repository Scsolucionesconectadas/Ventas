# Soluciones Conectadas - Landing y Demos

Repositorio estático para la landing principal de Soluciones Conectadas y sus demos comerciales por rubro.

Slogan comercial aplicado: **Tu operación conectada: sistemas, automatizaciones e inteligencia para crecer sin fricción.**

La idea es tener una web principal profesional, responsive y orientada a ventas, con servicios de SC, automatizaciones, integraciones, reporterías, diagnóstico express y mockups funcionales por industria. Cada demo usa datos ficticios y evita nombres, logos o información sensible de clientes reales.

URL prevista para GitHub Pages:

```text
https://scsolucionesconectadas.github.io/Ventas/
```

## Secciones principales

- Inicio: presentación de Soluciones Conectadas.
- Servicios: sistemas de gestión, automatizaciones, integraciones, chatbots, dashboards y demos comerciales.
- Demos por rubro: página separada `demos/index.html` con filtros y acceso a experiencias navegables.
- Servicios detallados: página separada `servicios/index.html` con entregables y demos relacionadas.
- Automatizaciones: página separada `automatizaciones/index.html` con laboratorio estilo n8n, Node-RED, APIs, webhooks, aprobación, reintentos e inspector de nodos.
- Nosotros: página `nosotros/index.html` con método SC, criterios de trabajo y escenarios donde una solución conectada aporta valor.
- Diagnóstico express: selector interactivo que recomienda módulos, rubros, automatizaciones y prepara contacto por WhatsApp.
- Proceso: diagnóstico, demo funcional, automatización y evolución.
- Contacto comercial: página `contacto/index.html` con formulario estático, WhatsApp, teléfono, email e Instagram públicos de SC.

## Rubros iniciales

- Gestión PyME: ventas, caja, gastos, cobranzas, clientes, productos, stock liviano y prioridades explicables.
- Turnos y agenda: disponibilidad, profesionales, servicios, confirmaciones, recordatorios y lista de espera.
- Área médica: turnero, chatbot, historia clínica, consultas, obras sociales, facturación, autorizaciones, profesionales, documentos, seguimiento y reportes.
- Hotelería: reservas, habitaciones, huéspedes, operaciones internas y reportes de ocupación.
- Inmobiliarias: propiedades, leads, visitas, contratos, reservas, cobranzas, portal del propietario y reportes de conversión.
- Venta de materiales: stock, presupuestos, compras, proveedores, listas de precios, cuentas corrientes, logística, entregas y márgenes.
- Gastronomía: disponibilidad de mesas, reservas, lista de espera, pedidos, menú digital, caja y reportes de cierre.
- Educación: alumnos, cursos, asistencia, pagos, comunicaciones y reportes académicos.
- Gomerías: stock por medida, turnos, servicios, compras sugeridas, caja y reportes.
- Agrimensores: expedientes, campo, planos, documentación y conectividad ATER simulada.
- Logística y transporte: viajes, flota, remitos, tracking, alertas de SLA y reportes.
- Talleres y servicios técnicos: turnos, órdenes de trabajo, diagnósticos, repuestos, aprobaciones y seguimiento posventa.
- Estudios contables: agenda fiscal, clientes, documentación, presentaciones, honorarios y alertas.
- Constructoras y obras: proyectos, avances, mediciones, certificados, contratistas, compras e incidencias.

## Experiencia compartida de las demos

Las catorce demos incluyen una barra operativa común con:

- Modo presentación sin navegación secundaria.
- Recorrido guiado manual y controlable paso a paso.
- Búsqueda global de módulos y registros visibles.
- Centro de actividad y notificaciones simuladas.
- Ejemplos de carga, éxito, error y ausencia de resultados.
- Reinicio de los datos ficticios de la sesión.
- Identificación permanente de demo pública y funciones simuladas.

## Reportería interactiva

Cada demo incorpora un centro de análisis común con cuatro métricas propias del rubro, selección de períodos de 7, 30 y 90 días, comparación con el período anterior y una recomendación operativa contextual. Chart.js `4.5.1` se carga bajo demanda al entrar en la reportería; si el CDN no responde, los valores, la lectura ejecutiva y los mini gráficos CSS continúan disponibles.

Los gráficos actualizan su nombre accesible, respetan `prefers-reduced-motion` y no consultan datos reales. Toda la información visible es ficticia y vive únicamente en el navegador.

## Demos prioritarias de Fase 4

Área médica, inmobiliarias y venta de materiales agregan una capa de gestión avanzada con módulos navegables, KPI específicos, tablas operativas, prioridades y automatizaciones sugeridas. Cada módulo permite crear registros ficticios, actualizar estados, preparar un email sin envío real y descargar un PDF ejecutivo con marca SC.

## Automatizaciones de Fase 5

Las catorce demos incorporan un centro visual de automatización con dos procesos específicos por rubro. Permite alternar entre una representación de n8n y Node-RED, ejecutar un escenario controlado o una falla temporal, reintentar, aprobar manualmente y completar el recorrido `Disparador → Validación → Acción → Aprobación → Reporte → Bitácora`.

La misma vista incluye indicadores filtrables tipo Grafana, comparación por período, programación diaria/semanal/mensual, vista previa editable de email, descarga de PDF con marca SC e historial de ejecuciones. Todo funciona con datos ficticios en el navegador: no conecta servicios externos ni realiza envíos reales.

## Publicación y presentación de Fase 6

- Las diecinueve páginas indexables tienen título, descripción, URL canónica, Open Graph, Twitter Card y favicon.
- La portada declara datos estructurados `Organization` y `WebSite` con información pública de SC.
- `sitemap.xml` incluye fecha de última modificación y `robots.txt` referencia su URL pública.
- `assets/js/analytics.js` deja preparada Cloudflare Web Analytics, desactivada hasta incorporar un token público del sitio.
- `presentacion/index.html` contiene una presentación comercial de ocho diapositivas con notas del expositor, navegación por teclado, pantalla completa y salida imprimible a PDF.
- `docs/GUIA_PRESENTACION_COMERCIAL.md` aporta preguntas de diagnóstico, recorrido sugerido y rutas de demo por necesidad.

## Soluciones orientadas a problemas de Fase 8

- El catálogo comienza por situaciones concretas de gestión, turnos, reservas gastronómicas y stock, y luego permite explorar las 14 demos por tipo de operación.

## Identidad comercial y laboratorio de Fase 9

- Inicio, Servicios, Demos, Automatizaciones, Nosotros y Contacto comparten navegación, fotografía humana, contraste alto y animaciones breves.
- Las seis páginas comparten un footer SC con marca, navegación completa, datos ficticios, acceso a WhatsApp, email e Instagram; se reorganiza en una columna sin desbordes en móvil.
- La portada termina directamente en ese footer compartido; se eliminó la banda comercial repetida que mostraba por segunda vez logo, WhatsApp y datos de contacto.
- El laboratorio comercial ejecuta seis workflows ficticios para agenda, ventas, stock, cobranzas, reservas y reportes; permite inspeccionar nodos, anticipar el resultado, aprobar un paso, provocar un error temporal y reintentar sin conexiones reales.
- Las catorce demos mantienen la misma arquitectura pero reciben acentos visuales por familia de rubro.
- Gestión PyME y Turnos y agenda cubren necesidades transversales que no estaban representadas por una industria específica.
- Gastronomía amplía su alcance sin duplicar demo: busca mesas por capacidad y sector, propone alternativas, administra lista de espera y detiene el avance al finalizar.
- Las tres experiencias incorporan prioridades explicables: cada recomendación muestra la evidencia ficticia que la origina y enlaza con la vista donde se resuelve.

## Estructura

```text
.
├── .gitignore
├── .nojekyll
├── 404.html
├── demos/
│   └── index.html
├── servicios/
│   └── index.html
├── automatizaciones/
│   └── index.html
├── contacto/
│   ├── gracias.html
│   └── index.html
├── presentacion/
│   └── index.html
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   └── presentation.css
│   ├── img/
│   │   ├── *-demo.jpg
│   │   ├── *-demo.webp
│   │   ├── landing-hero.jpg
│   │   ├── landing-hero.webp
│   │   ├── medical-hero.jpg
│   │   ├── medical-hero.webp
│   │   ├── sc-favicon.png
│   │   ├── sc-color.png
│   │   ├── sc-imagotipo.png
│   │   ├── sc-imagotipo-dark.png
│   │   ├── sc-symbol.png
│   │   └── sc-white.png
│   └── js/
│       ├── analytics.js
│       ├── app.js
│       ├── commercial-pages.js
│       ├── demo-catalog.js
│       ├── demo-experience.js
│       ├── industry-demo-data.js
│       ├── industry-demo.js
│       ├── medical-demo.js
│       ├── pdf-report.js
│       ├── reporting-experience.js
│       ├── priority-demo.js
│       ├── presentation.js
│       ├── workflow-demo.js
│       └── motion.js
├── scripts/
│   ├── phase3.spec.js
│   ├── phase4.spec.js
│   ├── phase5.spec.js
│   ├── phase6.spec.js
│   ├── generate_demo_images.py
│   └── optimize_images.py
├── rubros/
│   ├── agrimensores/
│   │   └── index.html
│   ├── educacion/
│   │   └── index.html
│   ├── gastronomia/
│   │   └── index.html
│   ├── gomerias/
│   │   └── index.html
│   ├── hoteleria/
│   │   └── index.html
│   ├── logistica/
│   │   └── index.html
│   ├── talleres/
│   │   └── index.html
│   ├── estudios-contables/
│   │   └── index.html
│   ├── constructoras/
│   │   └── index.html
│   ├── inmobiliarias/
│   │   └── index.html
│   ├── materiales/
│   │   └── index.html
│   └── medica/
│       └── index.html
└── docs/
    ├── GUIA_PRESENTACION_COMERCIAL.md
    └── obsidian/
```

## Cómo ver la landing y las demos

Abrir `index.html` en el navegador. No requiere build ni instalación de dependencias.

Para validar rutas relativas con servidor local:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Luego abrir `http://127.0.0.1:4173/index.html`.

## Calidad y rendimiento

- Las imágenes visibles usan WebP; los activos generados de los rubros nuevos reducen su peso de 6,6 MB a menos de 450 KB en conjunto.
- `python scripts/optimize_images.py` vuelve a crear los WebP con ancho máximo de `1600 px` y calidad `84`. Requiere Pillow.
- Lucide `1.41.0`, GSAP `3.15.0`, Chart.js `4.5.1` y jsPDF `4.2.1` están fijados en las URLs CDN.
- `404.html` mantiene la identidad SC y resuelve correctamente sus enlaces tanto en local como bajo la subruta `/Ventas/` de GitHub Pages.
- Las pestañas incluyen semántica ARIA, selección anunciada y navegación con flechas, `Home` y `End`.
- Los modales conservan el foco, cierran con `Escape` y lo devuelven al control que los abrió.
- Las páginas comerciales y el formulario fueron auditados con Axe Core sobre reglas WCAG A/AA.
- La capa compartida de las catorce demos cuenta con regresión Playwright sobre búsqueda, actividad, estados, presentación, recorrido y reinicio.
- Las tres demos prioritarias cuentan con regresión Playwright de navegación profunda, altas ficticias, estados, búsqueda, PDF, email simulado, teclado, responsive y accesibilidad.
- Las catorce demos cuentan con regresión Playwright de Fase 5 sobre ejecución exitosa, falla, reintento, aprobación humana, filtros, programación, email simulado, PDF, teclado, responsive y accesibilidad.
- La Fase 6 cuenta con regresión Playwright para SEO, datos estructurados, sitemap, analítica inactiva, presentación, impresión, responsive y accesibilidad.
- La Fase 8 valida el catálogo por problemas, las demos de gestión y turnos, la reserva gastronómica, los estados terminales, el responsive y la accesibilidad.
- La Fase 9 valida la identidad comercial, la ruta Nosotros, ambos escenarios del laboratorio n8n y los acentos de las catorce demos.
- La Fase 10 valida la barra comercial compartida, el menú móvil, el cierre con `Escape`, el CTA sin recortes y la ausencia de desbordes.
- La ampliación del laboratorio valida seis procesos, resultados específicos por flujo y estados de vista previa, procesamiento, aprobación, error y finalización.
- La reportería interactiva cuenta con una regresión propia sobre las catorce demos, actualización de métricas, comparación, fallback, responsive y accesibilidad.
- La regresión unificada actual ejecuta 97 pruebas Playwright sin fallas.
- La revisión responsive usa `390x844`, `768x1024`, `1366x768` y `1920x1080`.

## Publicación en GitHub Pages

Configuración prevista:

- Fuente: `Deploy from a branch`.
- Rama: `main`.
- Carpeta: `/ (root)`.
- Dominio: GitHub Pages por defecto, sin dominio propio.
- Archivo raíz: `index.html`.
- `.nojekyll`: incluido para publicar los assets estáticos sin procesamiento de Jekyll.
- Estado remoto: Fase 5 publicada en `origin/main` con el commit `aafbb94`.

## Analítica respetuosa de la privacidad

El cargador de Cloudflare Web Analytics está incluido en las páginas públicas, pero no realiza solicitudes mientras no tenga el atributo `data-cloudflare-token`. Para activarlo, obtener el token público del sitio en Cloudflare y agregarlo al script `analytics.js` de cada página indexable. No guardar credenciales privadas en el HTML.

La Fase 6 verifica automáticamente que, sin token, `window.SCAnalytics.enabled` sea `false` y no se contacte el dominio de Cloudflare.

## Formulario de contacto

El formulario estático usa FormSubmit y envía consultas a `contacto.solucionesconectadas@gmail.com` sin requerir backend propio.

- Destino: `https://formsubmit.co/contacto.solucionesconectadas@gmail.com`.
- Protección: reCAPTCHA activo y campo honeypot `_honey`.
- Confirmación: `contacto/gracias.html`.
- Activación inicial: el primer envío real genera un email de confirmación de FormSubmit que debe aceptarse desde la casilla de SC.
- Durante las pruebas automáticas no se envía el formulario ni se genera correo real.

## Contacto público

- Email: `contacto.solucionesconectadas@gmail.com`.
- WhatsApp / teléfono: `3442472233`.
- Instagram: `@sc.soluciones.ar`.

## Criterios de contenido

- Todos los datos visibles deben ser ficticios.
- No usar marcas, logos, CUIT, direcciones, teléfonos o emails reales de clientes.
- Los emails visibles son dominios demo `@demo.local` y no deben usarse como destinatarios reales.
- Cada rubro debe mostrar flujos concretos, no solo una landing.
- Las pantallas deben poder explicarse en una presentación comercial de 5 a 10 minutos.
- La reportería simula dashboards tipo Grafana, descarga de PDF y preparación de emails sin enviar correos reales.
- Los PDFs demo se generan en navegador con jsPDF `4.2.1` por CDN, encabezado de marca, indicadores y pie institucional SC.
- Las acciones de contacto público abren email, teléfono, Instagram o WhatsApp; el formulario de contacto envía datos solamente después de activar FormSubmit.
- Las demos no envían mensajes, reportes ni emails reales por sí mismas.

## Identidad visual SC

- Tinta principal: `#22333f`.
- Azul SC: `#0060c0`.
- Cian SC: `#00b0e8`.
- Estética: SaaS operativo premium con superficies claras, sombras sobrias, microinteracciones y animaciones suaves.
- Animaciones: GSAP `3.15.0` por CDN con fallback CSS y respeto por `prefers-reduced-motion`.
- Los servicios de la home abren modales informativos para explicar alcance, entregables y resultado esperado.

## Navegación comercial de Fase 10

- Inicio, Servicios, Demos, Automatizaciones, Nosotros y Contacto comparten una barra oscura translúcida con navegación directa y un único CTA.
- En tablet y móvil, la navegación se transforma en un menú accesible que cierra al elegir un enlace, hacer clic afuera o presionar `Escape`.
- `assets/js/site-navigation.js` controla únicamente estado, foco y respuesta al scroll; la presentación permanece en CSS local.
- La revisión del stack de Click confirmó GSAP, Lenis, Lucide, Swiper, Tailwind, shadcn y Base UI. SC conserva GSAP y Lucide, y no agrega dependencias que requieran migrar el sitio estático a React o incorporar un proceso de build.

## Perfil humano en Nosotros

- `nosotros/index.html` incorpora una presentación personal inspirada en la jerarquía de la página Nosotros de Click, adaptada a la identidad operativa de SC.
- `assets/img/sc-profile.webp` deriva de la fotografía profesional provista por el responsable de SC; solo fue redimensionada y convertida a WebP, sin generación ni modificación del retrato.
- La sección explica procesos claros, tecnología aplicable y trabajo cercano sin publicar un nombre o título profesional no confirmado.

## Recorridos comerciales de Servicios y Contacto

- `servicios/index.html` reúne las siete capacidades originales en cinco recorridos comprensibles: gestión, automatización e integración, atención, datos y reportes, y demos con diagnóstico.
- Cada recorrido muestra una captura WebP obtenida de una demo real del repositorio, el problema que atiende, el resultado esperado y accesos relacionados.
- `contacto/index.html` mantiene el envío mediante FormSubmit y agrega un resumen local que refleja nombre, organización, rubro, necesidad y situación antes de confirmar el formulario.
- El resumen no persiste ni transmite información por separado; solo lee los controles ya presentes en el navegador.
- La versión de caché compartida de las demos es `20260913-p14`; las páginas comerciales usan `20260913-p15`.
