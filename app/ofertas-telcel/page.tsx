import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TelcelOfferTabs } from "@/components/telcel-offer-tabs";
import { telcelOfferCampaign } from "@/lib/telcel-offers";

export const metadata = {
  title: "Ofertas Telcel",
  description:
    "Portabilidad Telcel, doble de gigas al adquirir smartphone, planes Telcel Libre, Ultra y WiFi Telcel."
};

export default function OfertasTelcelPage() {
  return (
    <main className="section-pad bg-muted/50">
      <div className="container">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-extrabold uppercase text-primary">Ofertas Telcel</p>
            <h1 className="text-4xl font-extrabold md:text-6xl">{telcelOfferCampaign.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{telcelOfferCampaign.subtitle}</p>
            <p className="mt-3 text-sm font-bold text-muted-foreground">{telcelOfferCampaign.validity}</p>
          </div>
          <Button asChild size="lg">
            <Link href="/agenda">
              {telcelOfferCampaign.ctaPrimary}
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <TelcelOfferTabs />
      </div>
    </main>
  );
}
