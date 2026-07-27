import catalog from "@/public/data/catalogo-excel.json";
import { ExcelProductBrowser } from "@/components/excel-product-browser";

export const metadata = {
  title: "Visualizador de precios",
  description: "Consulta equipos en prepago, postpago y accesorios desde el archivo Excel de CelularesXalapa.com."
};

export default function PreciosPage() {
  return (
    <main className="section-pad bg-muted/50">
      <div className="container">
        <div className="mb-8 max-w-4xl">
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Excel interpretado</p>
          <h1 className="text-4xl font-extrabold md:text-6xl">Visualizador de costos por producto.</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Filtra por tipo, marca, categoría y plan para consultar mejor precios de prepago, postpago, accesorios y equipos a plazo.
          </p>
        </div>
        <ExcelProductBrowser catalog={catalog} />
      </div>
    </main>
  );
}
