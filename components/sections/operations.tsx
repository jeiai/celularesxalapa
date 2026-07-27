import Link from "next/link";
import { BarChart3, Boxes, CalendarCheck, Contact, Megaphone, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans, stats } from "@/lib/data";
import { mxn } from "@/lib/utils";

const modules = [
  { title: "CRM", href: "/crm", icon: Contact, text: "Leads, estados, origen y seguimiento comercial." },
  { title: "Dashboard", href: "/dashboard", icon: BarChart3, text: "KPIs de ventas, citas, cotizaciones e inventario." },
  { title: "Agenda", href: "/agenda", icon: CalendarCheck, text: "Citas por canal, asesor y etapa de venta." },
  { title: "Admin", href: "/admin", icon: ShieldCheck, text: "Roles, promociones, planes, inventario y blog." },
  { title: "Inventario", href: "/admin", icon: Boxes, text: "Stock, precios, condiciones y destacados." },
  { title: "Ads e IA", href: "/dashboard", icon: Megaphone, text: "Hooks para Meta Ads, Google Ads y agentes de IA." }
];

export function PlansAndOperations() {
  return (
    <>
      <section id="planes" className="section-pad">
        <div className="container grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase text-primary">Gestión de planes</p>
            <h2 className="text-4xl font-extrabold md:text-6xl">Planes claros para vender más rápido.</h2>
            <p className="mt-4 text-muted-foreground">
              Los planes viven en una capa de datos reusable para API, cotizador y administración.
            </p>
          </div>
          <div className="grid gap-3">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardContent className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <strong>{plan.name}</strong>
                    <p className="text-sm text-muted-foreground">
                      {plan.dataGb} GB · {plan.benefits.join(" · ")}
                    </p>
                  </div>
                  <strong className="text-xl">{mxn.format(plan.monthlyFee)}/mes</strong>
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
              <p className="mb-3 text-xs font-extrabold uppercase text-blue-300">Operación full-stack</p>
              <h2 className="text-4xl font-extrabold md:text-6xl">CRM, dashboard y administración.</h2>
            </div>
            <Button asChild variant="secondary">
              <Link href="/dashboard">Abrir dashboard</Link>
            </Button>
          </div>
          <div className="mb-4 grid gap-4 md:grid-cols-4">
            {stats.map((stat) => (
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
