# Plan de Mejoras UI con Uiverse

## Referencia evaluada

- Sitio: [Uiverse](https://uiverse.io/).
- Catálogo relevante: botones, tarjetas, inputs, formularios, checkboxes, switches, loaders y tooltips.
- Licencia declarada: MIT para los elementos publicados.
- Compatibilidad útil para SC: componentes disponibles en HTML/CSS, Tailwind y React. El proyecto debe priorizar las variantes HTML/CSS porque se publica como sitio estático en GitHub Pages.

## Decisión de uso

Uiverse se adopta como biblioteca de inspiración y fuente selectiva de patrones, no como sistema visual completo ni como dependencia remota. Cada componente elegido se copiará al repositorio, se simplificará y se adaptará a los tokens, iconos, tipografía y comportamiento existentes de SC.

No se incorporarán componentes solo por ser llamativos. Se descartarán los que dependan de efectos 3D intensos, neón dominante, animaciones continuas, contraste insuficiente, controles sin etiqueta o JavaScript externo innecesario.

## Reglas de adopción

1. Mantener la identidad SC: tinta oscura, azul, cian y estados semánticos existentes.
2. Reutilizar Lucide y GSAP ya presentes; no agregar una librería para un efecto que pueda resolverse con CSS.
3. Conservar etiquetas visibles, foco de teclado, contraste WCAG AA y áreas táctiles de al menos 44 px.
4. Respetar `prefers-reduced-motion` y evitar animaciones que desplacen contenido o dificulten la lectura.
5. No cargar CSS, imágenes ni scripts desde Uiverse en producción.
6. Registrar autor, URL y aviso MIT cuando se reutilice una porción sustancial de código.
7. Probar cada patrón en móvil, tablet, notebook y monitor grande antes de extenderlo al resto del sitio.

## Componentes Prioritarios

### Prioridad alta

- Botón principal con estados normal, hover, foco, carga, éxito y deshabilitado para “Pedir demo”, “Enviar consulta” y altas ficticias.
- Inputs y selects con foco más claro, ayuda contextual, validación inline y mensajes de error consistentes.
- Checkbox de consentimiento con mejor área táctil y estado de foco visible.
- Tooltips accesibles para botones que muestran solo iconos en barras y demos.
- Skeletons compactos para tablas, fichas y reportes durante estados simulados de carga.

### Prioridad media

- Tarjetas de servicios con borde activo y microinteracción sutil que refuerce que son clicables.
- Tarjetas de demos con estados visuales consistentes y CTA mejor jerarquizado.
- KPI con entrada breve y estable, sin modificar tamaño ni posición del contenido.
- Switches para opciones realmente binarias, por ejemplo comparación de período o activación de una simulación.
- Indicadores de progreso para formularios o recorridos que tengan más de un paso.

### Prioridad baja

- Patrones decorativos de fondo limitados a áreas secundarias.
- Efectos especiales para la presentación comercial interna.
- Variantes experimentales de tarjetas para futuras demos, sin reemplazar el catálogo actual hasta validarlas.

## Plan de Implementación

### Etapa 1 - Selección y prototipo

- Elegir entre 8 y 12 componentes concretos de Uiverse.
- Guardar URL, autor, licencia, código original y motivo de selección.
- Crear una página interna de laboratorio visual no indexable.
- Comparar cada propuesta con el componente SC actual.

**Resultado:** catálogo corto de componentes aprobados y descartados.

### Etapa 2 - Base visual compartida

- Normalizar variables de borde, sombra, foco, transición y estados.
- Crear clases compartidas para botones, inputs, tooltips y skeletons.
- Añadir fallback sin animación y movimiento reducido.

**Resultado:** componentes SC reutilizables sin dependencia externa.

### Etapa 3 - Landing y páginas comerciales

- Aplicar primero botones y tarjetas en portada, Servicios y Demos.
- Mejorar interacción de preguntas frecuentes y diagnóstico.
- Mantener jerarquía comercial y evitar efectos decorativos excesivos.

**Resultado:** interfaz más moderna con la misma identidad de marca.

### Etapa 4 - Formularios

- Mejorar Contacto y los formularios de cada demo.
- Incorporar validación visible por campo, estado de envío y confirmación.
- Revisar checkbox, selects, campos condicionales y navegación por teclado.

**Resultado:** formularios más claros, confiables y fáciles de completar.

### Etapa 5 - Demos operativas

- Incorporar skeletons, estados vacíos y feedback de operaciones.
- Mejorar acciones de tablas, menús y filtros sin aumentar la densidad visual.
- Probar Talleres, Estudios Contables, Constructoras y Área Médica antes de extender al resto.

**Resultado:** demos más cercanas a un producto real y consistentes entre rubros.

### Etapa 6 - Calidad y publicación

- Ejecutar HTML Validate, Playwright, Axe y revisión visual.
- Validar `390x844`, `768x1024`, `1366x768` y `1920x1080`.
- Comprobar tamaño de CSS, tiempos de carga y ausencia de dependencias remotas nuevas.
- Publicar primero una tanda pequeña y revisar desde un celular físico.

**Resultado:** mejoras verificadas y escalables antes de una adopción más amplia.

## Criterios de Aceptación

- Sin desbordes ni saltos de layout.
- Navegación completa por teclado.
- Contraste WCAG AA y foco siempre visible.
- Movimiento reducido funcional.
- Sin nuevas dependencias de ejecución.
- Pruebas existentes aprobadas y regresiones nuevas para cada componente compartido.
- Apariencia coherente con SC, no con una colección genérica de ejemplos.

## Estimación Inicial

- Etapas 1 y 2: 1 a 2 jornadas.
- Etapas 3 y 4: 2 a 3 jornadas.
- Etapa 5: 2 jornadas.
- Etapa 6: 1 jornada.

Estimación total: 6 a 8 jornadas de trabajo, aplicables en entregas pequeñas y publicables.

## Estado de implementación - 2026-09-08

- [x] Capa visual compartida local, sin dependencia de ejecución nueva.
- [x] Estados normal, carga y éxito en botones de contacto y operaciones ficticias.
- [x] Validación inline en español para inputs, selects, textareas y consentimiento.
- [x] Checkbox de consentimiento y switch de comparación con foco visible.
- [x] Tooltips para acciones representadas solo por iconos.
- [x] Foco reforzado en tarjetas, acento estable en KPI y ajuste visual de skeletons.
- [x] Integración en las 19 páginas que cargan `base.css`, con versión de caché `20260908-ui1`.
- [x] HTML Validate, Axe, revisión visual y regresión unificada con `73/73` pruebas aprobadas.
- [ ] Crear un laboratorio visual no indexable para evaluar variantes futuras antes de publicarlas.
- [ ] Revisar la tanda desde un celular físico después de su próxima publicación.

La implementación toma ideas de interacción de las categorías evaluadas, pero no copia un componente completo de Uiverse. Por eso no agrega código de terceros ni avisos de autor adicionales al repositorio.
