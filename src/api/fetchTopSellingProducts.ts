import { supabase } from "../lib/supabase";
import type { IProduct } from "../types/Product";

export const fetchTopSellingProducts = async (
  limit?: number,
): Promise<IProduct[]> => {
  let query = supabase
    .from("products")
    .select(
      `
      *,
      product_images(image),
      product_specs(key, value),
      main_category_id(id, name),
      category_id(id, name)
    `,
    )
    .order("total_sold", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) throw error;
  return data as IProduct[];
};
