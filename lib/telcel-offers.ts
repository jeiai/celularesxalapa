export type TelcelOfferPoint = {
  name: string;
  price?: string;
  openPrice?: string;
  controlledPrice?: string;
  includedGb?: string;
  promoGb?: string;
  cashback?: string;
  validity?: string;
  social?: string;
  service?: string;
  mobility?: string;
  fairUse?: string;
  devices?: string;
  note?: string;
};

export type TelcelOfferGroup = {
  id: string;
  title: string;
  audience: "Prepago" | "Postpago" | "Internet";
  kicker: string;
  description: string;
  validity?: string;
  sourceImage: string;
  benefits: string[];
  offerPoints: TelcelOfferPoint[];
};

export const telcelOfferCampaign = {
  id: "telcel-tarifas-julio-2026",
  title: "Planes y paquetes Telcel",
  subtitle:
    "Consulta esquemas Amigo Kit prepago, Planes Telcel Libre, Planes Telcel Ultra y WiFi Telcel para elegir con asesor.",
  validity: "Promociones sujetas a disponibilidad, cobertura, contratacion y terminos vigentes.",
  ctaPrimary: "Agendar cita",
  ctaSecondary: "Ver tablas tarifarias",
  highlights: [
    "Amigo Kit con beneficios por portabilidad y doble de GB al estrenar smartphone",
    "Planes Telcel Libre con 50% mas gigas, cashback y sin plazos forzosos",
    "Planes Telcel Ultra con minutos, mensajes y WhatsApp ilimitados",
    "WiFi Telcel con GB ilimitados desde $399 al mes"
  ],
  groups: [
    {
      id: "amigo-kit-portabilidad",
      title: "Amigo Kit - Portabilidad",
      audience: "Prepago",
      kicker: "Beneficios por 12 meses",
      description:
        "Al cambiarse a Telcel, con o sin equipo, el cliente recibe beneficios en paquetes Amigo Sin Limite.",
      validity: "Promocion valida al 31 de julio de 2026.",
      sourceImage: "/assets/amigo-portabilidad.jpeg",
      benefits: [
        "Minutos, mensajes y WhatsApp ilimitados en Mexico, EUA y Canada",
        "Redes sociales en Mexico segun paquete",
        "Llamadas y videollamadas de WhatsApp sin costo en Mexico",
        "Amazon Prime Basico y envios gratis en paquetes participantes",
        "Claro musica 500 MB y Claro drive 20 GB en paquetes participantes"
      ],
      offerPoints: [
        { name: "Paquete $50", price: "$50", promoGb: "1.5 GB", validity: "7 dias", note: "Triple de gigas", social: "Redes sociales 1 GB" },
        { name: "Paquete $80", price: "$80", promoGb: "2.4 GB", validity: "12 dias", note: "Triple de gigas", social: "Redes sociales 1.5 GB" },
        { name: "Paquete $100", price: "$100", promoGb: "5.5 GB", validity: "30 dias", note: "Beneficios del paquete Amigo Sin Limite 300", social: "Redes sociales sin limite" },
        { name: "Paquete $150", price: "$150", promoGb: "8 GB", validity: "30 dias", note: "Beneficios del paquete Amigo Sin Limite 500", social: "Redes sociales sin limite" },
        { name: "Paquete $200", price: "$200", promoGb: "8 GB", validity: "30 dias", note: "Beneficios del paquete Amigo Sin Limite 500", social: "Redes sociales sin limite" },
        { name: "Paquete $300", price: "$300", promoGb: "8 GB", validity: "30 dias", note: "Beneficios del paquete Amigo Sin Limite 500", social: "Redes sociales sin limite" },
        { name: "Paquete $270", price: "$270", promoGb: "8 GB", validity: "30 dias", note: "Mas gigas", social: "Redes sociales sin limite" },
        { name: "Paquete $400", price: "$400", promoGb: "8 GB", validity: "30 dias", note: "Mas gigas", social: "Redes sociales sin limite" }
      ]
    },
    {
      id: "amigo-kit-doble-gb",
      title: "Amigo Kit - Doble de GB",
      audience: "Prepago",
      kicker: "Doble de GB por 6 meses",
      description:
        "Al estrenar smartphone y activar paquetes Amigo Sin Limite, el cliente puede disfrutar doble de gigas por 6 meses.",
      validity: "Promocion valida al 31 de julio de 2026. Al realizar tramite Renovate B63 tambien aplica la promocion.",
      sourceImage: "/assets/amigo-kit-doble-gb.jpeg",
      benefits: [
        "Minutos, mensajes y WhatsApp sin frontera en Mexico, EUA y Canada",
        "Redes sociales incluidas en Mexico segun paquete",
        "Amazon Prime Basico y envios gratis en paquetes participantes",
        "Claro drive 20 GB en paquetes participantes",
        "Claro musica 500 MB mas Claro drive 20 GB en paquetes participantes"
      ],
      offerPoints: [
        { name: "Paquete $50", price: "$50", promoGb: "1 GB", validity: "7 dias", social: "Redes sociales 1 GB" },
        { name: "Paquete $80", price: "$80", promoGb: "1.6 GB", validity: "12 dias", social: "Redes sociales 1.5 GB" },
        { name: "Paquete $100", price: "$100", promoGb: "3 GB", validity: "15 dias", social: "Redes sociales sin limite" },
        { name: "Paquete $150", price: "$150", promoGb: "5 GB", validity: "25 dias", social: "Redes sociales sin limite" },
        { name: "Paquete $200", price: "$200", promoGb: "7 GB", validity: "30 dias", social: "Redes sociales sin limite" },
        { name: "Paquete $270", price: "$270", promoGb: "5 GB", validity: "30 dias", social: "Redes sociales sin limite" },
        { name: "Paquete $300", price: "$300", promoGb: "11 GB", validity: "30 dias", social: "Redes sociales sin limite" },
        { name: "Paquete $400", price: "$400", promoGb: "11 GB", validity: "30 dias", social: "Redes sociales sin limite" },
        { name: "Paquete $500", price: "$500", promoGb: "16 GB", validity: "30 dias", social: "Redes sociales sin limite" }
      ]
    },
    {
      id: "telcel-libre",
      title: "Planes Telcel Libre",
      audience: "Postpago",
      kicker: "50% mas gigas",
      description:
        "Planes sin plazos forzosos con mas gigas al cambiarse a Telcel o renovar con incremento de plan por upsell.",
      validity: "Promocion 50% mas gigas valida al 31 de julio de 2026.",
      sourceImage: "/assets/planes-telcel-libre.jpeg",
      benefits: [
        "Minutos, mensajes y redes sociales ilimitadas en Mexico",
        "WhatsApp sin limite en Mexico, EUA y Canada",
        "Llamadas y videollamadas de WhatsApp sin costo en Mexico",
        "Cashback Telcel mensual segun plan",
        "Claro drive 20 GB, Claro video, atresplayer y Universal+"
      ],
      offerPoints: [
        { name: "Telcel Libre 1", openPrice: "$249", controlledPrice: "$299", includedGb: "4 GB", promoGb: "6 GB", cashback: "5%" },
        { name: "Telcel Libre 2", openPrice: "$319", controlledPrice: "$369", includedGb: "5 GB", promoGb: "7.5 GB", cashback: "5%" },
        { name: "Telcel Libre 3", openPrice: "$399", controlledPrice: "$449", includedGb: "6 GB", promoGb: "9 GB", cashback: "10%" },
        { name: "Telcel Libre 4", openPrice: "$499", controlledPrice: "$549", includedGb: "10 GB", promoGb: "15 GB", cashback: "15%" },
        { name: "Telcel Libre 5", openPrice: "$599", controlledPrice: "$699", includedGb: "20 GB", promoGb: "30 GB", cashback: "15%" },
        { name: "Telcel Libre 6", openPrice: "$699", controlledPrice: "$799", includedGb: "30 GB", promoGb: "45 GB", cashback: "15%" },
        { name: "Telcel Libre 7", openPrice: "$799", controlledPrice: "$899", includedGb: "40 GB", promoGb: "60 GB", cashback: "15%" },
        { name: "Telcel Libre 9", openPrice: "$999", controlledPrice: "$1,099", includedGb: "45 GB", promoGb: "67.5 GB", cashback: "15%" },
        { name: "Telcel Libre 12", openPrice: "$1,299", controlledPrice: "$1,399", includedGb: "55 GB", promoGb: "82.5 GB", cashback: "15%" },
        { name: "Telcel Libre VIP", openPrice: "$1,499", controlledPrice: "$1,599", includedGb: "40 GB", promoGb: "60 GB", cashback: "42%" }
      ]
    },
    {
      id: "telcel-ultra",
      title: "Planes Telcel Ultra",
      audience: "Postpago",
      kicker: "Ultra velocidad 5G",
      description:
        "Planes con minutos, mensajes y WhatsApp ilimitados para Mexico, EUA y Canada, con mas gigas para navegar.",
      sourceImage: "/assets/planes-telcel-ultra.jpeg",
      benefits: [
        "Minutos, mensajes y WhatsApp ilimitados en Mexico, EUA y Canada",
        "GB incluidos para Mexico, EUA y Canada",
        "Claro drive 20 GB",
        "Claro video, atresplayer y Universal+",
        "Opciones en cargo mensual abierto o controlado"
      ],
      offerPoints: [
        { name: "Telcel Ultra 3", openPrice: "$349", controlledPrice: "$399", includedGb: "15 GB" },
        { name: "Telcel Ultra 4", openPrice: "$449", controlledPrice: "$499", includedGb: "25 GB" },
        { name: "Telcel Ultra 5", openPrice: "$549", controlledPrice: "$599", includedGb: "40 GB" },
        { name: "Telcel Ultra 7", openPrice: "$749", controlledPrice: "$799", includedGb: "60 GB" },
        { name: "Telcel Ultra 9", openPrice: "$949", controlledPrice: "$999", includedGb: "100 GB" },
        { name: "Telcel Ultra Ilimitado", openPrice: "$1,349", controlledPrice: "$1,399", includedGb: "Ilimitados", fairUse: "Politica de uso justo 200 GB" }
      ]
    },
    {
      id: "wifi-telcel",
      title: "WiFi Telcel",
      audience: "Internet",
      kicker: "GB ilimitados",
      description:
        "Conexion WiFi con GB ilimitados para casa, oficina o negocio, sin instalacion, sin citas y sin cables.",
      sourceImage: "/assets/wifi-telcel-planes.png",
      benefits: [
        "No requiere instalacion: basta con conectar el modem a la corriente",
        "Sin citas: no es necesario esperar al tecnico",
        "Sin cables: el modem se conecta en cualquier parte de casa u oficina",
        "Claro video, atresplayer y Universal+",
        "Mayor velocidad disponible dentro de la red Telcel segun modem y ubicacion"
      ],
      offerPoints: [
        {
          name: "WiFi Telcel $399",
          price: "$399 al mes",
          includedGb: "Ilimitados",
          service: "Servicio fijo + modem 4G/5G a plazo 24 meses con costo",
          mobility: "$100 por evento",
          fairUse: "150 GB; despues 5 Mbps",
          devices: "2 dispositivos simultaneamente"
        },
        {
          name: "WiFi Telcel $799",
          price: "$799 al mes",
          includedGb: "Ilimitados",
          service: "Servicio fijo + modem 5G a plazo 24 meses sin costo",
          mobility: "$100 por evento",
          fairUse: "Maxima velocidad",
          devices: "5 dispositivos simultaneamente"
        },
        {
          name: "WiFi Telcel $1,399",
          price: "$1,399 al mes",
          includedGb: "Ilimitados",
          service: "Servicio con movilidad + modem 5G a plazo 24 meses sin costo",
          mobility: "Sin cargo adicional",
          fairUse: "Maxima velocidad",
          devices: "10 dispositivos simultaneamente"
        }
      ]
    }
  ] satisfies TelcelOfferGroup[]
};
