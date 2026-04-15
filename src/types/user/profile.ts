import type { ICartItem } from "./cart";
import type { ICurrency } from "@/types/common/currency";
import type { IProduct } from "@/types/public/product";

export interface IProfile {
  id: string;
  full_name?: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;

  addresses: IAddress[];
  orders?: IOrder[];
}

export interface IAddress {
  id: string;
  profile_id: string;
  address_line?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

export interface IOrder<TItems = IOrderItem> {
  id: string;
  profile_id: string;
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
  product?: IProduct;
  quantity: number;
  price: number;
  total?: number;
}
