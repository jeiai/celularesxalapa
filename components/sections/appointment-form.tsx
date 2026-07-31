"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function AppointmentForm() {
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/crm", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" }
    });
    setMessage(response.ok ? "Gracias. Te contactaremos para confirmar tu cita." : "No se pudo registrar.");
  }

  return (
    <section id="agenda" className="section-pad">
      <div className="container grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase text-primary">Agenda una cita</p>
          <h2 className="text-4xl font-extrabold md:text-6xl">Agenda tu cita hoy.</h2>
          <p className="mt-4 text-muted-foreground">
            Dejanos tus datos y un asesor te contactara para revisar equipos, planes o portabilidad.
          </p>
        </div>
        <Card>
          <CardContent className="p-5">
            <form onSubmit={onSubmit} className="grid gap-3">
              <Input name="name" placeholder="Nombre" required />
              <Input name="phone" placeholder="WhatsApp" required />
              <Input name="email" type="email" placeholder="Correo opcional" />
              <Select name="interest">
                <option>Comprar celular</option>
                <option>Contratar plan</option>
                <option>Portabilidad / Oferta Telcel</option>
                <option>Portabilidad</option>
                <option>Internet / Telmex</option>
                <option>Soporte de compra</option>
              </Select>
              <Button type="submit" size="lg">
                <CalendarDays className="mr-2 size-5" />
                Agendar ahora
              </Button>
              {message ? <p className="text-sm font-semibold text-primary">{message}</p> : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
