import { supabase } from "../lib/supabase";
import type { IProduct } from "../types/product";

const fetchTopSellingProducts = async (limit?: number): Promise<IProduct[]> => {
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
    .order("total_sold", { ascending: false });
  if (limit !== undefined) query = query.limit(limit);

  const { data, error } = await query;

  if (error) throw error;
  return data as IProduct[];
};

export default fetchTopSellingProducts;
