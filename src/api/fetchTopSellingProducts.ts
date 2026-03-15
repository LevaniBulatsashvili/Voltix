import { supabase } from "../lib/supabase";
import type { IProduct } from "../types/Product";

const fetchTopSellingProducts = async (limit?: number): Promise<IProduct[]> => {
  const query = supabase
    .from("products")
    .select(
      `
      *,
      main_category(id, name),
      category(id, name)
    `,
    )
    .order("total_sold", { ascending: false });
  if (limit !== undefined) query.limit(limit);

  const { data, error } = await query;

  if (error) throw error;
  return data as IProduct[];
};

export default fetchTopSellingProducts;
