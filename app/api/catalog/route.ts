import { NextResponse } from "next/server";
import catalog from "@/public/data/equipos-catalogo.json";
import { plans, promotions } from "@/lib/data";
import { telcelOfferCampaign } from "@/lib/telcel-offers";

export async function GET() {
  return NextResponse.json({
    equipmentCatalog: {
      source: catalog.source,
      count: catalog.count,
      brands: catalog.filters.brands,
      items: catalog.items.map((item) => ({
        id: item.id,
        brand: item.brand,
        model: item.model
      }))
    },
    plans: plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      benefits: plan.benefits
    })),
    promotions: promotions.map((promotion) => ({
      id: promotion.id,
      title: promotion.title,
      description: promotion.description,
      label: promotion.label
    })),
    telcelOfferCampaign,
    source: "public-sanitized-catalog"
  });
}
