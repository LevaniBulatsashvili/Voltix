import type { ICartItem } from "./cart";
import type { ICurrency } from "./currency";
import type { IProduct } from "./product";

export interface IProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  address?: IAddress;
  orders?: IOrder[];
}

export interface IAddress {
  id: string;
  user_id: string;
  address_line: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface IOrder<TItems = IOrderItem> {
  id: string;
  user_id: string;
  date: string;
  currency: ICurrency;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  delivery_fee: number;
  discount: number;
  items: TItems[];
}

export type IOrderRaw = Omit<IOrder<ICartItem>, "id" | "status" | "date">;

export interface IOrderItem {
  id?: string;
  order_id?: string;
  product_id: number;
  quantity: number;
  price: number;
  total?: number;
  product?: IProduct;
}
