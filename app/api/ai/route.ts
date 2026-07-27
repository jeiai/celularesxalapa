import { NextResponse } from "next/server";
import { z } from "zod";
import { getAiSalesRecommendation } from "@/lib/openai";

const aiSchema = z.object({
  prompt: z.string().min(3)
});

export async function POST(request: Request) {
  const payload = aiSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const result = await getAiSalesRecommendation(payload.data.prompt);
  return NextResponse.json(result);
}
