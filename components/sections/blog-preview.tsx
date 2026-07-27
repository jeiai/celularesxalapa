import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
  {
    slug: "mejor-celular-para-xalapa",
    title: "Cómo elegir celular según tu uso diario",
    excerpt: "Una guía rápida para decidir entre cámara, batería, pantalla y presupuesto."
  },
  {
    slug: "portabilidad-sin-perder-numero",
    title: "Portabilidad sin perder tu número",
    excerpt: "Qué revisar antes de cambiar de compañía y cómo evitar fricción."
  },
  {
    slug: "internet-para-casa-negocio",
    title: "Internet para casa o negocio",
    excerpt: "Velocidades recomendadas para familias, estudiantes y puntos de venta."
  }
];

export function BlogPreview() {
  return (
    <section className="section-pad bg-muted/60">
      <div className="container">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Blog y SEO</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">Contenido para captar búsqueda local.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-retail">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
