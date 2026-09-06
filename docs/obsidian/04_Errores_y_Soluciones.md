# Errores y Soluciones

## 2026-09-06 - Capturas y auditoría ejecutadas durante transiciones

**Síntoma:**
Las primeras capturas de Fase 4 mostraban hero vacíos y paneles atenuados; Axe informaba contraste insuficiente en textos que ya usaban colores conformes.

**Causa:**
Playwright capturaba y auditaba mientras GSAP todavía aplicaba opacidad parcial a los elementos de entrada.

**Solución aplicada:**
Las pruebas esperan que hero y paneles alcancen opacidad `1` antes de ejecutar Axe o guardar capturas.

**Cómo evitarlo:**
En pruebas visuales o de contraste, esperar una propiedad observable del estado final de la animación en lugar de usar pausas temporizadas.

**Archivos relacionados:**
- `scripts/phase4.spec.js`
- `assets/js/motion.js`

## 2026-09-06 - Edge se cerraba después de una descarga PDF

**Síntoma:**
Microsoft Edge se cerró de forma intermitente al crear el siguiente contexto de Playwright después de probar un PDF.

**Causa:**
El test terminaba al recibir el evento `download`, sin esperar a que el navegador completara y cerrara la descarga.

**Solución aplicada:**
Después de validar el nombre del archivo se espera `download.path()` antes de finalizar el caso.

**Cómo evitarlo:**
Toda prueba de descarga debe esperar la finalización efectiva del archivo, no solo la emisión del evento inicial.

**Archivos relacionados:**
- `scripts/phase4.spec.js`

## 2026-09-05 - Tablist sin elementos tab semánticos

**Síntoma:**
Axe marcaba `aria-required-children` como error crítico en la barra de pestañas de las nueve demos.

**Causa:**
Los contenedores tenían `role="tablist"`, pero sus botones dinámicos no declaraban `role="tab"`, `aria-selected` ni relación con el panel correspondiente.

**Solución aplicada:**
Se agregaron roles, IDs, `aria-controls`, `aria-labelledby`, selección anunciada, `hidden` en paneles inactivos y navegación con flechas, `Home` y `End`.

**Cómo evitarlo:**
Cada `tablist` debe contener tabs semánticos y cada tab debe controlar un `tabpanel` identificable.

**Archivos relacionados:**
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`

## 2026-09-05 - Datos de contacto recortados en tablet

**Síntoma:**
En `768x1024`, teléfono, email e Instagram quedaban comprimidos y parte del texto se recortaba.

**Causa:**
La grilla de contacto mantenía tres columnas hasta el breakpoint móvil de `720 px`, aunque el bloque de contenido disponible ya no tenía ancho suficiente.

**Solución aplicada:**
La grilla pasa a una columna desde `1040 px`, manteniendo el correo completo en una sola línea.

**Cómo evitarlo:**
Validar texto largo real en los breakpoints intermedios y no limitar las pruebas a escritorio y móvil.

**Archivos relacionados:**
- `assets/css/base.css`

## 2026-09-05 - Warnings de GSAP por selectores inexistentes

**Síntoma:**
La consola del navegador mostraba warnings de GSAP al abrir páginas que no tenían todos los bloques usados por los selectores globales de animación.

**Causa:**
`motion.js` enviaba selectores completos a `gsap.fromTo()` aunque algunas páginas no incluían elementos como `intro-copy`, `app-title` o `command-bar`.

**Solución aplicada:**
Se agregó una función auxiliar que transforma cada selector en una lista de elementos y solo ejecuta la animación cuando la lista tiene resultados.

**Cómo evitarlo:**
Al sumar páginas nuevas, animar colecciones ya resueltas o validar que el selector existe antes de llamar a GSAP.

**Archivos relacionados:**
- `assets/js/motion.js`

## 2026-09-05 - Commit bloqueado por trailing whitespace e identidad Git

**Síntoma:**
`git diff --cached --check` detectó trailing whitespace en notas Markdown y `git commit` falló con `Author identity unknown`.

**Causa:**
Las notas usaban dobles espacios finales para saltos de línea Markdown y el repositorio no tenía `user.name` ni `user.email` configurados.

**Solución aplicada:**
Se limpiaron espacios finales en `docs/obsidian/*.md` y se configuró identidad local del repo con `user.name=Soluciones Conectadas` y `user.email=contacto.solucionesconectadas@gmail.com`.

**Cómo evitarlo:**
Evitar dobles espacios finales en documentación y verificar `git config user.name` / `git config user.email` antes del primer commit del repo.

**Archivos relacionados:**
- `docs/obsidian/*.md`
- `.git/config`

## 2026-09-05 - `npx playwright test` no resolvió specs temporales sin dependencias locales

**Síntoma:**
El runner temporal primero respondió `No tests found` con un spec `.cjs` y luego no pudo resolver `@playwright/test` desde el repo.

**Causa:**
El proyecto no tiene `package.json` ni dependencias locales de Playwright; `npx playwright` permite usar CLI, pero el spec local no resolvió el paquete de test como módulo del proyecto.

**Solución aplicada:**
Se eliminó el spec temporal y se validó con el MCP de Playwright, que permite navegar, hacer click y evaluar DOM sin instalar dependencias.

**Cómo evitarlo:**
Si se formalizan pruebas E2E, crear `package.json` y agregar Playwright como dependencia de desarrollo. Para validaciones puntuales, usar MCP o CLI de screenshots.

**Archivos relacionados:**
- `index.html`
- `assets/js/app.js`
- `assets/css/base.css`

## 2026-09-05 - PowerShell no aceptó `utf8NoBOM`

**Síntoma:**
El comando mecánico para actualizar el versionado de assets falló con `CannotConvertArgumentNoMessage` porque `Set-Content -Encoding utf8NoBOM` no existe en esta versión de PowerShell.

**Causa:**
La terminal disponible usa una versión de PowerShell donde los nombres válidos de encoding incluyen `UTF8`, pero no `utf8NoBOM`.

**Solución aplicada:**
Se usó `[System.IO.File]::WriteAllText` con `System.Text.UTF8Encoding($false)` para escribir UTF-8 sin BOM.

**Cómo evitarlo:**
En este entorno, usar la API de .NET para escrituras mecánicas UTF-8 sin BOM o limitarse a `-Encoding UTF8` cuando el BOM no afecte.

**Archivos relacionados:**
- `rubros/medica/index.html`
- `rubros/hoteleria/index.html`
- `rubros/inmobiliarias/index.html`
- `rubros/materiales/index.html`
- `rubros/gastronomia/index.html`
- `rubros/educacion/index.html`

## 2026-09-04 - Imagen rota en tarjeta de educación

**Síntoma:**
La tarjeta de educación en la landing mostraba el texto alternativo "Aula de instituto educativo" y un espacio vacío porque la imagen remota no cargaba.

**Causa:**
La landing dependía de una URL externa para mostrar la imagen del rubro, lo que podía fallar por disponibilidad, caché, red o restricciones del proveedor.

**Solución aplicada:**
Se descargó una imagen local más adecuada para capacitación/instituto y se reemplazaron las referencias remotas de imágenes por assets locales.

**Cómo evitarlo:**
Antes de publicar o presentar, usar assets locales verificados y validar `naturalWidth > 0` en navegador.

**Archivos relacionados:**
- `index.html`
- `assets/js/industry-demo-data.js`
- `assets/img/education-demo.jpg`
- `assets/img/*-demo.jpg`

## 2026-09-04 - Menú flotante se cerraba al hacer click cerca del borde inferior

**Síntoma:**
En la validación con Playwright, el botón de tres puntos recibía foco pero el menú flotante no quedaba abierto cuando el navegador hacía un pequeño ajuste de scroll para mostrar el botón.

**Causa:**
El listener global de `scroll` cerraba el menú inmediatamente después de abrirlo, porque capturaba el scroll automático producido por el click/focus.

**Solución aplicada:**
Se agregó una ventana corta de protección al abrir el menú y se detuvo la propagación del click del botón de acciones. El cierre por scroll se mantiene para interacciones reales posteriores.

**Cómo evitarlo:**
Cuando un menú contextual se posiciona con `position: fixed`, contemplar el scroll automático de foco y validar botones ubicados al borde inferior del viewport.

**Archivos relacionados:**
- `assets/js/industry-demo.js`
- `assets/js/medical-demo.js`

## 2026-09-04 - Tarjetas del roadmap quedaban invisibles al combinar CSS y GSAP

**Síntoma:**
En la validación con navegador, las tarjetas de rubros podían quedar con `opacity: 0` y `visibility: hidden` después de la entrada animada.

**Causa:**
El fallback CSS por `IntersectionObserver` competía con la entrada principal de GSAP y dejaba estilos iniciales aplicados en algunos escenarios.

**Solución aplicada:**
Cuando GSAP está disponible, se evita activar el fallback de revelado y se agrega una limpieza final con `setTimeout` nativo para restaurar `opacity`, `visibility` y `transform`.

**Cómo evitarlo:**
Separar responsabilidades: GSAP para motion principal, CSS como fallback sin GSAP, y una garantía final de visibilidad para contenido crítico.

**Archivos relacionados:**
- `assets/js/app.js`
- `assets/js/medical-demo.js`
- `assets/js/motion.js`
- `assets/css/base.css`

## 2026-09-04 - Menú de acciones de turnos quedaba detrás de la agenda

**Síntoma:**
Al presionar los tres puntos de un turno, el menú podía quedar detrás de otros elementos y no permitía elegir "Enviar recordatorio" con comodidad.

**Causa:**
El menú estaba renderizado dentro de la tarjeta del turno y competía con el contexto de apilado de los turnos siguientes.

**Solución aplicada:**
Se reemplazó por un menú flotante con `position: fixed`, cálculo de posición respecto del botón y `z-index` alto.

**Cómo evitarlo:**
Para acciones contextuales dentro de listas, usar menús flotantes fuera del contenedor cuando haya riesgo de clipping o superposición.

**Archivos relacionados:**
- `assets/js/medical-demo.js`
- `assets/css/base.css`

## 2026-09-04 - Cajas medibles en dropdowns cerrados mobile

**Síntoma:**
El chequeo DOM en mobile detectaba botones de menús cerrados con cajas calculadas fuera de pantalla, aunque no había overflow horizontal real.

**Causa:**
Los menús internos de `details` cerrados seguían teniendo estilos de posicionamiento absoluto medibles.

**Solución aplicada:**
Se agregó CSS para ocultar explícitamente `.dropdown-menu` y `.row-menu` cuando el `details` padre no está abierto.

**Cómo evitarlo:**
Al crear dropdowns con contenido posicionado, asegurar que el estado cerrado tenga `display: none` en el contenido interno.

**Archivos relacionados:**
- `assets/css/base.css`
## 2026-09-05 - Las demos no abren mediante file://

**Síntoma:**
Al abrir el catálogo como archivo local y seleccionar Gastronomía, Gomerías u otro rubro, el navegador mostraba `ERR_UNEXPECTED (-9)`.

**Causa:**
Las rutas dinámicas apuntaban a directorios como `rubros/gomerias/`. En navegación HTTP GitHub Pages resuelve su `index.html`, pero algunos navegadores no hacen esa resolución al navegar con el protocolo `file://`.

**Solución aplicada:**
Se cambiaron todas las rutas del catálogo para apuntar al archivo explícito `rubros/<rubro>/index.html` y se actualizó la versión de caché del catálogo.

**Cómo evitarlo:**
En enlaces internos que deban funcionar tanto por HTTP como mediante apertura local, usar siempre rutas relativas al archivo `index.html` y no solamente al directorio.

**Archivos relacionados:**
- `assets/js/demo-catalog.js`
- `index.html`
- `demos/index.html`

## 2026-09-05 - Playwright temporal no encontraba el runner ni su navegador

**Síntoma:**
La regresión de Fase 3 falló primero al resolver `playwright/test` y luego buscó un Chromium no descargado.

**Causa:**
El sitio no instala paquetes y el runner se ejecuta con `npx`; Node no incorpora automáticamente el directorio efímero al `NODE_PATH`. Además, Playwright intentó usar su navegador administrado aunque Edge ya estaba disponible en Windows.

**Solución aplicada:**
El comando de validación localiza el paquete temporal, define `NODE_PATH` para la ejecución y la prueba usa el canal `msedge` instalado en el equipo.

**Cómo evitarlo:**
Usar el comando documentado en el runbook o instalar Playwright como dependencia de desarrollo si el proyecto adopta un entorno Node permanente.

**Archivos relacionados:**
- `scripts/phase3.spec.js`
- `docs/obsidian/06_Comandos_Runbook.md`
