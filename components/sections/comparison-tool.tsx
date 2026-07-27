"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { devices } from "@/lib/data";
import { mxn } from "@/lib/utils";

export function ComparisonTool() {
  const [firstSlug, setFirstSlug] = useState(devices[0].slug);
  const [secondSlug, setSecondSlug] = useState(devices[1].slug);

  const first = useMemo(() => devices.find((device) => device.slug === firstSlug) ?? devices[0], [firstSlug]);
  const second = useMemo(() => devices.find((device) => device.slug === secondSlug) ?? devices[1], [secondSlug]);

  return (
    <section id="comparador" className="section-pad">
      <div className="container">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Comparador</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">Decide con datos simples.</h2>
        </div>
        <Card>
          <CardContent className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-4">
            <label className="grid gap-2 text-sm font-bold text-muted-foreground">
              Equipo A
              <Select value={firstSlug} onChange={(event) => setFirstSlug(event.target.value)}>
                {devices.map((device) => (
                  <option key={device.id} value={device.slug}>
                    {device.model}
                  </option>
                ))}
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-bold text-muted-foreground">
              Equipo B
              <Select value={secondSlug} onChange={(event) => setSecondSlug(event.target.value)}>
                {devices.map((device) => (
                  <option key={device.id} value={device.slug}>
                    {device.model}
                  </option>
                ))}
              </Select>
            </label>
            <Metric label="Precio" value={`${mxn.format(first.price)} vs ${mxn.format(second.price)}`} />
            <Metric label="Inventario" value={`${first.stock} vs ${second.stock} piezas`} />
            <Metric label="Cámara" value={`${first.camera} vs ${second.camera}`} />
            <Metric label="Batería" value={`${first.battery} vs ${second.battery}`} />
            <Metric label="Memoria" value={`${first.storage} vs ${second.storage}`} />
            <Metric label="Mejor para" value={first.price <= second.price ? "Presupuesto controlado" : "Experiencia premium"} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted p-4">
      <span className="text-xs font-extrabold uppercase text-primary">{label}</span>
      <p className="mt-2 text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}
