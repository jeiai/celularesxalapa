"use client";

import { useMemo, useState } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { devices, plans } from "@/lib/data";
import { calculateQuote } from "@/lib/quote";
import { mxn } from "@/lib/utils";

export function QuoteTool() {
  const [deviceSlug, setDeviceSlug] = useState(devices[0].slug);
  const [planId, setPlanId] = useState(plans[1].id);
  const [downPayment, setDownPayment] = useState(2500);
  const [months, setMonths] = useState(18);

  const quote = useMemo(
    () => calculateQuote({ deviceSlug, planId, downPayment, months }),
    [deviceSlug, downPayment, months, planId]
  );

  return (
    <section id="cotizador" className="section-pad bg-muted/60">
      <div className="container grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Cotizador inteligente</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">Calcula pagos y prepara el cierre.</h2>
          <p className="mt-4 text-muted-foreground">
            Base lista para enriquecer con OpenAI, scoring de leads y envío por WhatsApp Business API.
          </p>
        </div>
        <Card>
          <CardContent className="grid gap-4 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-muted-foreground">
                Equipo
                <Select value={deviceSlug} onChange={(event) => setDeviceSlug(event.target.value)}>
                  {devices.map((device) => (
                    <option key={device.id} value={device.slug}>
                      {device.model}
                    </option>
                  ))}
                </Select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-muted-foreground">
                Plan
                <Select value={planId} onChange={(event) => setPlanId(event.target.value)}>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-muted-foreground">
              Enganche: {mxn.format(downPayment)}
              <input
                type="range"
                min={0}
                max={9000}
                step={500}
                value={downPayment}
                onChange={(event) => setDownPayment(Number(event.target.value))}
                className="accent-blue-600"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-muted-foreground">
              Meses
              <Select value={String(months)} onChange={(event) => setMonths(Number(event.target.value))}>
                <option value="12">12 meses</option>
                <option value="18">18 meses</option>
                <option value="24">24 meses</option>
              </Select>
            </label>
            <div className="grid gap-3 rounded-lg bg-zinc-950 p-5 text-white md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-sm text-white/65">{quote.summary}</span>
                <strong className="mt-1 block text-4xl">{mxn.format(quote.monthlyPay)}/mes</strong>
              </div>
              <Button variant="secondary">
                <MessageCircle className="mr-2 size-4" />
                Enviar a WhatsApp
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Calculator className="size-4 text-primary" />
              Total estimado: {mxn.format(quote.total)}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
