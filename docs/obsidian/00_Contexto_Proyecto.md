# Contexto del Proyecto

## Objetivo

Crear una landing principal profesional de Soluciones Conectadas y demos comerciales funcionales por rubro, hechas con HTML, CSS y JavaScript estático. La web presenta servicios, automatizaciones, integraciones y experiencias navegables para reuniones con clientes.

## Estado actual

El repositorio tiene una landing principal responsive de SC, una página separada de catálogo en `demos/index.html` y nueve demos funcionales para presentaciones comerciales: área médica, hotelería, inmobiliarias, venta de materiales, gastronomía, educación, gomerías, agrimensores y logística/transporte. La estética usa identidad visual SC, logo real, paleta azul/cian/tinta, imágenes locales por rubro, dropdowns, microinteracciones, animaciones CSS y animaciones GSAP por CDN. Todas las demos incluyen reportería demo con tablero tipo Grafana, PDF descargable con encabezado/pie institucional SC mediante jsPDF y preparación de email sin envío real. La landing ya tiene datos públicos de contacto, diagnóstico express interactivo, servicios con modal informativo y preparación para GitHub Pages simple desde `main` y `/`.

## Stack técnico

- Frontend: HTML, CSS, JavaScript sin build, GSAP por CDN y jsPDF por CDN para reportes.
- Backend: no aplica en esta etapa.
- Base de datos: datos ficticios embebidos en JavaScript.
- Automatización: sección comercial para n8n, Node-RED, APIs, webhooks, bots, dashboards, Grafana, PDFs y emails programados.
- Infraestructura: compatible con apertura directa del HTML, servidor estático local o GitHub Pages simple desde `main` y carpeta `/`.
- IA / agentes: chatbot simulado con respuestas predefinidas.

## Módulos principales

- Landing principal institucional: `index.html`.
- Catálogo separado de demos: `demos/index.html`.
- Demo área médica: `rubros/medica/index.html`.
- Demo hotelería: `rubros/hoteleria/index.html`.
- Demo inmobiliarias: `rubros/inmobiliarias/index.html`.
- Demo venta de materiales: `rubros/materiales/index.html`.
- Demo gastronomía: `rubros/gastronomia/index.html`.
- Demo educación: `rubros/educacion/index.html`.
- Demo gomerías: `rubros/gomerias/index.html`.
- Demo agrimensores: `rubros/agrimensores/index.html`.
- Demo logística y transporte: `rubros/logistica/index.html`.
- Estilos compartidos: `assets/css/base.css`.
- Assets de marca SC: `assets/img/sc-imagotipo.png`, `assets/img/sc-symbol.png`, `assets/img/sc-favicon.png`, `assets/img/sc-color.png`, `assets/img/sc-white.png` y `assets/img/sc-imagotipo-dark.png`.
- Imágenes locales de presentación: `assets/img/*-demo.jpg`, `assets/img/landing-hero.jpg`, `assets/img/medical-hero.jpg`.
- Lógica compartida del hub: `assets/js/app.js`.
- Catálogo central de demos: `assets/js/demo-catalog.js`.
- Generador de PDF con marca SC: `assets/js/pdf-report.js`.
- Lógica demo médica: `assets/js/medical-demo.js`.
- Motor común para demos por rubro: `assets/js/industry-demo.js`.
- Datos ficticios por rubro: `assets/js/industry-demo-data.js`.
- Animaciones compartidas: `assets/js/motion.js`.
- SEO y publicación estática: `.nojekyll`, `robots.txt` y `sitemap.xml`.

## Cómo ejecutar

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Luego abrir `http://127.0.0.1:4173/index.html`. También puede abrirse `index.html` directo en navegador, pero el servidor local facilita validar rutas relativas.

## Pendientes importantes

- [ ] Activar GitHub Pages en Settings del repositorio y verificar la URL pública.
- [ ] Hacer commit y push de la iteración actual de mejoras.
- [ ] Revisar licencias/atribución o reemplazar por imágenes propias/generadas antes de una publicación final.

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
