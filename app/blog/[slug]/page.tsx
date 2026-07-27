import type { Metadata } from "next";
import { notFound } from "next/navigation";

const posts = {
  "mejor-celular-para-xalapa": {
    title: "Cómo elegir celular según tu uso diario",
    excerpt: "Compara cámara, batería, pantalla y presupuesto antes de decidir.",
    content: "El mejor celular no siempre es el más caro. Para venta local conviene identificar uso principal, presupuesto, financiamiento y soporte."
  },
  "portabilidad-sin-perder-numero": {
    title: "Portabilidad sin perder tu número",
    excerpt: "Pasos básicos para cambiar de compañía con menos fricción.",
    content: "Antes de portar, revisa cobertura, beneficios, requisitos y tiempos. Un asesor puede evitar errores que retrasan la activación."
  },
  "internet-para-casa-negocio": {
    title: "Internet para casa o negocio",
    excerpt: "Qué velocidad necesitas según tus actividades.",
    content: "La velocidad ideal depende de videollamadas, streaming, punto de venta, cámaras y cantidad de usuarios conectados."
  }
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <main className="section-pad">
      <article className="container max-w-3xl">
        <p className="mb-3 text-xs font-extrabold uppercase text-primary">Guía local</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-8 rounded-lg border bg-white p-6 text-lg leading-9">{post.content}</div>
      </article>
    </main>
  );
}
