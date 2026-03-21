export interface IUser {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  addresses?: IAddress[];
  orders?: IOrder[];
}

export interface IAddress {
  id: string;
  user_id: string;
  label?: string;
  recipient_name?: string;
  address_lines: string[];
  city?: string;
  state_or_province?: string;
  postal_code?: string;
  country: string;
  phone?: string;
  is_default?: boolean;
}

export interface IOrder {
  id: string;
  user_id: string;
  date: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  items: IOrderItem[];
}

export interface IOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  image_url?: string;
}
