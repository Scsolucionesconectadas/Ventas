# Deploy e Infraestructura

## GitHub Pages

La publicación prevista es GitHub Pages simple, sin dominio propio.

- Repositorio: `Scsolucionesconectadas/Ventas`.
- Rama de publicación: `main`.
- Carpeta de publicación: `/`.
- Entrada del sitio: `index.html`.
- URL esperada: `https://scsolucionesconectadas.github.io/Ventas/`.
- Estado del código remoto: mejoras comerciales y operativas publicadas en `origin/main`; commit `5414d39`.
- Estado local: sin cambios funcionales pendientes; la documentación registra la publicación del 2026-09-08.
- Estado de Pages: activo; portada y Contacto respondieron HTTP `200` el 2026-09-08. La portada entregó assets `20260907-ui2` y Contacto incluyó el campo condicional `necesidad_especifica`.

## Archivos de soporte

- `.nojekyll`: evita procesamiento Jekyll y publica assets estáticos tal como están.
- `robots.txt`: permite indexación del sitio público.
- `sitemap.xml`: declara landing, servicios, automatizaciones, contacto, catálogo y demos públicas por rubro.
- `presentacion/index.html`: material comercial interno con `noindex`; no forma parte del sitemap.
- `assets/js/analytics.js`: cargador opcional de Cloudflare Web Analytics, inactivo mientras no exista token.
- `404.html`: página de error con identidad SC y rutas calculadas para local y `/Ventas/`.
- Las dependencias CDN están fijadas en Lucide `1.41.0`, GSAP `3.15.0` y jsPDF `4.2.1`.
- Las imágenes públicas usan WebP; Fase 7 incorpora tres activos generados optimizados a unos 433 KB en conjunto.
- `contacto/index.html` publica un formulario HTML hacia FormSubmit; no existen credenciales ni secretos en el repositorio.
- `contacto/gracias.html` queda fuera de indexación y funciona como retorno después del envío.

## Procedimiento de publicación

1. Validar sintaxis JavaScript, rutas e interfaz responsive.
2. Hacer commit en `main`.
3. Hacer push a `origin main`.
4. En GitHub, configurar Pages con `Deploy from a branch`, rama `main` y carpeta `/`.
5. Verificar la URL pública una vez que finalice el workflow de Pages.

## Nota de permisos

La terminal local no tiene GitHub CLI autenticado (`gh auth status` indica que no hay sesión). La publicación de código se realiza mediante el remoto Git configurado; los cambios de Settings requieren un usuario con permisos sobre el repositorio.

## Rollback

Si una publicación falla, revertir o corregir el último commit y volver a hacer push a `main`. GitHub Pages publicará nuevamente la versión vigente de la rama configurada.

## Pendientes

- Activar FormSubmit desde el primer email recibido y repetir la prueba desde un celular físico.
- Activar Cloudflare Web Analytics únicamente después de crear la propiedad y obtener el token público del sitio.
