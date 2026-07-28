type CatalogImage = {
  match: RegExp;
  src: string;
  alt: string;
};

const catalogImages: CatalogImage[] = [
  {
    match: /APPLE|IPHONE|IPAD/i,
    src: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=900&q=80",
    alt: "Smartphone blanco en fondo minimalista"
  },
  {
    match: /SAMSUNG|GALAXY/i,
    src: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    alt: "Smartphone moderno con camara posterior"
  },
  {
    match: /MOTOROLA|MOTO|NOKIA|ZTE|TCL|ALCATEL/i,
    src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
    alt: "Smartphone moderno sobre fondo claro"
  },
  {
    match: /XIAOMI|REDMI|POCO|HONOR|HUAWEI|OPPO|REALME|VIVO|TECNO|INFINIX/i,
    src: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=900&q=80",
    alt: "Smartphone Android en presentacion de catalogo"
  }
];

const fallbackImage = {
  src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  alt: "Smartphone moderno en uso"
};

export function getCatalogImage(brand = "", model = "") {
  const text = `${brand} ${model}`;
  return catalogImages.find((image) => image.match.test(text)) ?? fallbackImage;
}
