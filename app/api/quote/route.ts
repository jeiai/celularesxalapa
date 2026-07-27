import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateQuote } from "@/lib/quote";

const quoteSchema = z.object({
  deviceSlug: z.string(),
  planId: z.string().optional(),
  downPayment: z.coerce.number().min(0).default(0),
  months: z.coerce.number().min(1).max(36).default(18),
  leadPhone: z.string().optional()
});

export async function POST(request: Request) {
  const payload = quoteSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const quote = calculateQuote(payload.data);

  return NextResponse.json({
    quote,
    persistence: "Connect prisma.quote.create after DATABASE_URL is configured."
  });
}
