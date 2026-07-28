"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import catalog from "@/public/data/equipos-catalogo.json";

const models = catalog.items.slice(0, 240);
const intents = ["Comprar smartphone", "Cambiarme a Telcel", "Renovar equipo", "Plan Telcel", "WiFi Telcel", "Accesorios"];

export function QuoteTool() {
  const [deviceId, setDeviceId] = useState(models[0]?.id ?? "");
  const [intent, setIntent] = useState(intents[0]);
  const selected = models.find((device) => device.id === deviceId) ?? models[0];

  return (
    <section id="cotizador" className="section-pad bg-muted/60">
      <div className="container grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Cotizador inteligente</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">Agenda una recomendacion con asesor.</h2>
          <p className="mt-4 text-muted-foreground">
            Selecciona el modelo que te interesa y el tipo de ayuda que necesitas. Las condiciones comerciales se confirman en atencion personalizada.
          </p>
        </div>
        <Card>
          <CardContent className="grid gap-4 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-muted-foreground">
                Modelo de interes
                <Select value={deviceId} onChange={(event) => setDeviceId(event.target.value)}>
                  {models.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.brand} {device.model}
                    </option>
                  ))}
                </Select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-muted-foreground">
                Necesidad
                <Select value={intent} onChange={(event) => setIntent(event.target.value)}>
                  {intents.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
            <div className="grid gap-3 rounded-lg bg-zinc-950 p-5 text-white md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-sm text-white/65">{intent}</span>
                <strong className="mt-1 block text-2xl leading-8">
                  {selected?.brand} {selected?.model}
                </strong>
              </div>
              <Button asChild variant="secondary">
                <Link href="/agenda">
                  <CalendarDays className="mr-2 size-4" />
                  Agendar cita
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Sparkles className="size-4 text-primary" />
              Preparado para integrarse con WhatsApp Business, CRM y agentes de IA.
            </div>
            <Button asChild variant="outline">
              <Link href="/agenda">
                <MessageCircle className="mr-2 size-4" />
                Hablar con un asesor
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
