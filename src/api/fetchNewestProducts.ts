import { supabase } from "../lib/supabase";
import type { IProduct } from "../types/product";

const fetchNewestProducts = async (limit?: number): Promise<IProduct[]> => {
  let query = supabase
    .from("products")
    .select(
      `
      *,
      main_category:main_category_id(id, name),
      category:categories(name),
      brand:brands(id, name)
    `,
    )
    .order("created_at", { ascending: false });
  if (limit !== undefined) query = query.limit(limit);

  const { data, error } = await query;

  if (error) throw new Error("newest products couldn't be fetched");
  return data as IProduct[];
};

export default fetchNewestProducts;
