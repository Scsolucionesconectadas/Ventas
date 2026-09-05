# Deploy e Infraestructura

## GitHub Pages

La publicación prevista es GitHub Pages simple, sin dominio propio.

- Repositorio: `Scsolucionesconectadas/Ventas`.
- Rama de publicación: `main`.
- Carpeta de publicación: `/`.
- Entrada del sitio: `index.html`.
- URL esperada: `https://scsolucionesconectadas.github.io/Ventas/`.
- Estado del código remoto: Fase 1 publicada en `origin/main`; commit `441e7b3`.
- Estado local: Fase 2 comercial validada y autorizada para publicación en `origin/main`.
- Estado de Pages: pendiente de activar en GitHub. La URL pública respondió `404` después del push.

## Archivos de soporte

- `.nojekyll`: evita procesamiento Jekyll y publica assets estáticos tal como están.
- `robots.txt`: permite indexación del sitio público.
- `sitemap.xml`: declara landing, servicios, automatizaciones, contacto, catálogo y demos públicas por rubro.
- `404.html`: página de error con identidad SC y rutas calculadas para local y `/Ventas/`.
- Las dependencias CDN están fijadas en Lucide `1.41.0`, GSAP `3.15.0` y jsPDF `4.2.1`.
- Las imágenes públicas usan WebP; los JPG se conservan como fuentes para regeneración.
- `contacto/index.html` publica un formulario HTML hacia FormSubmit; no existen credenciales ni secretos en el repositorio.
- `contacto/gracias.html` queda fuera de indexación y funciona como retorno después del envío.

## Procedimiento de publicación

1. Validar sintaxis JavaScript, rutas e interfaz responsive.
2. Hacer commit en `main`.
3. Hacer push a `origin main`.
4. En GitHub, configurar Pages con `Deploy from a branch`, rama `main` y carpeta `/`.
5. Verificar la URL pública una vez que finalice el workflow de Pages.

## Nota de permisos

La terminal local no tiene GitHub CLI autenticado (`gh auth status` indica que no hay sesión). Por eso no se pudo activar Pages por API desde la terminal. La activación requiere un usuario con permisos de administrador o mantenedor del repositorio.

## Rollback

Si una publicación falla, revertir o corregir el último commit y volver a hacer push a `main`. GitHub Pages publicará nuevamente la versión vigente de la rama configurada.

## Pendientes

- Activar GitHub Pages desde Settings del repositorio y confirmar visualmente la URL pública después del despliegue.
- Revisar licencias/atribución o reemplazar imágenes por assets propios antes de una campaña formal.
- Activar FormSubmit desde el primer email recibido y repetir la prueba desde un celular físico.
