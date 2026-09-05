# Deploy e Infraestructura

## GitHub Pages

La publicación prevista es GitHub Pages simple, sin dominio propio.

- Repositorio: `maicolandresb123/Mockups_Ventas`.
- Rama de publicación: `main`.
- Carpeta de publicación: `/`.
- Entrada del sitio: `index.html`.
- URL esperada: `https://maicolandresb123.github.io/Mockups_Ventas/`.
- Estado del código remoto: versión funcional publicada en `origin/main`; commit principal `4465090`.
- Estado local: sincronizado con el repositorio remoto al cerrar esta publicación.
- Estado de Pages: pendiente de activar en GitHub. La URL pública respondió `404` después del push.

## Archivos de soporte

- `.nojekyll`: evita procesamiento Jekyll y publica assets estáticos tal como están.
- `robots.txt`: permite indexación del sitio público.
- `sitemap.xml`: declara landing, catálogo `/demos/` y demos públicas por rubro.

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
