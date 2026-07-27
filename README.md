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

Usa este agente auditor cada vez que cambie el Excel de precios, la oferta comercial Telcel o el contenido publicado del sitio.

Comando:

```bash
python tools/audit_site_content.py
```

Que valida:

- Regenera una interpretacion temporal del Excel original.
- Compara el Excel contra `public/data/catalogo-excel.json`.
- Revisa conteos, tipos comerciales, planes, productos faltantes y una muestra de precios.
- Revisa que `lib/telcel-offers.ts` incluya Portabilidad, doble GB, 50% mas gigas, Planes Ultra, Planes Libre, WiFi Telcel y vigencia.
- Genera reportes en `reports/`.

Para usarlo como control antes de publicar cambios:

```bash
python tools/audit_site_content.py --fail-on-diff
```
