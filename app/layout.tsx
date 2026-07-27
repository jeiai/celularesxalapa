import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://celularesxalapa.com"),
  title: {
    default: "CelularesXalapa.com | Celulares, planes e internet en Xalapa",
    template: "%s | CelularesXalapa.com"
  },
  description:
    "Aplicación full-stack para venta de celulares, planes, portabilidades, internet, CRM, dashboard, agenda y administración en Xalapa.",
  keywords: ["celulares xalapa", "planes celulares", "portabilidad", "internet telmex", "smartphones xalapa"],
  openGraph: {
    title: "CelularesXalapa.com",
    description: "Celulares, planes, cotizador inteligente y CRM comercial.",
    url: "https://celularesxalapa.com",
    siteName: "CelularesXalapa.com",
    locale: "es_MX",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Analytics />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
