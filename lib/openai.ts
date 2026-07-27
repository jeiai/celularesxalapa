import OpenAI from "openai";
import { devices, plans } from "@/lib/data";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function getAiSalesRecommendation(prompt: string) {
  if (!client) {
    return {
      recommendation:
        "Configura OPENAI_API_KEY para activar recomendaciones inteligentes. Mientras tanto, prioriza equipo, presupuesto, cobertura y urgencia del cliente.",
      model: "mock"
    };
  }

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "Eres un asesor comercial de CelularesXalapa.com. Recomienda opciones claras, breves y orientadas a conversion sin inventar disponibilidad."
      },
      {
        role: "user",
        content: `Catalogo: ${JSON.stringify({ devices, plans })}\nCliente: ${prompt}`
      }
    ]
  });

  return {
    recommendation: response.output_text,
    model: response.model
  };
}
