type CatalogImage = {
  src: string;
  alt: string;
};

const exactModelImages: Array<{
  matches: RegExp;
  image: CatalogImage;
}> = [
  {
    matches: /^ACER .*3G A60 SOSPIRO$/i,
    image: {
      src: "https://xphone24.com/foto/acer_sospiro_a60.png",
      alt: "Acer Sospiro A60"
    }
  },
  {
    matches: /^APPLE .*IPHONE 16 128GB$/i,
    image: {
      src: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg",
      alt: "Apple iPhone 16"
    }
  },
  {
    matches: /^APPLE .*IPHONE 15 128GB$/i,
    image: {
      src: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg",
      alt: "Apple iPhone 15"
    }
  },
  {
    matches: /^SAMSUNG .*GALAXY S24 FE 128GB$/i,
    image: {
      src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-fe.jpg",
      alt: "Samsung Galaxy S24 FE"
    }
  },
  {
    matches: /^MOTOROLA .*MOTO G04$/i,
    image: {
      src: "https://fdn2.gsmarena.com/vv/bigpic/motorola-moto-g04.jpg",
      alt: "Motorola Moto G04"
    }
  },
  {
    matches: /^XIAOMI .*REDMI NOTE 11$/i,
    image: {
      src: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-11.jpg",
      alt: "Xiaomi Redmi Note 11"
    }
  }
];

function normalize(value = "") {
  return value.replace(/\s+/g, " ").trim().toUpperCase();
}

export function getCatalogImage(brand = "", model = "") {
  const text = normalize(`${brand} ${model}`);
  return exactModelImages.find((entry) => entry.matches.test(text))?.image ?? null;
}

export function hasExactCatalogImage(brand = "", model = "") {
  return Boolean(getCatalogImage(brand, model));
}
