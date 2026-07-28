import OpenAI from "openai";
import { plans } from "@/lib/data";
import catalog from "@/public/data/equipos-catalogo.json";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function getAiSalesRecommendation(prompt: string) {
  if (!client) {
    return {
      recommendation:
        "Configura OPENAI_API_KEY para activar recomendaciones inteligentes. Mientras tanto, prioriza modelo de interes, cobertura, urgencia del cliente y agenda una cita.",
      model: "mock"
    };
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "Eres un asesor comercial de CelularesXalapa.com. Recomienda opciones claras, breves y orientadas a conversion. No publiques precios, enganches, pagos, stock ni disponibilidad. El siguiente paso siempre debe ser agendar una cita con un asesor."
      },
      {
        role: "user",
        content: `Catalogo publico: ${JSON.stringify({
          equipment: catalog.items.map((item) => ({ brand: item.brand, model: item.model })).slice(0, 400),
          plans: plans.map((plan) => ({ name: plan.name, benefits: plan.benefits }))
        })}\nCliente: ${prompt}`
      }
    ]
  });

  return {
    recommendation: response.output_text,
    model: response.model
  };
}
