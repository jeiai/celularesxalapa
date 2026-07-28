import { NextResponse } from "next/server";
import { z } from "zod";
import catalog from "@/public/data/equipos-catalogo.json";

const quoteSchema = z.object({
  equipmentId: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  intent: z.string().optional(),
  leadPhone: z.string().optional()
});

export async function POST(request: Request) {
  const payload = quoteSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const selected = payload.data.equipmentId
    ? catalog.items.find((item) => item.id === payload.data.equipmentId)
    : undefined;

  return NextResponse.json({
    request: {
      brand: selected?.brand ?? payload.data.brand ?? "",
      model: selected?.model ?? payload.data.model ?? "",
      intent: payload.data.intent ?? "Agendar asesoria",
      leadPhone: payload.data.leadPhone ?? ""
    },
    nextStep: "Agendar una cita con un asesor.",
    persistence: "Connect prisma.appointment or prisma.lead after DATABASE_URL is configured."
  });
}
