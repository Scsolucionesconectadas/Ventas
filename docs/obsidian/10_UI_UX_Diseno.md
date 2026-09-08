# UI UX Diseño

## Sistema visual inicial

- Estilo: dashboard comercial premium, claro, sobrio y operativo.
- Paleta: base clara, tinta SC `#22333f`, azul SC `#0060c0`, cian SC `#00b0e8`, estados secundarios en verde/amarillo/rojo.
- Componentes: topbar full-width, hero institucional, servicios clicables con modal flotante, portal separado de demos, diagnóstico express, automatizaciones, reporterías, proceso, CTA, datos de contacto, sidebar, tarjetas de rubros, métricas, paneles, formularios, tablas, chips, tabs, toast, chatbot, registros seleccionables, kanban, tareas, grillas de recursos, mini gráficos, bitácoras, colas de prioridad y acciones de PDF/email.
- Iconos: Lucide `1.41.0` vía CDN para evitar instalar dependencias en esta etapa estática.
- Imágenes: se usan WebP locales genéricos por rubro, sin clientes reales, y assets locales del logo SC. Fase 7 suma tres fotografías generadas y optimizadas para Talleres, Estudios Contables y Constructoras.
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
- El diagnóstico express permite seleccionar ineficiencias frecuentes y actualiza recomendación, módulos sugeridos y enlace de WhatsApp.
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
- Las doce demos incorporan una barra común con estado de demo pública, funciones simuladas y seis herramientas operativas.
- El modo presentación oculta sidebar, cabecera y controles secundarios, mantiene el contenido a ancho útil y ofrece una salida fija accesible.
- El recorrido guiado es manual, muestra progreso y resalta el contexto, el flujo, los KPI, los módulos, la operación, los reportes y el asistente según disponibilidad.
- La búsqueda global indexa módulos y registros ya hidratados, tolera consultas con o sin acentos y conduce a la vista correspondiente.
- El centro de actividad registra eventos iniciales y acciones informadas por los `toast`, sin simular envíos externos reales.
- Los estados de carga, éxito, error y vacío incluyen feedback visual, reintento y limpieza de filtros.
- Los diálogos administran foco, cierran con fondo o `Escape` y devuelven el foco al disparador; en móvil las acciones pasan a iconos con nombre accesible y tooltip.
- Axe Core `4.10.3` no detectó infracciones serias o críticas en la capa compartida de las doce demos.
- La Fase 4 agrega catorce vistas avanzadas con jerarquía compacta: encabezado, cuatro KPI, comandos, tabla principal y prioridades laterales.
- Las altas ficticias y vistas previas de email usan un modal compartido con foco inicial, cierre por fondo o `Escape` y retorno al disparador.
- Las tablas mantienen ancho estable y scroll interno en móvil, evitando que el documento completo genere desborde horizontal.
- Los accesos avanzados aparecen en sidebar y pestañas en escritorio; en móvil se oculta la duplicación lateral y se conserva la navegación por pestañas.
- La pestaña activa conserva texto blanco también en `hover`, y los KPI e insignias usan contrastes verificados con Axe.
- Las capturas visuales esperan la finalización de GSAP para representar el estado estable de la interfaz.
- La Fase 5 agrega una vista Automatizaciones común con encabezado compacto, control segmentado n8n/Node-RED, selectores de proceso y escenario, y un flujo estable de seis nodos.
- Los estados pendiente, ejecutando, esperando aprobación, fallido, reintentando y ejecutado combinan texto, color e iconografía; no dependen solo del color.
- La aprobación humana permanece como acción explícita antes de generar reporte y bitácora, y los controles bloqueados tienen una apariencia deshabilitada clara.
- El panel tipo Grafana permite filtrar período y proceso, comparar con el período anterior y mantiene métricas y gráfico sin cambios de layout.
- La programación usa controles nativos para frecuencia, hora, destinatario y PDF; el CTA ocupa una fila completa para evitar recortes en paneles angostos.
- En móvil, el flujo se transforma en una secuencia vertical, métricas y formularios conservan ancho útil, y la tabla usa scroll interno sin desbordar el documento.
- La vista previa de email administra foco, cierra con `Escape` o fondo y aclara que no se realiza ningún envío real.
- Axe Core `4.10.3` no detectó infracciones serias o críticas en Automatizaciones de las doce demos.
- La Fase 6 agrega una presentación comercial de ocho pantallas con imagen real en portada, jerarquía de alto contraste, controles por iconos, notas del expositor y progreso estable.
- La presentación admite flechas, `Home`, `End`, barra espaciadora, gestos táctiles, pantalla completa e impresión horizontal a PDF.
- En móvil, cada diapositiva permite altura natural, las grillas pasan a una columna y el email ajusta su texto sin desbordar la tarjeta.
- En movimiento reducido, el contenido activo fija opacidad y posición finales para evitar pantallas transparentes al navegar.
- Un modo compacto por altura garantiza que las ocho diapositivas entren completas en notebooks `1366x768` sin reducir el tamaño tipográfico de forma fluida.
- La presentación usa `noindex` porque es material interno de apoyo y no una página comercial de entrada.
- Los nuevos rubros conservan cinco vistas de negocio más Reportes y Automatizaciones, con textos y estados específicos para evitar una apariencia genérica.
- Las fotografías nuevas mantienen encuadre horizontal, luz clara y diversidad visual; su conversión WebP reduce el peso conjunto de 6,6 MB a unos 433 KB.
- Las capturas de Fase 7 verifican el catálogo a `1440x1000` y el hero de Constructoras a `390x844` sin recortes ni desbordes.
- Las tarjetas de servicios reservan `52px` a la derecha del texto para que el botón `+` mantenga al menos `10px` de aire visual en desktop, tablet y móvil.
- El resumen de impacto prioriza información comercial verificable: doce demos sectoriales, siete o más módulos por experiencia, dos procesos automáticos por rubro y una visión integral de gestión, automatización y reportes.
- El indicador de reducción manual usa la redacción inequívoca “Hasta 60% menos” y conserva la aclaración visible de que se trata de un rango ilustrativo sujeto a diagnóstico.
- El hero del catálogo distribuye título y descripción en columnas proporcionadas; en tablet y móvil vuelve a una sola columna sin desborde.
- Las tarjetas del catálogo usan columna flexible para mantener “Ver módulos” y “Abrir demo” alineados aunque títulos y descripciones ocupen distinta cantidad de líneas.
- Gomerías, Agrimensores y Logística usan fotografías horizontales con personas trabajando en el rubro, coherentes con las demos incorporadas en Fase 7.
- El estado futuro se comunica como “En planificación”; “Roadmap” queda reservado como concepto interno de evolución, no como etiqueta comercial.
- En la agenda médica, un turno admitido o en sala omite la acción de admisión para no ofrecer una transición imposible.
- La plantilla PDF conserva la proporción de los logos, evita el cruce entre título y fecha y superpone una marca “DEMO” diagonal y translúcida; los reportes ofrecen “Ver PDF” sin una acción redundante de dashboard.
- Los menús operativos muestran únicamente la transición siguiente de cada rubro y eliminan esa acción al alcanzar el estado terminal; detalle y avisos continúan disponibles.
- Los módulos avanzados no muestran etiquetas internas de fase y también omiten acciones para estados terminales equivalentes como cerrado, finalizado, entregado, pagado o presentado.
- Inmobiliarias actualiza el presupuesto orientativo al cambiar compra, alquiler o inversión sin alterar la disposición del formulario.
- Los campos de aclaración de Contacto aparecen solo para “Otro rubro” y “Otra necesidad”, reciben foco, pasan a ser obligatorios y vuelven a quedar deshabilitados al ocultarse.
- La capa `ui-enhancements.js` agrega validación inline en español y relaciones `aria-describedby` a formularios estáticos y dinámicos sin duplicar lógica por rubro.
- Los botones de envío y alta muestran estados estables de carga y confirmación sin cambiar su ancho; el feedback se aplica en Contacto, turnos, altas, módulos avanzados y programación de automatizaciones.
- El checkbox de consentimiento y el switch de comparación usan controles propios con foco visible, tamaño estable y semántica nativa.
- Los botones que muestran solo iconos reciben tooltips derivados de su nombre accesible y funcionan con hover o foco de teclado.
- El modal de servicios permite desplazamiento vertical cuando la altura lo requiere, bloquea el desborde horizontal y mantiene la X de cierre con nombre accesible sin un tooltip visual redundante.
- Las tarjetas de demos refuerzan su estado de foco, los KPI usan un acento sutil y los skeletons conservan movimiento reducido.

## Referencias externas evaluadas

- [Uiverse](https://uiverse.io/) se conserva como referencia para botones, tarjetas, inputs, formularios, loaders, switches y tooltips.
- La primera tanda se implementó con patrones propios inspirados en sus categorías; no se copió un componente completo ni se cargó código remoto.
- La selección debe priorizar HTML/CSS, accesibilidad, movimiento reducido, bajo peso y compatibilidad con GitHub Pages.
- El plan detallado está en [[14_Plan_Mejoras_UIverse]].

## Pendientes de diseño

- Revisar capturas finales antes de usar en presentaciones comerciales reales.
- Validar la experiencia completa, incluida la presentación, desde un celular físico después de publicar Fase 7.
