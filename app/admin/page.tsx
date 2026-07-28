import { Boxes, Megaphone, ShieldCheck, Smartphone, Tags } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plans, promotions } from "@/lib/data";
import catalog from "@/public/data/equipos-catalogo.json";

const adminModules = [
  { title: "Roles de usuario", icon: ShieldCheck, text: "CUSTOMER, ADVISOR, MANAGER y ADMIN." },
  { title: "Catalogo interno", icon: Boxes, text: `${catalog.count} modelos interpretados desde Excel.` },
  { title: "Promociones", icon: Megaphone, text: `${promotions.length} campanas activas.` },
  { title: "Planes", icon: Tags, text: `${plans.length} familias comerciales.` },
  { title: "Catalogo publico", icon: Smartphone, text: "Solo marcas y modelos visibles para visitantes." }
];

export default function AdminPage() {
  return (
    <main className="section-pad bg-muted/50">
      <div className="container">
        <p className="mb-3 text-xs font-extrabold uppercase text-primary">Panel administrativo</p>
        <h1 className="mb-8 text-4xl font-extrabold md:text-6xl">Operacion modular y gobernada.</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.title}>
                <CardHeader>
                  <Icon className="size-7 text-primary" />
                  <CardTitle>{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{module.text}</CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
