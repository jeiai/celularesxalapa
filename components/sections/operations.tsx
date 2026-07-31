import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TelcelOfferTabs } from "@/components/telcel-offer-tabs";
import { Button } from "@/components/ui/button";

export function PlansAndOperations() {
  return (
    <section id="planes" className="section-pad">
      <div className="container">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-extrabold uppercase text-primary">Planes tarifarios</p>
            <h2 className="text-4xl font-extrabold md:text-6xl">Todos los esquemas Telcel.</h2>
            <p className="mt-4 text-muted-foreground">
              Revisa Amigo Kit prepago, planes postpago Telcel Libre y Ultra, y WiFi Telcel con sus precios, gigas y beneficios.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/agenda">
              Agendar cita
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <TelcelOfferTabs />
      </div>
    </section>
  );
}
