const faqs = [
  ["¿La app ya conecta con Supabase?", "Incluye clientes y variables de entorno. Al agregar credenciales y ejecutar Prisma, queda lista para persistencia real."],
  ["¿WhatsApp Business ya envía mensajes?", "La interfaz está preparada. Con el token de Meta y phone number id, el adaptador cambia a modo live."],
  ["¿El cotizador usa IA?", "El cálculo es determinístico y la capa OpenAI queda lista para recomendaciones comerciales o agentes."],
  ["¿Está preparada para Vercel?", "Sí. Usa Next.js App Router, variables de entorno y scripts de build compatibles con Vercel."]
];

export function FAQ() {
  return (
    <section className="section-pad">
      <div className="container">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Preguntas frecuentes</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">Base lista para producción.</h2>
        </div>
        <div className="grid max-w-4xl gap-3">
          {faqs.map(([question, answer]) => (
            <details key={question} className="rounded-lg border bg-white p-5">
              <summary className="cursor-pointer font-bold">{question}</summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
