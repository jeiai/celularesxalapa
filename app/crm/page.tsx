import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const leads = [
  { name: "Mariana R.", phone: "2280000001", interest: "iPhone Pro", status: "Nuevo" },
  { name: "Daniel M.", phone: "2280000002", interest: "Portabilidad", status: "Contactado" },
  { name: "Andrea L.", phone: "2280000003", interest: "Internet Telmex", status: "Calificado" }
];

export default function CRMPage() {
  return (
    <main className="section-pad">
      <div className="container">
        <p className="mb-3 text-xs font-extrabold uppercase text-primary">CRM</p>
        <h1 className="mb-8 text-4xl font-extrabold md:text-6xl">Seguimiento de prospectos.</h1>
        <Card>
          <CardHeader>
            <CardTitle>Leads recientes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {leads.map((lead) => (
              <div key={lead.phone} className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
                <strong>{lead.name}</strong>
                <span className="text-sm text-muted-foreground">{lead.interest}</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">{lead.status}</span>
                <Button size="sm" variant="dark">Contactar</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
