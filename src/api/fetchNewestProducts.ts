import { supabase } from "../lib/supabase";
import type { IProduct } from "../types/Product";

const fetchNewestProducts = async (limit?: number): Promise<IProduct[]> => {
  let query = supabase
    .from("products")
    .select(
      `
      *,
      main_category_id(id, name),
      category_id(id, name),
      product_images(image),
      product_specs(key, value)
    `,
    )
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) throw error;
  return data as IProduct[];
};

export default fetchNewestProducts;
