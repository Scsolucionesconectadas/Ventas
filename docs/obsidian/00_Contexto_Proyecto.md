# Contexto del Proyecto

## Objetivo

Crear una landing principal profesional de Soluciones Conectadas y demos comerciales funcionales por rubro, hechas con HTML, CSS y JavaScript estático. La web presenta servicios, automatizaciones, integraciones y experiencias navegables para reuniones con clientes.

## Estado actual

El repositorio tiene una landing principal responsive de SC, páginas comerciales separadas para servicios, automatizaciones, demos y contacto, y catorce demos funcionales para presentaciones: Gestión PyME, Turnos y agenda, área médica, hotelería, inmobiliarias, venta de materiales, gastronomía, educación, gomerías, agrimensores, logística/transporte, talleres y servicios técnicos, estudios contables, y constructoras/obras. El catálogo se organiza primero por problemas frecuentes y luego por tipo de operación. Gestión PyME, Turnos y Gastronomía incorporan recomendaciones explicables basadas únicamente en datos ficticios. El contacto usa FormSubmit, además de WhatsApp, email e Instagram. Las demos no conectan servicios externos ni realizan envíos reales.

## Stack técnico

- Frontend: HTML, CSS, JavaScript sin build, Lucide `1.41.0`, GSAP `3.15.0`, Chart.js `4.5.1` y jsPDF `4.2.1` por CDN.
- Backend: no aplica; el formulario delega el envío a FormSubmit.
- Base de datos: datos ficticios embebidos en JavaScript.
- Automatización: sección comercial para n8n, Node-RED, APIs, webhooks, bots, dashboards, Grafana, PDFs y emails programados.
- Infraestructura: compatible con apertura directa del HTML, servidor estático local o GitHub Pages simple desde `main` y carpeta `/`.
- IA / agentes: chatbot simulado con respuestas predefinidas.

## Módulos principales

- Landing principal institucional: `index.html`.
- Catálogo separado de demos: `demos/index.html`.
- Servicios detallados: `servicios/index.html`.
- Automatizaciones y explorador de flujos: `automatizaciones/index.html`.
- Contacto y confirmación: `contacto/index.html` y `contacto/gracias.html`.
- Demo área médica: `rubros/medica/index.html`.
- Demo hotelería: `rubros/hoteleria/index.html`.
- Demo inmobiliarias: `rubros/inmobiliarias/index.html`.
- Demo venta de materiales: `rubros/materiales/index.html`.
- Demo gastronomía: `rubros/gastronomia/index.html`.
- Demo educación: `rubros/educacion/index.html`.
- Demo gomerías: `rubros/gomerias/index.html`.
- Demo agrimensores: `rubros/agrimensores/index.html`.
- Demo logística y transporte: `rubros/logistica/index.html`.
- Demo talleres y servicios técnicos: `rubros/talleres/index.html`.
- Demo estudios contables: `rubros/estudios-contables/index.html`.
- Demo constructoras y obras: `rubros/constructoras/index.html`.
- Estilos compartidos: `assets/css/base.css`.
- Assets de marca SC: `assets/img/sc-imagotipo.png`, `assets/img/sc-symbol.png`, `assets/img/sc-favicon.png`, `assets/img/sc-color.png`, `assets/img/sc-white.png` y `assets/img/sc-imagotipo-dark.png`.
- Imágenes locales de presentación: WebP para uso público; Fases 7 y 8 usan fotografías generadas y optimizadas sin datos ni marcas reales.
- Página de error con identidad SC: `404.html`.
- Optimizador reproducible de imágenes: `scripts/optimize_images.py`.
- Lógica compartida del hub: `assets/js/app.js`.
- Interacciones de páginas comerciales: `assets/js/commercial-pages.js`.
- Navegación comercial responsive: `assets/js/site-navigation.js`.
- Laboratorio interactivo de workflows en la página comercial: `assets/js/n8n-lab.js`.
- Estados visuales, tooltips y validación compartida: `assets/js/ui-enhancements.js`.
- Catálogo central de demos: `assets/js/demo-catalog.js`.
- Generador de PDF con marca SC: `assets/js/pdf-report.js`.
- Centro de análisis interactivo y gráficos de reportería: `assets/js/reporting-experience.js`.
- Lógica demo médica: `assets/js/medical-demo.js`.
- Motor común para demos por rubro: `assets/js/industry-demo.js`.
- Experiencia comercial común de demos: `assets/js/demo-experience.js`.
- Gestión avanzada de demos prioritarias: `assets/js/priority-demo.js`.
- Centro compartido de automatizaciones: `assets/js/workflow-demo.js`.
- Cargador opcional de analítica: `assets/js/analytics.js`.
- Presentación comercial: `presentacion/index.html`, `assets/css/presentation.css` y `assets/js/presentation.js`.
- Guion de reuniones: `docs/GUIA_PRESENTACION_COMERCIAL.md`.
- Regresiones de experiencia, demos prioritarias, automatizaciones, publicación, rubros nuevos, soluciones por problema, identidad comercial, reportería e interfaz compartida: `scripts/phase3.spec.js`, `scripts/phase4.spec.js`, `scripts/phase5.spec.js`, `scripts/phase6.spec.js`, `scripts/phase7.spec.js`, `scripts/phase8.spec.js`, `scripts/phase9.spec.js`, `scripts/reporting-experience.spec.js` y `scripts/ui-enhancements.spec.js`.
- Datos ficticios por rubro: `assets/js/industry-demo-data.js`.
- Animaciones compartidas: `assets/js/motion.js`.
- SEO y publicación estática: `.nojekyll`, `robots.txt` y `sitemap.xml`.

## Cómo ejecutar

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Luego abrir `http://127.0.0.1:4173/index.html`. También puede abrirse `index.html` directo en navegador, pero el servidor local facilita validar rutas relativas.

## Pendientes importantes

- [ ] Confirmar el primer envío de FormSubmit desde el email de SC.
- [ ] Probar la versión publicada desde un celular físico.
- [ ] Crear la propiedad de Cloudflare Web Analytics y agregar su token público si se decide activar la medición.

## Últimas decisiones importantes

- Se eligió iniciar con una base estática para acelerar demos comerciales sin depender de build ni backend.
- La primera demo completa es el área médica por su valor para mostrar varios módulos en una sola reunión.
- Se adoptó la paleta visual SC tomada del logo adjunto: tinta oscura, azul SC y cian SC.
- La página principal pasa a ser landing institucional de SC con apartado de demos y automatizaciones.
- Las demos nuevas usan un motor común basado en configuración para acelerar rubros sin duplicar lógica.
- Se agregaron imágenes locales y reportería demo para mejorar confiabilidad y valor comercial antes de publicar.
- Se definió publicación inicial por GitHub Pages simple, sin dominio propio.
- Se adoptó el slogan comercial: "Tu operación conectada: sistemas, automatizaciones e inteligencia para crecer sin fricción."
- Se agregó un diagnóstico express interactivo para recomendar rutas de demo y preparar contacto por WhatsApp.
- Se separó el catálogo completo de demos en `demos/index.html` y la home quedó como landing institucional con preview.
- Se agregó jsPDF `4.2.1` por CDN para PDFs demo con encabezado, pie institucional, logos SC y estructura ejecutiva.
- Se fijaron las versiones CDN, se adoptó WebP para las imágenes visibles y se agregó una página 404 propia.
- Se incorporó semántica de pestañas, navegación por teclado y gestión de foco en el modal de servicios.
- Se adoptó una arquitectura multipágina para servicios, automatizaciones y contacto, manteniendo la home como resumen comercial.
- Se eligió FormSubmit para recibir consultas desde GitHub Pages sin incorporar backend ni credenciales al repositorio.
- La Fase 2 comercial multipágina fue autorizada para publicación en `origin/main`.
- La Fase 3 usa una capa JavaScript y CSS compartida para evitar duplicar controles y comportamiento en cada rubro.
- El recorrido comercial pasa a ser manual y controlable; las acciones antiguas de “Iniciar demo guiada” abren la nueva experiencia.
- La Fase 4 se implementa como una extensión compartida cargada solo por las tres demos prioritarias, sin duplicar sus motores principales ni afectar los otros rubros.
- En móvil, los accesos avanzados se concentran en las pestañas para evitar duplicar una navegación lateral extensa.
- La Fase 5 usa un único módulo configurable para las catorce demos y representa n8n, Node-RED y Grafana sin afirmar conexiones reales.
- Todo flujo simulado se detiene antes de la entrega hasta recibir aprobación humana y registra intentos, salida y destinatario ficticio.
- La Fase 6 usa metadatos estáticos por página para que el contenido sea visible sin depender de JavaScript.
- Cloudflare Web Analytics queda preparado pero desactivado por defecto; sin token no carga el beacon ni realiza solicitudes.
- La portada comunica alcance comercial con demos, módulos, procesos automáticos y una visión integral, y reserva un área estable para la acción de cada tarjeta de servicio.
- La presentación comercial es interna, tiene `noindex` y se puede navegar, mostrar a pantalla completa o imprimir como PDF.
- La Fase 7 mantiene el motor compartido y suma Talleres, Estudios Contables y Constructoras sin incorporar backend ni dependencias de producción.
- El catálogo reemplaza el término técnico “Roadmap” por “En planificación”, alinea las acciones de las tarjetas y usa fotografías con personas para Gomerías, Agrimensores y Logística.
- Los reportes descargables usan una plantilla PDF compartida con logos proporcionados, fecha separada del título y marca de agua “DEMO” superpuesta y translúcida.
- Los estados operativos avanzan mediante secuencias propias de cada rubro y, al alcanzar el estado final, la acción de avance deja de mostrarse.
- Los formularios ajustan información dependiente cuando corresponde: Inmobiliarias propone el presupuesto según compra o alquiler y Contacto solicita aclaraciones al elegir “Otro rubro” u “Otra necesidad”.
- Uiverse queda registrado como referencia selectiva para componentes HTML/CSS; el plan y los criterios de adopción están en [[14_Plan_Mejoras_UIverse]].
- La primera tanda inspirada en Uiverse se implementa como CSS y JavaScript local, sin copiar componentes completos ni agregar dependencias de ejecución.
- La evolución comercial prioriza problemas transversales antes que una lista creciente de rubros: Gestión PyME resuelve caja, ventas y cobranzas; Turnos resuelve disponibilidad y espera para múltiples servicios.
- Gastronomía conserva una sola demo y profundiza reservas con búsqueda de mesa, explicación de compatibilidad, alternativas, lista de espera y estados terminales.
- La estética del catálogo toma del proyecto Click la contundencia visual, la fotografía humana y el recorrido por necesidades, sin migrar el stack estático ni copiar su identidad.
- Inicio, Servicios, Demos, Automatizaciones, Nosotros y Contacto comparten portadas visuales, navegación y una jerarquía comercial propia de SC.
- El laboratorio comercial estilo n8n ejecuta seis workflows ficticios de agenda, ventas, stock, cobranzas, reservas y reportes; incluye resultados específicos, inspector de nodos, payload, aprobación, falla, reintento y bitácora sin conectarse a servicios reales.
- Las catorce demos reciben acentos por familia de rubro y una secuencia de motion más breve, con revelado progresivo al entrar en pantalla.
- La barra comercial adopta navegación directa, fondo oscuro translúcido, un único CTA y menú móvil accesible sin incorporar dependencias nuevas ni cambiar el stack estático.
- La página Nosotros incorpora el retrato profesional provisto por el responsable de SC y una presentación personal centrada en procesos, tecnología aplicable y acompañamiento directo.
- Servicios agrupa las siete capacidades en cinco recorridos comerciales con capturas reales de las demos, y Contacto incorpora un resumen previo que se actualiza solo en el navegador sin modificar FormSubmit.
- Las catorce demos incorporan un centro de análisis con selección de métricas, períodos de 7, 30 y 90 días, comparación, lectura ejecutiva y recomendación específica del rubro. Chart.js se carga solo al visualizar el reporte y conserva una vista simplificada si el CDN no responde.
- Inicio, Servicios, Demos, Automatizaciones, Nosotros y Contacto comparten un footer comercial SC con identidad, navegación, señales de confianza y contacto directo; conserva lectura, foco y ancho correcto en escritorio y móvil.
- La portada usa el footer como cierre comercial único; la banda redundante de presentación y contacto se retiró antes de la publicación final.
