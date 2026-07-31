import Link from "next/link";
import { Megaphone, RadioTower, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { promotions } from "@/lib/data";

const icons = [Sparkles, Megaphone, RadioTower];

export function PromotionsSection() {
  return (
    <section className="section-pad bg-muted/60">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase text-primary">Promociones</p>
            <h2 className="text-4xl font-extrabold md:text-6xl">Beneficios para estrenar hoy.</h2>
          </div>
          <Button asChild>
            <Link href="/agenda">Agendar cita</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {promotions.map((promotion, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <Card key={promotion.id}>
                <CardHeader>
                  <Icon className="size-8 text-primary" />
                  <CardTitle>{promotion.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  <p>{promotion.description}</p>
                  <span className="mt-4 inline-flex rounded-full bg-secondary px-3 py-1 font-bold text-secondary-foreground">
                    {promotion.label}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
