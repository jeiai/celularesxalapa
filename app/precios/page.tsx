import catalog from "@/public/data/equipos-catalogo.json";
import { ExcelProductBrowser } from "@/components/excel-product-browser";

export const metadata = {
  title: "Catalogo de equipos",
  description: "Consulta marcas y modelos vigentes de CelularesXalapa.com y agenda una cita con un asesor."
};

export default function CatalogoEquiposPage() {
  return (
    <main className="section-pad bg-muted/50">
      <div className="container">
        <div className="mb-8 max-w-4xl">
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Catalogo actualizado desde Excel</p>
          <h1 className="text-4xl font-extrabold md:text-6xl">Elige marca y modelo. Un asesor revisa el resto contigo.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            La pagina publica muestra solamente marcas y modelos. Las condiciones comerciales se atienden en cita para darte una recomendacion correcta.
          </p>
        </div>
        <ExcelProductBrowser catalog={catalog} />
      </div>
    </main>
  );
}
