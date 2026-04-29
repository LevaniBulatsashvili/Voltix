import type { IProduct } from "../public/product";
import type { ICurrency } from "@/types/common/currency";

export type IProfileRole = "user" | "courier" | "admin" | "developer";

export interface IProfile {
  id: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: IProfileRole;
  created_at: string;

  addresses: IAddress[];
  orders?: IOrder[];
  wishlist?: IWishlist[];
}

export interface IAddress {
  id: string;
  profile_id: IProfile["id"];
  address_line?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
}

export interface IOrder {
  id: string;
  profile_id: IProfile["id"];
  currency: ICurrency;
  status: IOrderStatus;
  total_amount: number;
  delivery_fee: number;
  discount: number;
  date: string;
  created_at: string;
  updated_at?: string;

  items?: IOrderItem[];
  address?: IAddress;
}

export type IOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrderItem {
  id: string;
  order_id: IOrder["id"];
  product_id: IProduct["id"];
  product?: IProduct;
  quantity: number;
  price: number;
  total: number;
}

export interface IWishlist {
  id: string;
  profile_id: IProfile["id"];
  product_id: IProduct["id"];
  created_at: string;

  product?: IProduct;
}
