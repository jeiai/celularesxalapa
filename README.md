# CelularesXalapa.com

Aplicacion web full-stack para venta de celulares, planes, portabilidades, internet, CRM, dashboard, agenda, blog y administracion.

## Stack

- Next.js App Router
- React + TypeScript
- TailwindCSS
- Componentes estilo shadcn/ui
- Supabase preparado para autenticacion
- Prisma + PostgreSQL
- OpenAI API para recomendaciones y agentes
- WhatsApp Business API preparada para Meta
- Vercel-ready

## Ejecutar

```bash
npm install
copy .env.example .env
npm run db:generate
npm run dev
```

## Variables clave

Configura `.env` con `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `OPENAI_API_KEY` y credenciales de WhatsApp Business cuando esten disponibles.

## Arquitectura

- `app/`: rutas, paginas y API REST.
- `components/`: UI reusable y secciones de landing.
- `lib/`: dominio, cotizador, Supabase, Prisma, OpenAI, WhatsApp y permisos.
- `prisma/schema.prisma`: modelos para usuarios, roles, catalogo, planes, promociones, leads, citas, cotizaciones y blog.
- `types/`: tipos compartidos.

## Integraciones futuras

La app deja puntos preparados para Meta Ads, Google Ads, analytics y agentes de IA. Los endpoints actuales responden con datos mock cuando no hay base de datos, para permitir desarrollo visual inmediato.

## Auditor de contenido

Usa este agente auditor cada vez que cambie `equipos v10.xlsx`, la oferta comercial Telcel o el contenido publicado del sitio.

Politica publica actual: el sitio no debe mostrar precios del equipo, montos de enganche, pagos mensuales, diferencias, disponibilidad, stock ni condiciones economicas del Excel. Las vistas publicas deben mostrar solo marcas y modelos de equipos; el siguiente paso del usuario es agendar una cita con un asesor.

Comando:

```bash
python tools/audit_site_content.py
```

Que valida:

- Regenera una interpretacion temporal del Excel `equipos v10.xlsx`.
- Si `equipos v10.xlsx` todavia no existe, usa temporalmente `V7.10    GENERAL .xlsx` como respaldo local.
- Compara el Excel contra `public/data/equipos-catalogo.json`.
- Revisa que el JSON publico no tenga columnas o llaves economicas.
- Revisa vistas publicas y API publica para detectar precios, enganches, pagos, stock o disponibilidad.
- Genera reportes en `reports/`.

Para usarlo como control antes de publicar cambios:

```bash
python tools/audit_site_content.py --fail-on-diff
```
