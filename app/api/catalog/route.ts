import { NextResponse } from "next/server";
import { devices, plans, promotions } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    devices,
    plans,
    promotions,
    source: "mock-ready-for-prisma"
  });
}
