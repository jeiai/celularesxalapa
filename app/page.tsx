import { AppointmentForm } from "@/components/sections/appointment-form";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CatalogSection } from "@/components/sections/catalog";
import { ComparisonTool } from "@/components/sections/comparison-tool";
import { FAQ } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { PlansAndOperations } from "@/components/sections/operations";
import { PromotionsSection } from "@/components/sections/promotions";
import { QuoteTool } from "@/components/sections/quote-tool";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CatalogSection />
      <PromotionsSection />
      <PlansAndOperations />
      <ComparisonTool />
      <QuoteTool />
      <AppointmentForm />
      <BlogPreview />
      <FAQ />
    </main>
  );
}
