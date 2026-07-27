import { Boxes, Megaphone, ShieldCheck, Smartphone, Tags } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { devices, plans, promotions } from "@/lib/data";

const adminModules = [
  { title: "Roles de usuario", icon: ShieldCheck, text: "CUSTOMER, ADVISOR, MANAGER y ADMIN." },
  { title: "Inventario", icon: Boxes, text: `${devices.length} equipos configurados.` },
  { title: "Promociones", icon: Megaphone, text: `${promotions.length} campañas activas.` },
  { title: "Planes", icon: Tags, text: `${plans.length} planes comerciales.` },
  { title: "Catálogo", icon: Smartphone, text: "Precios, stock, destacados y condiciones." }
];

export default function AdminPage() {
  return (
    <main className="section-pad bg-muted/50">
      <div className="container">
        <p className="mb-3 text-xs font-extrabold uppercase text-primary">Panel administrativo</p>
        <h1 className="mb-8 text-4xl font-extrabold md:text-6xl">Operación modular y gobernada.</h1>
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
