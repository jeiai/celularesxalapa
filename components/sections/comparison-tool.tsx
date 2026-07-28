"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import catalog from "@/public/data/equipos-catalogo.json";

const models = catalog.items.slice(0, 240);

export function ComparisonTool() {
  const [firstId, setFirstId] = useState(models[0]?.id ?? "");
  const [secondId, setSecondId] = useState(models[1]?.id ?? models[0]?.id ?? "");

  const first = useMemo(() => models.find((device) => device.id === firstId) ?? models[0], [firstId]);
  const second = useMemo(() => models.find((device) => device.id === secondId) ?? models[1] ?? models[0], [secondId]);

  return (
    <section id="comparador" className="section-pad">
      <div className="container">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Comparador</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">Compara modelos y agenda una recomendacion.</h2>
        </div>
        <Card>
          <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
            <ModelSelect label="Equipo A" value={firstId} onChange={setFirstId} />
            <ModelSelect label="Equipo B" value={secondId} onChange={setSecondId} />
            <Button asChild size="lg" variant="dark">
              <Link href="/agenda">
                <CalendarDays className="mr-2 size-4" />
                Agendar cita
              </Link>
            </Button>
            <ModelSummary title="Equipo A" item={first} />
            <ModelSummary title="Equipo B" item={second} />
            <div className="rounded-lg bg-muted p-4 text-sm font-semibold leading-6 text-muted-foreground">
              El asesor revisa internamente opciones, compatibilidad y condiciones vigentes segun tu caso.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ModelSelect({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-muted-foreground">
      {label}
      <Select value={value} onChange={(event) => onChange(event.target.value)}>
        {models.map((device) => (
          <option key={device.id} value={device.id}>
            {device.brand} {device.model}
          </option>
        ))}
      </Select>
    </label>
  );
}

function ModelSummary({ title, item }: { title: string; item?: (typeof models)[number] }) {
  return (
    <div className="rounded-lg bg-muted p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase text-primary">
        <Smartphone className="size-4" />
        {title}
      </div>
      <p className="text-sm font-extrabold uppercase text-muted-foreground">{item?.brand || "Marca por confirmar"}</p>
      <p className="mt-1 text-lg font-extrabold leading-6">{item?.model || "Modelo por confirmar"}</p>
    </div>
  );
}
