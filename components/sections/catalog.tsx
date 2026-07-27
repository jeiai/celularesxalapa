import { Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { devices } from "@/lib/data";
import { mxn } from "@/lib/utils";

export function CatalogSection() {
  return (
    <section id="catalogo" className="section-pad">
      <div className="container">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Catálogo de equipos</p>
          <h2 className="text-4xl font-extrabold tracking-normal md:text-6xl">Equipos listos para vender.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {devices.map((device) => (
            <Card key={device.id}>
              <CardHeader>
                <div className="mb-3 grid aspect-[9/12] place-items-center rounded-lg bg-muted">
                  <Smartphone className="size-20 text-primary" />
                </div>
                <CardTitle>{device.model}</CardTitle>
                <CardDescription>
                  {device.brand} · {device.storage} · {device.condition}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid gap-2 text-sm text-muted-foreground">
                  <span>Cámara: {device.camera}</span>
                  <span>Batería: {device.battery}</span>
                  <span>Stock: {device.stock}</span>
                </div>
                <strong className="text-xl">{mxn.format(device.price)}</strong>
                <Button className="mt-4 w-full" variant="dark">
                  Cotizar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
