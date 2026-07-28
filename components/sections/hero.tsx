import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="cx-gradient grid min-h-[calc(100vh-74px)] items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
      <div className="mx-auto w-full max-w-7xl lg:col-span-2 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-10">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Compra, cambia o conecta hoy en Xalapa</p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[.95] tracking-normal md:text-7xl lg:text-8xl">
            Tu tienda digital para celulares, planes e internet.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Catalogo publico de marcas y modelos, agenda con asesores, CRM y panel administrativo listos para operar y convertir mejor.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/precios">
                Ver catalogo <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/agenda">
                <CalendarDays className="mr-2 size-5" />
                Agendar cita
              </Link>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
            <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2">
              <Truck className="size-4 text-primary" />
              Entrega local
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2">
              <BadgeCheck className="size-4 text-primary" />
              CRM y agenda
            </span>
            <span className="rounded-full border bg-white px-4 py-2">Preparado para IA y Ads</span>
          </div>
        </div>
        <div className="relative mx-auto mt-10 w-full max-w-[560px] lg:mt-0">
          <Image
            src="/assets/hero-smartphone.png"
            alt="Smartphone moderno para CelularesXalapa.com"
            width={1024}
            height={1536}
            priority
            className="rounded-[2rem] shadow-retail"
          />
          <div className="absolute bottom-8 right-4 rounded-2xl border bg-white/90 p-4 shadow-retail backdrop-blur">
            <span className="block text-xs font-bold text-muted-foreground">Siguiente paso</span>
            <strong className="text-2xl">Asesor personal</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
