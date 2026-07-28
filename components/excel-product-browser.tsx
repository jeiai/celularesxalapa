"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, Search, SlidersHorizontal, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type PublicEquipment = {
  id: string;
  sourceSheet: string;
  category: string;
  brand: string;
  model: string;
  technology: string;
  color: string;
  validFrom: string;
  validTo: string;
};

type CatalogPayload = {
  source: string;
  sourceMode?: string;
  count: number;
  filters: {
    categories: string[];
    brands: string[];
    technologies: string[];
    colors: string[];
  };
  items: PublicEquipment[];
};

export function ExcelProductBrowser({ catalog }: { catalog: CatalogPayload }) {
  const [brand, setBrand] = useState("Todas");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(48);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.items.filter((item) => {
      const matchesBrand = brand === "Todas" || item.brand === brand;
      const matchesQuery = !q || [item.brand, item.model].join(" ").toLowerCase().includes(q);
      return matchesBrand && matchesQuery;
    });
  }, [brand, catalog.items, query]);

  const visible = filtered.slice(0, limit);

  function resetFilters() {
    setBrand("Todas");
    setQuery("");
    setLimit(48);
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="grid gap-4 p-5">
          <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_auto]">
            <label className="grid gap-2 text-sm font-bold text-muted-foreground">
              Buscar marca o modelo
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="iPhone, Samsung, Motorola..." />
              </div>
            </label>
            <FilterSelect label="Marca" value={brand} onChange={setBrand} options={["Todas", ...catalog.filters.brands]} />
            <div className="flex items-end">
              <Button className="w-full" variant="outline" onClick={resetFilters}>
                Limpiar
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-bold text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2">
              <SlidersHorizontal className="size-4 text-primary" />
              {filtered.length} modelo(s)
            </span>
            <span className="rounded-full bg-muted px-3 py-2">Fuente: {catalog.source}</span>
            {catalog.sourceMode === "fallback" ? <span className="rounded-full bg-red-50 px-3 py-2 text-red-700">Esperando equipos v10.xlsx</span> : null}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </div>

      {visible.length < filtered.length ? (
        <Button className="mx-auto" variant="secondary" onClick={() => setLimit((current) => current + 48)}>
          Ver mas modelos
        </Button>
      ) : null}

      {!filtered.length ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No encontre modelos con esa busqueda. Prueba con otra marca o agenda una cita para que un asesor lo revise.
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-muted-foreground">
      {label}
      <Select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </label>
  );
}

function EquipmentCard({ item }: { item: PublicEquipment }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="mb-3 grid aspect-[16/10] place-items-center rounded-lg bg-muted">
          <Smartphone className="size-14 text-primary" />
        </div>
        <p className="text-sm font-extrabold uppercase text-primary">{item.brand || "Marca por confirmar"}</p>
        <CardTitle className="text-lg leading-6">{item.model}</CardTitle>
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
}
