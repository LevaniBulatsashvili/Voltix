export interface IProduct {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  currency: "USD" | "GEL" | "EUR";
  discountPercentage?: number;
  rating: number;
  stock: number;
  images: string[];
  thumbnail: string;
  specs?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
