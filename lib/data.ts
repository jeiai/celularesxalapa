import type { Device, Plan, Promotion, StatCard } from "@/types/domain";

export const devices: Device[] = [
  {
    id: "iphone-pro",
    brand: "Apple",
    model: "iPhone Pro",
    slug: "iphone-pro",
    price: 15999,
    storage: "256 GB",
    camera: "Sistema Pro",
    battery: "Todo el dia",
    condition: "Nuevo",
    stock: 8,
    featured: true
  },
  {
    id: "galaxy-ultra",
    brand: "Samsung",
    model: "Galaxy Ultra",
    slug: "galaxy-ultra",
    price: 13999,
    storage: "256 GB",
    camera: "Zoom avanzado",
    battery: "Muy alta",
    condition: "Nuevo",
    stock: 11,
    featured: true
  },
  {
    id: "xiaomi-note",
    brand: "Xiaomi",
    model: "Xiaomi Note",
    slug: "xiaomi-note",
    price: 6999,
    storage: "128 GB",
    camera: "Muy buena",
    battery: "Alta",
    condition: "Nuevo",
    stock: 18,
    featured: true
  },
  {
    id: "moto-edge",
    brand: "Motorola",
    model: "Moto Edge",
    slug: "moto-edge",
    price: 8999,
    storage: "256 GB",
    camera: "50 MP",
    battery: "Alta",
    condition: "Nuevo",
    stock: 6,
    featured: false
  }
];

export const plans: Plan[] = [
  {
    id: "plan-esencial",
    name: "Plan Esencial",
    carrier: "Multioperador",
    monthlyFee: 249,
    dataGb: 10,
    benefits: ["Llamadas ilimitadas", "WhatsApp incluido", "Sin plazo forzoso opcional"],
    active: true
  },
  {
    id: "plan-plus",
    name: "Plan Plus",
    carrier: "Multioperador",
    monthlyFee: 399,
    dataGb: 25,
    benefits: ["Redes sociales", "Portabilidad guiada", "Soporte local"],
    active: true
  },
  {
    id: "plan-max",
    name: "Plan Max",
    carrier: "Multioperador",
    monthlyFee: 599,
    dataGb: 50,
    benefits: ["Roaming", "Datos amplios", "Atencion prioritaria"],
    active: true
  }
];

export const promotions: Promotion[] = [
  {
    id: "promo-porta",
    title: "Bono por portabilidad",
    description: "Cambia de compania y recibe asesoria completa para conservar tu numero.",
    label: "Conserva tu numero",
    active: true
  },
  {
    id: "promo-asesor",
    title: "Asesoria personalizada",
    description: "Elige un modelo y recibe orientacion segun tu necesidad.",
    label: "Cita guiada",
    active: true
  },
  {
    id: "promo-internet",
    title: "Internet + equipo",
    description: "Valida cobertura y arma un paquete para casa o negocio.",
    label: "Hogar",
    active: true
  }
];

export const stats: StatCard[] = [
  { label: "Leads nuevos", value: "128", trend: "+18%" },
  { label: "Solicitudes", value: "342", trend: "+24%" },
  { label: "Citas agendadas", value: "54", trend: "+11%" },
  { label: "Catalogo activo", value: "43", trend: "96%" }
];
