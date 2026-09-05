# Soluciones Conectadas - Landing y Demos

Repositorio estático para la landing principal de Soluciones Conectadas y sus demos comerciales por rubro.

Slogan comercial aplicado: **Tu operación conectada: sistemas, automatizaciones e inteligencia para crecer sin fricción.**

La idea es tener una web principal profesional, responsive y orientada a ventas, con servicios de SC, automatizaciones, integraciones, reporterías, diagnóstico express y mockups funcionales por industria. Cada demo usa datos ficticios y evita nombres, logos o información sensible de clientes reales.

URL prevista para GitHub Pages:

```text
https://maicolandresb123.github.io/Mockups_Ventas/
```

## Secciones principales

- Inicio: presentación de Soluciones Conectadas.
- Servicios: sistemas de gestión, automatizaciones, integraciones, chatbots, dashboards y demos comerciales.
- Demos por rubro: página separada `demos/index.html` con filtros y acceso a experiencias navegables.
- Automatizaciones: n8n, Node-RED, APIs, webhooks, bots, dashboards, Grafana, PDFs y emails programados.
- Diagnóstico express: selector interactivo que recomienda una ruta de demo y prepara contacto por WhatsApp.
- Proceso: diagnóstico, demo funcional, automatización y evolución.
- Contacto comercial: WhatsApp, teléfono, email e Instagram públicos de SC.

## Rubros iniciales

- Área médica: turnero, chatbot, historia clínica, consultas, obras sociales y reportes.
- Hotelería: reservas, habitaciones, huéspedes, operaciones internas y reportes de ocupación.
- Inmobiliarias: propiedades, leads, visitas, operaciones y reportes de conversión.
- Venta de materiales: stock, presupuestos, pedidos, entregas y reportes de margen.
- Gastronomía: mesas, pedidos, menú digital, caja y reportes de cierre.
- Educación: alumnos, cursos, asistencia, pagos, comunicaciones y reportes académicos.
- Gomerías: stock por medida, turnos, servicios, compras sugeridas, caja y reportes.
- Agrimensores: expedientes, campo, planos, documentación y conectividad ATER simulada.
- Logística y transporte: viajes, flota, remitos, tracking, alertas de SLA y reportes.

## Estructura

```text
.
├── .gitignore
├── .nojekyll
├── demos/
│   └── index.html
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   └── base.css
│   ├── img/
│   │   ├── education-demo.jpg
│   │   ├── gastronomy-demo.jpg
│   │   ├── hospitality-demo.jpg
│   │   ├── landing-hero.jpg
│   │   ├── materials-demo.jpg
│   │   ├── medical-demo.jpg
│   │   ├── medical-hero.jpg
│   │   ├── real-estate-demo.jpg
│   │   ├── logistics-demo.jpg
│   │   ├── sc-favicon.png
│   │   ├── sc-color.png
│   │   ├── sc-imagotipo.png
│   │   ├── sc-imagotipo-dark.png
│   │   ├── sc-symbol.png
│   │   ├── sc-white.png
│   │   ├── survey-demo.jpg
│   │   └── tires-demo.jpg
│   └── js/
│       ├── app.js
│       ├── demo-catalog.js
│       ├── industry-demo-data.js
│       ├── industry-demo.js
│       ├── medical-demo.js
│       ├── pdf-report.js
│       └── motion.js
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
│   ├── inmobiliarias/
│   │   └── index.html
│   ├── materiales/
│   │   └── index.html
│   └── medica/
│       └── index.html
└── docs/
    └── obsidian/
```

## Cómo ver la landing y las demos

Abrir `index.html` en el navegador. No requiere build ni instalación de dependencias.

Para validar rutas relativas con servidor local:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Luego abrir `http://127.0.0.1:4173/index.html`.

## Publicación en GitHub Pages

Configuración prevista:

- Fuente: `Deploy from a branch`.
- Rama: `main`.
- Carpeta: `/ (root)`.
- Dominio: GitHub Pages por defecto, sin dominio propio.
- Archivo raíz: `index.html`.
- `.nojekyll`: incluido para publicar los assets estáticos sin procesamiento de Jekyll.

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
- Las acciones de contacto público abren email, teléfono, Instagram o WhatsApp; las demos no envían mensajes reales por sí mismas.

## Identidad visual SC

- Tinta principal: `#22333f`.
- Azul SC: `#0060c0`.
- Cian SC: `#00b0e8`.
- Estética: SaaS operativo premium con superficies claras, sombras sobrias, microinteracciones y animaciones suaves.
- Animaciones: GSAP por CDN con fallback CSS y respeto por `prefers-reduced-motion`.
- Los servicios de la home abren modales informativos para explicar alcance, entregables y resultado esperado.
