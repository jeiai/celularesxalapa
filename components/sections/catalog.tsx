import Link from "next/link";
import { CalendarDays, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import catalog from "@/public/data/equipos-catalogo.json";

const featured = catalog.items.slice(0, 8);

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
          {featured.map((device) => (
            <Card key={device.id}>
              <CardHeader>
                <div className="mb-3 grid aspect-[9/10] place-items-center rounded-lg bg-muted">
                  <Smartphone className="size-16 text-primary" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
