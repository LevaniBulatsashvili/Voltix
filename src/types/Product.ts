export interface IProduct {
  id: number;
  name: string;
  description: string;
  brand_id: number;
  brand: IBrand;
  main_category_id: number;
  main_category: IMainCategory;
  category_id: number;
  category: ICategory;
  price: number;
  price_final: number;
  discount_percentage?: number;
  rating_avg: number;
  rating_count: number;
  stock: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  total_sold: number;

  product_specs?: IProductSpec[];
  product_comments?: IProductComment[];
  product_images?: IImage[];
  product_faqs?: IFAQ[];
}

export interface IMainCategory {
  id: number;
  name: "Electronics" | "Headphones" | "Gaming" | "Cameras";
  thumbnail: string;
  categories?: ICategory[];
  specs?: ISpecs[];
}

export interface ICategory {
  id: number;
  parent_id: number;
  name: string;
  specs?: ISpecs[];
}

export interface ISpecs {
  id: number;
  category_id: ICategory["id"];
  spec_name: string;
  spec_values?: ISpecValues[];
}

export interface ISpecValues {
  id: number;
  spec_id: ISpecs["id"];
  value: string;
}

export interface IBrand {
  id: number;
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

export interface IProductComment {
  id: string;
  product_id: IProduct["id"];
  user_id: string;

  name: string;
  avatar?: string;
  comment: string;
  rating: number;

  verified?: boolean;
  created_at: string;
}

export interface IImage {
  id: number;
  product_id: IProduct["id"];
  image_url: string;
}

export interface IFAQ {
  id: string;
  product_id: IProduct["id"];
  question: string;
  answer: string;
}
