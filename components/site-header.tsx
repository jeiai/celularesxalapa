import Link from "next/link";
import { CalendarDays, Search, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  ["Catalogo", "/#catalogo"],
  ["Equipos", "/precios"],
  ["Cambiate a Telcel", "/ofertas-telcel"],
  ["Comparador", "/#comparador"],
  ["Asesor", "/#cotizador"],
  ["Dashboard", "/dashboard"],
  ["Admin", "/admin"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/88 px-4 py-3 backdrop-blur-xl md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-3 lg:grid-cols-[auto_minmax(260px,520px)_auto]">
        <Link href="/" className="flex items-center gap-2 font-extrabold">
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-red-600 text-white">
            <Smartphone className="size-5" />
          </span>
          <span>CelularesXalapa.com</span>
        </Link>

        <form className="flex rounded-full border bg-muted p-1">
          <label className="sr-only" htmlFor="search">
            Buscar
          </label>
          <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              id="search"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="Buscar equipos, planes, internet..."
            />
          </div>
          <Button size="sm" type="submit">
            Buscar
          </Button>
        </form>

        <nav className="flex items-center gap-2 overflow-x-auto text-sm font-bold lg:justify-end">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-muted">
              {label}
            </Link>
          ))}
          <Button asChild variant="dark" size="sm">
            <Link href="/agenda">
              <CalendarDays className="mr-2 size-4" />
              Agenda Cita
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
