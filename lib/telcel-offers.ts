export type TelcelPricePoint = {
  name: string;
  openPrice?: number;
  controlledPrice?: number;
  price?: number;
  includedGb?: string;
  promoGb?: string;
  cashback?: string;
  note?: string;
};

export type TelcelOfferGroup = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  benefits: string[];
  pricePoints: TelcelPricePoint[];
};

export const telcelOfferCampaign = {
  id: "telcel-portabilidad-julio-2026",
  title: "Portabilidad Telcel con mas gigas",
  subtitle: "Cambiate a Telcel, estrena smartphone y aprovecha beneficios por tiempo limitado.",
  validity: "Promocion valida al 31 de julio de 2026.",
  ctaPrimary: "Quiero portar mi numero",
  ctaSecondary: "Ver planes Telcel",
  highlights: [
    "Doble de GB al adquirir smartphone en Paquetes Amigo Sin Limite",
    "50% mas gigas en Planes Telcel Libre por portabilidad, renovacion o upsell",
    "Planes Telcel Ultra con WhatsApp, minutos y mensajes ilimitados",
    "WiFi Telcel con GB ilimitados desde $399 al mes"
  ],
  groups: [
    {
      id: "portabilidad-amigo",
      title: "Portabilidad Amigo",
      kicker: "Beneficios por 12 meses",
      description:
        "Al cambiarse a Telcel, tus clientes pueden recibir mas gigas y beneficios en Paquetes Amigo Sin Limite.",
      benefits: [
        "Minutos, mensajes y WhatsApp ilimitados",
        "Redes sociales incluidas segun paquete",
        "Beneficios por 12 meses al portar a Telcel",
        "Opciones desde recargas de $50"
      ],
      pricePoints: [
        { name: "Amigo $50", price: 50, promoGb: "1.5 GB", note: "7 dias" },
        { name: "Amigo $80", price: 80, promoGb: "2.4 GB", note: "12 dias" },
        { name: "Amigo $100", price: 100, promoGb: "5.5 GB", note: "30 dias" },
        { name: "Amigo $150", price: 150, promoGb: "8 GB", note: "30 dias" },
        { name: "Amigo $200", price: 200, promoGb: "8 GB", note: "30 dias" },
        { name: "Amigo $300", price: 300, promoGb: "8 GB", note: "30 dias" },
        { name: "Amigo $270", price: 270, promoGb: "8 GB", note: "30 dias" },
        { name: "Amigo $400", price: 400, promoGb: "8 GB", note: "30 dias" }
      ]
    },
    {
      id: "smartphone-doble-gb",
      title: "Smartphone + doble de GB",
      kicker: "Doble de GB por 6 meses",
      description:
        "Al estrenar smartphone y activar Paquete Amigo Sin Limite, el cliente puede disfrutar doble de gigas por 6 meses.",
      benefits: [
        "Aplica en Paquetes Amigo Sin Limite seleccionados",
        "Minutos, mensajes y WhatsApp sin frontera",
        "Beneficio compatible con tramite Renovate B63 segun material comercial",
        "Ideal para cerrar venta de equipo + activacion"
      ],
      pricePoints: [
        { name: "Paquete $50", price: 50, promoGb: "1 GB", note: "7 dias" },
        { name: "Paquete $80", price: 80, promoGb: "1.6 GB", note: "12 dias" },
        { name: "Paquete $100", price: 100, promoGb: "3 GB", note: "15 dias" },
        { name: "Paquete $150", price: 150, promoGb: "5 GB", note: "25 dias" },
        { name: "Paquete $200", price: 200, promoGb: "7 GB", note: "30 dias" },
        { name: "Paquete $270", price: 270, promoGb: "5 GB", note: "30 dias" },
        { name: "Paquete $300", price: 300, promoGb: "11 GB", note: "30 dias" },
        { name: "Paquete $400", price: 400, promoGb: "11 GB", note: "30 dias" },
        { name: "Paquete $500", price: 500, promoGb: "16 GB", note: "30 dias" }
      ]
    },
    {
      id: "telcel-ultra",
      title: "Planes Telcel Ultra",
      kicker: "Ultra velocidad 5G",
      description:
        "Planes con mas gigas, minutos, mensajes y WhatsApp ilimitados en Mexico, EUA y Canada.",
      benefits: [
        "Minutos, mensajes y WhatsApp ilimitados",
        "GB incluidos para Mexico, EUA y Canada",
        "Claro drive, Claro video, atresplayer y Universal+ segun plan",
        "Opciones abiertas y controladas"
      ],
      pricePoints: [
        { name: "Telcel Ultra 3", openPrice: 349, controlledPrice: 399, includedGb: "15 GB" },
        { name: "Telcel Ultra 4", openPrice: 449, controlledPrice: 499, includedGb: "25 GB" },
        { name: "Telcel Ultra 5", openPrice: 549, controlledPrice: 599, includedGb: "40 GB" },
        { name: "Telcel Ultra 7", openPrice: 749, controlledPrice: 799, includedGb: "60 GB" },
        { name: "Telcel Ultra 9", openPrice: 949, controlledPrice: 999, includedGb: "100 GB" },
        {
          name: "Telcel Ultra Ilimitado",
          openPrice: 1349,
          controlledPrice: 1399,
          includedGb: "Ilimitados",
          note: "Politica de uso justo 200 GB"
        }
      ]
    },
    {
      id: "telcel-libre",
      title: "Planes Telcel Libre",
      kicker: "50% mas de gigas",
      description:
        "Promocion para clientes que se cambian a Telcel, renuevan con incremento de plan o hacen upsell.",
      benefits: [
        "Minutos, mensajes y redes sociales ilimitadas",
        "WhatsApp sin limite en Mexico, EUA y Canada",
        "Cashback Telcel mensual segun plan",
        "Sin plazos forzosos"
      ],
      pricePoints: [
        { name: "Libre 1", openPrice: 249, controlledPrice: 299, includedGb: "4 GB", promoGb: "6 GB", cashback: "5%" },
        { name: "Libre 2", openPrice: 319, controlledPrice: 369, includedGb: "5 GB", promoGb: "7.5 GB", cashback: "5%" },
        { name: "Libre 3", openPrice: 399, controlledPrice: 449, includedGb: "6 GB", promoGb: "9 GB", cashback: "10%" },
        { name: "Libre 4", openPrice: 499, controlledPrice: 549, includedGb: "10 GB", promoGb: "15 GB", cashback: "15%" },
        { name: "Libre 5", openPrice: 599, controlledPrice: 699, includedGb: "20 GB", promoGb: "30 GB", cashback: "15%" },
        { name: "Libre 6", openPrice: 699, controlledPrice: 799, includedGb: "30 GB", promoGb: "45 GB", cashback: "15%" },
        { name: "Libre 7", openPrice: 799, controlledPrice: 899, includedGb: "40 GB", promoGb: "60 GB", cashback: "15%" },
        { name: "Libre 9", openPrice: 999, controlledPrice: 1099, includedGb: "45 GB", promoGb: "67.5 GB", cashback: "15%" },
        { name: "Libre 12", openPrice: 1299, controlledPrice: 1399, includedGb: "55 GB", promoGb: "82.5 GB", cashback: "15%" },
        { name: "Libre VIP", openPrice: 1499, controlledPrice: 1599, includedGb: "40 GB", promoGb: "60 GB", cashback: "42%" }
      ]
    },
    {
      id: "wifi-telcel",
      title: "WiFi Telcel",
      kicker: "Conexion con GB ilimitados",
      description:
        "Solucion practica para casa, oficina o negocio, sin instalacion, sin citas y sin cables.",
      benefits: [
        "Desde $399 al mes",
        "No requiere instalacion",
        "El modem se conecta en cualquier parte de casa u oficina",
        "Opciones con movilidad y mayor velocidad de red"
      ],
      pricePoints: [
        { name: "WiFi Telcel $399", price: 399, includedGb: "Ilimitados", note: "Servicio fijo" },
        { name: "WiFi Telcel $799", price: 799, includedGb: "Ilimitados", note: "Servicio fijo" },
        { name: "WiFi Telcel $1,399", price: 1399, includedGb: "Ilimitados", note: "Servicio con movilidad" }
      ]
    }
  ] satisfies TelcelOfferGroup[]
};
