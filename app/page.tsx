import { AppointmentForm } from "@/components/sections/appointment-form";
import { CatalogSection } from "@/components/sections/catalog";
import { Hero } from "@/components/sections/hero";
import { PlansAndOperations } from "@/components/sections/operations";
import { PromotionsSection } from "@/components/sections/promotions";
import { TelcelOfferHighlight } from "@/components/sections/telcel-offer-highlight";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TelcelOfferHighlight />
      <CatalogSection />
      <PromotionsSection />
      <PlansAndOperations />
      <AppointmentForm />
    </main>
  );
}
