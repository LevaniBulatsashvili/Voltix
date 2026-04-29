import type { IProfile } from "../profile/profile";

export interface IProduct {
  id: number;
  profile_id: IProfile["id"];
  name: string;
  description: string;
  brand_id: IBrand["id"];
  brand: IBrand;
  main_category_id: IMainCategory["id"];
  main_category: IMainCategory;
  category_id: ICategory["id"];
  category: ICategory;
  price: number;
  price_final: number;
  discount_percentage?: number;
  rating_avg: number;
  rating_count: number;
  stock: number;
  thumbnail: string;
  total_sold: number;
  created_at: string;
  updated_at: string;

  product_specs?: IProductSpec[];
  product_comments?: IProductComment[];
  product_images?: IProductImage[];
  product_faqs?: IProductFAQ[];
}

export interface IMainCategory {
  id: number;
  profile_id: IProfile["id"];
  name: string;
  thumbnail: string;
  categories?: ICategory[];
}

export interface ICategory {
  id: number;
  profile_id: IProfile["id"];
  main_category_id: IMainCategory["id"];
  main_category?: IMainCategory;
  name: string;
}

export interface IBrand {
  id: number;
  profile_id: IProfile["id"];
  name: string;
  logo_url?: string;
  website_url?: string;
}

export interface IProductSpec {
  id: number;
  product_id: IProduct["id"];
  spec: string;
  value: string;
}

export interface ISpecValue {
  id: number;
  spec_id: IProductSpec["id"];
  value: string;
}

export interface IProductComment {
  id: string;
  product_id: IProduct["id"];
  profile_id: IProfile["id"];
  profile?: Pick<IProfile, "id" | "full_name" | "avatar_url">;
  comment: string;
  rating: number;
  verified?: boolean;
  created_at: string;
}

export interface IProductImage {
  id: string;
  product_id: IProduct["id"];
  image_url: string;
}

export interface IProductFAQ {
  id: string;
  product_id: IProduct["id"];
  profile_id: IProfile["id"];
  question: string;
  answer?: string;
  answered_by?: IProfile["id"];
  answered_at?: string;
}
