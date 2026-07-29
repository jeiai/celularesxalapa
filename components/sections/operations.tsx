import Link from "next/link";
import { CalendarCheck, Contact } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/data";
import catalog from "@/public/data/equipos-catalogo.json";

const modules = [
  { title: "CRM", href: "/crm", icon: Contact, text: "Leads, estados, origen y seguimiento comercial." },
  { title: "Agenda", href: "/agenda", icon: CalendarCheck, text: "Citas por canal, asesor y etapa de venta." }
];

const operationalStats = [
  { label: "Modelos publicados", value: catalog.count, trend: "Solo marca y modelo" },
  { label: "Marcas", value: catalog.filters.brands.length, trend: "Desde Excel" },
  { label: "Flujo recomendado", value: "Cita", trend: "Atencion personalizada" },
  { label: "Integraciones", value: "IA", trend: "Preparado para Ads" }
];

export function PlansAndOperations() {
  return (
    <>
      <section id="planes" className="section-pad">
        <div className="container grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase text-primary">Gestion de planes</p>
            <h2 className="text-4xl font-extrabold md:text-6xl">Planes Telcel para revisar con asesor.</h2>
            <p className="mt-4 text-muted-foreground">
              La pagina presenta las familias de planes y beneficios generales. La seleccion final se confirma en cita.
            </p>
          </div>
          <div className="grid gap-3">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardContent className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <strong>{plan.name}</strong>
                    <p className="text-sm text-muted-foreground">{plan.benefits.join(" - ")}</p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href="/agenda">Agendar cita</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-zinc-950 text-white">
        <div className="container">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase text-blue-300">Operacion full-stack</p>
              <h2 className="text-4xl font-extrabold md:text-6xl">CRM y agenda comercial.</h2>
            </div>
            <Button asChild variant="secondary">
              <Link href="/agenda">Agendar cita</Link>
            </Button>
          </div>
          <div className="mb-4 grid gap-4 md:grid-cols-4">
            {operationalStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/5 p-5">
                <span className="text-sm text-white/60">{stat.label}</span>
                <strong className="mt-2 block text-3xl">{stat.value}</strong>
                <span className="text-sm font-bold text-blue-300">{stat.trend}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link key={module.title} href={module.href} className="rounded-lg border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <Icon className="mb-4 size-7 text-blue-300" />
                  <strong>{module.title}</strong>
                  <p className="mt-2 text-sm leading-6 text-white/65">{module.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
