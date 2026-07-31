"use client";

import { useState } from "react";
import { getCatalogImage } from "@/lib/catalog-images";

export function CatalogEquipmentVisual({
  brand,
  model,
  aspect = "wide"
}: {
  brand?: string;
  model?: string;
  aspect?: "wide" | "portrait";
}) {
  const image = getCatalogImage(brand, model);
  const [imageFailed, setImageFailed] = useState(false);
  const aspectClass = aspect === "portrait" ? "aspect-[9/10]" : "aspect-[16/10]";

  if (image && !imageFailed) {
    return (
      <div className="grid gap-2">
        <div className="overflow-hidden rounded-lg bg-muted">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className={`${aspectClass} w-full object-contain p-4`}
          />
        </div>
        <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary">Foto del modelo</span>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <div className="overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/hero-smartphone.png"
          alt={`Imagen de referencia para ${brand || "equipo"} ${model || ""}`.trim()}
          loading="lazy"
          className={`${aspectClass} w-full object-contain p-4`}
        />
      </div>
      <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">Imagen de referencia</span>
    </div>
  );
}
