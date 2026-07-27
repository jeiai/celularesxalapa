import { NextResponse } from "next/server";
import { devices, plans, promotions } from "@/lib/data";
import { telcelOfferCampaign } from "@/lib/telcel-offers";

export async function GET() {
  return NextResponse.json({
    devices,
    plans,
    promotions,
    telcelOfferCampaign,
    source: "mock-ready-for-prisma"
  });
}
