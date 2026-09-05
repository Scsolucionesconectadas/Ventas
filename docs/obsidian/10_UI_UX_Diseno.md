# UI UX Diseño

## Sistema visual inicial

- Estilo: dashboard comercial premium, claro, sobrio y operativo.
- Paleta: base clara, tinta SC `#22333f`, azul SC `#0060c0`, cian SC `#00b0e8`, estados secundarios en verde/amarillo/rojo.
- Componentes: topbar full-width, hero institucional, servicios clicables con modal flotante, portal separado de demos, diagnóstico express, automatizaciones, reporterías, proceso, CTA, datos de contacto, sidebar, tarjetas de rubros, métricas, paneles, formularios, tablas, chips, tabs, toast, chatbot, registros seleccionables, kanban, tareas, grillas de recursos, mini gráficos, bitácoras y acciones de PDF/email.
- Iconos: Lucide `1.41.0` vía CDN para evitar instalar dependencias en esta etapa estática.
- Imágenes: se usan WebP locales genéricos por rubro, sin clientes reales, y assets locales del logo SC; los JPG se conservan como fuentes.
- Motion: animaciones CSS, GSAP `3.15.0` por CDN, dropdowns, hover states, live pulse, feedback de toast, spotlight, modal de servicios y transiciones entre módulos.
- El motion principal usa GSAP y deja un fallback CSS para escenarios sin CDN; el contenido crítico se restaura a visible al finalizar.

## Criterios aplicados

- La primera pantalla de `index.html` es una landing de marca con H1 "Soluciones Conectadas", fondo visual, acción a demos y CTA directo a WhatsApp.
- El slogan comercial visible queda enfocado en valor B2B: "Tu operación conectada: sistemas, automatizaciones e inteligencia para crecer sin fricción."
- La demo médica y las demos de hotelería, inmobiliarias, venta de materiales, gastronomía, educación, gomerías, agrimensores y logística/transporte abren directamente una experiencia operativa.
- La home mantiene un preview de demos y el catálogo completo vive en `demos/index.html` para que el sitio sea escalable.
- Las tarjetas de "Qué hacemos" abren un modal informativo con detalle comercial, bullets y resultado esperado.
- El modal de servicios usa la `X` superior como única acción de cierre y reserva el pie para el CTA principal de WhatsApp.
- La barra superior de la landing se ajustó a ancho completo con look tecnológico, glass ligero, sombra sobria y navegación responsive.
- El bloque de contacto usa un indicador visual estable para Instagram y fuerza el email a una sola línea con tamaño adaptable.
- En mobile, la navegación de la landing se reduce a "Explorar" y "Pedir demo" para evitar una cabecera demasiado alta.
- El diagnóstico express permite seleccionar dolores frecuentes y actualiza recomendación, módulos sugeridos y enlace de WhatsApp.
- Los textos usan datos ficticios y no contienen información sensible.
- Los rubros nuevos usan un layout común configurable con panel, operación, CRM, recursos y asistente.
- Todas las demos incorporan vista "Reportes" con paneles tipo Grafana, métricas por rubro, generación de PDF demo con encabezado/pie institucional SC, email demo y bitácora de eventos.
- Los formularios y fichas de detalle usan mayor separación entre campos: `16px` en grillas generales, `14px 16px` en formularios anidados y `14px 18px` en metadata.
- El CSS contempla responsive para mobile, tablet y desktop.
- Los dropdowns usan cierre visual claro, estados focus/hover y menú flotante para acciones de turnos o registros; los selectores GSAP se filtran para no generar warnings cuando falta un bloque en una página.
- Se respeta `prefers-reduced-motion` para reducir animaciones si el usuario lo configura.
- La validación mobile controla que las vistas no generen overflow horizontal y que el menú flotante quede dentro del viewport.
- La matriz responsive de calidad incluye móvil `390x844`, tablet `768x1024`, notebook `1366x768` y monitor grande `1920x1080`.
- Las pestañas usan roles ARIA, paneles asociados, foco itinerante y navegación con flechas, `Home` y `End`.
- El modal de servicios recibe el foco al abrir, lo mantiene dentro del diálogo y lo devuelve a la tarjeta al cerrar.
- La grilla de contacto se apila desde `1040 px` para evitar recortes y mantener el email en una sola línea.
- `404.html` conserva la identidad visual, ofrece rutas de recuperación claras y respeta `prefers-reduced-motion`.
- La Fase 2 usa navegación multipágina: la home resume, `servicios/` profundiza capacidades, `automatizaciones/` explica flujos y `contacto/` captura el contexto comercial.
- Cada servicio ofrece accesos directos a demos relacionadas sin obligar a volver al catálogo.
- Los resultados posibles usan rangos ilustrativos y una aclaración visible para no presentarlos como promesas automáticas.
- El explorador de automatizaciones usa botones con `aria-pressed` y actualiza título, recorrido de seis pasos, demo y contacto.
- El formulario mantiene etiquetas visibles, campos obligatorios, ayudas de contexto, consentimiento y alternativas de contacto.
- La página de confirmación conserva marca SC y permite volver a demos o continuar por WhatsApp.
- Axe Core `4.10.3` no detectó infracciones WCAG A/AA en las cinco páginas comerciales auditadas.

## Pendientes de diseño

- Revisar capturas finales antes de usar en presentaciones comerciales reales.
- Revisar licencias/atribución o crear set de imágenes propias/generadas antes de publicación final.
- Validar la experiencia en un celular físico cuando exista una URL pública de GitHub Pages.
