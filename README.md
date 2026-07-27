# CelularesXalapa.com

Aplicación web full-stack para venta de celulares, planes, portabilidades, internet, CRM, dashboard, agenda, blog y administración.

## Stack

- Next.js App Router
- React + TypeScript
- TailwindCSS
- Componentes estilo shadcn/ui
- Supabase preparado para autenticación
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

Configura `.env` con `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `OPENAI_API_KEY` y credenciales de WhatsApp Business cuando estén disponibles.

## Arquitectura

- `app/`: rutas, páginas y API REST.
- `components/`: UI reusable y secciones de landing.
- `lib/`: dominio, cotizador, Supabase, Prisma, OpenAI, WhatsApp y permisos.
- `prisma/schema.prisma`: modelos para usuarios, roles, catálogo, planes, promociones, leads, citas, cotizaciones y blog.
- `types/`: tipos compartidos.

## Integraciones futuras

La app deja puntos preparados para Meta Ads, Google Ads, analytics y agentes de IA. Los endpoints actuales responden con datos mock cuando no hay base de datos, para permitir desarrollo visual inmediato.

## Auditor de contenido

Para auditar que el sitio siga alineado con el Excel de precios y la oferta comercial Telcel:

```bash
python tools/audit_site_content.py
```

El auditor regenera una interpretación temporal del Excel, la compara contra `public/data/catalogo-excel.json`, revisa la campaña Telcel en `lib/telcel-offers.ts` y genera reportes en `reports/`.
