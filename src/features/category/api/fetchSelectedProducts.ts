import { supabase } from "../../../lib/supabase";
import type { ICategory, IProduct } from "../../../types/product";

export interface IProductsResponse {
  products: IProduct[];
  totalPages: number;
  totalCount: number;
}

export type ISortBy = "popular" | "newest";

const fetchSelectedProducts = async (
  category: ICategory | null,
  page: number = 1,
  limit: number = 9,
  sortBy?: ISortBy,
  minPrice?: number,
  maxPrice?: number,
): Promise<IProductsResponse> => {
  if (!category) return { products: [], totalPages: 0, totalCount: 0 };

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("category", category.id)
    .gt("stock", 0);

  if (minPrice) query = query.gte("price", minPrice);
  if (maxPrice) query = query.lte("price", maxPrice); // add discounted price later

  if (sortBy === "popular")
    query = query.order("total_sold", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error("products couldn't be fetched");

  return {
    products: data || [],
    totalPages: Math.ceil((count || 0) / limit),
    totalCount: count || 0,
  };
};

export default fetchSelectedProducts;
