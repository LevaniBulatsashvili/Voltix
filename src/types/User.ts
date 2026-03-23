export interface IUser {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  address: IAddress;
  orders?: IOrder[];
}

export interface IAddress {
  id?: string;
  user_id?: string;
  address_line: string;
  city: string;
  postal_code: string;
  country: string;
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
