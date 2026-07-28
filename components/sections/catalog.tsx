import Link from "next/link";
import { CalendarDays, Smartphone } from "lucide-react";
import { CatalogEquipmentVisual } from "@/components/catalog-equipment-visual";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import catalog from "@/public/data/equipos-catalogo.json";
import { hasExactCatalogImage } from "@/lib/catalog-images";

const featured = (() => {
  const seen = new Set<string>();
  return [...catalog.items.filter((device) => hasExactCatalogImage(device.brand, device.model)), ...catalog.items]
    .filter((device) => {
      if (seen.has(device.id)) {
        return false;
      }
      seen.add(device.id);
      return true;
    })
    .slice(0, 8);
})();

export function CatalogSection() {
  return (
    <section id="catalogo" className="section-pad">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase text-primary">Catalogo de equipos</p>
            <h2 className="text-4xl font-extrabold tracking-normal md:text-6xl">Marcas y modelos vigentes para elegir con asesor.</h2>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/precios">Ver catalogo completo</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((device) => {
            return (
              <Card key={device.id}>
                <CardHeader>
                  <div className="mb-3">
                    <CatalogEquipmentVisual brand={device.brand} model={device.model} aspect="portrait" />
                  </div>
                  <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                    <Smartphone className="size-3.5 text-primary" />
                    Marca y modelo
                  </div>
                  <CardDescription className="font-extrabold uppercase text-primary">{device.brand || "Marca por confirmar"}</CardDescription>
                  <CardTitle className="text-lg leading-6">{device.model}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="dark">
                    <Link href="/agenda">
                      <CalendarDays className="mr-2 size-4" />
                      Agendar cita
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
