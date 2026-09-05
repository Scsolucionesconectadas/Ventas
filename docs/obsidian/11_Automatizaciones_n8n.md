# Automatizaciones n8n y Node-RED

## Estado actual

La landing incluye una sección comercial para explicar capacidades de automatización e integración. Las demos simulan reporterías con Grafana, PDF con encabezado/pie institucional SC, CSV, emails programados y bitácora, pero no hay workflows reales implementados todavía dentro del repositorio.

## Capacidades presentadas

- n8n para orquestar procesos, webhooks, integraciones y tareas de seguimiento.
- Node-RED para flujos operativos, eventos e integraciones visuales.
- APIs REST y webhooks para conectar sistemas externos.
- Bots y mensajería para atención, avisos y derivaciones.
- Grafana o dashboards equivalentes para medir el estado de cada proceso.
- PDFs y CSV como entregables automáticos para dirección, administración o equipos operativos.
- Emails programados con adjuntos y bitácora de ejecución.
- Alertas ante vencimientos, stock crítico, ausentismo, leads sin respuesta o desvíos operativos.
- Casos nuevos para presentar automatización: gomerías con reposición de stock, agrimensores con conectividad ATER simulada y logística con alertas de SLA, remitos y tracking.

## Criterios de diseño para workflows futuros

- Mantener idempotencia en llamadas externas para evitar duplicar emails, mensajes, pedidos o trámites.
- Separar workflows largos en pasos con checkpoints y bitácora.
- Configurar timeouts, reintentos y alertas ante fallos.
- Validar campos obligatorios antes de enviar datos a APIs, bots, sistemas externos o generación de documentos.
- Mantener intervención humana para acciones sensibles, aprobaciones, pagos, trámites oficiales o cambios de estado críticos.

## Pendientes

- Definir si los workflows reales se implementarán con n8n, Node-RED o backend propio según criticidad.
- Agregar capturas o diagramas propios de flujos n8n y Node-RED.
- Documentar variables y credenciales cuando exista una integración real, sin guardar secretos.
