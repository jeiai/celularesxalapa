"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { mxn } from "@/lib/utils";

type PlanOption = {
  plan: string;
  precio: number | null;
  mensualidad: number | null;
};

type ExcelProduct = {
  id: string;
  tipo: string;
  categoria: string;
  marca: string;
  modelo: string;
  tecnologia: string;
  color: string;
  precioConIva: number | null;
  precioSinIva: number | null;
  inicio: string;
  fin: string;
  planes: PlanOption[];
};

type CatalogPayload = {
  source: string;
  count: number;
  filters: {
    tipos: string[];
    marcas: string[];
    categorias: string[];
    planes: string[];
  };
  items: ExcelProduct[];
};

export function ExcelProductBrowser({ catalog }: { catalog: CatalogPayload }) {
  const [tipo, setTipo] = useState("Todos");
  const [marca, setMarca] = useState("Todas");
  const [categoria, setCategoria] = useState("Todas");
  const [plan, setPlan] = useState("Todos");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(48);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.items.filter((item) => {
      const matchesTipo = tipo === "Todos" || item.tipo === tipo;
      const matchesMarca = marca === "Todas" || item.marca === marca;
      const matchesCategoria = categoria === "Todas" || item.categoria === categoria;
      const matchesPlan = plan === "Todos" || item.planes.some((option) => option.plan === plan);
      const matchesQuery =
        !q ||
        [item.modelo, item.marca, item.categoria, item.tecnologia, item.color]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesTipo && matchesMarca && matchesCategoria && matchesPlan && matchesQuery;
    });
  }, [catalog.items, categoria, marca, plan, query, tipo]);

  const visible = filtered.slice(0, limit);

  function resetFilters() {
    setTipo("Todos");
    setMarca("Todas");
    setCategoria("Todas");
    setPlan("Todos");
    setQuery("");
    setLimit(48);
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardContent className="grid gap-4 p-5">
          <div className="grid gap-3 md:grid-cols-[1.2fr_repeat(4,1fr)_auto]">
            <label className="grid gap-2 text-sm font-bold text-muted-foreground">
              Buscar producto
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="iPhone, Samsung, cargador..." />
              </div>
            </label>
            <FilterSelect label="Tipo" value={tipo} onChange={setTipo} options={["Todos", ...catalog.filters.tipos]} />
            <FilterSelect label="Marca" value={marca} onChange={setMarca} options={["Todas", ...catalog.filters.marcas]} />
            <FilterSelect label="Categoría" value={categoria} onChange={setCategoria} options={["Todas", ...catalog.filters.categorias]} />
            <FilterSelect label="Plan" value={plan} onChange={setPlan} options={["Todos", ...catalog.filters.planes]} />
            <div className="flex items-end">
              <Button className="w-full" variant="outline" onClick={resetFilters}>
                Limpiar
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-bold text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2">
              <SlidersHorizontal className="size-4 text-primary" />
              {filtered.length} resultado(s)
            </span>
            <span className="rounded-full bg-muted px-3 py-2">Fuente: {catalog.source}</span>
            <span className="rounded-full bg-muted px-3 py-2">{catalog.count} productos interpretados</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <ProductCard key={item.id} item={item} selectedPlan={plan} />
        ))}
      </div>

      {visible.length < filtered.length ? (
        <Button className="mx-auto" variant="secondary" onClick={() => setLimit((current) => current + 48)}>
          Ver más productos
        </Button>
      ) : null}

      {!filtered.length ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No encontré productos con esa combinación. Prueba quitando un filtro.
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

function ProductCard({ item, selectedPlan }: { item: ExcelProduct; selectedPlan: string }) {
  const planOption =
    selectedPlan === "Todos" ? item.planes[0] : item.planes.find((option) => option.plan === selectedPlan) ?? item.planes[0];
  const cashPrice = item.precioConIva ?? planOption?.precio ?? null;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-secondary-foreground">{item.tipo}</span>
          {item.categoria ? <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">{item.categoria}</span> : null}
        </div>
        <CardTitle className="text-lg">{item.modelo}</CardTitle>
        <p className="text-sm font-semibold text-muted-foreground">
          {item.marca || "Sin marca"} {item.tecnologia ? `· ${item.tecnologia}` : ""}
        </p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <PriceBox label={item.planes.length ? "Precio plan" : "Precio contado"} value={cashPrice === null ? "N/D" : mxn.format(cashPrice)} />
          <PriceBox label="Mensualidad" value={planOption?.mensualidad === null || !planOption ? "N/D" : `${mxn.format(planOption.mensualidad)}/mes`} tone="red" />
        </div>
        {planOption ? (
          <div className="rounded-lg bg-muted p-3 text-sm">
            <span className="font-extrabold text-primary">{planOption.plan}</span>
            <p className="mt-1 text-muted-foreground">Precio y pago mensual interpretados desde la hoja de postpago.</p>
          </div>
        ) : null}
        {item.color ? <p className="text-sm text-muted-foreground">Color: {item.color}</p> : null}
        {item.fin ? <p className="text-sm text-muted-foreground">Vigencia: {item.fin}</p> : null}
      </CardContent>
    </Card>
  );
}

function PriceBox({ label, value, tone = "blue" }: { label: string; value: string; tone?: "blue" | "red" }) {
  return (
    <div className="rounded-lg border bg-white p-3">
      <span className="text-xs font-extrabold uppercase text-muted-foreground">{label}</span>
      <strong className={tone === "red" ? "mt-1 block text-xl text-red-600" : "mt-1 block text-xl text-primary"}>{value}</strong>
    </div>
  );
}
