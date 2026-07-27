import { NextResponse } from "next/server";
import { z } from "zod";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

const messageSchema = z.object({
  to: z.string().min(7),
  body: z.string().min(1)
});

export async function POST(request: Request) {
  const payload = messageSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const result = await sendWhatsAppMessage(payload.data);
  return NextResponse.json(result, { status: result.ok ? 200 : 202 });
}
