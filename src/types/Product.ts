export interface IProduct {
  id: number;
  name: string;
  description: string;
  brand: string;
  main_category: IMainCategory;
  category: ICategory;
  price: number;
  discount_percentage?: number;
  rating: number;
  stock: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  product_comments?: IComment[];
  product_images?: IImage[];
  product_specs?: ISpecs[];
  product_faqs?: IFAQ[];
  total_sold: number;
}

export interface IComment {
  id: string;
  parent_id: IProduct["id"];
  name: string;
  avatar?: string;
  comment: string;
  rating: number;
  verified?: boolean;
  createdAt: string;
}

export interface IImage {
  id: number;
  parent_id: ICategory["id"];
  image_url: string;
}

export interface ISpecs {
  id: number;
  parent_id: ICategory["id"];
  spec: string;
  value: string;
}

export interface IMainCategory {
  id: number;
  name: "Electronics" | "Headphones" | "Gaming" | "Cameras";
  categories: ICategory[];
}

export interface ICategory {
  id: number;
  parent_id: IMainCategory["id"];
  name: string;
}

export interface IFAQ {
  id: string;
  parent_id: IProduct["id"];
  question: string;
  answer: string;
}
