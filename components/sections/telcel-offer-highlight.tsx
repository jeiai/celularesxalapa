import Link from "next/link";
import { ArrowRight, BadgeCheck, RadioTower, Smartphone, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { telcelOfferCampaign } from "@/lib/telcel-offers";

const highlightIcons = [Smartphone, BadgeCheck, RadioTower, Wifi];

export function TelcelOfferHighlight() {
  return (
    <section id="ofertas-telcel" className="section-pad bg-zinc-950 text-white">
      <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase text-blue-300">Oferta comercial Telcel</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">{telcelOfferCampaign.title}</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">{telcelOfferCampaign.subtitle}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/agenda">
                {telcelOfferCampaign.ctaPrimary}
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="border border-white/15 bg-white/10 text-white hover:bg-white/15">
              <Link href="/ofertas-telcel">{telcelOfferCampaign.ctaSecondary}</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm font-bold text-white/55">{telcelOfferCampaign.validity}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {telcelOfferCampaign.highlights.map((highlight, index) => {
            const Icon = highlightIcons[index] ?? BadgeCheck;
            return (
              <div key={highlight} className="rounded-lg border border-white/10 bg-white/5 p-5">
                <Icon className="mb-4 size-7 text-blue-300" />
                <p className="font-bold leading-6">{highlight}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
