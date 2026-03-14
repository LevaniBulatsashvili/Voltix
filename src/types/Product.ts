export interface IProduct {
  id: number;
  name: string;
  description: string;
  brand: string;
  main_category_id: {
    id: number;
    name: string;
  };
  category_id: {
    id: number;
    name: string;
  };
  price: number;
  currency: "USD" | "GEL" | "EUR";
  discount_percentage?: number;
  rating: number;
  stock: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;

  product_images?: { image: string }[];
  product_specs?: { key: string; value: string }[];
  total_sold: number;
}
