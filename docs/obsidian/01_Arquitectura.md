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
- `assets/js/demo-experience.js` inyecta la barra común, modales, cajón de actividad, recorrido y modo presentación en las nueve demos.

## Código compartido

- `assets/css/base.css`: sistema visual y responsive común.
- `assets/js/app.js`: catálogo, filtros, modal y diagnóstico de la home.
- `assets/js/commercial-pages.js`: dropdowns, explorador de automatizaciones y preparación del formulario.
- `assets/js/motion.js`: animación progresiva con GSAP y fallback respetando reducción de movimiento.
- `assets/js/demo-catalog.js`: fuente única del catálogo público.
- `assets/js/demo-experience.js`: capa transversal de experiencia comercial sin alterar los motores de datos de cada rubro.

## Flujo de experiencia en demos

Cada página de `rubros/*/index.html` carga primero su motor de negocio y luego `demo-experience.js`. La capa compartida detecta los módulos disponibles desde `data-view`, construye el índice de búsqueda desde el DOM hidratado y observa el `toast` existente para registrar actividad. Los cambios de sesión viven solo en memoria; “Reiniciar demo” usa `sessionStorage` únicamente para confirmar la recarga y vuelve a los datos ficticios originales.

## Flujo de contacto

`contacto/index.html` → `formsubmit.co` → email público de SC → `contacto/gracias.html`

La integración no agrega backend ni secretos al repositorio. El primer envío requiere confirmación manual desde la casilla receptora.

## Rutas públicas

Todas las referencias usan rutas relativas para funcionar en la subruta `/Ventas/`. Los metadatos canónicos y el sitemap usan `https://scsolucionesconectadas.github.io/Ventas/`.
