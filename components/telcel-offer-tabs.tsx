"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mxn } from "@/lib/utils";
import { telcelOfferCampaign, type TelcelOfferGroup, type TelcelPricePoint } from "@/lib/telcel-offers";

export function TelcelOfferTabs() {
  const [selectedId, setSelectedId] = useState(telcelOfferCampaign.groups[0].id);
  const selected = useMemo(
    () => telcelOfferCampaign.groups.find((group) => group.id === selectedId) ?? telcelOfferCampaign.groups[0],
    [selectedId]
  );

  return (
    <div className="grid gap-6">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {telcelOfferCampaign.groups.map((group) => (
          <Button
            key={group.id}
            variant={group.id === selected.id ? "default" : "outline"}
            onClick={() => setSelectedId(group.id)}
            className="shrink-0"
          >
            {group.title}
          </Button>
        ))}
      </div>
      <OfferGroup group={selected} />
    </div>
  );
}

function OfferGroup({ group }: { group: TelcelOfferGroup }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader>
          <p className="text-xs font-extrabold uppercase text-primary">{group.kicker}</p>
          <CardTitle className="text-3xl">{group.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <p className="text-sm leading-6 text-muted-foreground">{group.description}</p>
          <div className="grid gap-2">
            {group.benefits.map((benefit) => (
              <div key={benefit} className="flex gap-2 text-sm font-semibold">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {group.pricePoints.map((point) => (
          <PlanPriceCard key={`${group.id}-${point.name}`} point={point} />
        ))}
      </div>
    </div>
  );
}

function PlanPriceCard({ point }: { point: TelcelPricePoint }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{point.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {point.price ? <PriceLine label="Precio" value={mxn.format(point.price)} /> : null}
        {point.openPrice ? <PriceLine label="Abierto" value={mxn.format(point.openPrice)} /> : null}
        {point.controlledPrice ? <PriceLine label="Controlado" value={mxn.format(point.controlledPrice)} /> : null}
        {point.includedGb ? <Pill label="GB incluidos" value={point.includedGb} /> : null}
        {point.promoGb ? <Pill label="Promocion" value={point.promoGb} accent /> : null}
        {point.cashback ? <Pill label="Cashback" value={point.cashback} /> : null}
        {point.note ? <p className="text-sm font-semibold text-muted-foreground">{point.note}</p> : null}
      </CardContent>
    </Card>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-3">
      <span className="text-xs font-extrabold uppercase text-muted-foreground">{label}</span>
      <strong className="mt-1 block text-2xl text-primary">{value}</strong>
    </div>
  );
}

function Pill({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={accent ? "rounded-lg bg-red-50 p-3 text-red-700" : "rounded-lg bg-secondary p-3 text-secondary-foreground"}>
      <span className="text-xs font-extrabold uppercase">{label}</span>
      <strong className="mt-1 block text-xl">{value}</strong>
    </div>
  );
}
