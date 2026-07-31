import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-white px-4 py-8 md:px-8 lg:py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Promociones Telcel en Xalapa</p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[.95] tracking-normal md:text-7xl lg:text-8xl">
            Estrena celular hoy.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Equipos en plan o Amigo Kit a plazos, portabilidad a Telcel, doble de gigas e internet para tu hogar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/precios">
                Ver equipos <ArrowRight className="ml-2 size-5" />
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
            <Link
              href="http://wa.link/josuetelcel"
              className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 transition hover:bg-muted"
            >
              <MessageCircle className="size-4 text-primary" />
              WhatsApp 2281 03 5245
            </Link>
            <span className="rounded-full border bg-white px-4 py-2">Atencion en Xalapa y alrededores</span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[560px]">
          <Image
            src="/assets/estrena-hoy-telcel.jpg"
            alt="Flyer de promocion Telcel: estrena hoy equipo en plan o Amigo Kit a plazos"
            width={853}
            height={1280}
            priority
            className="rounded-lg shadow-retail"
          />
        </div>
      </div>
    </section>
  );
}
