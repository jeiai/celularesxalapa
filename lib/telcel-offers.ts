export type TelcelOfferPoint = {
  name: string;
  includedGb?: string;
  promoGb?: string;
  note?: string;
};

export type TelcelOfferGroup = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  benefits: string[];
  offerPoints: TelcelOfferPoint[];
};

export const telcelOfferCampaign = {
  id: "telcel-portabilidad-julio-2026",
  title: "Portabilidad Telcel con mas gigas",
  subtitle: "Cambiate a Telcel, estrena smartphone y agenda una asesoria para revisar el beneficio correcto.",
  validity: "Promocion valida al 31 de julio de 2026.",
  ctaPrimary: "Quiero portar mi numero",
  ctaSecondary: "Ver beneficios Telcel",
  highlights: [
    "Doble de GB al adquirir smartphone en Paquetes Amigo Sin Limite",
    "Mas gigas en Planes Telcel Libre por portabilidad, renovacion o upsell",
    "Planes Telcel Ultra con WhatsApp, minutos y mensajes ilimitados",
    "WiFi Telcel con GB ilimitados"
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
        "Revision personalizada con asesor"
      ],
      offerPoints: [
        { name: "Amigo basico", promoGb: "1.5 GB", note: "7 dias" },
        { name: "Amigo esencial", promoGb: "2.4 GB", note: "12 dias" },
        { name: "Amigo sin limite", promoGb: "5.5 GB", note: "30 dias" },
        { name: "Amigo plus", promoGb: "8 GB", note: "30 dias" }
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
        "Ideal para cerrar venta de equipo con activacion"
      ],
      offerPoints: [
        { name: "Paquete inicial", promoGb: "1 GB", note: "7 dias" },
        { name: "Paquete ligero", promoGb: "1.6 GB", note: "12 dias" },
        { name: "Paquete medio", promoGb: "3 GB", note: "15 dias" },
        { name: "Paquete alto", promoGb: "11 GB", note: "30 dias" },
        { name: "Paquete maximo", promoGb: "16 GB", note: "30 dias" }
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
        "Opciones abiertas y controladas revisadas por asesor"
      ],
      offerPoints: [
        { name: "Telcel Ultra 3", includedGb: "15 GB" },
        { name: "Telcel Ultra 4", includedGb: "25 GB" },
        { name: "Telcel Ultra 5", includedGb: "40 GB" },
        { name: "Telcel Ultra 7", includedGb: "60 GB" },
        { name: "Telcel Ultra 9", includedGb: "100 GB" },
        { name: "Telcel Ultra Ilimitado", includedGb: "Ilimitados", note: "Politica de uso justo 200 GB" }
      ]
    },
    {
      id: "telcel-libre",
      title: "Planes Telcel Libre",
      kicker: "Mas gigas",
      description:
        "Promocion para clientes que se cambian a Telcel, renuevan con incremento de plan o hacen upsell.",
      benefits: [
        "Minutos, mensajes y redes sociales ilimitadas",
        "WhatsApp sin limite en Mexico, EUA y Canada",
        "Beneficios Telcel segun plan",
        "Sin plazos forzosos"
      ],
      offerPoints: [
        { name: "Libre 1", includedGb: "4 GB", promoGb: "6 GB" },
        { name: "Libre 2", includedGb: "5 GB", promoGb: "7.5 GB" },
        { name: "Libre 3", includedGb: "6 GB", promoGb: "9 GB" },
        { name: "Libre 4", includedGb: "10 GB", promoGb: "15 GB" },
        { name: "Libre 5", includedGb: "20 GB", promoGb: "30 GB" },
        { name: "Libre 6", includedGb: "30 GB", promoGb: "45 GB" },
        { name: "Libre 7", includedGb: "40 GB", promoGb: "60 GB" },
        { name: "Libre 9", includedGb: "45 GB", promoGb: "67.5 GB" },
        { name: "Libre 12", includedGb: "55 GB", promoGb: "82.5 GB" },
        { name: "Libre VIP", includedGb: "40 GB", promoGb: "60 GB" }
      ]
    },
    {
      id: "wifi-telcel",
      title: "WiFi Telcel",
      kicker: "Conexion con GB ilimitados",
      description:
        "Solucion practica para casa, oficina o negocio, sin instalacion, sin citas y sin cables.",
      benefits: [
        "GB ilimitados",
        "No requiere instalacion",
        "El modem se conecta en cualquier parte de casa u oficina",
        "Opciones con movilidad y mayor velocidad de red"
      ],
      offerPoints: [
        { name: "WiFi Telcel hogar", includedGb: "Ilimitados", note: "Servicio fijo" },
        { name: "WiFi Telcel negocio", includedGb: "Ilimitados", note: "Servicio fijo" },
        { name: "WiFi Telcel movilidad", includedGb: "Ilimitados", note: "Servicio con movilidad" }
      ]
    }
  ] satisfies TelcelOfferGroup[]
};
