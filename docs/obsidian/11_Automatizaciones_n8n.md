# Automatizaciones n8n y Node-RED

## Estado actual

La página comercial incluye un laboratorio interactivo estilo n8n para explicar capacidades de automatización e integración. La Fase 5, ampliada en Fases 7 y 8, agrega además a las quince demos un simulador visual de workflows con n8n/Node-RED, estados, fallas, reintentos, aprobación humana, reportería tipo Grafana, PDF, email y bitácora. No hay workflows ni conexiones externas reales implementadas dentro del repositorio.

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
- Talleres: turno, diagnóstico, orden de trabajo, reserva de repuestos, aprobación de presupuesto e historial del vehículo.
- Estudios contables: agenda de vencimientos, solicitud documental, presentación, acuse, honorarios y legajo.
- Constructoras: medición, certificado, curva de avance, compra, incidencia, evidencia y bitácora de obra.
- Administración y facturación: servicio realizado, validación documental, factura demo, cobranza y conciliación; además recibe facturas de proveedor, controla duplicados, orden/remito, aprobación, vencimiento, pago y archivo.

## Criterios de diseño para workflows futuros

- Mantener idempotencia en llamadas externas para evitar duplicar emails, mensajes, pedidos o trámites.
- Separar workflows largos en pasos con checkpoints y bitácora.
- Configurar timeouts, reintentos y alertas ante fallos.
- Validar campos obligatorios antes de enviar datos a APIs, bots, sistemas externos o generación de documentos.
- Mantener intervención humana para acciones sensibles, aprobaciones, pagos, trámites oficiales o cambios de estado críticos.

## Fase 4 - simulaciones prioritarias

Los catorce módulos avanzados muestran una recomendación de automatización contextual y una vista previa editable del email resultante. La demo no ejecuta n8n, Node-RED, APIs ni envíos reales; los destinatarios usan `@demo.local`.

Flujo futuro de referencia:

`Disparador → Validación → Acción → Aprobación humana → PDF/email → Bitácora`

- Área médica: conciliación, autorizaciones, credenciales profesionales, documentos y seguimiento posterior a consultas.
- Inmobiliarias: vencimientos contractuales, reservas, cobranzas, liquidaciones y avisos a propietarios.
- Venta de materiales: compras sugeridas, comparación de proveedores, actualización de precios, cobranzas y planificación de despachos.

## Fase 5 - centro de automatización

Cada rubro presenta dos workflows configurados en `assets/js/workflow-demo.js` y sigue el recorrido:

`Disparador → Validación → Acción → Aprobación humana → Reporte → Bitácora`

- Motores visuales: n8n para orquestación de aplicaciones y Node-RED para eventos y operación técnica.
- Escenarios: ejecución controlada o falla temporal con reintento visible.
- Seguridad operativa: el flujo se detiene antes de la entrega hasta recibir aprobación humana.
- Observabilidad: período de 7, 30 o 90 días, proceso, comparación y cuatro métricas dinámicas.
- Entrega: programación diaria, semanal o mensual; PDF local y email editable sin envío.
- Evidencia: historial con hora, proceso, estado, intento, salida y destinatario ficticio.

La implementación reproduce conceptos de ejecución y observabilidad, pero no importa ni ejecuta definiciones reales de n8n o Node-RED y no incrusta Grafana.

## Fase 8 - nuevos procesos demostrativos

- Gestión PyME: venta, cobro y conciliación; stock crítico y reposición.
- Turnos y agenda: solicitud, confirmación y recordatorio; hueco y lista de espera.
- Gastronomía: pedido, cocina y entrega; reserva, disponibilidad y confirmación.

Las recomendaciones visibles se calculan con reglas estáticas y datos ficticios. No se presentan como IA autónoma ni ejecutan cambios fuera del navegador.

## Fase 9 - laboratorio comercial interactivo

`automatizaciones/index.html` incorpora seis recorridos en `assets/js/n8n-lab.js`:

- Agenda: solicitud, validación, disponibilidad, aprobación, confirmación y registro.
- Ventas: lead, clasificación, asignación, aprobación, próximo paso y conversión.
- Stock: mínimo, demanda, proveedores, aprobación, orden y entrega.
- Cobranzas: vencimientos, conciliación, prioridad, aprobación, avisos y seguimiento.
- Reservas: solicitud, comensales, disponibilidad, aprobación, confirmación y ocupación.
- Reportes: programación, consolidación, validación, aprobación, PDF y distribución registrada.

Cada nodo se puede inspeccionar y muestra entrada, acción, salida y un payload ficticio. Cada proceso define además un resultado esperado con métricas e identificadores propios; su estado cambia a procesamiento, aprobación pendiente, no generado o resultado generado según la ejecución. El escenario normal se detiene en aprobación humana; el escenario de error falla en el tercer nodo y reanuda desde allí con un segundo intento. La bitácora vive solo en memoria y no realiza solicitudes externas.

El laboratorio no incrusta una instancia de n8n ni importa JSON ejecutable. Antes de una conexión real se deben resolver autenticación, permisos, persistencia, secretos, claves de idempotencia, timeouts, reintentos y monitoreo.

Validación de la ampliación: 7 de 7 pruebas focalizadas y 90 de 90 pruebas de regresión aprobadas en Edge, con revisión visual en escritorio y móvil.

## Pendientes

- Definir si los workflows reales se implementarán con n8n, Node-RED o backend propio según criticidad.
- Preparar exportaciones JSON de referencia únicamente cuando exista una instancia n8n de desarrollo aislada.
- Documentar variables y credenciales cuando exista una integración real, sin guardar secretos.
- Definir persistencia, autenticación e idempotencia antes de conectar cualquier flujo de demo a sistemas reales.
