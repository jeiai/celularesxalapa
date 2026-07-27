import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  interest: z.string().min(2)
});

export async function GET() {
  return NextResponse.json({
    leads: [
      { name: "Mariana R.", phone: "2280000001", interest: "iPhone Pro", status: "NEW" },
      { name: "Daniel M.", phone: "2280000002", interest: "Portabilidad", status: "CONTACTED" }
    ]
  });
}

export async function POST(request: Request) {
  const payload = leadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  return NextResponse.json(
    {
      lead: {
        id: crypto.randomUUID(),
        status: "NEW",
        source: "web",
        ...payload.data
      },
      next: "Persist with prisma.lead.create and notify WhatsApp."
    },
    { status: 201 }
  );
}
