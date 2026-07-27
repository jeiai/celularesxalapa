export type Role = "CUSTOMER" | "ADVISOR" | "MANAGER" | "ADMIN";

export type Device = {
  id: string;
  brand: string;
  model: string;
  slug: string;
  price: number;
  storage: string;
  camera: string;
  battery: string;
  condition: string;
  stock: number;
  featured: boolean;
};

export type Plan = {
  id: string;
  name: string;
  carrier: string;
  monthlyFee: number;
  dataGb: number;
  benefits: string[];
  active: boolean;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  label: string;
  active: boolean;
};

export type StatCard = {
  label: string;
  value: string;
  trend: string;
};
