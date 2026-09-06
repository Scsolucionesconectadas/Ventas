# Integraciones

## FormSubmit

**Finalidad:** recibir consultas comerciales desde un formulario HTML estático publicado en GitHub Pages.

**Página:** `contacto/index.html`.

**Endpoint:** `https://formsubmit.co/contacto.solucionesconectadas@gmail.com`.

**Método:** `POST`.

**Campos de control:**

- `_subject`: asunto del email recibido.
- `_template=table`: presentación estructurada del contenido.
- `_next`: redirección pública a `contacto/gracias.html`.
- `_honey`: campo oculto antispam.

**Protección:** reCAPTCHA queda activo. No se incorpora `_captcha=false`.

**Activación:** el primer envío real genera un email de confirmación que debe aceptarse desde `contacto.solucionesconectadas@gmail.com`.

**Datos enviados:** nombre, empresa, email, teléfono opcional, rubro, necesidad, descripción del proceso y autorización de contacto.

**Secretos:** no requiere tokens ni claves en el frontend.

**Límites:** la disponibilidad y entrega del formulario dependen del proveedor externo. Si el volumen o los requisitos de privacidad crecen, evaluar un endpoint propio o un proveedor con acuerdo específico.

## WhatsApp

Los CTAs usan enlaces `wa.me` hacia el número público de SC con mensajes precompletados. No se usa API ni token y la persona confirma el envío desde WhatsApp.

## Email e Instagram

Se publican enlaces directos `mailto:` e Instagram como canales alternativos. No existe automatización de campañas ni acceso a cuentas desde el sitio.

## Cloudflare Web Analytics

**Finalidad:** obtener métricas agregadas de navegación con una integración compatible con el sitio estático.

**Estado:** preparado, no activado. Las páginas cargan `assets/js/analytics.js` sin `data-cloudflare-token`, por lo que no se inserta el beacon ni se envían solicitudes.

**Configuración requerida:** token público del sitio generado por Cloudflare Web Analytics. No requiere exponer una clave privada.

**Activación:** agregar el atributo `data-cloudflare-token` a la etiqueta de `analytics.js` en cada página indexable y repetir la validación de Fase 6.

**Límites:** la disponibilidad, retención y tratamiento de métricas dependen de Cloudflare. Revisar sus condiciones vigentes antes de activar la medición.
