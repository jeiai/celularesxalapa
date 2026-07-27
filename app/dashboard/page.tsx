import { BarChart3, Bot, Megaphone, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "@/lib/data";

const pipeline = [
  ["Nuevo", 42],
  ["Contactado", 31],
  ["Calificado", 19],
  ["Ganado", 12]
];

export default function DashboardPage() {
  return (
    <main className="section-pad bg-muted/50">
      <div className="container">
        <p className="mb-3 text-xs font-extrabold uppercase text-primary">Dashboard</p>
        <h1 className="mb-8 text-4xl font-extrabold md:text-6xl">Control comercial en tiempo real.</h1>
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <strong className="mt-2 block text-3xl">{stat.value}</strong>
                <span className="text-sm font-bold text-primary">{stat.trend}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="size-5 text-primary" />
                Pipeline CRM
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {pipeline.map(([label, value]) => (
                <div key={label} className="grid gap-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted">
                    <div className="h-3 rounded-full bg-primary" style={{ width: `${Number(value) * 2}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Integraciones futuras</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground">
              <p className="flex gap-2"><Megaphone className="size-4 text-primary" /> Meta Ads Pixel y conversion API.</p>
              <p className="flex gap-2"><TrendingUp className="size-4 text-primary" /> Google Ads y GA4.</p>
              <p className="flex gap-2"><Bot className="size-4 text-primary" /> Agentes de IA para seguimiento y recomendación.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
