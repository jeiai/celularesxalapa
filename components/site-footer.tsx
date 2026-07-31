import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-zinc-950 px-4 py-10 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <strong>CelularesXalapa.com</strong>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
            Celulares, planes Telcel, portabilidades e internet para Xalapa y alrededores.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/ofertas-telcel">Ofertas Telcel</Link>
          <Link href="/precios">Equipos</Link>
          <Link href="/agenda">Agendar cita</Link>
        </div>
      </div>
    </footer>
  );
}
