import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/data";

export function PlansAndOperations() {
  return (
    <section id="planes" className="section-pad">
      <div className="container grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Planes Telcel</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">Elige tu plan con asesor.</h2>
          <p className="mt-4 text-muted-foreground">
            Te ayudamos a revisar opciones de equipo, plan, portabilidad e internet segun lo que necesitas.
          </p>
        </div>
        <div className="grid gap-3">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardContent className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <strong>{plan.name}</strong>
                  <p className="text-sm text-muted-foreground">{plan.benefits.join(" - ")}</p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/agenda">Agendar cita</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
