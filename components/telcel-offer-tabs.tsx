"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { telcelOfferCampaign, type TelcelOfferGroup, type TelcelOfferPoint } from "@/lib/telcel-offers";

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
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-extrabold uppercase text-primary">{group.kicker}</p>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-secondary-foreground">
              {group.audience}
            </span>
          </div>
          <CardTitle className="text-3xl">{group.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid content-start gap-3">
            <p className="text-sm leading-6 text-muted-foreground">{group.description}</p>
            {group.validity ? <p className="text-sm font-bold text-primary">{group.validity}</p> : null}
          </div>
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
        {group.offerPoints.map((point) => (
          <OfferDetailCard key={`${group.id}-${point.name}`} point={point} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Material de referencia</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={group.sourceImage}
            alt={`Material tarifario ${group.title}`}
            width={1240}
            height={1600}
            className="h-auto w-full rounded-lg border object-contain"
          />
        </CardContent>
      </Card>
    </div>
  );
}

function OfferDetailCard({ point }: { point: TelcelOfferPoint }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{point.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {point.price ? <Pill label="Precio" value={point.price} /> : null}
        {point.openPrice ? <Pill label="Abierto" value={point.openPrice} /> : null}
        {point.controlledPrice ? <Pill label="Controlado" value={point.controlledPrice} /> : null}
        {point.includedGb ? <Pill label="GB incluidos" value={point.includedGb} /> : null}
        {point.promoGb ? <Pill label="Promocion GB" value={point.promoGb} accent /> : null}
        {point.cashback ? <Pill label="Cashback Telcel" value={point.cashback} accent /> : null}
        {point.validity ? <Detail label="Vigencia" value={point.validity} /> : null}
        {point.social ? <Detail label="Redes sociales" value={point.social} /> : null}
        {point.service ? <Detail label="Servicio" value={point.service} /> : null}
        {point.mobility ? <Detail label="Movilidad" value={point.mobility} /> : null}
        {point.fairUse ? <Detail label="Politica de uso justo" value={point.fairUse} /> : null}
        {point.devices ? <Detail label="Dispositivos" value={point.devices} /> : null}
        {point.note ? <Detail label="Nota" value={point.note} /> : null}
      </CardContent>
    </Card>
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-3">
      <span className="text-xs font-extrabold uppercase text-muted-foreground">{label}</span>
      <p className="mt-1 text-sm font-semibold leading-5">{value}</p>
    </div>
  );
}
