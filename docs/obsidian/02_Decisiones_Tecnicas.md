# Decisiones Técnicas

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
